// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Overview',
      link: {
        type: 'generated-index',
        description: 'Position Velu, highlight differentiators, and surface demo or pricing pathways.',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'Quick Start',
      link: {
        type: 'generated-index',
        description: 'Step-by-step onboarding to configure Velu, connect sources, and run the first assisted workflow.',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'User Guides',
      link: {
        type: 'generated-index',
        description: 'Task-based guidance for technical writers collaborating with Velu across drafting, editing, and analytics.',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'Integrations',
      link: {
        type: 'generated-index',
        description: 'Instructions for connecting Velu to documentation toolchains, repositories, and automation pipelines.',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'Security & Compliance',
      link: {
        type: 'generated-index',
        description: 'Details on Velu\'s data handling, privacy posture, certifications, and incident response.',
      },
      items: [],
    },
    {
      type: 'category',
      label: 'Release Notes',
      link: {
        type: 'generated-index',
        description: 'Chronological updates describing new features, improvements, and deprecations.',
      },
      items: [],
    },
  ],
};

export default sidebars;
