---
sidebar_position: 1
---

# How Attribution Works in VeluAI

VeluAI attribution closes the loop between release communications and downstream product usage. By instrumenting both the documentation experience and the product surface, VeluAI can prove whether a specific announcement influenced real customer behavior and make that impact visible to stakeholders.

## System Overview

VeluAI attribution relies on four cooperating components:

1. **Instrumented documentation** – A VeluAI script injected into your documentation portal (for example, GitBook) detects who reads each release note and reports `seen` events to VeluAI.
2. **Instrumented backend services** – A lightweight VeluAI agent added to the product or API layer captures real usage events (for example, an invocation of `/bulktransform`) and forwards them to VeluAI.
3. **Identity resolution layer** – VeluAI correlates documentation readers with product users, handling both authenticated and anonymous traffic so it can determine whether the same tenant both read a note and used the corresponding capability.
4. **Insights and notifications** – VeluAI pushes high-signal events to analytics tools like Mixpanel/PostHog and keeps internal teams informed through the VeluAI Slackbot and dashboards.

## Ideal: Authenticated Documentation Portals

When your documentation platform supports authentication (e.g., a paid GitBook subscription), VeluAI receives a reliable user identifier on every doc view.

1. A tenant user (for example, a Nykaa engineer) signs into the docs portal, and the VeluAI script records that the user viewed the release note announcing `/bulktransform`.
2. Later, the same user calls `/bulktransform` from the product. The backend VeluAI script streams request details to VeluAI.
3. VeluAI matches the API usage to the earlier `seen` event, emits an `engaged` event to the analytics destination, and the CTO can immediately confirm the release generated adoption.

Result: end-to-end attribution is deterministic because both touchpoints carry the same authenticated identity.

## Limited: Anonymous Documentation Traffic

Free-tier documentation portals often lack authentication. In this case VeluAI starts with anonymous identifiers and progressively de-anonymizes them:

1. Doc visits from open channels (e.g., Google search) receive a random anonymous ID; VeluAI still records `seen` events against that ID.
2. API calls embed stronger tenant signals (such as `tenant_id` from request metadata), giving VeluAI a way to cluster activity from the same customer.
3. When the anonymous reader later reaches the docs via an authenticated product deep link, VeluAI connects the anonymous profile to the known tenant and backfills attribution for past and future events.

This iterative identity resolution means attribution accuracy improves over time, even without immediate authentication.

## Event Lifecycle

VeluAI models attribution as a sequence of canonical events:

| Event | Trigger | Storage pattern (Redis) |
| --- | --- | --- |
| `note_published` | Release note is published | `tenantId:releaseId:new_api` |
| `note_seen` | User views the release note | `tenantId:releaseId:read` |
| `api_used` | User invokes the advertised capability (e.g., `/bulk_fetch`) | Lookup `tenantId:bulk_fetch:[releaseId]` |
| `engaged` | VeluAI correlates the API usage with a prior note view | Derived, forwarded to analytics |
| `first_used` / `repeat_used` | Mixpanel/PostHog milestone events | `tenantId-releaseId-first_used(time)` etc. |

Redis provides fast correlation between release communications and product telemetry, enabling real-time attribution checks.

## UX Flow and Authoring Experience

Product teams move through a guided journey inside VeluAI:

1. **Draft** – Capture release notes in GitHub or another source.
2. **Impact** – Within VeluAI, authors supply structured metadata about the change:
   - API name
   - Operation type (`new_api`, `added_param`, etc.)
   - Conditional fields (for example, parameter name when "added_param" is selected)
   - VeluAI can pre-populate this form using AI that reads the release draft.
3. **Publish** – VeluAI pushes the signed-off note to the documentation site and starts monitoring adoption.

This workflow ensures every announcement has the metadata needed for attribution before it reaches customers.

## Notifications and Stakeholder Visibility

- **Analytics destinations** – VeluAI forwards time-stamped events (`published`, `seen`, `engaged`, `first_used`, `repeat_used`) to Mixpanel or PostHog, powering executive dashboards.
- **Slackbot** – Teams get proactive updates (for example, "Tenant Nykaa adopted `/bulktransform` within 24 hours of the release note"), keeping engineering, product, and leadership aligned without manual reporting.

## Implementation Checklist

1. **Documentation instrumentation**
   - Add the VeluAI script snippet to GitBook (or your docs platform).
   - Confirm authenticated portals pass user identity to the script; otherwise, allow VeluAI to assign anonymous IDs.
2. **Backend instrumentation**
   - Embed the VeluAI agent in API services that correspond to release announcements.
   - Ensure requests include tenant context so VeluAI can map usage to customers.
3. **Metadata governance**
   - Use the Impact screen to register each change before publication.
   - Standardize API naming to align release notes with telemetry (e.g., `/bulk_fetch`).
4. **Data destinations**
   - Configure Redis for event state tracking.
   - Connect Mixpanel/PostHog and Slack workspaces to receive attribution signals.
5. **Continuous improvement**
   - Review edge cases (multiple entry points, extended anonymous browsing) and refine de-anonymization strategies over time.

## Next Steps

Pilot the end-to-end flow on a single high-impact release. Validate that `seen` events propagate to analytics, the Slackbot surfaces correlated usage, and Redis keys populate as expected. Iterate on identity resolution heuristics for anonymous users, and expand coverage to additional APIs once attribution signals are trustworthy.
