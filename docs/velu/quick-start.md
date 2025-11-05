---
title: Quick Start
description: Complete the Velu onboarding flow and publish your first documentation update.
---

Follow these steps to experience Velu in action within minutes.

## Prerequisites
1. **Fork the documentation repository.** Fork [`aravindc26/my-website`](https://github.com/aravindc26/my-website) into your own GitHub account so Velu can open pull requests against it.
2. **Create your Velu workspace.** Sign up at [app.getvelu.com](https://app.getvelu.com).
3. **Confirm repository access.** Ensure the GitHub account you use in Velu has write permissions on the forked repository and can install OAuth apps.

## 1. Connect Velu to GitHub
1. Sign in at [app.getvelu.com](https://app.getvelu.com).
2. Start the onboarding wizard and choose **Connect GitHub**.
3. Authorize Velu to access your GitHub account when the OAuth prompt appears.
4. After authorization, select your fork of the `my-website` repository from the repository list.

> 💡 Tip: If the repository list is empty, confirm the fork lives under the same account you authorized and that Velu was granted access to “All repositories” or the specific repo.

## 2. Create Your First AI-Assisted Update
1. From the Velu dashboard, click **New update**.
2. In the instruction field, enter a prompt such as: “Write an article on Chennai.”
3. Review the generated draft inside Velu and make any necessary edits before publishing.
4. When you are satisfied with the draft, choose **Create pull request**. Velu will:
   - Commit the draft to a new branch in your fork of the repository.
   - Open a pull request with the newly generated article.
5. Open the pull request in GitHub, review the diff, and click **Merge** to publish the change.

## What Finishing Looks Like
When you merge the pull request that Velu creates in your fork of `my-website`, you’ve completed the onboarding loop—Velu connected to your repo, generated an article, opened a PR, and shipped the changes.

## Troubleshooting
| Scenario | What to Check |
| --- | --- |
| Velu cannot list repositories | Re-run the GitHub connection and grant access to the forked repo. Ensure the repo isn’t private without the correct permission scope. |
| Pull request creation fails | Confirm the target repository allows PRs from the authorized account and that branch protections don’t require additional reviewers. |

You’re now ready to iterate on more complex documentation updates, invite teammates, and expand your connected content sources.
