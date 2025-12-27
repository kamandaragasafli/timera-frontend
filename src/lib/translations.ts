export type Language = 'aze' | 'eng' | 'rus';

export interface Translations {
  common: {
    loading: string;
    login: string;
    start: string;
    features: string;
    howItWorks: string;
    faq: string;
    about: string;
    team: string;
    edit: string;
    save: string;
    cancel: string;
    delete: string;
    confirm: string;
    close: string;
  };
  nav: {
    features: string;
    howItWorks: string;
    faq: string;
    about: string;
  };
  hero: {
    tagline: string;
    title: string;
    titleHighlight: string;
    description: string;
    startFree: string;
    howItWorksBtn: string;
    stats24_7: string;
    stats10x: string;
    stats100: string;
  };
  features: {
    title: string;
    subtitle: string;
    aiContentCreator: {
      title: string;
      description: string;
    };
    designVisual: {
      title: string;
      description: string;
    };
    smartScheduling: {
      title: string;
      description: string;
    };
    analytics: {
      title: string;
      description: string;
    };
    videoContent: {
      title: string;
      description: string;
    };
    secure: {
      title: string;
      description: string;
    };
  };
  howItWorks: {
    title: string;
    subtitle: string;
    step1: {
      title: string;
      description: string;
    };
    step2: {
      title: string;
      description: string;
    };
    step3: {
      title: string;
      description: string;
    };
    step4: {
      title: string;
      description: string;
    };
  };
  why: {
    title: string;
    subtitle: string;
    forSMB: {
      title: string;
      description: string;
    };
    faster: {
      title: string;
      description: string;
    };
    realResults: {
      title: string;
      description: string;
    };
    localGlobal: {
      title: string;
      description: string;
    };
    democratic: {
      title: string;
      description: string;
    };
    futureTech: {
      title: string;
      description: string;
    };
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  about: {
    title: string;
    subtitle: string;
    mission: {
      title: string;
      content: string;
    };
    technology: {
      title: string;
      content: string;
    };
    roadmap: {
      title: string;
      content: string;
    };
  };
  team: {
    title: string;
    subtitle: string;
  };
  cta: {
    title: string;
    titleHighlight: string;
    description: string;
    button: string;
    note: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    product: string;
    company: string;
    register: string;
  };
  settings: {
    title: string;
    description: string;
    languagePreferences: {
      title: string;
      description: string;
      interfaceLanguage: string;
      interfaceLanguageDesc: string;
    };
    profile: {
      title: string;
      description: string;
      firstName: string;
      lastName: string;
      email: string;
      companyName: string;
      saveChanges: string;
    };
    companyProfile: {
      title: string;
      description: string;
      edit: string;
      create: string;
      companyName: string;
      industry: string;
      companySize: string;
      style: string;
      website: string;
      businessDescription: string;
      noProfile: string;
      createProfile: string;
      loading: string;
    };
    account: {
      title: string;
      description: string;
      emailVerification: string;
      emailVerificationDesc: string;
      verified: string;
      unverified: string;
      subscriptionPlan: string;
      subscriptionPlanDesc: string;
      upgradePlan: string;
      changePassword: string;
      changePasswordDesc: string;
    };
    notifications: {
      title: string;
      description: string;
      emailNotifications: string;
      emailNotificationsDesc: string;
      postReminders: string;
      postRemindersDesc: string;
      weeklyReports: string;
      weeklyReportsDesc: string;
    };
    legal: {
      title: string;
      description: string;
      privacyPolicy: string;
      privacyPolicyDesc: string;
      termsOfService: string;
      termsOfServiceDesc: string;
      read: string;
    };
    dangerZone: {
      title: string;
      description: string;
      deleteAccount: string;
      deleteAccountDesc: string;
    };
  };
  sidebar: {
    dashboard: string;
    dashboardDesc: string;
    posts: string;
    postsDesc: string;
    calendar: string;
    calendarDesc: string;
    aiContentGenerator: string;
    aiContentGeneratorDesc: string;
    aiTools: string;
    aiToolsDesc: string;
    socialAccounts: string;
    socialAccountsDesc: string;
    analytics: string;
    analyticsDesc: string;
    socialMediaAnalysis: string;
    socialMediaAnalysisDesc: string;
    metaAds: string;
    metaAdsDesc: string;
    brandVoice: string;
    brandVoiceDesc: string;
    templates: string;
    templatesDesc: string;
    settings: string;
    settingsDesc: string;
    pending: string;
    personalAccount: string;
    plan: string;
    free: string;
    profile: string;
    billing: string;
    logout: string;
  };
  dashboard: {
    welcomeBack: string;
    description: string;
    postsWaiting: string;
    postsWaitingDesc: string;
    reviewApprove: string;
    getStarted: string;
    getStartedDesc: string;
    startGenerator: string;
    postsCreated: string;
    postsCreatedDesc: string;
    aiGenerated: string;
    pendingApproval: string;
    pendingApprovalDesc: string;
    approved: string;
    scheduledPosts: string;
    scheduledPostsDesc: string;
    published: string;
    quickActions: string;
    quickActionsDesc: string;
    createNewPost: string;
    connectSocial: string;
    viewCalendar: string;
    accountInfo: string;
    email: string;
    company: string;
    notSpecified: string;
    plan: string;
    emailVerified: string;
    verified: string;
    notVerified: string;
  };
  posts: {
    title: string;
    description: string;
    createWithAI: string;
    brandingActive: string;
    brandingActiveDesc: string;
    brandingWarning: string;
    brandingWarningDesc: string;
    uploadLogo: string;
    totalPosts: string;
    published: string;
    scheduled: string;
    approved: string;
    loading: string;
    noPosts: string;
    noPostsDesc: string;
    startWithAI: string;
    statusPublished: string;
    statusScheduled: string;
    statusApproved: string;
    statusPending: string;
    statusFailed: string;
    statusDraft: string;
    branded: string;
    applyBranding: string;
    applyingBranding: string;
    clickToEnlarge: string;
    imageNotLoading: string;
    noImage: string;
    publishToFacebook: string;
    publishToInstagram: string;
    publishToLinkedIn: string;
    deleteConfirm: string;
    publishedAt: string;
    scheduledAt: string;
    createdAt: string;
    closeModal: string;
    closeModalDesc: string;
    successPublishedFacebook: string;
    successPublishedInstagram: string;
    successPublishedLinkedIn: string;
    successBrandingApplied: string;
    errorPublishFacebook: string;
    errorPublishInstagram: string;
    errorPublishLinkedIn: string;
    errorBranding: string;
  };
  calendar: {
    title: string;
    description: string;
    loading: string;
    optimalTiming: string;
    optimalTimingDesc: string;
    noPosts: string;
    noPostsDesc: string;
    untitled: string;
  };
  aiContentGenerator: {
    title: string;
    description: string;
    loading: string;
  };
  aiTools: {
    title: string;
    description: string;
    contentGenerator: string;
    contentGeneratorDesc: string;
    hashtagGenerator: string;
    hashtagGeneratorDesc: string;
    captionOptimizer: string;
    captionOptimizerDesc: string;
    imageGenerator: string;
    imageGeneratorDesc: string;
    comingSoon: string;
    trendAnalyzer: string;
    trendAnalyzerDesc: string;
    competitorAnalysis: string;
    competitorAnalysisDesc: string;
    logoSloganGenerator: string;
    logoSloganGeneratorDesc: string;
    adCreativeGenerator: string;
    adCreativeGeneratorDesc: string;
    videoGenerator: string;
    videoGeneratorDesc: string;
    promptPlaceholder: string;
    generate: string;
    generating: string;
    productName: string;
    productDescription: string;
    generateLogoSlogan: string;
    saving: string;
    saveToProfile: string;
    saved: string;
  };
  socialAccounts: {
    title: string;
    description: string;
    loading: string;
    connect: string;
    connecting: string;
    connected: string;
    disconnect: string;
    disconnecting: string;
    noAccounts: string;
    noAccountsDesc: string;
    errorLoading: string;
    loginRequired: string;
    lastUsed: string;
    never: string;
    active: string;
    inactive: string;
    disconnectConfirm: string;
  };
  analytics: {
    title: string;
    description: string;
    loading: string;
    noData: string;
    impressions: string;
    reach: string;
    clicks: string;
    spend: string;
    cpm: string;
    cpc: string;
    ctr: string;
    conversions: string;
    dateRange: string;
    selectAccount: string;
    refresh: string;
    download: string;
  };
  metaAds: {
    title: string;
    description: string;
    loading: string;
    connectAccount: string;
    noAccounts: string;
    noAccountsDesc: string;
    campaigns: string;
    adSets: string;
    ads: string;
    createCampaign: string;
    active: string;
    paused: string;
    archived: string;
  };
  brandVoice: {
    title: string;
    description: string;
    professional: string;
    casual: string;
    inspirational: string;
    industry: string;
    targetAudience: string;
    customInstructions: string;
    default: string;
    usageCount: string;
    samplePost: string;
    select: string;
  };
  templates: {
    title: string;
    description: string;
    all: string;
    announcement: string;
    educational: string;
    promotional: string;
    engagement: string;
    search: string;
    useTemplate: string;
    usageCount: string;
    platforms: string;
    variables: string;
  };
  share: {
    share: string;
    sharePost: string;
    selectPlatform: string;
    shareOnFacebook: string;
    shareOnLinkedIn: string;
    shareOnInstagram: string;
    selectInstagramType: string;
    instagramFeed: string;
    instagramStories: string;
    shareOnTikTok: string;
    shareOnYouTube: string;
    copyLink: string;
    copyContent: string;
    linkCopied: string;
    contentCopied: string;
    textCopied: string;
    instagramTextPaste: string;
    downloadImage: string;
    downloaded: string;
    manualActions: string;
    instructions: string;
    instagramInstructions: string;
    tiktokInstructions: string;
    youtubeInstructions: string;
      metaBusinessTitle: string;
      metaBusinessId: string;
      metaAssetId: string;
      metaBusinessOpen: string;
      metaBusinessRequired: string;
      linkedInSelectPage: string;
      linkedInSelectPageDesc: string;
      linkedInPersonalAccount: string;
      linkedInPersonalDesc: string;
      linkedInCompanyPage: string;
      linkedInPublished: string;
      linkedInError: string;
  };
}

const translations: Record<Language, Translations> = {
  eng: {
    common: {
      loading: 'Loading...',
      login: 'Login',
      start: 'Start',
      features: 'Features',
      howItWorks: 'How It Works',
      faq: 'FAQ',
      about: 'About',
      team: 'Team',
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      confirm: 'Confirm',
      close: 'Close',
    },
    nav: {
      features: 'Features',
      howItWorks: 'How It Works',
      faq: 'FAQ',
      about: 'About',
    },
    hero: {
      tagline: '🚀 The Future is Here with Artificial Intelligence',
      title: 'Artificial Intelligence',
      titleHighlight: 'That Understands Your Brand',
      description: 'Timera.ai is an AI-powered social media management platform. Content creation, scheduling, design, and analytics — all in one place, fully automated.',
      startFree: 'Start Free',
      howItWorksBtn: 'How It Works?',
      stats24_7: '24/7 AI Assistant',
      stats10x: '10x Faster Content',
      stats100: '100% Automation',
    },
    features: {
      title: 'What Does Timera.ai Do?',
      subtitle: 'The new era of social media management with artificial intelligence',
      aiContentCreator: {
        title: 'AI Content Creator',
        description: 'Text and visual content tailored to your brand is created fully automatically. You can edit any part you want.',
      },
      designVisual: {
        title: 'Design & Visual',
        description: 'AI creates designs and visuals that match your brand style. Logo, colors, and tone are automatically analyzed.',
      },
      smartScheduling: {
        title: 'Smart Scheduling',
        description: 'Post timing and strategy are automatically configured. Optimal time selection is done by AI.',
      },
      analytics: {
        title: 'Analytics & Reports',
        description: 'Real-time analytics and performance measurement. AI suggests the next strategy.',
      },
      videoContent: {
        title: 'Video Content',
        description: 'Automated video posts tailored to your brand. Video content preparation is fully automated.',
      },
      secure: {
        title: 'Secure & Legal',
        description: 'Official API integrations and SSL encryption. No personal data is stored.',
      },
    },
    howItWorks: {
      title: 'How It Works?',
      subtitle: 'Automate your social media marketing in 4 simple steps',
      step1: {
        title: 'Enter Information',
        description: 'Provide information about your brand, product, and goals. AI learns everything.',
      },
      step2: {
        title: 'AI Creates Content',
        description: 'Post topics, text, and visual content are automatically prepared.',
      },
      step3: {
        title: 'Approve & Edit',
        description: 'Edit any part you want and approve posts.',
      },
      step4: {
        title: 'Automatic Publishing',
        description: 'The system publishes posts and analyzes results.',
      },
    },
    why: {
      title: 'Why Timera.ai?',
      subtitle: 'Because being active on social media is no longer a luxury, it\'s a necessity',
      forSMB: {
        title: 'For SMBs & Startups',
        description: 'Manage your social media without needing additional human resources. Eliminate SMM specialist and agency costs.',
      },
      faster: {
        title: '10x Faster',
        description: 'Build your marketing strategy 10 times more efficiently with AI. Save time, focus on creativity.',
      },
      realResults: {
        title: 'Real Results',
        description: 'Measure real results with analytics reports. You will feel the difference in the first month.',
      },
      localGlobal: {
        title: 'Local & Global',
        description: 'A platform that understands the Azerbaijani market and works to world standards. Suitable for both local and global markets.',
      },
      democratic: {
        title: 'Democratic Marketing',
        description: 'We make digital marketing accessible to everyone. Every business can easily manage its brand.',
      },
      futureTech: {
        title: 'Future Technology',
        description: 'The combination of Generative AI, Machine Learning, and Vision AI technologies. Artificial intelligence frees up time for creative thinking.',
      },
    },
    faq: {
      title: '❓ Frequently Asked Questions',
      subtitle: 'Everything you want to know about Timera.ai',
      items: [
        {
          question: '🧠 What does Timera.ai do and how does it work?',
          answer: 'Timera.ai is an artificial intelligence-based social media management tool. The platform automates post creation, scheduling, design, video content preparation, analytics reports, and even Meta Ads (Facebook and Instagram ad campaigns) management. Just enter your brand information – AI will do the rest for you.',
        },
        {
          question: '✍️ Does AI create content completely by itself, or can I edit it?',
          answer: 'Timera.ai creates content fully automatically – both text, visual, and video formats. However, users can edit and customize any part they want. This approach combines the speed of AI with the flexibility of human creativity.',
        },
        {
          question: '🔒 How does Timera.ai protect my data?',
          answer: 'Data security is a priority for Timera.ai. Users\' social media accounts are connected through official API integrations and no personal data is stored on servers. All data transfers are carried out in a fully legal and encrypted (SSL) manner.',
        },
        {
          question: '👤 Who is Timera.ai designed for?',
          answer: 'Timera.ai is designed for anyone who wants to promote their brand on social media, gain customers, and increase sales. This is especially an ideal solution for Small and Medium Businesses (SMBs), Startups, SMM specialists and marketers, Freelance designers and agencies.',
        },
        {
          question: '💻 What devices does Timera.ai work on?',
          answer: 'Timera.ai is a fully web-based platform – meaning no software installation is required. Just type timera.az in your browser. The platform works with the same efficiency on computers, tablets, and mobile devices.',
        },
        {
          question: '🔮 What does Timera.ai plan for the future?',
          answer: 'By 2026, Timera.ai plans to add several new features: AI Video Generator – automated video posts tailored to your brand, AI Chatbot Assistant – a helper that gives users social media advice, and Mobile app (iOS and Android) – content management from anywhere. Our goal is to become the first global AI marketing platform from Azerbaijan\'s technology market.',
        },
        {
          question: '🚀 How quickly does Timera.ai show results?',
          answer: 'In the first month, AI learns your potential customer base and optimizes your posts. After 1 month, you will clearly feel the difference of more consistent content flow, more stable follower reactions, and less time, more results.',
        },
        {
          question: '🧩 How is Timera.ai different from other social media tools?',
          answer: 'The biggest difference – Timera.ai doesn\'t just schedule content, it understands the brand and that brand\'s customers. Other tools just make posting easier, while Timera.ai creates text, design, and strategy together with AI. So this is not just a "post scheduler" – it\'s a real AI marketing manager that works for you.',
        },
      ],
    },
    about: {
      title: '🧠 About Timera.ai',
      subtitle: 'The new era of social media management with artificial intelligence',
      mission: {
        title: '💡 Our Mission',
        content: 'Our goal is to make digital marketing accessible to everyone. We bring AI technology to everyone from giant corporations to SMBs. Through Timera.ai, every business can easily manage its brand, content creation with AI becomes faster and more efficient, and a digital revolution occurs in the Azerbaijani and regional market. We believe that artificial intelligence does not replace creative thinking – it just frees up its time.',
      },
      technology: {
        title: '⚙️ Technology',
        content: 'Timera.ai combines Generative AI, Machine Learning, and Vision AI technologies. The platform analyzes your logo, brand colors, tone, and goals, working as if you had a real designer and marketing specialist on your team. Our AI: • Learns brand identity and communication tone • Conducts trend analyses and creates appropriate content • Prepares visual briefs for each post So, Timera.ai is not just a system that writes posts – it\'s an artificial intelligence that understands your brand.',
      },
      roadmap: {
        title: '📈 Current Stage and Future Plans',
        content: 'Currently, Timera.ai is in the MVP stage and will be released as a trial version in the local market in November 2025. By 2026, our plan: • 🌍 Expansion to regional markets (Turkey, Kazakhstan, Georgia, Uzbekistan) • 🌐 Recognition as an AI marketing tool in the global SaaS market • 🦄 Becoming the first AI unicorn from Azerbaijan Goal: To become the first global AI marketing platform from Azerbaijan\'s technology market.',
      },
    },
    team: {
      title: '👥 Our Team',
      subtitle: 'The region\'s first AI marketing team combining technology and marketing',
    },
    cta: {
      title: 'Join the AI Revolution',
      titleHighlight: 'of Your Social Media Marketing',
      description: 'Get to know the artificial intelligence that understands your brand. Feel the difference in the first month. Start free!',
      button: '🚀 Start Free Now',
      note: 'No credit card required • Ready in 5 minutes • 24/7 support',
    },
    footer: {
      tagline: 'Artificial Intelligence That Understands Your Brand',
      copyright: '© 2025 Timera.ai. All rights reserved.',
      product: 'Product',
      company: 'Company',
      register: 'Register',
    },
    settings: {
      title: 'Settings',
      description: 'Manage your account preferences and configuration',
      languagePreferences: {
        title: 'Language Preferences',
        description: 'Choose your preferred language for the interface',
        interfaceLanguage: 'Interface Language',
        interfaceLanguageDesc: 'Select the language for all menus, buttons, and interface elements',
      },
      profile: {
        title: 'Profile Information',
        description: 'Update your personal information and account details',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        companyName: 'Company Name',
        saveChanges: 'Save Changes',
      },
      companyProfile: {
        title: 'Company Profile',
        description: 'Manage your company information for AI content',
        edit: 'Edit',
        create: 'Create',
        companyName: 'Company Name',
        industry: 'Industry',
        companySize: 'Company Size',
        style: 'Style',
        website: 'Website',
        businessDescription: 'Business Description',
        noProfile: 'No company profile created yet',
        createProfile: 'Create Company Profile',
        loading: 'Loading...',
      },
      account: {
        title: 'Account Settings',
        description: 'Manage your account preferences and security',
        emailVerification: 'Email Verification',
        emailVerificationDesc: 'Verify your email address to secure your account',
        verified: 'Verified',
        unverified: 'Unverified',
        subscriptionPlan: 'Subscription Plan',
        subscriptionPlanDesc: 'Current plan: {plan}',
        upgradePlan: 'Upgrade Plan',
        changePassword: 'Change Password',
        changePasswordDesc: 'Update your account password',
      },
      notifications: {
        title: 'Notifications',
        description: 'Configure how you want to receive notifications',
        emailNotifications: 'Email Notifications',
        emailNotificationsDesc: 'Receive updates about your posts and account',
        postReminders: 'Post Reminders',
        postRemindersDesc: 'Get reminded about scheduled posts',
        weeklyReports: 'Weekly Reports',
        weeklyReportsDesc: 'Receive weekly performance summaries',
      },
      legal: {
        title: 'Legal Documents',
        description: 'Privacy policy and terms of service',
        privacyPolicy: 'Privacy Policy',
        privacyPolicyDesc: 'Learn about how your data is collected and used',
        termsOfService: 'Terms of Service',
        termsOfServiceDesc: 'Rules and conditions for using the platform',
        read: 'Read',
      },
      dangerZone: {
        title: 'Danger Zone',
        description: 'Irreversible actions that affect your account',
        deleteAccount: 'Delete Account',
        deleteAccountDesc: 'Permanently delete your account and all data',
      },
    },
    sidebar: {
      dashboard: 'Dashboard',
      dashboardDesc: 'Overview and statistics',
      posts: 'Posts',
      postsDesc: 'Create and manage posts',
      calendar: 'Calendar',
      calendarDesc: 'Schedule content',
      aiContentGenerator: 'AI Content Generator',
      aiContentGeneratorDesc: 'Generate monthly posts',
      aiTools: 'AI Tools',
      aiToolsDesc: 'Content creation',
      socialAccounts: 'Social Accounts',
      socialAccountsDesc: 'Connected platforms',
      analytics: 'Analytics',
      analyticsDesc: 'Performance data',
      socialMediaAnalysis: 'Social Media Analysis',
      socialMediaAnalysisDesc: 'Profile and content analysis',
      metaAds: 'Meta Ads',
      metaAdsDesc: 'Ad campaigns',
      brandVoice: 'Brand Voice',
      brandVoiceDesc: 'AI personality settings',
      templates: 'Templates',
      templatesDesc: 'Content templates',
      settings: 'Settings',
      settingsDesc: 'Account settings',
      pending: 'Pending',
      personalAccount: 'Personal Account',
      plan: 'Plan',
      free: 'Free',
      profile: 'Profile',
      billing: 'Billing',
      logout: 'Logout',
    },
    dashboard: {
      welcomeBack: 'Welcome back, {name}!',
      description: 'Manage your social media presence with AI-powered tools',
      postsWaiting: 'Posts Waiting for Approval',
      postsWaitingDesc: 'You have {count} AI-generated posts waiting for your review',
      reviewApprove: 'Review & Approve Posts',
      getStarted: 'Get Started with AI Content Generation',
      getStartedDesc: 'Set up your company profile to generate 10 engaging posts in Azerbaijani language',
      startGenerator: 'Start AI Content Generator',
      postsCreated: 'Posts Created',
      postsCreatedDesc: 'Total posts in your account',
      aiGenerated: 'AI generated',
      pendingApproval: 'Pending Approval',
      pendingApprovalDesc: 'Posts waiting for review',
      approved: 'approved',
      scheduledPosts: 'Scheduled Posts',
      scheduledPostsDesc: 'Posts ready to publish',
      published: 'published',
      quickActions: 'Quick Actions',
      quickActionsDesc: 'Get started with these common tasks',
      createNewPost: 'Create New Post',
      connectSocial: 'Connect Social Account',
      viewCalendar: 'View Calendar',
      accountInfo: 'Account Information',
      email: 'Email',
      company: 'Company',
      notSpecified: 'Not specified',
      plan: 'Plan',
      emailVerified: 'Email Verified',
      verified: '✅ Verified',
      notVerified: '❌ Not verified',
    },
    posts: {
      title: 'Posts',
      description: 'Manage and schedule your social media posts',
      createWithAI: 'Create with AI',
      brandingActive: '🎨 Automatic branding is active',
      brandingActiveDesc: 'Your logo will be automatically added to new AI-generated images',
      brandingWarning: '⚠️ Branding is active, but logo is not uploaded',
      brandingWarningDesc: 'Upload logo for branding to work',
      uploadLogo: 'upload logo',
      totalPosts: 'Total Posts',
      published: 'Published',
      scheduled: 'Scheduled',
      approved: 'Approved',
      loading: 'Loading...',
      noPosts: 'No posts yet',
      noPostsDesc: 'Use AI to create your first post or write manually',
      startWithAI: 'Start with AI',
      statusPublished: 'Published',
      statusScheduled: 'Scheduled',
      statusApproved: 'Approved',
      statusPending: 'Pending',
      statusFailed: 'Failed',
      statusDraft: 'Draft',
      branded: 'Branded',
      applyBranding: 'Apply Branding',
      applyingBranding: 'Applying...',
      clickToEnlarge: 'Click to enlarge',
      imageNotLoading: 'Image not loading',
      noImage: 'No image',
      publishToFacebook: 'Publish to Facebook',
      publishToInstagram: 'Publish to Instagram',
      publishToLinkedIn: 'Publish to LinkedIn',
      deleteConfirm: 'Are you sure you want to delete this post?',
      publishedAt: 'Published',
      scheduledAt: 'Scheduled',
      createdAt: 'Created',
      closeModal: 'Close',
      closeModalDesc: 'Press ESC to close or click outside',
      successPublishedFacebook: '✅ Successfully published to Facebook!',
      successPublishedInstagram: '✅ Successfully published to Instagram!',
      successPublishedLinkedIn: '✅ Successfully published to LinkedIn!',
      successBrandingApplied: '✅ Branding successfully applied!',
      errorPublishFacebook: '❌ Facebook publishing failed',
      errorPublishInstagram: '❌ Instagram publishing failed',
      errorPublishLinkedIn: '❌ LinkedIn publishing failed',
      errorBranding: 'Branding could not be applied',
    },
    share: {
      share: 'Share',
      sharePost: 'Share Post',
      selectPlatform: 'Select platform',
      shareOnFacebook: 'Share on Facebook',
      shareOnLinkedIn: 'Share on LinkedIn',
      shareOnInstagram: 'Share on Instagram',
      selectInstagramType: 'Select Instagram type',
      instagramFeed: 'Feed',
      instagramStories: 'Stories',
      shareOnTikTok: 'Share on TikTok',
      shareOnYouTube: 'Share on YouTube',
      copyLink: 'Copy Link',
      copyContent: 'Copy Content',
      linkCopied: 'Link copied!',
      contentCopied: 'Content copied!',
      textCopied: 'Text copied!',
      instagramTextPaste: 'After uploading the image on Instagram, paste the text in the caption field (Ctrl+V / Cmd+V)',
      downloadImage: 'Download Image',
      downloaded: 'Downloaded!',
      manualActions: 'Manual Actions',
      instructions: 'Instructions:',
      instagramInstructions: 'Image downloaded and text copied. Upload the image on Instagram and paste the text.',
      tiktokInstructions: 'Image downloaded and text copied. Upload the video/image on TikTok and paste the text.',
      youtubeInstructions: 'Text copied. Upload your video on YouTube Studio and paste the text in the description.',
      metaBusinessTitle: 'Meta Business Suite Configuration',
      metaBusinessId: 'Business ID',
      metaAssetId: 'Asset ID (Page ID)',
      metaBusinessOpen: 'Open Meta Business Suite',
      metaBusinessRequired: 'Please enter Business ID and Asset ID',
      linkedInSelectPage: 'Select LinkedIn Page',
      linkedInSelectPageDesc: 'Which LinkedIn page do you want to share to?',
      linkedInPersonalAccount: 'Personal Account',
      linkedInPersonalDesc: 'My personal profile',
      linkedInCompanyPage: 'Company Page',
      linkedInPublished: 'Published on LinkedIn!',
      linkedInError: 'LinkedIn publishing error',
    },
    calendar: {
      title: 'Calendar',
      description: 'Schedule and manage your content calendar',
      loading: 'Loading...',
      optimalTiming: 'Optimal Posting Times',
      optimalTimingDesc: 'AI-recommended best times to post for maximum engagement',
      noPosts: 'No posts scheduled',
      noPostsDesc: 'Create posts to see them on your calendar',
      untitled: 'Untitled',
    },
    aiContentGenerator: {
      title: 'AI Content Generator',
      description: 'Generate engaging social media posts with AI',
      loading: 'Loading...',
    },
    aiTools: {
      title: 'AI Tools',
      description: 'Leverage AI to create better social media content',
      contentGenerator: 'Content Generator',
      contentGeneratorDesc: 'Generate engaging posts with AI',
      hashtagGenerator: 'Hashtag Generator',
      hashtagGeneratorDesc: 'Find trending hashtags for your posts',
      captionOptimizer: 'Caption Optimizer',
      captionOptimizerDesc: 'Improve your captions for better engagement',
      imageGenerator: 'Image Generator',
      imageGeneratorDesc: 'Create images with AI (Coming Soon)',
      comingSoon: 'Coming Soon',
      trendAnalyzer: 'Trend Analyzer',
      trendAnalyzerDesc: 'Analyze trending topics in your industry',
      competitorAnalysis: 'Competitor Analysis',
      competitorAnalysisDesc: 'Analyze competitor content strategies',
      logoSloganGenerator: 'Logo & Slogan Generator',
      logoSloganGeneratorDesc: 'Create professional logo and slogan with AI',
      adCreativeGenerator: 'Ad Creative Generator',
      adCreativeGeneratorDesc: 'Create professional marketing visuals with AI',
      videoGenerator: 'Video Generator',
      videoGeneratorDesc: 'Create professional videos with AI using Kling Video',
      promptPlaceholder: 'e.g., Our new product launch, industry trends, company culture...',
      generate: 'Generate Content',
      generating: 'Generating...',
      productName: 'Product Name',
      productDescription: 'Product Description',
      generateLogoSlogan: 'Generate Logo & Slogan',
      saving: 'Saving...',
      saveToProfile: 'Save to Company Profile',
      saved: 'Saved!',
    },
    socialAccounts: {
      title: 'Social Accounts',
      description: 'Connect and manage your social media accounts',
      loading: 'Loading...',
      connect: 'Connect',
      connecting: 'Connecting...',
      connected: 'Connected',
      disconnect: 'Disconnect',
      disconnecting: 'Disconnecting...',
      noAccounts: 'No accounts connected',
      noAccountsDesc: 'Connect your social media accounts to start publishing',
      errorLoading: 'Error loading accounts',
      loginRequired: 'Login required. Please log in again.',
      lastUsed: 'Last used',
      never: 'Never',
      active: 'Active',
      inactive: 'Inactive',
      disconnectConfirm: 'Are you sure you want to disconnect this account?',
    },
    analytics: {
      title: 'Analytics',
      description: 'Track your social media performance',
      loading: 'Loading...',
      noData: 'No data available',
      impressions: 'Impressions',
      reach: 'Reach',
      clicks: 'Clicks',
      spend: 'Spend',
      cpm: 'CPM',
      cpc: 'CPC',
      ctr: 'CTR',
      conversions: 'Conversions',
      dateRange: 'Date Range',
      selectAccount: 'Select Account',
      refresh: 'Refresh',
      download: 'Download',
    },
    metaAds: {
      title: 'Meta Ads',
      description: 'Manage your Facebook and Instagram ad campaigns',
      loading: 'Loading...',
      connectAccount: 'Connect Ad Account',
      noAccounts: 'No ad accounts connected',
      noAccountsDesc: 'Connect your Meta ad account to manage campaigns',
      campaigns: 'Campaigns',
      adSets: 'Ad Sets',
      ads: 'Ads',
      createCampaign: 'Create Campaign',
      active: 'Active',
      paused: 'Paused',
      archived: 'Archived',
    },
    brandVoice: {
      title: 'Brand Voice',
      description: 'Configure AI personality settings for your brand',
      professional: 'Professional',
      casual: 'Casual',
      inspirational: 'Inspirational',
      industry: 'Industry',
      targetAudience: 'Target Audience',
      customInstructions: 'Custom Instructions',
      default: 'Default',
      usageCount: 'Usage Count',
      samplePost: 'Sample Post',
      select: 'Select',
    },
    templates: {
      title: 'Templates',
      description: 'Content templates for quick post creation',
      all: 'All',
      announcement: 'Announcement',
      educational: 'Educational',
      promotional: 'Promotional',
      engagement: 'Engagement',
      search: 'Search templates...',
      useTemplate: 'Use Template',
      usageCount: 'Usage',
      platforms: 'Platforms',
      variables: 'Variables',
    },
  },
  aze: {
    common: {
      loading: 'Yüklənir...',
      login: 'Giriş',
      start: 'Başla',
      features: 'Xüsusiyyətlər',
      howItWorks: 'Necə İşləyir',
      faq: 'FAQ',
      about: 'Haqqımızda',
      team: 'Komanda',
      edit: 'Redaktə Et',
      save: 'Saxla',
      cancel: 'Ləğv et',
      delete: 'Sil',
      confirm: 'Təsdiq et',
      close: 'Bağla',
    },
    nav: {
      features: 'Xüsusiyyətlər',
      howItWorks: 'Necə İşləyir',
      faq: 'FAQ',
      about: 'Haqqımızda',
    },
    hero: {
      tagline: '🚀 Süni İntellektlə Gələcək Buradadır',
      title: 'Brendinizi Anlayan',
      titleHighlight: 'Süni İntellekt',
      description: 'Timera.ai — AI əsaslı sosial media idarəetmə platformasıdır. Kontent yaradılması, planlaşdırma, dizayn və analitik — hamısı bir yerdə, tam avtomatlaşdırılmış.',
      startFree: 'Pulsuz Başlayın',
      howItWorksBtn: 'Necə İşləyir?',
      stats24_7: 'Yorulmayan AI Asistan',
      stats10x: 'Daha Sürətli Kontent',
      stats100: 'Avtomatlaşdırma',
    },
    features: {
      title: 'Timera.ai Nə Edir?',
      subtitle: 'Süni intellektlə sosial media idarəçiliyinin yeni dövrü',
      aiContentCreator: {
        title: 'AI Kontent Yaradıcısı',
        description: 'Brendinizə uyğun mətn və vizual kontent tam avtomatik yaradılır. Siz istədiyi hissəni redaktə edə bilərsiniz.',
      },
      designVisual: {
        title: 'Dizayn & Vizual',
        description: 'AI brend stilinizə uyğun dizayn və vizuallar hazırlayır. Loqo, rəng və ton avtomatik təhlil edilir.',
      },
      smartScheduling: {
        title: 'Ağıllı Planlaşdırma',
        description: 'Paylaşımların vaxtı və strategiya avtomatik qurulur. Optimal vaxt seçimi AI tərəfindən aparılır.',
      },
      analytics: {
        title: 'Analitik & Hesabat',
        description: 'Real vaxt analitikası və nəticə ölçümü. AI növbəti strategiyanı təklif edir.',
      },
      videoContent: {
        title: 'Video Kontent',
        description: 'Markaya uyğun avtomatik video postlar. Video kontent hazırlığı tam avtomatlaşdırılmış.',
      },
      secure: {
        title: 'Təhlükəsiz & Qanuni',
        description: 'Rəsmi API inteqrasiyaları və SSL şifrələmə. Heç bir şəxsi məlumat saxlanılmır.',
      },
    },
    howItWorks: {
      title: 'Necə İşləyir?',
      subtitle: '4 sadə addımda sosial media marketinqinizi avtomatlaşdırın',
      step1: {
        title: 'Məlumat Daxil Edin',
        description: 'Brend, məhsul və məqsəd barədə məlumat verin. AI hər şeyi öyrənir.',
      },
      step2: {
        title: 'AI Kontent Yaradır',
        description: 'Post mövzuları, mətn və vizual kontent avtomatik hazırlanır.',
      },
      step3: {
        title: 'Təsdiq & Redaktə',
        description: 'İstənilən hissəni redaktə edin və paylaşımları təsdiq edin.',
      },
      step4: {
        title: 'Avtomatik Yayım',
        description: 'Sistem paylaşımları yayımlayır və nəticələri analiz edir.',
      },
    },
    why: {
      title: 'Niyə Timera.ai?',
      subtitle: 'Çünki sosial mediada aktiv olmaq artıq lüks yox, zərurətdir',
      forSMB: {
        title: 'KOB & Startuplar Üçün',
        description: 'Əlavə insan resursuna ehtiyac duymadan sosial medianızı idarə edin. SMM mütəxəssisi və agentlik xərclərindən qurtulun.',
      },
      faster: {
        title: '10x Daha Sürətli',
        description: 'AI ilə marketinq strategiyanızı 10 qat daha səmərəli qurun. Vaxtınıza qənaət edin, kreativliyə fokuslanın.',
      },
      realResults: {
        title: 'Real Nəticələr',
        description: 'Analitik hesabatlarla real nəticələri ölçün. İlk 1 ayda fərqi hiss edəcəksiniz.',
      },
      localGlobal: {
        title: 'Lokal & Qlobal',
        description: 'Azərbaycan bazarını anlayan, dünya standartlarında çalışan platform. Həm lokal, həm də qlobal bazarlara uyğun.',
      },
      democratic: {
        title: 'Demokratik Marketinq',
        description: 'Rəqəmsal marketinqi hamı üçün əlçatan edirik. Hər biznes öz brendini asanlıqla idarə edə bilir.',
      },
      futureTech: {
        title: 'Gələcək Texnologiya',
        description: 'Generative AI, Machine Learning və Vision AI texnologiyalarının birləşməsi. Süni intellekt yaradıcı düşüncənin vaxtını azad edir.',
      },
    },
    faq: {
      title: '❓ Tez-tez Verilən Suallar',
      subtitle: 'Timera.ai haqqında bilmək istədiyiniz hər şey',
      items: [
        {
          question: '🧠 Timera.ai nə edir və necə işləyir?',
          answer: 'Timera.ai – süni intellekt əsaslı sosial media idarəetmə alətidir. Platforma post yaradılması, planlaşdırma, dizayn, video kontent hazırlığı, analitik hesabatlar və hətta Meta Ads (Facebook və Instagram reklam kampaniyaları) idarəsini avtomatlaşdırır. Sadəcə brend məlumatlarını daxil edin – qalan hər işi AI sizin yerinizə görəcək.',
        },
        {
          question: '✍️ AI kontenti tam özü yaradır, yoxsa mən redaktə edə bilərəm?',
          answer: 'Timera.ai kontenti tam avtomatik yaradır – həm mətn, həm vizual, həm də video formatda. Ancaq istifadəçi istədiyi istənilən hissəni redaktə edə və fərdiləşdirə bilər. Bu yanaşma AI-in sürətini və insan yaradıcılığının çevikliyini birləşdirir.',
        },
        {
          question: '🔒 Timera.ai məlumatlarımı necə qoruyur?',
          answer: 'Məlumat təhlükəsizliyi Timera.ai üçün prioritetdir. İstifadəçilərin sosial media hesabları rəsmi API inteqrasiyaları vasitəsilə qoşulur və heç bir şəxsi məlumat serverlərdə saxlanılmır. Bütün məlumat ötürmələri tam qanuni və şifrələnmiş (SSL) şəkildə həyata keçirilir.',
        },
        {
          question: '👤 Timera.ai kimlər üçün nəzərdə tutulub?',
          answer: 'Timera.ai – sosial mediadan brendini tanıtmaq, müştəri qazanmaq və satışlarını artırmaq istəyən hər kəs üçün hazırlanıb. Bu, xüsusilə Kiçik və Orta Bizneslər (KOB), Startuplar, SMM mütəxəssisləri və marketoloqlar, Freelancer dizayner və agentliklər üçün ideal həlldir.',
        },
        {
          question: '💻 Timera.ai hansı cihazlarda işləyir?',
          answer: 'Timera.ai tam web əsaslı platformadır — yəni heç bir proqram yükləməyə ehtiyac yoxdur. Sadəcə brauzerə timera.az yazmaq kifayətdir. Platforma kompüter, planşet və mobil cihazlarda eyni səmərəliliklə işləyir.',
        },
        {
          question: '🔮 Timera.ai gələcəkdə nələri planlaşdırır?',
          answer: '2026-cı ilə qədər Timera.ai bir neçə yeni xüsusiyyət əlavə etməyi planlaşdırır: AI Video Generator – markaya uyğun avtomatik video postlar, AI Chatbot Asistan – istifadəçilərə sosial media məsləhətləri verən köməkçi, və Mobil tətbiq (iOS və Android) – istənilən yerdən kontent idarəçiliyi. Məqsədimiz Azərbaycanın texnoloji bazarından çıxan ilk qlobal AI marketing platforması olmaqdır.',
        },
        {
          question: '🚀 Timera.ai nə qədər vaxtda nəticə göstərir?',
          answer: 'İlk 1 ay ərzində AI sizin potensiyal müştəri bazanızı öyrənir və paylaşımlarınızı optimallaşdırır. 1 ay sonra isə siz daha ardıcıl kontent axını, daha sabit izləyici reaksiyası və az vaxt, çox nəticə fərqini açıq şəkildə hiss edirsiniz.',
        },
        {
          question: '🧩 Timera.ai digər sosial media alətlərindən nə ilə fərqlənir?',
          answer: 'Ən böyük fərq — Timera.ai yalnız kontent planlaşdırmır, brendi və o brendin müştərilərini anlayır. Digər alətlər sadəcə paylaşımı asanlaşdırır, Timera.ai isə AI ilə mətn, dizayn və strategiyanı birlikdə yaradır. Yəni bu sadəcə "post scheduler" deyil — sənin yerinə işləyən real süni intellektli marketinq meneceridir.',
        },
      ],
    },
    about: {
      title: '🧠 Timera.ai Haqqında',
      subtitle: 'Süni intellektlə sosial media idarəçiliyinin yeni dövrü',
      mission: {
        title: '💡 Missiyamız',
        content: 'Bizim məqsədimiz rəqəmsal marketinqi hamı üçün əlçatan etməkdir. AI texnologiyasını nəhəng korporasiyalardan KOB-lara qədər hər kəsin xidmətinə gətiririk. Timera.ai sayəsində hər biznes öz brendini asanlıqla idarə edə bilir, AI ilə kontent yaratma daha sürətli və səmərəli olur, və Azərbaycan və region bazarında rəqəmsal inqilab baş verir. Biz inanırıq ki, süni intellekt yaradıcı düşüncəni əvəz etmir — sadəcə onun vaxtını azad edir.',
      },
      technology: {
        title: '⚙️ Texnologiya',
        content: 'Timera.ai, Generative AI, Machine Learning və Vision AI texnologiyalarını birləşdirir. Platforma loqonuzu, brend rənglərinizi, tonunuzu və məqsədlərinizi təhlil edir, sanki sizin komandanızda real bir dizayner və marketinq mütəxəssisi varmış kimi işləyir. Bizim AI: • Brend kimliyini və kommunikasiya tonunu öyrənir • Trend analizləri aparır və uyğun kontent yaradır • Hər paylaşım üçün vizual brif hazırlayır Yəni, Timera.ai sadəcə post yazan bir sistem deyil — markanızı anlayan bir süni intellekdir.',
      },
      roadmap: {
        title: '📈 Hazırkı Mərhələ və Gələcək Plan',
        content: 'Hazırda Timera.ai MVP mərhələsindədir və 2025-ci ilin noyabrında yerli bazarda sınaq versiyası istifadəyə veriləcək. 2026-cı ildə planımız: • 🌍 Region bazarlarına çıxış (Türkiyə, Qazaxıstan, Gürcüstan, Özbəkistan) • 🌐 Qlobal SaaS bazarında AI marketing aləti kimi tanınmaq • 🦄 İlk Azərbaycan mənşəli AI unicorn olmaq Məqsəd: Azərbaycanın texnoloji bazarından çıxan ilk qlobal AI marketing platforması olmaq.',
      },
    },
    team: {
      title: '👥 Bizim Komanda',
      subtitle: 'Texnologiya və marketinqi birləşdirən regionun ilk AI marketing komandası',
    },
    cta: {
      title: 'Sosial Media Marketinqinizi',
      titleHighlight: 'AI ilə İnqilaba Qoşun',
      description: 'Brendinizi anlayan süni intellektlə tanış olun. İlk 1 ayda fərqi hiss edin. Pulsuz başlayın!',
      button: '🚀 İndi Pulsuz Başlayın',
      note: 'Kredit kartı tələb olunmur • 5 dəqiqədə hazır • 24/7 dəstək',
    },
    footer: {
      tagline: 'Brendinizi Anlayan Süni İntellekt',
      copyright: '© 2025 Timera.ai. Bütün hüquqlar qorunur.',
      product: 'Məhsul',
      company: 'Şirkət',
      register: 'Qeydiyyat',
    },
    settings: {
      title: 'Parametrlər',
      description: 'Hesab tənzimləmələrinizi və konfiqurasiyanızı idarə edin',
      languagePreferences: {
        title: 'Dil Tənzimləmələri',
        description: 'İnterfeys üçün üstünlük verdiyiniz dili seçin',
        interfaceLanguage: 'İnterfeys Dili',
        interfaceLanguageDesc: 'Bütün menyular, düymələr və interfeys elementləri üçün dili seçin',
      },
      profile: {
        title: 'Profil Məlumatları',
        description: 'Şəxsi məlumatlarınızı və hesab detallarınızı yeniləyin',
        firstName: 'Ad',
        lastName: 'Soyad',
        email: 'E-poçt',
        companyName: 'Şirkət Adı',
        saveChanges: 'Dəyişiklikləri Saxla',
      },
      companyProfile: {
        title: 'Şirkət Profili',
        description: 'AI məzmunu üçün şirkət məlumatlarınızı idarə edin',
        edit: 'Redaktə Et',
        create: 'Yarat',
        companyName: 'Şirkət Adı',
        industry: 'Sənaye',
        companySize: 'Şirkət Ölçüsü',
        style: 'Üslub',
        website: 'Vebsayt',
        businessDescription: 'Biznes Təsviri',
        noProfile: 'Hələ ki şirkət profili yaradılmayıb',
        createProfile: 'Şirkət Profili Yarat',
        loading: 'Yüklənir...',
      },
      account: {
        title: 'Hesab Tənzimləmələri',
        description: 'Hesab tərcihlərinizi və təhlükəsizliyinizi idarə edin',
        emailVerification: 'E-poçt Təsdiqi',
        emailVerificationDesc: 'Hesabınızı təhlükəsizləşdirmək üçün e-poçt ünvanınızı təsdiq edin',
        verified: 'Təsdiqlənib',
        unverified: 'Təsdiqlənməyib',
        subscriptionPlan: 'Abunə Planı',
        subscriptionPlanDesc: 'Cari plan: {plan}',
        upgradePlan: 'Planı Yüksəlt',
        changePassword: 'Şifrəni Dəyiş',
        changePasswordDesc: 'Hesab şifrənizi yeniləyin',
      },
      notifications: {
        title: 'Bildirişlər',
        description: 'Bildirişləri necə almaq istədiyinizi konfiqurasiya edin',
        emailNotifications: 'E-poçt Bildirişləri',
        emailNotificationsDesc: 'Paylaşımlarınız və hesabınız haqqında yeniləmələr alın',
        postReminders: 'Paylaşım Xatırlatmaları',
        postRemindersDesc: 'Planlaşdırılmış paylaşımlar haqqında xatırlatma alın',
        weeklyReports: 'Həftəlik Hesabatlar',
        weeklyReportsDesc: 'Həftəlik performans xülasələri alın',
      },
      legal: {
        title: 'Qanuni Sənədlər',
        description: 'Gizlilik siyasəti və istifadə şərtləri',
        privacyPolicy: 'Gizlilik Siyasəti',
        privacyPolicyDesc: 'Məlumatlarınızın necə toplandığı və istifadə olunduğu haqqında',
        termsOfService: 'İstifadə Şərtləri',
        termsOfServiceDesc: 'Platformadan istifadə qaydaları və şərtləri',
        read: 'Oxu',
      },
      dangerZone: {
        title: 'Təhlükəli Zona',
        description: 'Hesabınıza təsir edən geri dönməz hərəkətlər',
        deleteAccount: 'Hesabı Sil',
        deleteAccountDesc: 'Hesabınızı və bütün məlumatları daimi olaraq silin',
      },
    },
    sidebar: {
      dashboard: 'İdarə Paneli',
      dashboardDesc: 'Ümumi baxış və statistika',
      posts: 'Paylaşımlar',
      postsDesc: 'Paylaşım yarat və idarə et',
      calendar: 'Təqvim',
      calendarDesc: 'Məzmun planlaşdır',
      aiContentGenerator: 'AI Məzmun Yaradıcı',
      aiContentGeneratorDesc: 'Aylıq paylaşımlar yarat',
      aiTools: 'AI Alətlər',
      aiToolsDesc: 'Məzmun yaratma',
      socialAccounts: 'Sosial Hesablar',
      socialAccountsDesc: 'Qoşulmuş platformalar',
      analytics: 'Analitika',
      analyticsDesc: 'Performans məlumatları',
      socialMediaAnalysis: 'Sosial Media Analiz',
      socialMediaAnalysisDesc: 'Profil və məzmun analizi',
      metaAds: 'Meta Ads',
      metaAdsDesc: 'Reklam kampaniyaları',
      brandVoice: 'Brend Səsi',
      brandVoiceDesc: 'AI şəxsiyyət parametrləri',
      templates: 'Şablonlar',
      templatesDesc: 'Məzmun şablonları',
      settings: 'Parametrlər',
      settingsDesc: 'Hesab tənzimləmələri',
      pending: 'Gözləyir',
      personalAccount: 'Şəxsi Hesab',
      plan: 'Plan',
      free: 'Pulsuz',
      profile: 'Profil',
      billing: 'Ödəniş',
      logout: 'Çıxış',
    },
    dashboard: {
      welcomeBack: 'Xoş gəlmisiniz, {name}!',
      description: 'AI əsaslı alətlərlə sosial media mövcudluğunuzu idarə edin',
      postsWaiting: 'Təsdiq Gözləyən Paylaşımlar',
      postsWaitingDesc: 'İcmalınızı gözləyən {count} AI yaratdığı paylaşım var',
      reviewApprove: 'Paylaşımları İcmal Et və Təsdiqlə',
      getStarted: 'AI Məzmun Yaradıcı ilə Başlayın',
      getStartedDesc: 'Azərbaycan dilində 10 cəlbedici paylaşım yaratmaq üçün şirkət profilinizi qurun',
      startGenerator: 'AI Məzmun Yaradıcısını Başlat',
      postsCreated: 'Yaradılan Paylaşımlar',
      postsCreatedDesc: 'Hesabınızdakı ümumi paylaşımlar',
      aiGenerated: 'AI yaratdı',
      pendingApproval: 'Təsdiq Gözləyir',
      pendingApprovalDesc: 'İcmal gözləyən paylaşımlar',
      approved: 'təsdiqlənib',
      scheduledPosts: 'Planlaşdırılmış Paylaşımlar',
      scheduledPostsDesc: 'Yayımlamağa hazır paylaşımlar',
      published: 'yayımlanıb',
      quickActions: 'Tez Hərəkətlər',
      quickActionsDesc: 'Bu ümumi tapşırıqlarla başlayın',
      createNewPost: 'Yeni Paylaşım Yarat',
      connectSocial: 'Sosial Hesab Qoş',
      viewCalendar: 'Təqvimi Görüntülə',
      accountInfo: 'Hesab Məlumatları',
      email: 'E-poçt',
      company: 'Şirkət',
      notSpecified: 'Göstərilməyib',
      plan: 'Plan',
      emailVerified: 'E-poçt Təsdiqlənib',
      verified: '✅ Təsdiqlənib',
      notVerified: '❌ Təsdiqlənməyib',
    },
    posts: {
      title: 'Paylaşımlar',
      description: 'Sosial media paylaşımlarınızı idarə edin və planlaşdırın',
      createWithAI: 'AI ilə Yarat',
      brandingActive: '🎨 Avtomatik brending aktivdir',
      brandingActiveDesc: 'Yeni AI yaradılmış şəkillərə loqonuz avtomatik əlavə ediləcək',
      brandingWarning: '⚠️ Brending aktivdir, lakin loqo yüklənməyib',
      brandingWarningDesc: 'Brending işləməsi üçün',
      uploadLogo: 'loqo yükləyin',
      totalPosts: 'Ümumi Paylaşım',
      published: 'Dərc Edilib',
      scheduled: 'Planlaşdırılıb',
      approved: 'Təsdiq Edilib',
      loading: 'Yüklənir...',
      noPosts: 'Hələ paylaşım yoxdur',
      noPostsDesc: 'İlk paylaşımınızı yaratmaq üçün AI-dan istifadə edin və ya əl ilə yazın',
      startWithAI: 'AI ilə Başlayın',
      statusPublished: 'Dərc Edilib',
      statusScheduled: 'Planlaşdırılıb',
      statusApproved: 'Təsdiq Edilib',
      statusPending: 'Gözləyir',
      statusFailed: 'Uğursuz',
      statusDraft: 'Qaralama',
      branded: 'Brendlənmiş',
      applyBranding: 'Brendləndir',
      applyingBranding: 'Brendləndirilir...',
      clickToEnlarge: 'Şəkli böyüdün',
      imageNotLoading: 'Şəkil yüklənmir',
      noImage: 'Şəkil yoxdur',
      publishToFacebook: 'Facebook-a Paylaş',
      publishToInstagram: 'Instagram-a Paylaş',
      publishToLinkedIn: 'LinkedIn-ə Paylaş',
      deleteConfirm: 'Bu paylaşımı silmək istədiyinizdən əminsiniz?',
      publishedAt: 'Dərc',
      scheduledAt: 'Plan',
      createdAt: 'Yaradılıb',
      closeModal: 'Bağla',
      closeModalDesc: 'Bağlamaq üçün ESC basın və ya xaricə klik edin',
      successPublishedFacebook: '✅ Facebook-a uğurla paylaşıldı!',
      successPublishedInstagram: '✅ Instagram-a uğurla paylaşıldı!',
      successPublishedLinkedIn: '✅ LinkedIn-ə uğurla paylaşıldı!',
      successBrandingApplied: '✅ Brending uğurla tətbiq edildi!',
      errorPublishFacebook: '❌ Facebook paylaşımı uğursuz oldu',
      errorPublishInstagram: '❌ Instagram paylaşımı uğursuz oldu',
      errorPublishLinkedIn: '❌ LinkedIn paylaşımı uğursuz oldu',
      errorBranding: 'Brending tətbiq edilə bilmədi',
    },
    share: {
      share: 'Paylaş',
      sharePost: 'Postu Paylaş',
      selectPlatform: 'Platforma seçin',
      shareOnFacebook: 'Facebook-da paylaş',
      shareOnLinkedIn: 'LinkedIn-də paylaş',
      shareOnInstagram: 'Instagram-da paylaş',
      selectInstagramType: 'Instagram növü seçin',
      instagramFeed: 'Feed',
      instagramStories: 'Stories',
      shareOnTikTok: 'TikTok-da paylaş',
      shareOnYouTube: 'YouTube-da paylaş',
      copyLink: 'Linki kopyala',
      copyContent: 'Məzmunu kopyala',
      linkCopied: 'Link kopyalandı!',
      contentCopied: 'Məzmun kopyalandı!',
      textCopied: 'Text kopyalandı!',
      instagramTextPaste: 'Instagram-da şəkil yükləndikdən sonra text sahəsinə yapışdırın (Ctrl+V / Cmd+V)',
      downloadImage: 'Şəkli yüklə',
      downloaded: 'Yükləndi!',
      manualActions: 'Manual əməliyyatlar',
      instructions: 'Təlimatlar:',
      instagramInstructions: 'Şəkil yükləndi və məzmun kopyalandı. Instagram-da şəkli yükləyin və məzmunu paste edin.',
      tiktokInstructions: 'Şəkil yükləndi və məzmun kopyalandı. TikTok-da video/şəkli yükləyin və məzmunu paste edin.',
      youtubeInstructions: 'Məzmun kopyalandı. YouTube Studio-da video-nu yükləyin və məzmunu description-a paste edin.',
      metaBusinessTitle: 'Meta Business Suite Konfiqurasiyası',
      metaBusinessId: 'Business ID',
      metaAssetId: 'Asset ID (Səhifə ID)',
      metaBusinessOpen: 'Meta Business Suite Aç',
      metaBusinessRequired: 'Business ID və Asset ID daxil edin',
      linkedInSelectPage: 'LinkedIn Səhifə Seçin',
      linkedInSelectPageDesc: 'Paylaşımı hansı LinkedIn səhifəsində etmək istəyirsiniz?',
      linkedInPersonalAccount: 'Şəxsi Hesab',
      linkedInPersonalDesc: 'Şəxsi profilim',
      linkedInCompanyPage: 'Company Page',
      linkedInPublished: 'LinkedIn-də paylaşıldı!',
      linkedInError: 'LinkedIn paylaşım xətası',
    },
    calendar: {
      title: 'Təqvim',
      description: 'Məzmun təqviminizi planlaşdırın və idarə edin',
      loading: 'Yüklənir...',
      optimalTiming: 'Optimal Paylaşım Vaxtları',
      optimalTimingDesc: 'Maksimum təşviq üçün AI tərəfindən tövsiyə olunan ən yaxşı vaxtlar',
      noPosts: 'Planlaşdırılmış paylaşım yoxdur',
      noPostsDesc: 'Təqviminizdə görmək üçün paylaşımlar yaradın',
      untitled: 'Adsız',
    },
    aiContentGenerator: {
      title: 'AI Məzmun Yaradıcı',
      description: 'AI ilə cəlbedici sosial media paylaşımları yaradın',
      loading: 'Yüklənir...',
    },
    aiTools: {
      title: 'AI Alətlər',
      description: 'Daha yaxşı sosial media məzmunu yaratmaq üçün AI-dan istifadə edin',
      contentGenerator: 'Məzmun Yaradıcısı',
      contentGeneratorDesc: 'AI ilə cəlbedici paylaşımlar yaradın',
      hashtagGenerator: 'Hashtag Yaradıcısı',
      hashtagGeneratorDesc: 'Paylaşımlarınız üçün trend hashtag-ləri tapın',
      captionOptimizer: 'Başlıq Optimizatoru',
      captionOptimizerDesc: 'Daha yaxşı təşviq üçün başlıqlarınızı təkmilləşdirin',
      imageGenerator: 'Şəkil Yaradıcısı',
      imageGeneratorDesc: 'AI ilə şəkillər yaradın (Tezliklə)',
      comingSoon: 'Tezliklə',
      trendAnalyzer: 'Trend Analizatoru',
      trendAnalyzerDesc: 'Sənayənizdəki trend mövzuları təhlil edin',
      competitorAnalysis: 'Rəqib Analizi',
      competitorAnalysisDesc: 'Rəqib məzmun strategiyalarını təhlil edin',
      logoSloganGenerator: 'Loqo və Slogan Yaradıcısı',
      logoSloganGeneratorDesc: 'AI ilə professional loqo və slogan yaradın',
      adCreativeGenerator: 'Reklam Yaradıcısı',
      adCreativeGeneratorDesc: 'AI ilə professional marketinq vizualları yaradın',
      videoGenerator: 'Video Yaradıcısı',
      videoGeneratorDesc: 'Kling Video istifadə edərək AI ilə professional videolar yaradın',
      promptPlaceholder: 'məsələn, Yeni məhsul təqdimatımız, sənaye trendləri, şirkət mədəniyyəti...',
      generate: 'Məzmun Yarad',
      generating: 'Yaradılır...',
      productName: 'Məhsul Adı',
      productDescription: 'Məhsul Təsviri',
      generateLogoSlogan: 'Loqo və Slogan Yarad',
      saving: 'Saxlanılır...',
      saveToProfile: 'Şirkət Profilinə Saxla',
      saved: 'Saxlanıldı!',
    },
    socialAccounts: {
      title: 'Sosial Hesablar',
      description: 'Sosial media hesablarınızı qoşun və idarə edin',
      loading: 'Yüklənir...',
      connect: 'Qoş',
      connecting: 'Qoşulur...',
      connected: 'Qoşulub',
      disconnect: 'Ayır',
      disconnecting: 'Ayrılır...',
      noAccounts: 'Hesab qoşulmayıb',
      noAccountsDesc: 'Yayımlamağa başlamaq üçün sosial media hesablarınızı qoşun',
      errorLoading: 'Hesabları yükləyərkən xəta baş verdi',
      loginRequired: '❌ Giriş tələb olunur. Zəhmət olmasa, yenidən giriş edin.',
      lastUsed: 'Son istifadə',
      never: 'Heç vaxt',
      active: 'Aktiv',
      inactive: 'Qeyri-aktiv',
      disconnectConfirm: 'Bu hesabı ayırmaq istədiyinizdən əminsiniz?',
    },
    analytics: {
      title: 'Analitika',
      description: 'Sosial media performansınızı izləyin',
      loading: 'Yüklənir...',
      noData: 'Məlumat yoxdur',
      impressions: 'Görüntüləmə',
      reach: 'Çatdırılma',
      clicks: 'Klik',
      spend: 'Xərc',
      cpm: 'CPM',
      cpc: 'CPC',
      ctr: 'CTR',
      conversions: 'Çevrilmə',
      dateRange: 'Tarix Aralığı',
      selectAccount: 'Hesab Seç',
      refresh: 'Yenilə',
      download: 'Yüklə',
    },
    metaAds: {
      title: 'Meta Ads',
      description: 'Facebook və Instagram reklam kampaniyalarınızı idarə edin',
      loading: 'Yüklənir...',
      connectAccount: 'Reklam Hesabı Qoş',
      noAccounts: 'Reklam hesabı qoşulmayıb',
      noAccountsDesc: 'Kampaniyaları idarə etmək üçün Meta reklam hesabınızı qoşun',
      campaigns: 'Kampaniyalar',
      adSets: 'Reklam Dəstləri',
      ads: 'Reklamlar',
      createCampaign: 'Kampaniya Yarad',
      active: 'Aktiv',
      paused: 'Dayandırılıb',
      archived: 'Arxivləşdirilib',
    },
    brandVoice: {
      title: 'Brend Səsi',
      description: 'Brendiniz üçün AI şəxsiyyət parametrlərini konfiqurasiya edin',
      professional: 'Professional',
      casual: 'Gündəlik',
      inspirational: 'İlhamverici',
      industry: 'Sənaye',
      targetAudience: 'Hədəf Auditoriya',
      customInstructions: 'Fərdi Təlimatlar',
      default: 'Varsayılan',
      usageCount: 'İstifadə Sayı',
      samplePost: 'Nümunə Paylaşım',
      select: 'Seç',
    },
    templates: {
      title: 'Şablonlar',
      description: 'Tez paylaşım yaratmaq üçün məzmun şablonları',
      all: 'Hamısı',
      announcement: 'Elan',
      educational: 'Təhsil',
      promotional: 'Təşviq',
      engagement: 'Təşviq',
      search: 'Şablonları axtar...',
      useTemplate: 'Şablondan İstifadə Et',
      usageCount: 'İstifadə',
      platforms: 'Platformalar',
      variables: 'Dəyişənlər',
    },
  },
  rus: {
    common: {
      loading: 'Загрузка...',
      login: 'Войти',
      start: 'Начать',
      features: 'Возможности',
      howItWorks: 'Как это работает',
      faq: 'FAQ',
      about: 'О нас',
      team: 'Команда',
      edit: 'Редактировать',
      save: 'Сохранить',
      cancel: 'Отмена',
      delete: 'Удалить',
      confirm: 'Подтвердить',
      close: 'Закрыть',
    },
    nav: {
      features: 'Возможности',
      howItWorks: 'Как это работает',
      faq: 'FAQ',
      about: 'О нас',
    },
    hero: {
      tagline: '🚀 Будущее здесь с искусственным интеллектом',
      title: 'Искусственный интеллект',
      titleHighlight: 'Который понимает ваш бренд',
      description: 'Timera.ai — это платформа управления социальными сетями на основе ИИ. Создание контента, планирование, дизайн и аналитика — все в одном месте, полностью автоматизировано.',
      startFree: 'Начать бесплатно',
      howItWorksBtn: 'Как это работает?',
      stats24_7: 'ИИ-ассистент 24/7',
      stats10x: 'Контент в 10 раз быстрее',
      stats100: '100% автоматизация',
    },
    features: {
      title: 'Что делает Timera.ai?',
      subtitle: 'Новая эра управления социальными сетями с искусственным интеллектом',
      aiContentCreator: {
        title: 'Создатель контента на ИИ',
        description: 'Текстовый и визуальный контент, адаптированный к вашему бренду, создается полностью автоматически. Вы можете редактировать любую часть.',
      },
      designVisual: {
        title: 'Дизайн и визуал',
        description: 'ИИ создает дизайны и визуалы, соответствующие стилю вашего бренда. Логотип, цвета и тон автоматически анализируются.',
      },
      smartScheduling: {
        title: 'Умное планирование',
        description: 'Время публикаций и стратегия настраиваются автоматически. Оптимальный выбор времени выполняется ИИ.',
      },
      analytics: {
        title: 'Аналитика и отчеты',
        description: 'Аналитика в реальном времени и измерение производительности. ИИ предлагает следующую стратегию.',
      },
      videoContent: {
        title: 'Видео контент',
        description: 'Автоматические видео-посты, адаптированные к вашему бренду. Подготовка видео-контента полностью автоматизирована.',
      },
      secure: {
        title: 'Безопасно и законно',
        description: 'Официальные интеграции API и SSL-шифрование. Личные данные не хранятся.',
      },
    },
    howItWorks: {
      title: 'Как это работает?',
      subtitle: 'Автоматизируйте маркетинг в социальных сетях за 4 простых шага',
      step1: {
        title: 'Введите информацию',
        description: 'Предоставьте информацию о вашем бренде, продукте и целях. ИИ изучает все.',
      },
      step2: {
        title: 'ИИ создает контент',
        description: 'Темы постов, текст и визуальный контент готовятся автоматически.',
      },
      step3: {
        title: 'Одобрить и редактировать',
        description: 'Отредактируйте любую часть и одобрите публикации.',
      },
      step4: {
        title: 'Автоматическая публикация',
        description: 'Система публикует посты и анализирует результаты.',
      },
    },
    why: {
      title: 'Почему Timera.ai?',
      subtitle: 'Потому что быть активным в социальных сетях больше не роскошь, а необходимость',
      forSMB: {
        title: 'Для МСП и стартапов',
        description: 'Управляйте своими социальными сетями без необходимости в дополнительных человеческих ресурсах. Избавьтесь от затрат на специалиста по SMM и агентство.',
      },
      faster: {
        title: 'В 10 раз быстрее',
        description: 'Создайте свою маркетинговую стратегию в 10 раз эффективнее с помощью ИИ. Экономьте время, сосредоточьтесь на творчестве.',
      },
      realResults: {
        title: 'Реальные результаты',
        description: 'Измеряйте реальные результаты с помощью аналитических отчетов. Вы почувствуете разницу в первый месяц.',
      },
      localGlobal: {
        title: 'Локальный и глобальный',
        description: 'Платформа, которая понимает азербайджанский рынок и работает по мировым стандартам. Подходит как для локальных, так и для глобальных рынков.',
      },
      democratic: {
        title: 'Демократический маркетинг',
        description: 'Мы делаем цифровой маркетинг доступным для всех. Каждый бизнес может легко управлять своим брендом.',
      },
      futureTech: {
        title: 'Технология будущего',
        description: 'Сочетание технологий генеративного ИИ, машинного обучения и компьютерного зрения. Искусственный интеллект освобождает время для творческого мышления.',
      },
    },
    faq: {
      title: '❓ Часто задаваемые вопросы',
      subtitle: 'Все, что вы хотите знать о Timera.ai',
      items: [
        {
          question: '🧠 Что делает Timera.ai и как это работает?',
          answer: 'Timera.ai — это инструмент управления социальными сетями на основе искусственного интеллекта. Платформа автоматизирует создание постов, планирование, дизайн, подготовку видео-контента, аналитические отчеты и даже управление Meta Ads (рекламные кампании Facebook и Instagram). Просто введите информацию о своем бренде — ИИ сделает все остальное за вас.',
        },
        {
          question: '✍️ ИИ создает контент полностью самостоятельно, или я могу его редактировать?',
          answer: 'Timera.ai создает контент полностью автоматически — как текстовый, так и визуальный, и видео форматы. Однако пользователи могут редактировать и настраивать любую часть по своему желанию. Этот подход сочетает скорость ИИ с гибкостью человеческого творчества.',
        },
        {
          question: '🔒 Как Timera.ai защищает мои данные?',
          answer: 'Безопасность данных является приоритетом для Timera.ai. Аккаунты пользователей в социальных сетях подключаются через официальные интеграции API, и никакие личные данные не хранятся на серверах. Все передачи данных осуществляются полностью законным и зашифрованным (SSL) способом.',
        },
        {
          question: '👤 Для кого предназначен Timera.ai?',
          answer: 'Timera.ai предназначен для всех, кто хочет продвигать свой бренд в социальных сетях, привлекать клиентов и увеличивать продажи. Это особенно идеальное решение для малого и среднего бизнеса (МСП), стартапов, специалистов по SMM и маркетологов, фриланс-дизайнеров и агентств.',
        },
        {
          question: '💻 На каких устройствах работает Timera.ai?',
          answer: 'Timera.ai — это полностью веб-платформа, то есть не требуется установка программного обеспечения. Просто введите timera.az в браузере. Платформа работает с одинаковой эффективностью на компьютерах, планшетах и мобильных устройствах.',
        },
        {
          question: '🔮 Что планирует Timera.ai на будущее?',
          answer: 'К 2026 году Timera.ai планирует добавить несколько новых функций: Генератор видео на ИИ — автоматические видео-посты, адаптированные к вашему бренду, ИИ-чатбот-ассистент — помощник, который дает пользователям советы по социальным сетям, и Мобильное приложение (iOS и Android) — управление контентом из любого места. Наша цель — стать первой глобальной платформой маркетинга на ИИ с технологического рынка Азербайджана.',
        },
        {
          question: '🚀 Как быстро Timera.ai показывает результаты?',
          answer: 'В первый месяц ИИ изучает вашу потенциальную клиентскую базу и оптимизирует ваши посты. Через 1 месяц вы явно почувствуете разницу в более последовательном потоке контента, более стабильных реакциях подписчиков и меньшем времени, больших результатах.',
        },
        {
          question: '🧩 Чем Timera.ai отличается от других инструментов для социальных сетей?',
          answer: 'Самое большое отличие — Timera.ai не просто планирует контент, он понимает бренд и клиентов этого бренда. Другие инструменты просто упрощают публикацию, в то время как Timera.ai создает текст, дизайн и стратегию вместе с ИИ. Так что это не просто "планировщик постов" — это настоящий менеджер маркетинга на ИИ, который работает за вас.',
        },
      ],
    },
    about: {
      title: '🧠 О Timera.ai',
      subtitle: 'Новая эра управления социальными сетями с искусственным интеллектом',
      mission: {
        title: '💡 Наша миссия',
        content: 'Наша цель — сделать цифровой маркетинг доступным для всех. Мы приносим технологию ИИ всем, от гигантских корпораций до МСП. Благодаря Timera.ai каждый бизнес может легко управлять своим брендом, создание контента с ИИ становится быстрее и эффективнее, и происходит цифровая революция на азербайджанском и региональном рынке. Мы верим, что искусственный интеллект не заменяет творческое мышление — он просто освобождает его время.',
      },
      technology: {
        title: '⚙️ Технология',
        content: 'Timera.ai объединяет технологии генеративного ИИ, машинного обучения и компьютерного зрения. Платформа анализирует ваш логотип, цвета бренда, тон и цели, работая так, как будто у вас в команде есть настоящий дизайнер и специалист по маркетингу. Наш ИИ: • Изучает идентичность бренда и тон коммуникации • Проводит анализ трендов и создает соответствующий контент • Готовит визуальные брифи для каждого поста Итак, Timera.ai — это не просто система, которая пишет посты — это искусственный интеллект, который понимает ваш бренд.',
      },
      roadmap: {
        title: '📈 Текущий этап и планы на будущее',
        content: 'В настоящее время Timera.ai находится на этапе MVP и будет выпущен как пробная версия на местном рынке в ноябре 2025 года. К 2026 году наш план: • 🌍 Выход на региональные рынки (Турция, Казахстан, Грузия, Узбекистан) • 🌐 Признание как инструмент маркетинга на ИИ на глобальном рынке SaaS • 🦄 Стать первым единорогом на ИИ из Азербайджана Цель: стать первой глобальной платформой маркетинга на ИИ с технологического рынка Азербайджана.',
      },
    },
    team: {
      title: '👥 Наша команда',
      subtitle: 'Первая команда маркетинга на ИИ в регионе, объединяющая технологии и маркетинг',
    },
    cta: {
      title: 'Присоединяйтесь к революции ИИ',
      titleHighlight: 'вашего маркетинга в социальных сетях',
      description: 'Познакомьтесь с искусственным интеллектом, который понимает ваш бренд. Почувствуйте разницу в первый месяц. Начните бесплатно!',
      button: '🚀 Начать бесплатно сейчас',
      note: 'Кредитная карта не требуется • Готово за 5 минут • Поддержка 24/7',
    },
    footer: {
      tagline: 'Искусственный интеллект, который понимает ваш бренд',
      copyright: '© 2025 Timera.ai. Все права защищены.',
      product: 'Продукт',
      company: 'Компания',
      register: 'Регистрация',
    },
    settings: {
      title: 'Настройки',
      description: 'Управляйте настройками аккаунта и конфигурацией',
      languagePreferences: {
        title: 'Языковые настройки',
        description: 'Выберите предпочитаемый язык интерфейса',
        interfaceLanguage: 'Язык интерфейса',
        interfaceLanguageDesc: 'Выберите язык для всех меню, кнопок и элементов интерфейса',
      },
      profile: {
        title: 'Информация профиля',
        description: 'Обновите вашу личную информацию и данные аккаунта',
        firstName: 'Имя',
        lastName: 'Фамилия',
        email: 'Электронная почта',
        companyName: 'Название компании',
        saveChanges: 'Сохранить изменения',
      },
      companyProfile: {
        title: 'Профиль компании',
        description: 'Управляйте информацией о вашей компании для ИИ-контента',
        edit: 'Редактировать',
        create: 'Создать',
        companyName: 'Название компании',
        industry: 'Отрасль',
        companySize: 'Размер компании',
        style: 'Стиль',
        website: 'Веб-сайт',
        businessDescription: 'Описание бизнеса',
        noProfile: 'Профиль компании еще не создан',
        createProfile: 'Создать профиль компании',
        loading: 'Загрузка...',
      },
      account: {
        title: 'Настройки аккаунта',
        description: 'Управляйте настройками аккаунта и безопасностью',
        emailVerification: 'Подтверждение электронной почты',
        emailVerificationDesc: 'Подтвердите адрес электронной почты для защиты аккаунта',
        verified: 'Подтверждено',
        unverified: 'Не подтверждено',
        subscriptionPlan: 'План подписки',
        subscriptionPlanDesc: 'Текущий план: {plan}',
        upgradePlan: 'Обновить план',
        changePassword: 'Изменить пароль',
        changePasswordDesc: 'Обновите пароль аккаунта',
      },
      notifications: {
        title: 'Уведомления',
        description: 'Настройте, как вы хотите получать уведомления',
        emailNotifications: 'Уведомления по электронной почте',
        emailNotificationsDesc: 'Получайте обновления о ваших постах и аккаунте',
        postReminders: 'Напоминания о постах',
        postRemindersDesc: 'Получайте напоминания о запланированных постах',
        weeklyReports: 'Еженедельные отчеты',
        weeklyReportsDesc: 'Получайте еженедельные сводки производительности',
      },
      legal: {
        title: 'Юридические документы',
        description: 'Политика конфиденциальности и условия использования',
        privacyPolicy: 'Политика конфиденциальности',
        privacyPolicyDesc: 'Узнайте, как собираются и используются ваши данные',
        termsOfService: 'Условия использования',
        termsOfServiceDesc: 'Правила и условия использования платформы',
        read: 'Читать',
      },
      dangerZone: {
        title: 'Опасная зона',
        description: 'Необратимые действия, влияющие на ваш аккаунт',
        deleteAccount: 'Удалить аккаунт',
        deleteAccountDesc: 'Навсегда удалите ваш аккаунт и все данные',
      },
    },
    sidebar: {
      dashboard: 'Панель управления',
      dashboardDesc: 'Обзор и статистика',
      posts: 'Посты',
      postsDesc: 'Создавайте и управляйте постами',
      calendar: 'Календарь',
      calendarDesc: 'Планируйте контент',
      aiContentGenerator: 'Генератор контента на ИИ',
      aiContentGeneratorDesc: 'Создавайте ежемесячные посты',
      aiTools: 'ИИ-инструменты',
      aiToolsDesc: 'Создание контента',
      socialAccounts: 'Социальные аккаунты',
      socialAccountsDesc: 'Подключенные платформы',
      analytics: 'Аналитика',
      analyticsDesc: 'Данные о производительности',
      socialMediaAnalysis: 'Анализ социальных сетей',
      socialMediaAnalysisDesc: 'Анализ профиля и контента',
      metaAds: 'Meta Ads',
      metaAdsDesc: 'Рекламные кампании',
      brandVoice: 'Голос бренда',
      brandVoiceDesc: 'Настройки личности ИИ',
      templates: 'Шаблоны',
      templatesDesc: 'Шаблоны контента',
      settings: 'Настройки',
      settingsDesc: 'Настройки аккаунта',
      pending: 'Ожидает',
      personalAccount: 'Личный аккаунт',
      plan: 'План',
      free: 'Бесплатно',
      profile: 'Профиль',
      billing: 'Оплата',
      logout: 'Выйти',
    },
    dashboard: {
      welcomeBack: 'С возвращением, {name}!',
      description: 'Управляйте своим присутствием в социальных сетях с помощью инструментов на основе ИИ',
      postsWaiting: 'Посты ожидают одобрения',
      postsWaitingDesc: 'У вас есть {count} постов, созданных ИИ, ожидающих вашего обзора',
      reviewApprove: 'Просмотреть и одобрить посты',
      getStarted: 'Начните с генерации контента на ИИ',
      getStartedDesc: 'Настройте профиль компании, чтобы создать 10 увлекательных постов на азербайджанском языке',
      startGenerator: 'Запустить генератор контента на ИИ',
      postsCreated: 'Созданные посты',
      postsCreatedDesc: 'Всего постов в вашем аккаунте',
      aiGenerated: 'создано ИИ',
      pendingApproval: 'Ожидает одобрения',
      pendingApprovalDesc: 'Посты, ожидающие обзора',
      approved: 'одобрено',
      scheduledPosts: 'Запланированные посты',
      scheduledPostsDesc: 'Посты готовы к публикации',
      published: 'опубликовано',
      quickActions: 'Быстрые действия',
      quickActionsDesc: 'Начните с этих общих задач',
      createNewPost: 'Создать новый пост',
      connectSocial: 'Подключить социальный аккаунт',
      viewCalendar: 'Просмотреть календарь',
      accountInfo: 'Информация об аккаунте',
      email: 'Электронная почта',
      company: 'Компания',
      notSpecified: 'Не указано',
      plan: 'План',
      emailVerified: 'Электронная почта подтверждена',
      verified: '✅ Подтверждено',
      notVerified: '❌ Не подтверждено',
    },
    posts: {
      title: 'Посты',
      description: 'Управляйте и планируйте свои посты в социальных сетях',
      createWithAI: 'Создать с ИИ',
      brandingActive: '🎨 Автоматический брендинг активен',
      brandingActiveDesc: 'Ваш логотип будет автоматически добавлен к новым изображениям, созданным ИИ',
      brandingWarning: '⚠️ Брендинг активен, но логотип не загружен',
      brandingWarningDesc: 'Загрузите логотип для работы брендинга',
      uploadLogo: 'загрузить логотип',
      totalPosts: 'Всего постов',
      published: 'Опубликовано',
      scheduled: 'Запланировано',
      approved: 'Одобрено',
      loading: 'Загрузка...',
      noPosts: 'Пока нет постов',
      noPostsDesc: 'Используйте ИИ для создания первого поста или напишите вручную',
      startWithAI: 'Начать с ИИ',
      statusPublished: 'Опубликовано',
      statusScheduled: 'Запланировано',
      statusApproved: 'Одобрено',
      statusPending: 'Ожидает',
      statusFailed: 'Не удалось',
      statusDraft: 'Черновик',
      branded: 'С брендингом',
      applyBranding: 'Применить брендинг',
      applyingBranding: 'Применяется...',
      clickToEnlarge: 'Нажмите для увеличения',
      imageNotLoading: 'Изображение не загружается',
      noImage: 'Нет изображения',
      publishToFacebook: 'Опубликовать в Facebook',
      publishToInstagram: 'Опубликовать в Instagram',
      publishToLinkedIn: 'Опубликовать в LinkedIn',
      deleteConfirm: 'Вы уверены, что хотите удалить этот пост?',
      publishedAt: 'Опубликовано',
      scheduledAt: 'Запланировано',
      createdAt: 'Создано',
      closeModal: 'Закрыть',
      closeModalDesc: 'Нажмите ESC для закрытия или щелкните снаружи',
      successPublishedFacebook: '✅ Успешно опубликовано в Facebook!',
      successPublishedInstagram: '✅ Успешно опубликовано в Instagram!',
      successPublishedLinkedIn: '✅ Успешно опубликовано в LinkedIn!',
      successBrandingApplied: '✅ Брендинг успешно применен!',
      errorPublishFacebook: '❌ Публикация в Facebook не удалась',
      errorPublishInstagram: '❌ Публикация в Instagram не удалась',
      errorPublishLinkedIn: '❌ Публикация в LinkedIn не удалась',
      errorBranding: 'Брендинг не может быть применен',
    },
    share: {
      share: 'Поделиться',
      sharePost: 'Поделиться постом',
      selectPlatform: 'Выберите платформу',
      shareOnFacebook: 'Поделиться в Facebook',
      shareOnLinkedIn: 'Поделиться в LinkedIn',
      shareOnInstagram: 'Поделиться в Instagram',
      selectInstagramType: 'Выберите тип Instagram',
      instagramFeed: 'Лента',
      instagramStories: 'Stories',
      shareOnTikTok: 'Поделиться в TikTok',
      shareOnYouTube: 'Поделиться в YouTube',
      copyLink: 'Копировать ссылку',
      copyContent: 'Копировать содержимое',
      linkCopied: 'Ссылка скопирована!',
      contentCopied: 'Содержимое скопировано!',
      textCopied: 'Текст скопирован!',
      instagramTextPaste: 'После загрузки изображения в Instagram вставьте текст в поле (Ctrl+V / Cmd+V)',
      downloadImage: 'Скачать изображение',
      downloaded: 'Скачано!',
      manualActions: 'Ручные действия',
      instructions: 'Инструкции:',
      instagramInstructions: 'Изображение скачано и текст скопирован. Загрузите изображение в Instagram и вставьте текст.',
      tiktokInstructions: 'Изображение скачано и текст скопирован. Загрузите видео/изображение в TikTok и вставьте текст.',
      youtubeInstructions: 'Текст скопирован. Загрузите видео в YouTube Studio и вставьте текст в описание.',
      metaBusinessTitle: 'Конфигурация Meta Business Suite',
      metaBusinessId: 'Business ID',
      metaAssetId: 'Asset ID (ID страницы)',
      metaBusinessOpen: 'Открыть Meta Business Suite',
      metaBusinessRequired: 'Пожалуйста, введите Business ID и Asset ID',
      linkedInSelectPage: 'Выберите страницу LinkedIn',
      linkedInSelectPageDesc: 'На какой странице LinkedIn вы хотите поделиться?',
      linkedInPersonalAccount: 'Личный аккаунт',
      linkedInPersonalDesc: 'Мой личный профиль',
      linkedInCompanyPage: 'Страница компании',
      linkedInPublished: 'Опубликовано в LinkedIn!',
      linkedInError: 'Ошибка публикации в LinkedIn',
    },
    calendar: {
      title: 'Календарь',
      description: 'Планируйте и управляйте календарем контента',
      loading: 'Загрузка...',
      optimalTiming: 'Оптимальное время публикации',
      optimalTimingDesc: 'Рекомендуемое ИИ лучшее время для публикации для максимального вовлечения',
      noPosts: 'Нет запланированных постов',
      noPostsDesc: 'Создайте посты, чтобы увидеть их в календаре',
      untitled: 'Без названия',
    },
    aiContentGenerator: {
      title: 'Генератор контента на ИИ',
      description: 'Создавайте увлекательные посты в социальных сетях с помощью ИИ',
      loading: 'Загрузка...',
    },
    aiTools: {
      title: 'ИИ-инструменты',
      description: 'Используйте ИИ для создания лучшего контента в социальных сетях',
      contentGenerator: 'Генератор контента',
      contentGeneratorDesc: 'Создавайте увлекательные посты с помощью ИИ',
      hashtagGenerator: 'Генератор хэштегов',
      hashtagGeneratorDesc: 'Найдите трендовые хэштеги для ваших постов',
      captionOptimizer: 'Оптимизатор подписей',
      captionOptimizerDesc: 'Улучшите свои подписи для лучшего вовлечения',
      imageGenerator: 'Генератор изображений',
      imageGeneratorDesc: 'Создавайте изображения с помощью ИИ (Скоро)',
      comingSoon: 'Скоро',
      trendAnalyzer: 'Анализатор трендов',
      trendAnalyzerDesc: 'Анализируйте трендовые темы в вашей отрасли',
      competitorAnalysis: 'Анализ конкурентов',
      competitorAnalysisDesc: 'Анализируйте стратегии контента конкурентов',
      logoSloganGenerator: 'Генератор логотипа и слогана',
      logoSloganGeneratorDesc: 'Создавайте профессиональный логотип и слоган с помощью ИИ',
      adCreativeGenerator: 'Генератор рекламных креативов',
      adCreativeGeneratorDesc: 'Создавайте профессиональные маркетинговые визуалы с помощью ИИ',
      videoGenerator: 'Генератор видео',
      videoGeneratorDesc: 'Создавайте профессиональные видео с помощью ИИ, используя Kling Video',
      promptPlaceholder: 'например, Запуск нашего нового продукта, отраслевые тренды, корпоративная культура...',
      generate: 'Создать контент',
      generating: 'Создание...',
      productName: 'Название продукта',
      productDescription: 'Описание продукта',
      generateLogoSlogan: 'Создать логотип и слоган',
      saving: 'Сохранение...',
      saveToProfile: 'Сохранить в профиль компании',
      saved: 'Сохранено!',
    },
    socialAccounts: {
      title: 'Социальные аккаунты',
      description: 'Подключите и управляйте своими аккаунтами в социальных сетях',
      loading: 'Загрузка...',
      connect: 'Подключить',
      connecting: 'Подключение...',
      connected: 'Подключено',
      disconnect: 'Отключить',
      disconnecting: 'Отключение...',
      noAccounts: 'Нет подключенных аккаунтов',
      noAccountsDesc: 'Подключите свои аккаунты в социальных сетях, чтобы начать публикацию',
      errorLoading: 'Ошибка загрузки аккаунтов',
      loginRequired: '❌ Требуется вход. Пожалуйста, войдите снова.',
      lastUsed: 'Последнее использование',
      never: 'Никогда',
      active: 'Активен',
      inactive: 'Неактивен',
      disconnectConfirm: 'Вы уверены, что хотите отключить этот аккаунт?',
    },
    analytics: {
      title: 'Аналитика',
      description: 'Отслеживайте производительность в социальных сетях',
      loading: 'Загрузка...',
      noData: 'Нет данных',
      impressions: 'Показы',
      reach: 'Охват',
      clicks: 'Клики',
      spend: 'Расходы',
      cpm: 'CPM',
      cpc: 'CPC',
      ctr: 'CTR',
      conversions: 'Конверсии',
      dateRange: 'Диапазон дат',
      selectAccount: 'Выбрать аккаунт',
      refresh: 'Обновить',
      download: 'Скачать',
    },
    metaAds: {
      title: 'Meta Ads',
      description: 'Управляйте рекламными кампаниями Facebook и Instagram',
      loading: 'Загрузка...',
      connectAccount: 'Подключить рекламный аккаунт',
      noAccounts: 'Нет подключенных рекламных аккаунтов',
      noAccountsDesc: 'Подключите свой рекламный аккаунт Meta для управления кампаниями',
      campaigns: 'Кампании',
      adSets: 'Рекламные наборы',
      ads: 'Объявления',
      createCampaign: 'Создать кампанию',
      active: 'Активна',
      paused: 'Приостановлена',
      archived: 'Архивирована',
    },
    brandVoice: {
      title: 'Голос бренда',
      description: 'Настройте параметры личности ИИ для вашего бренда',
      professional: 'Профессиональный',
      casual: 'Неформальный',
      inspirational: 'Вдохновляющий',
      industry: 'Отрасль',
      targetAudience: 'Целевая аудитория',
      customInstructions: 'Пользовательские инструкции',
      default: 'По умолчанию',
      usageCount: 'Количество использований',
      samplePost: 'Пример поста',
      select: 'Выбрать',
    },
    templates: {
      title: 'Шаблоны',
      description: 'Шаблоны контента для быстрого создания постов',
      all: 'Все',
      announcement: 'Объявление',
      educational: 'Образовательный',
      promotional: 'Рекламный',
      engagement: 'Вовлечение',
      search: 'Поиск шаблонов...',
      useTemplate: 'Использовать шаблон',
      usageCount: 'Использование',
      platforms: 'Платформы',
      variables: 'Переменные',
    },
  },
};

export const useTranslation = (language: Language) => {
  return translations[language];
};

export default translations;

