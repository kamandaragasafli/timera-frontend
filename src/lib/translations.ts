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
  auth: {
    login: {
      title: string;
      description: string;
      emailLabel: string;
      emailPlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      submitButton: string;
      submittingButton: string;
      noAccount: string;
      signUpLink: string;
      errors: {
        invalidEmail: string;
        passwordRequired: string;
        wrongCredentials: string;
        userNotFound: string;
        accountDisabled: string;
        networkError: string;
      };
    };
    register: {
      title: string;
      description: string;
      firstNameLabel: string;
      firstNamePlaceholder: string;
      lastNameLabel: string;
      lastNamePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      companyNameLabel: string;
      companyNamePlaceholder: string;
      passwordLabel: string;
      passwordPlaceholder: string;
      confirmPasswordLabel: string;
      confirmPasswordPlaceholder: string;
      passwordStrength: string;
      passwordStrengthWeak: string;
      passwordStrengthMedium: string;
      passwordStrengthGood: string;
      passwordStrengthStrong: string;
      passwordHint: string;
      passwordsMatch: string;
      submitButton: string;
      submittingButton: string;
      hasAccount: string;
      signInLink: string;
      errors: {
        invalidEmail: string;
        passwordMinLength: string;
        firstNameRequired: string;
        lastNameRequired: string;
        passwordsMismatch: string;
        emailExists: string;
        registrationFailed: string;
      };
    };
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
      setupTitle: string;
      setupDescription: string;
      basicInfo: string;
      basicInfoDesc: string;
      companyLogo: string;
      changeLogo: string;
      uploadLogo: string;
      dragDropLogo: string;
      logoFileTypes: string;
      selectFile: string;
      logoAnalysisHint: string;
      logoAnalyzing: string;
      location: string;
      locationPlaceholder: string;
      companyNamePlaceholder: string;
      selectIndustry: string;
      selectCompanySize: string;
      websitePlaceholder: string;
      validationCompanyNameRequired: string;
      validationIndustryRequired: string;
      validationCompanySizeRequired: string;
      validationUrlInvalid: string;
      validationMinChars: string;
      validationToneRequired: string;
      validationPostsMin: string;
      validationPostsMax: string;
      validationSloganMax: string;
      successProfileCreated: string;
      successProfileUpdated: string;
      successProfileLogoCreated: string;
      successProfileLogoUpdated: string;
      errorSaveFailed: string;
      errorBrandAnalysisNotFound: string;
      errorCompanyNameRequiredForSlogan: string;
      businessDescriptionTitle: string;
      businessDescriptionDesc: string;
      businessDescriptionLabel: string;
      businessDescriptionPlaceholder: string;
      targetAudienceLabel: string;
      targetAudiencePlaceholder: string;
      uniqueSellingPointsLabel: string;
      uniqueSellingPointsPlaceholder: string;
      socialMediaStrategyTitle: string;
      socialMediaStrategyDesc: string;
      socialMediaGoalsLabel: string;
      socialMediaGoalsPlaceholder: string;
      preferredToneLabel: string;
      selectTone: string;
      contentTopicsLabel: string;
      contentTopicsPlaceholder: string;
      contentTopicsHint: string;
      keywordsLabel: string;
      keywordsPlaceholder: string;
      keywordsHint: string;
      avoidTopicsLabel: string;
      avoidTopicsPlaceholder: string;
      avoidTopicsHint: string;
      aiGenerationSettingsTitle: string;
      aiGenerationSettingsDesc: string;
      postsToGenerateLabel: string;
      postsToGenerateHint: string;
      previewTitle: string;
      previewDesc: string;
      previewNotShown: string;
      previewNotSelected: string;
      previewCompany: string;
      previewIndustry: string;
      previewTone: string;
      previewTopics: string;
      brandAnalysisTitle: string;
      brandingParamsTitle: string;
      brandingParamsDesc: string;
      automaticBrandingActive: string;
      automaticBrandingDesc: string;
      brandingRequiresLogo: string;
      sloganLabel: string;
      sloganPlaceholder: string;
      sloganHint: string;
      sloganChars: string;
      brandingMode: string;
      standard: string;
      custom: string;
      standardBrandingParams: string;
      logoPosition: string;
      sloganPosition: string;
      logoSize: string;
      gradient: string;
      standardModeNote: string;
      logoPositionLabel: string;
      logoPositionHint: string;
      sloganPositionLabel: string;
      sloganPositionHint: string;
      logoSizeLabel: string;
      logoSizeSmall: string;
      logoSizeMedium: string;
      logoSizeLarge: string;
      sloganSizeLabel: string;
      sloganSizeSmall: string;
      sloganSizeMedium: string;
      sloganSizeLarge: string;
      gradientEnabled: string;
      gradientColor: string;
      gradientHeight: string;
      gradientPosition: string;
      gradientTop: string;
      gradientBottom: string;
      gradientBoth: string;
      logoPositionTopLeft: string;
      logoPositionTopCenter: string;
      logoPositionTopRight: string;
      logoPositionBottomLeft: string;
      logoPositionBottomCenter: string;
      logoPositionBottomRight: string;
      sloganPositionTopCenter: string;
      sloganPositionBottomCenter: string;
      logoPositionStandard: string;
      sloganPositionStandard: string;
      logoSizeStandard: string;
      gradientStandard: string;
      aiSuggestion: string;
      aiGenerating: string;
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
    privacy: {
      title: string;
      description: string;
      dataRetention: string;
      dataRetentionDesc: string;
      deletedPostsRetention: string;
      deletedPostsRetentionDesc: string;
      immediatelyRemoved: string;
      retainedForDays: string;
      days: string;
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
    messages: string;
    messagesDesc: string;
    socialMediaAnalysis: string;
    socialMediaAnalysisDesc: string;
    adsAnalytics: string;
    adsAnalyticsDesc: string;
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
    publishResultTitle: string;
    publishResultPlatform: string;
    publishResultAccount: string;
    publishResultStatus: string;
    publishResultPostId: string;
    publishResultPostLink: string;
    publishResultSuccess: string;
    publishResultFailed: string;
    publishRequiresApproval: string;
    publishRequiresApprovalTooltip: string;
    reviewGeneratedPosts: string;
    reviewGeneratedPostsDesc: string;
    imagesGenerating: string;
    bulkOperations: string;
    selectedOf: string;
    selectAll: string;
    deselectAll: string;
    postsSelected: string;
    approveSelected: string;
    approve: string;
    rejectSelected: string;
    reject: string;
    postNumber: string;
    characters: string;
    waiting: string;
    postImage: string;
    imageGenerating: string;
    imageUploading: string;
    upload: string;
    uploadImage: string;
    edit: string;
    editPost: string;
    postContent: string;
    description: string;
    hashtags: string;
    saving: string;
    saveChanges: string;
    designSaved: string;
    designSaveFailed: string;
    pleaseSelectAtLeastOne: string;
    confirmApprove: string;
    confirmReject: string;
    postsApproved: string;
    postsRejected: string;
    postUpdateFailed: string;
    imageUploadFailed: string;
    companyProfileNotFound: string;
    companyLogoNotFound: string;
    brandingDisabled: string;
    postNotFound: string;
    noImageInPost: string;
    loginRequired: string;
    brandingApplied: string;
    brandingFailed: string;
    designEditor: string;
    design: string;
    branded: string;
    placeholder: string;
    goToCalendar: string;
    editPostTitle: string;
    editPostDesc: string;
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
    scheduledTime: string;
    publishingTo: string;
    willPublishAutomatically: string;
    recommendedTimeAI: string;
    aiRecommended: string;
    userOverride: string;
    editPost: string;
    editPostDesc: string;
    currentConnectedAccounts: string;
    connected: string;
    notConnected: string;
    connect: string;
    change: string;
    connectInstagramFirst: string;
    connectFacebookFirst: string;
    connectPlatformFirst: string;
    connectFirst: string;
    postingDestination: string;
    titleLabel: string;
    titlePlaceholder: string;
    content: string;
    contentPlaceholder: string;
    characters: string;
    date: string;
    time: string;
    platforms: string;
    selected: string;
    platform: string;
    status: string;
    draft: string;
    scheduled: string;
    published: string;
    preview: string;
    noContent: string;
  };
  aiContentGenerator: {
    title: string;
    description: string;
    loading: string;
  };
  aiTools: {
    title: string;
    description: string;
    allTools: string;
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
  productPost: {
    title: string;
    description: string;
    cardTitle: string;
    cardDescription: string;
    processingStep1: string;
    processingStep2: string;
    processingStep3: string;
    processingStep4: string;
    processingStep5: string;
    processingComplete: string;
    processingStepUrl1: string;
    processingStepUrl2: string;
    processingStepUrl3: string;
    processingStepUrl4: string;
    processingStepUrl5: string;
    errorImageUrlNotFound: string;
    successPostCreated: string;
    errorPostCreationFailed: string;
    successAdImageCreated: string;
    workflowStep1: string;
    workflowStep2: string;
    workflowStep3: string;
    workflowStep4: string;
    workflowStep5: string;
    download: string;
    open: string;
    imageWillBeCreated: string;
    viewPosts: string;
    createNewPost: string;
    imagePreview: string;
    closeModalHint: string;
    productImage: string;
    productImageRequired: string;
    productName: string;
    productNameOptional: string;
    productNamePlaceholder: string;
    adStyle: string;
    adStyleRequired: string;
    adStylePlaceholder: string;
    aspectRatio: string;
    aspectRatioRequired: string;
    aspectRatioPlaceholder: string;
    submit: string;
    processing: string;
    generating: string;
    pleaseWait: string;
    createdPosts: string;
    createdPostsDesc: string;
    createdAdImage: string;
    createdAdImageDesc: string;
    openImage: string;
    approveAndCreate: string;
    analyzing: string;
    selectOption: string;
    modern: string;
    professional: string;
    playful: string;
    elegant: string;
    minimalist: string;
    luxury: string;
    casual: string;
    square: string;
    story: string;
    landscape: string;
    portrait: string;
    facebookPost: string;
    errorImageUpload: string;
    errorLoginRequired: string;
    errorInvalidFile: string;
    errorServerError: string;
    errorFileRequired: string;
    errorUrlRequired: string;
    errorInvalidUrl: string;
    errorImageLoad: string;
    errorWorkflowTimeout: string;
    errorWebhookConnection: string;
    errorSelectAdStyle: string;
  };
  logoGenerator: {
    title: string;
    description: string;
    back: string;
    basicInfo: string;
    basicInfoDesc: string;
    companyName: string;
    companyNamePlaceholder: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    descriptionHint: string;
    logoStyle: string;
    logoStyleDesc: string;
    colorSelection: string;
    colorSelectionDesc: string;
    selectedColor: string;
    categories: string;
    categoriesDesc: string;
    categoriesSelected: string;
    generateButton: string;
    generatingButton: string;
    createdLogo: string;
    createdSlogan: string;
    saveToProfile: string;
    saving: string;
    downloadLogo: string;
    copySlogan: string;
    sloganCopied: string;
    sloganCopyFailed: string;
    logoDownloadFailed: string;
    emptyState: string;
    errorCompanyNameRequired: string;
    errorEmptyResponse: string;
    errorLogoCreationFailed: string;
    errorNoLogo: string;
    errorLogoLoadFailed: string;
    successCreated: string;
    successSaved: string;
    errorSaveFailed: string;
    generatedLogoAlt: string;
    styleMinimalist: string;
    styleMinimalistDesc: string;
    styleElegant: string;
    styleElegantDesc: string;
    styleModern: string;
    styleModernDesc: string;
    styleProfessional: string;
    styleProfessionalDesc: string;
    stylePlayful: string;
    stylePlayfulDesc: string;
    colorBlue: string;
    colorPurple: string;
    colorRed: string;
    colorGreen: string;
    colorOrange: string;
    colorIndigo: string;
    colorBlack: string;
    colorWhite: string;
    tagTech: string;
    tagFinance: string;
    tagHealth: string;
    tagEducation: string;
    tagEcommerce: string;
    tagService: string;
    tagManufacturing: string;
    tagRealEstate: string;
    tagMarketing: string;
    tagDesign: string;
    tagKitchen: string;
    tagFashion: string;
    tagSports: string;
    tagTravel: string;
    tagArt: string;
  };
  hashtagGenerator: {
    title: string;
    description: string;
    headerTitle: string;
    headerDescription: string;
    contentSectionTitle: string;
    contentSectionDesc: string;
    contentLabel: string;
    contentPlaceholder: string;
    companyInfo: string;
    companyName: string;
    industry: string;
    business: string;
    hashtagCount: string;
    hashtagCountLabel: string;
    generateButton: string;
    generatingButton: string;
    generatedHashtags: string;
    generatedHashtagsDesc: string;
    copyAll: string;
    copied: string;
    allHashtags: string;
    copy: string;
    tipsTitle: string;
    tip1: string;
    tip2: string;
    tip3: string;
    tip4: string;
    errorContentRequired: string;
    errorGenerationFailed: string;
  };
  captionOptimizer: {
    title: string;
    description: string;
    headerTitle: string;
    headerDescription: string;
    captionSectionTitle: string;
    captionSectionDesc: string;
    originalCaptionLabel: string;
    captionPlaceholder: string;
    characters: string;
    contentTypeLabel: string;
    contentTypePost: string;
    contentTypeTitle: string;
    contentTypeDescription: string;
    platformLabel: string;
    platformGeneral: string;
    platformInstagram: string;
    platformFacebook: string;
    platformLinkedIn: string;
    toneLabel: string;
    toneProfessional: string;
    toneCasual: string;
    toneCreative: string;
    toneFriendly: string;
    companyInfo: string;
    companyName: string;
    industry: string;
    preferredTone: string;
    optimizeButton: string;
    optimizingButton: string;
    optimizedCaption: string;
    optimizedCaptionDesc: string;
    copy: string;
    copied: string;
    useOptimized: string;
    original: string;
    optimized: string;
    tipsTitle: string;
    tip1: string;
    tip2: string;
    tip3: string;
    tip4: string;
    tip5: string;
    errorCaptionRequired: string;
    errorOptimizationFailed: string;
  };
  videoGenerator: {
    title: string;
    description: string;
    cardTitle: string;
    cardDescription: string;
    methodLabel: string;
    methodText: string;
    methodTextDesc: string;
    methodImage: string;
    methodImageDesc: string;
    promptLabel: string;
    promptPlaceholder: string;
    promptDescription: string;
    imageUploadLabel: string;
    parametersLabel: string;
    durationLabel: string;
    fpsLabel: string;
    widthLabel: string;
    heightLabel: string;
    generateButton: string;
    generatingButton: string;
    errorTitle: string;
    progressMessage: string;
    progressStep1: string;
    progressStep2: string;
    progressStep3: string;
    resultTitle: string;
    resultVideoLabel: string;
    downloadButton: string;
    copyLinkButton: string;
    professionalPromptLabel: string;
    videoInfoLabel: string;
    statusLabel: string;
    jobIdLabel: string;
    errorPromptRequired: string;
    errorImageRequired: string;
    errorLoginRequired: string;
    errorServerError: string;
    errorNetworkError: string;
    errorVideoGenerationFailed: string;
    errorImageToVideo: string;
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
    permissionsPurpose: string;
    permissionsPosting: string;
    permissionsAnalytics: string;
    permissionsMessages: string;
    permissionsAds: string;
    permissionsFacebook: string;
    permissionsLinkedIn: string;
    permissionsTikTok: string;
    permissionsYouTube: string;
    pageId: string;
    instagramId: string;
    connectedAt: string;
    tokenStatus: string;
    tokenActive: string;
    tokenExpired: string;
    disconnectWarning: string;
    platformDescriptionFacebook: string;
    platformDescriptionInstagram: string;
    platformDescriptionLinkedIn: string;
    platformDescriptionYouTube: string;
    platformDescriptionTikTok: string;
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
  companySetup: {
    title: string;
    titleUpdate: string;
    description: string;
    descriptionUpdate: string;
    whyNeededTitle: string;
    benefit1Title: string;
    benefit1Desc: string;
    benefit2Title: string;
    benefit2Desc: string;
    benefit3Title: string;
    benefit3Desc: string;
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
      description: 'Timera.ai is an AI-powered social media management platform. Content creation, scheduling, design, and analytics — all in one place, with your approval.',
      startFree: 'Start Free',
      howItWorksBtn: 'How It Works?',
      stats24_7: '24/7 AI Assistant',
      stats10x: '10x Faster Content',
      stats100: 'AI-Assisted Management',
    },
    features: {
      title: 'What Does Timera.ai Do?',
      subtitle: 'The new era of social media management with artificial intelligence',
      aiContentCreator: {
        title: 'AI Content Creator',
        description: 'AI generates text and visual content suggestions tailored to your brand. You review, edit, and approve before publishing.',
      },
      designVisual: {
        title: 'Design & Visual',
        description: 'AI creates design suggestions that match your brand style. Logo, colors, and tone are analyzed. You approve final design.',
      },
      smartScheduling: {
        title: 'Smart Scheduling',
        description: 'AI recommends optimal posting times and strategy. You review and schedule posts for publishing.',
      },
      analytics: {
        title: 'Analytics & Reports',
        description: 'Real-time analytics and performance measurement. AI suggests the next strategy.',
      },
      videoContent: {
        title: 'Video Content',
        description: 'AI-assisted video content creation tailored to your brand. You review and approve before publishing.',
      },
      secure: {
        title: 'Secure & Legal',
        description: 'Official API integrations and SSL encryption. No personal data is stored.',
      },
    },
    howItWorks: {
      title: 'How It Works?',
      subtitle: 'Manage your social media marketing with AI assistance in 4 simple steps',
      step1: {
        title: 'Enter Information',
        description: 'Provide information about your brand, product, and goals. AI learns from your input.',
      },
      step2: {
        title: 'AI Generates Suggestions',
        description: 'AI generates post topics, text, and visual content suggestions for your review.',
      },
      step3: {
        title: 'Review & Approve',
        description: 'You review, edit any part you want, and approve posts before they go live.',
      },
      step4: {
        title: 'Scheduled Publishing',
        description: 'After your approval, the system publishes posts at scheduled times and tracks results.',
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
          answer: 'Timera.ai is an AI-assisted social media management tool. The platform helps with post creation, scheduling, design, video content preparation, analytics reports, and Meta Ads (Facebook and Instagram ad campaigns) management. You enter your brand information, AI generates suggestions, and you review and approve everything before it goes live.',
        },
        {
          question: '✍️ Does AI create content completely by itself, or can I edit it?',
          answer: 'AI generates content suggestions – text, visual, and video formats. Users must review, edit, and approve all content before publishing. No content is published without your explicit approval. This approach combines the speed of AI with human oversight and creativity.',
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
    auth: {
      login: {
        title: 'Sign In to Timera',
        description: 'Enter your email and password to access your account',
        emailLabel: 'Email',
        emailPlaceholder: 'Enter your email address',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Enter your password',
        submitButton: 'Sign In',
        submittingButton: 'Signing in...',
        noAccount: "Don't have an account?",
        signUpLink: 'Sign up',
        errors: {
          invalidEmail: 'Please enter a valid email address',
          passwordRequired: 'Password is required',
          wrongCredentials: 'Email or password is incorrect',
          userNotFound: 'User with this email address not found',
          accountDisabled: 'Your account has been disabled. Please contact support',
          networkError: 'Could not connect to server. Please check your internet connection',
        },
      },
      register: {
        title: 'Create Account',
        description: 'Get started with Timera',
        firstNameLabel: 'First Name',
        firstNamePlaceholder: 'Your first name',
        lastNameLabel: 'Last Name',
        lastNamePlaceholder: 'Your last name',
        emailLabel: 'Email',
        emailPlaceholder: 'email@example.com',
        companyNameLabel: 'Company Name (Optional)',
        companyNamePlaceholder: 'Your company name',
        passwordLabel: 'Password',
        passwordPlaceholder: 'Create a password',
        confirmPasswordLabel: 'Confirm Password',
        confirmPasswordPlaceholder: 'Re-enter your password',
        passwordStrength: 'Password strength:',
        passwordStrengthWeak: 'Weak',
        passwordStrengthMedium: 'Medium',
        passwordStrengthGood: 'Good',
        passwordStrengthStrong: 'Strong',
        passwordHint: 'Tip: Use uppercase and lowercase letters, numbers, and special characters',
        passwordsMatch: 'Passwords match',
        submitButton: 'Sign Up',
        submittingButton: 'Creating account...',
        hasAccount: 'Already have an account?',
        signInLink: 'Sign In',
        errors: {
          invalidEmail: 'Please enter a valid email address',
          passwordMinLength: 'Password must be at least 8 characters',
          firstNameRequired: 'First name is required',
          lastNameRequired: 'Last name is required',
          passwordsMismatch: 'Passwords do not match',
          emailExists: 'This email address is already in use',
          registrationFailed: 'Registration failed. Please try again',
        },
      },
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
        setupTitle: 'Company Profile Setup',
        setupDescription: 'Help us get to know your business to create better AI content',
        basicInfo: 'Basic Information',
        basicInfoDesc: 'Tell us about your company',
        companyLogo: 'Company Logo',
        changeLogo: 'Change Logo',
        uploadLogo: 'Upload Logo',
        dragDropLogo: 'Drag and drop logo or click to upload',
        logoFileTypes: 'PNG with transparency recommended. JPG or SVG (max 10MB)',
        selectFile: 'Select File',
        logoAnalysisHint: '💡 AI will automatically analyze your logo and extract your brand colors, style, and more information',
        logoAnalyzing: 'AI is analyzing logo...',
        location: 'Location',
        locationPlaceholder: 'City, Country',
        companyNamePlaceholder: 'Your Company Name',
        selectIndustry: 'Select Industry',
        selectCompanySize: 'Select Company Size',
        websitePlaceholder: 'https://yourcompany.com',
        validationCompanyNameRequired: 'Company name is required',
        validationIndustryRequired: 'Industry is required',
        validationCompanySizeRequired: 'Company size is required',
        validationUrlInvalid: 'Please enter a valid URL',
        validationMinChars: 'Please provide a detailed description (at least 10 characters)',
        validationToneRequired: 'Please select preferred tone',
        validationPostsMin: 'Minimum 1 post',
        validationPostsMax: 'Maximum 30 posts',
        validationSloganMax: 'Slogan can be maximum 200 characters',
        successProfileCreated: 'Company profile successfully created!',
        successProfileUpdated: 'Company profile successfully updated!',
        successProfileLogoCreated: 'Company profile and logo successfully created!',
        successProfileLogoUpdated: 'Company profile and logo successfully updated!',
        errorSaveFailed: 'Could not save company profile. Please try again.',
        errorBrandAnalysisNotFound: 'Brand analysis data not found',
        errorCompanyNameRequiredForSlogan: 'Company name is required to create slogan',
        businessDescriptionTitle: 'Business Description',
        businessDescriptionDesc: 'Help AI better understand your business',
        businessDescriptionLabel: 'What does your company do? *',
        businessDescriptionPlaceholder: 'Describe your business, products or services in detail...',
        targetAudienceLabel: 'Who is your target audience? *',
        targetAudiencePlaceholder: 'Describe your ideal customers, their demographics, interests and needs...',
        uniqueSellingPointsLabel: 'What makes your company unique? *',
        uniqueSellingPointsPlaceholder: 'Describe your competitive advantages, unique features or special qualities...',
        socialMediaStrategyTitle: 'Social Media Strategy',
        socialMediaStrategyDesc: 'Define your social media goals and preferences',
        socialMediaGoalsLabel: 'What are your social media goals? *',
        socialMediaGoalsPlaceholder: 'e.g., Increase brand awareness, acquire potential customers, connect with customers, drive traffic to website...',
        preferredToneLabel: 'Preferred Communication Tone *',
        selectTone: 'Select Tone',
        contentTopicsLabel: 'Content Topics',
        contentTopicsPlaceholder: 'technology, innovation, tips, news',
        contentTopicsHint: 'Separate topics with commas',
        keywordsLabel: 'Important Keywords',
        keywordsPlaceholder: 'AI, automation, efficiency, development',
        keywordsHint: 'Separate keywords with commas',
        avoidTopicsLabel: 'Topics to Avoid (Optional)',
        avoidTopicsPlaceholder: 'politics, controversial topics, competitors',
        avoidTopicsHint: 'Separate topics with commas',
        aiGenerationSettingsTitle: 'AI Generation Settings',
        aiGenerationSettingsDesc: 'Settings related to AI content generation',
        postsToGenerateLabel: 'How Many Posts to Generate Each Time?',
        postsToGenerateHint: 'AI will create this many posts at once. Recommendation: 10-15 is considered optimal.',
        previewTitle: 'Preview',
        previewDesc: 'This information will be used to create AI content',
        previewNotShown: 'Not Shown',
        previewNotSelected: 'Not Selected',
        previewCompany: 'Company',
        previewIndustry: 'Industry',
        previewTone: 'Tone',
        previewTopics: 'Topics',
        brandAnalysisTitle: 'AI Brand Analysis',
        brandingParamsTitle: 'Branding Parameters',
        brandingParamsDesc: 'Automatically add company logo and slogan to AI-generated images',
        automaticBrandingActive: 'Automatic Branding Active',
        automaticBrandingDesc: 'Logo and slogan will be automatically added to all new AI-generated images',
        brandingRequiresLogo: '⚠️ You must upload a logo to enable branding. Upload a logo from the "Company Logo" section above.',
        sloganLabel: 'Slogan (Optional)',
        sloganPlaceholder: 'e.g., Transform Your Social Media',
        sloganHint: 'Text to be displayed next to the logo in images',
        sloganChars: 'characters',
        brandingMode: 'Branding Mode',
        standard: 'Standard',
        custom: 'Custom',
        standardBrandingParams: 'Standard Branding Parameters',
        logoPosition: 'Logo Position:',
        sloganPosition: 'Slogan Position:',
        logoSize: 'Logo Size:',
        gradient: 'Gradient:',
        standardModeNote: '✨ Standard mode: Automatic gradient overlays will be added for logo and slogan',
        logoPositionLabel: 'Logo Position',
        logoPositionHint: 'Select logo position (with gradient overlay)',
        sloganPositionLabel: 'Slogan Position',
        sloganPositionHint: 'Slogan will appear with gradient overlay',
        logoSizeLabel: 'Logo Size',
        logoSizeSmall: 'Small (2%)',
        logoSizeMedium: 'Medium (13%)',
        logoSizeLarge: 'Large (25%)',
        sloganSizeLabel: 'Slogan Size',
        sloganSizeSmall: 'Small (2%)',
        sloganSizeMedium: 'Medium (4%)',
        sloganSizeLarge: 'Large (8%)',
        gradientEnabled: 'Gradient Overlay',
        gradientColor: 'Gradient Color',
        gradientHeight: 'Gradient Height',
        gradientPosition: 'Gradient Position',
        gradientTop: 'Top',
        gradientBottom: 'Bottom',
        gradientBoth: 'Both',
        logoPositionTopLeft: 'Top Left',
        logoPositionTopCenter: 'Top Center',
        logoPositionTopRight: 'Top Right',
        logoPositionBottomLeft: 'Bottom Left',
        logoPositionBottomCenter: 'Bottom Center',
        logoPositionBottomRight: 'Bottom Right',
        sloganPositionTopCenter: 'Top Center',
        sloganPositionBottomCenter: 'Bottom Center',
        logoPositionStandard: 'Top Center (with Gradient)',
        sloganPositionStandard: 'Bottom Center (with Gradient)',
        logoSizeStandard: '13% of image width',
        gradientStandard: 'Automatic (Brand colors)',
        aiSuggestion: 'AI Suggestion',
        aiGenerating: 'AI Creating...',
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
      privacy: {
        title: 'Privacy & Data Retention',
        description: 'Manage how your data is stored and retained',
        dataRetention: 'Data Retention Policy',
        dataRetentionDesc: 'Configure how long deleted posts are retained',
        deletedPostsRetention: 'Deleted Posts Retention',
        deletedPostsRetentionDesc: 'Rejected posts are retained for X days or immediately removed',
        immediatelyRemoved: 'Immediately Removed',
        retainedForDays: 'Retained for {days} days',
        days: 'days',
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
      messages: 'Messages & Inbox',
      messagesDesc: 'Customer messages and inbox center',
      socialMediaAnalysis: 'Social Media Analysis',
      socialMediaAnalysisDesc: 'Profile and content analysis',
      adsAnalytics: 'Meta Ads Analytics',
      adsAnalyticsDesc: 'Campaign insights',
      metaAds: 'Meta Ads Manager',
      metaAdsDesc: 'Campaign management',
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
      publishResultTitle: 'Publish Result',
      publishResultPlatform: 'Platform',
      publishResultAccount: 'Target Account',
      publishResultStatus: 'Status',
      publishResultPostId: 'Post ID',
      publishResultPostLink: 'Post Link',
      publishResultSuccess: 'Success',
      publishResultFailed: 'Failed',
      publishRequiresApproval: 'Requires Approval',
      publishRequiresApprovalTooltip: 'This post must be approved before it can be published',
      reviewGeneratedPosts: 'Review Generated Posts',
      reviewGeneratedPostsDesc: 'Review, edit and approve AI-generated content',
      imagesGenerating: 'Images are being generated in the background and will load automatically',
      bulkOperations: 'Bulk Operations',
      selectedOf: 'selected of',
      selectAll: 'Select All',
      deselectAll: 'Deselect All',
      postsSelected: 'posts selected',
      approveSelected: 'Approve Selected',
      approve: 'Approve',
      rejectSelected: 'Reject Selected',
      reject: 'Reject',
      postNumber: 'Post',
      characters: 'characters',
      waiting: 'Waiting',
      postImage: 'Post Image',
      imageGenerating: 'Image is being generated...',
      imageUploading: 'Image Uploading...',
      upload: 'Upload',
      uploadImage: 'Upload Image',
      edit: 'Edit',
      editPost: 'Edit Post',
      postContent: 'Post Content',
      description: 'Description',
      hashtags: 'Hashtags',
      saving: 'Saving...',
      saveChanges: 'Save Changes',
      designSaved: 'Design saved successfully!',
      designSaveFailed: 'Failed to save design',
      pleaseSelectAtLeastOne: 'Please select at least one post to approve.',
      pleaseSelectAtLeastOneReject: 'Please select at least one post to reject.',
      confirmApprove: 'posts will be approved?',
      confirmReject: 'posts will be rejected?',
      postsApproved: 'Posts could not be approved. Please try again.',
      postsRejected: 'Posts could not be rejected. Please try again.',
      postUpdateFailed: 'Post could not be updated. Please try again.',
      imageUploadFailed: 'Image could not be uploaded. Please try again.',
      companyProfileNotFound: 'Company profile not found. Please fill in company information first.',
      companyLogoNotFound: 'Company logo not found. Please upload logo first.',
      brandingDisabled: 'Branding is disabled. Enable it in settings.',
      postNotFound: 'Post not found.',
      noImageInPost: 'This post has no image.',
      loginRequired: 'Login required. Please log in again.',
      brandingApplied: 'Branding applied successfully! ✨',
      brandingFailed: 'Branding could not be applied',
      designEditor: 'Design Editor',
      design: 'Design',
      branded: 'Branded',
      placeholder: 'Placeholder',
      goToCalendar: 'Go to Calendar',
      editPostTitle: 'Edit Post',
      editPostDesc: 'Modify AI-generated content according to your needs',
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
      scheduledTime: 'Scheduled Time',
      publishingTo: 'Publishing to',
      willPublishAutomatically: 'Will publish automatically',
      recommendedTimeAI: 'Recommended Time (AI)',
      aiRecommended: 'AI Recommended',
      userOverride: 'You can override this time',
      editPost: 'Edit Post',
      editPostDesc: 'Modify post content, scheduling, and platforms',
      currentConnectedAccounts: 'Current Connected Accounts',
      connected: 'Connected',
      notConnected: 'Not connected',
      connect: 'Connect',
      change: 'Change',
      connectInstagramFirst: 'Connect Instagram first',
      connectFacebookFirst: 'Connect Facebook Page first',
      connectPlatformFirst: 'Connect platform first',
      connectFirst: 'Connect first',
      postingDestination: 'Posts will be published from your connected accounts. Manage connections in Social Accounts.',
      titleLabel: 'Title',
      titlePlaceholder: 'Post title...',
      content: 'Content',
      contentPlaceholder: 'Write post content...',
      characters: 'characters',
      date: 'Date',
      time: 'Time',
      platforms: 'Platforms',
      selected: 'Selected',
      platform: 'platform',
      status: 'Status',
      draft: 'Draft',
      scheduled: 'Scheduled',
      published: 'Published',
      preview: 'Preview',
      noContent: 'No content...',
    },
    aiContentGenerator: {
      title: 'AI Content Generator',
      description: 'Generate engaging social media posts with AI',
      loading: 'Loading...',
    },
    aiTools: {
      title: 'AI Tools',
      description: 'Leverage AI to create better social media content',
      allTools: 'All AI Tools',
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
      videoGeneratorDesc: 'Create professional videos with AI',
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
    productPost: {
      title: 'Product Post Creator',
      description: 'Upload a product image, AI will remove the background, analyze it, and create ad posts',
      cardTitle: 'Product Ad Image Generator',
      cardDescription: 'Upload a product image to generate a professional marketing advertisement',
      processingStep1: 'Step 1: Image Processing - Background Removal...',
      processingStep2: 'Step 2: Product Analysis - Structured Analysis...',
      processingStep3: 'Step 3: Ad Content - Hook, Body and CTA...',
      processingStep4: 'Step 4: AI Prompt Creation...',
      processingStep5: 'Step 5: Professional Images with Nano Banana...',
      processingComplete: 'Posts completed...',
      processingStepUrl1: 'Step 1: Website content is being extracted...',
      processingStepUrl2: 'Step 2: Product information is analyzed with AI...',
      processingStepUrl3: 'Step 3: Product image is being uploaded...',
      processingStepUrl4: 'Step 4: Background is being removed...',
      processingStepUrl5: 'Step 5: Professional Images with Nano Banana...',
      errorImageUrlNotFound: 'Image URL not found',
      successPostCreated: 'Post successfully created and added to posts/ section!',
      errorPostCreationFailed: 'Post could not be created',
      successAdImageCreated: 'Ad image successfully created',
      workflowStep1: 'Workflow completed',
      workflowStep2: 'Ad image created',
      workflowStep3: '',
      workflowStep4: '',
      workflowStep5: '',
      download: 'Download',
      open: 'Open',
      imageWillBeCreated: 'Image will be created',
      viewPosts: 'View Posts',
      createNewPost: 'Create New Post',
      imagePreview: 'Image Preview',
      closeModalHint: 'Press ESC to close or click outside',
      productImage: 'Product Image',
      productImageRequired: 'Product Image',
      productName: 'Product Name (Optional)',
      productNameOptional: 'Product Name (Optional)',
      productNamePlaceholder: 'e.g., iPhone 15 Pro',
      adStyle: 'Ad Style',
      adStyleRequired: 'Ad Style',
      adStylePlaceholder: 'Select an option...',
      aspectRatio: 'Aspect Ratio',
      aspectRatioRequired: 'Aspect Ratio',
      aspectRatioPlaceholder: 'Select an option...',
      submit: 'Submit',
      processing: 'Processing...',
      generating: 'Creating ad image...',
      pleaseWait: 'Please wait',
      createdPosts: 'Created Posts',
      createdPostsDesc: 'post(s) successfully created',
      createdAdImage: 'Created Ad Image',
      createdAdImageDesc: 'AI-generated professional ad image',
      openImage: 'Open Image',
      approveAndCreate: 'Approve and Create Post',
      analyzing: 'Analyzing...',
      selectOption: 'Select an option...',
      modern: 'Modern',
      professional: 'Professional',
      playful: 'Playful',
      elegant: 'Elegant',
      minimalist: 'Minimalist',
      luxury: 'Luxury',
      casual: 'Casual',
      square: '1:1 (Square - 1080x1080)',
      story: '9:16 (Story - 1080x1920)',
      landscape: '16:9 (Landscape - 1920x1080)',
      portrait: '4:5 (Portrait - 1080x1350)',
      facebookPost: '1.91:1 (Facebook Post - 1200x628)',
      errorImageUpload: 'Failed to upload image',
      errorLoginRequired: 'Login required. Please log in again.',
      errorInvalidFile: 'Invalid image file',
      errorServerError: 'Server error. Please try again later.',
      errorFileRequired: 'Image file is required',
      errorUrlRequired: 'Image URL is required. Please upload an image.',
      errorInvalidUrl: 'Image URL is not in valid format: {url}',
      errorImageLoad: 'Failed to load image: {status} {statusText}',
      errorWorkflowTimeout: 'Workflow took too long (more than 5 minutes). Please try again.',
      errorWebhookConnection: 'Could not connect to webhook. Please check your internet connection.',
      errorSelectAdStyle: 'Please select Ad Style and Aspect Ratio',
    },
    logoGenerator: {
      title: 'Logo & Slogan Generator',
      description: 'Create professional logo and slogan for your company',
      back: 'Back',
      basicInfo: 'Basic Information',
      basicInfoDesc: 'Enter information about your company',
      companyName: 'Company/Product Name *',
      companyNamePlaceholder: 'e.g., Timera, TechStart',
      descriptionLabel: 'Description *',
      descriptionPlaceholder: 'Describe your company or product...',
      descriptionHint: 'More detailed description will create better logo and slogan',
      logoStyle: 'Logo Style',
      logoStyleDesc: 'Select logo design style',
      colorSelection: 'Color Selection',
      colorSelectionDesc: 'Select the main color for the logo',
      selectedColor: 'Selected color:',
      categories: 'Categories (Tags)',
      categoriesDesc: 'Select the industries your company belongs to',
      categoriesSelected: 'categories selected',
      generateButton: 'Create Logo and Slogan',
      generatingButton: 'Creating Logo...',
      createdLogo: 'Created Logo',
      createdSlogan: 'Created Slogan',
      saveToProfile: 'Add to Company Profile',
      saving: 'Adding...',
      downloadLogo: 'Download Logo',
      copySlogan: 'Copy Slogan',
      sloganCopied: '✅ Slogan copied!',
      sloganCopyFailed: 'Slogan could not be copied',
      logoDownloadFailed: 'Logo could not be downloaded',
      emptyState: 'Logo and slogan will appear here after creation',
      errorCompanyNameRequired: 'Please enter company name and description',
      errorEmptyResponse: 'Empty response received',
      errorLogoCreationFailed: 'Logo could not be created',
      errorNoLogo: '⚠️ No logo. Please create a logo first.',
      errorLogoLoadFailed: 'Logo could not be loaded',
      errorTitle: 'Error',
      successCreated: '✅ Logo and slogan successfully created!',
      successSaved: '✅ Logo and slogan successfully added to company profile!',
      errorSaveFailed: 'Could not be added to company profile',
      generatedLogoAlt: 'Generated Logo',
      styleMinimalist: 'Minimalist',
      styleMinimalistDesc: 'Simple and clean',
      styleElegant: 'Elegant',
      styleElegantDesc: 'Refined and delicate',
      styleModern: 'Modern',
      styleModernDesc: 'Contemporary and dynamic',
      styleProfessional: 'Professional',
      styleProfessionalDesc: 'For business',
      stylePlayful: 'Playful',
      stylePlayfulDesc: 'Cheerful and colorful',
      colorBlue: 'Blue',
      colorPurple: 'Purple',
      colorRed: 'Red',
      colorGreen: 'Green',
      colorOrange: 'Orange',
      colorIndigo: 'Indigo',
      colorBlack: 'Black',
      colorWhite: 'White',
      tagTech: 'Tech',
      tagFinance: 'Finance',
      tagHealth: 'Health',
      tagEducation: 'Education',
      tagEcommerce: 'E-commerce',
      tagService: 'Service',
      tagManufacturing: 'Manufacturing',
      tagRealEstate: 'Real Estate',
      tagMarketing: 'Marketing',
      tagDesign: 'Design',
      tagKitchen: 'Kitchen',
      tagFashion: 'Fashion',
      tagSports: 'Sports',
      tagTravel: 'Travel',
      tagArt: 'Art',
    },
    hashtagGenerator: {
      title: 'Hashtag Generator',
      description: 'Create hashtags suitable for your company',
      headerTitle: '#️⃣ Hashtag Generator',
      headerDescription: 'Create hashtags suitable for your company information and post content',
      contentSectionTitle: 'Post Content',
      contentSectionDesc: 'Enter post content to create hashtags (optional)',
      contentLabel: 'Content',
      contentPlaceholder: 'e.g., Introducing our new product! 🚀',
      companyInfo: 'Company Information:',
      companyName: 'Company:',
      industry: 'Industry:',
      business: 'Business:',
      hashtagCount: 'Hashtag Count',
      hashtagCountLabel: 'hashtags',
      generateButton: 'Create Hashtags',
      generatingButton: 'Creating Hashtags...',
      generatedHashtags: 'Generated Hashtags',
      generatedHashtagsDesc: 'hashtags created',
      copyAll: 'Copy All',
      copied: 'Copied',
      allHashtags: 'All Hashtags:',
      copy: 'Copy',
      tipsTitle: '💡 Tips',
      tip1: '• Entering post content will give you more relevant hashtags',
      tip2: '• Your company information is automatically used',
      tip3: '• Keep hashtag count between 15-25 (for optimal performance)',
      tip4: '• A mix of popular and niche hashtags gives the best results',
      errorContentRequired: 'Please enter post content or company information',
      errorGenerationFailed: 'Hashtags could not be created. Please try again.',
    },
    captionOptimizer: {
      title: 'Caption Optimizer',
      description: 'Optimize your captions for better engagement',
      headerTitle: '📝 Caption Optimizer',
      headerDescription: 'Optimize your captions for better engagement',
      captionSectionTitle: 'Caption / Title',
      captionSectionDesc: 'Enter the caption or title you want to optimize',
      originalCaptionLabel: 'Original Caption',
      captionPlaceholder: 'e.g., Introducing our new product!',
      characters: 'characters',
      contentTypeLabel: 'Content Type',
      contentTypePost: 'Post',
      contentTypeTitle: 'Title',
      contentTypeDescription: 'Description',
      platformLabel: 'Platform',
      platformGeneral: 'General',
      platformInstagram: 'Instagram',
      platformFacebook: 'Facebook',
      platformLinkedIn: 'LinkedIn',
      toneLabel: 'Tone',
      toneProfessional: 'Professional',
      toneCasual: 'Casual',
      toneCreative: 'Creative',
      toneFriendly: 'Friendly',
      companyInfo: 'Company Information:',
      companyName: 'Company:',
      industry: 'Industry:',
      preferredTone: 'Preferred Tone:',
      optimizeButton: 'Optimize',
      optimizingButton: 'Optimizing...',
      optimizedCaption: 'Optimized Caption',
      optimizedCaptionDesc: 'characters (change)',
      copy: 'Copy',
      copied: 'Copied',
      useOptimized: 'Use',
      original: 'Original',
      optimized: 'Optimized',
      tipsTitle: '💡 Tips',
      tip1: '• Choose platform-appropriate captions (Instagram, Facebook, LinkedIn)',
      tip2: '• Tone selection should match your brand',
      tip3: '• Short and engaging captions perform better',
      tip4: '• Don\'t forget to add a call-to-action',
      tip5: '• Try different variants and choose the best one',
      errorCaptionRequired: 'Please enter a caption or title',
      errorOptimizationFailed: 'Caption could not be optimized. Please try again.',
    },
    videoGenerator: {
      title: 'AI Video Generator',
      description: 'Create professional videos with AI',
      cardTitle: 'Create Video',
      cardDescription: 'Create professional videos from images with AI',
      methodLabel: 'Video Creation Method',
      methodText: 'Video from Text',
      methodTextDesc: 'Write a prompt, let video be created',
      methodImage: 'Video from Image',
      methodImageDesc: 'Upload an image, let it be a moving video',
      promptLabel: 'AI Prompt *',
      promptPlaceholder: 'e.g., A beautiful sunset over mountains with birds flying, cinematic camera movement, slow motion',
      promptDescription: 'The prompt will be enriched with professional video terminology in the background',
      imageUploadLabel: 'Upload Image *',
      parametersLabel: 'Video Parameters',
      durationLabel: 'Duration (seconds)',
      fpsLabel: 'FPS (Frame per Second)',
      widthLabel: 'Width (px)',
      heightLabel: 'Height (px)',
      generateButton: 'Create Video',
      generatingButton: 'Creating Video...',
      errorTitle: 'An error occurred',
      progressMessage: 'Creating video... (30-60 seconds)',
      progressStep1: '📝 Prompt',
      progressStep2: '🎬 Video',
      progressStep3: '✨ Complete',
      resultTitle: 'Generated Video',
      resultVideoLabel: 'Generated Video',
      downloadButton: 'Download',
      copyLinkButton: 'Copy Link',
      professionalPromptLabel: 'Professional Prompt:',
      videoInfoLabel: 'Video Information:',
      statusLabel: 'Status:',
      jobIdLabel: 'Job ID:',
      errorPromptRequired: 'Enter a prompt',
      errorImageRequired: 'Upload an image for video',
      errorLoginRequired: 'Not logged in. Please log in again.',
      errorServerError: 'Server error (500). Contact backend developer.',
      errorNetworkError: 'Network error. Cannot connect to backend server.',
      errorVideoGenerationFailed: 'Video could not be created',
      errorImageToVideo: 'Image-to-video error: {error}',
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
      permissionsPurpose: 'What are these permissions for?',
      permissionsPosting: 'Posting: To publish content to your Facebook Pages and Instagram account',
      permissionsAnalytics: 'Analytics: To track the performance of your posts',
      permissionsMessages: 'Messages: To manage customer messages and conversations',
      permissionsAds: 'Ads: To manage advertising campaigns',
      permissionsFacebook: 'Posting: To publish content to your Facebook Pages and groups. Analytics: To track post performance, reach, and engagement. Messages: To manage customer messages and conversations. Ads: To manage Facebook advertising campaigns.',
      permissionsLinkedIn: 'Posting: To publish content to your LinkedIn company pages and personal profile. Analytics: To track post performance, views, and engagement metrics. Messaging: To manage professional messages and connections.',
      permissionsTikTok: 'Posting: To publish videos to your TikTok account. Analytics: To track video performance, views, and engagement metrics.',
      permissionsYouTube: 'Video Upload: To upload videos to your YouTube channel. Analytics: To track video performance, views, watch time, and subscriber metrics. Channel Management: To manage your channel settings and content.',
      pageId: 'Page ID',
      instagramId: 'Instagram ID',
      connectedAt: 'Connected at',
      tokenStatus: 'Token Status',
      tokenActive: 'Active',
      tokenExpired: 'Expired',
      disconnectWarning: 'When you disconnect, the access token will be deleted and webhooks will be stopped.',
      platformDescriptionFacebook: 'Share to pages and groups',
      platformDescriptionInstagram: 'Share photos and stories',
      platformDescriptionLinkedIn: 'Professional network and business shares',
      platformDescriptionYouTube: 'Video sharing and channel management',
      platformDescriptionTikTok: 'Short video sharing',
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
    companySetup: {
      title: 'Complete Setup',
      titleUpdate: 'Update Company Profile',
      description: 'Tell us about your company to create great content',
      descriptionUpdate: 'Update your company information for better AI content',
      whyNeededTitle: 'Why This Information Is Needed',
      benefit1Title: 'Better AI Content',
      benefit1Desc: 'AI will create content tailored to your business and audience',
      benefit2Title: 'Targeted Messages',
      benefit2Desc: 'Posts will be customized to your specific industry and goals',
      benefit3Title: 'Content in Your Language',
      benefit3Desc: 'All content will be created in perfect language',
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
      description: 'Timera.ai — AI əsaslı sosial media idarəetmə platformasıdır. Kontent yaradılması, planlaşdırma, dizayn və analitik — hamısı bir yerdə, sizin təsdiqi ilə.',
      startFree: 'Pulsuz Başlayın',
      howItWorksBtn: 'Necə İşləyir?',
      stats24_7: 'Yorulmayan AI Asistan',
      stats10x: 'Daha Sürətli Kontent',
      stats100: 'AI Dəstəyi',
    },
    features: {
      title: 'Timera.ai Nə Edir?',
      subtitle: 'Süni intellektlə sosial media idarəçiliyinin yeni dövrü',
      aiContentCreator: {
        title: 'AI Kontent Yaradıcısı',
        description: 'AI brendinizə uyğun mətn və vizual kontent təklifləri yaradır. Siz yoxlayır, redaktə edir və təsdiq edirsiniz.',
      },
      designVisual: {
        title: 'Dizayn & Vizual',
        description: 'AI brend stilinizə uyğun dizayn təklifləri hazırlayır. Loqo, rəng və ton təhlil edilir. Siz son dizaynı təsdiq edirsiniz.',
      },
      smartScheduling: {
        title: 'Ağıllı Planlaşdırma',
        description: 'AI optimal vaxt və strategiya tövsiyələri verir. Siz paylaşımları yoxlayır və planlaşdırırsınız.',
      },
      analytics: {
        title: 'Analitik & Hesabat',
        description: 'Real vaxt analitikası və nəticə ölçümü. AI növbəti strategiyanı təklif edir.',
      },
      videoContent: {
        title: 'Video Kontent',
        description: 'AI dəstəyi ilə markaya uyğun video kontent hazırlanır. Siz yoxlayır və təsdiq edirsiniz.',
      },
      secure: {
        title: 'Təhlükəsiz & Qanuni',
        description: 'Rəsmi API inteqrasiyaları və SSL şifrələmə. Heç bir şəxsi məlumat saxlanılmır.',
      },
    },
    howItWorks: {
      title: 'Necə İşləyir?',
      subtitle: '4 sadə addımda AI dəstəyi ilə sosial media marketinqinizi idarə edin',
      step1: {
        title: 'Məlumat Daxil Edin',
        description: 'Brend, məhsul və məqsəd barədə məlumat verin. AI sizin məlumatlarınızdan öyrənir.',
      },
      step2: {
        title: 'AI Təkliflər Yaradır',
        description: 'AI post mövzuları, mətn və vizual kontent təklifləri hazırlayır.',
      },
      step3: {
        title: 'Yoxlayın və Təsdiq Edin',
        description: 'Siz bütün təklifləri yoxlayır, istədiyiniz hissəni redaktə edir və təsdiq edirsiniz.',
      },
      step4: {
        title: 'Planlaşdırılmış Yayım',
        description: 'Təsdiqdən sonra sistem planlaşdırılmış vaxtda paylaşımları yayımlayır və nəticələri izləyir.',
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
          answer: 'Timera.ai – AI dəstəkli sosial media idarəetmə alətidir. Platforma post yaradılması, planlaşdırma, dizayn, video kontent hazırlığı, analitik hesabatlar və Meta Ads (Facebook və Instagram reklam kampaniyaları) idarəsində kömək edir. Siz brend məlumatlarını daxil edirsiniz, AI təkliflər yaradır, siz yoxlayır və təsdiq edirsiniz.',
        },
        {
          question: '✍️ AI kontenti tam özü yaradır, yoxsa mən redaktə edə bilərəm?',
          answer: 'AI kontent təklifləri yaradır – mətn, vizual və video formatda. İstifadəçi bütün məzmunu yoxlamalı, redaktə etməli və təsdiq etməlidir. Heç bir məzmun sizin açıq təsdiqi olmadan dərc edilmir. Bu yanaşma AI-in sürətini və insan nəzarətini birləşdirir.',
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
    auth: {
      login: {
        title: 'Timera-ya Daxil Olun',
        description: 'Hesabınıza daxil olmaq üçün e-poçt və şifrənizi daxil edin',
        emailLabel: 'E-poçt',
        emailPlaceholder: 'E-poçt ünvanınızı daxil edin',
        passwordLabel: 'Şifrə',
        passwordPlaceholder: 'Şifrənizi daxil edin',
        submitButton: 'Daxil Ol',
        submittingButton: 'Daxil olunur...',
        noAccount: 'Hesabınız yoxdur?',
        signUpLink: 'Qeydiyyatdan keçin',
        errors: {
          invalidEmail: 'Zəhmət olmasa düzgün e-poçt ünvanı daxil edin',
          passwordRequired: 'Şifrə tələb olunur',
          wrongCredentials: 'E-poçt və ya şifrə yanlışdır',
          userNotFound: 'Bu e-poçt ünvanı ilə istifadəçi tapılmadı',
          accountDisabled: 'Hesabınız deaktiv edilib. Zəhmət olmasa dəstək ilə əlaqə saxlayın',
          networkError: 'Serverlə əlaqə qurula bilmədi. İnternet bağlantınızı yoxlayın',
        },
      },
      register: {
        title: 'Hesab Yaradın',
        description: 'Timera ilə işə başlayın',
        firstNameLabel: 'Ad',
        firstNamePlaceholder: 'Adınız',
        lastNameLabel: 'Soyad',
        lastNamePlaceholder: 'Soyadınız',
        emailLabel: 'E-poçt',
        emailPlaceholder: 'epoct@numune.az',
        companyNameLabel: 'Şirkət Adı (İstəyə Bağlı)',
        companyNamePlaceholder: 'Şirkətinizin adı',
        passwordLabel: 'Şifrə',
        passwordPlaceholder: 'Şifrə yaradın',
        confirmPasswordLabel: 'Şifrəni Təsdiq Et',
        confirmPasswordPlaceholder: 'Şifrəni təkrar daxil edin',
        passwordStrength: 'Şifrə gücü:',
        passwordStrengthWeak: 'Zəif',
        passwordStrengthMedium: 'Orta',
        passwordStrengthGood: 'Yaxşı',
        passwordStrengthStrong: 'Güclü',
        passwordHint: 'İpucu: Böyük və kiçik hərflər, rəqəmlər və xüsusi simvollar istifadə edin',
        passwordsMatch: 'Şifrələr uyğundur',
        submitButton: 'Qeydiyyatdan Keç',
        submittingButton: 'Hesab yaradılır...',
        hasAccount: 'Artıq hesabınız var?',
        signInLink: 'Daxil Ol',
        errors: {
          invalidEmail: 'Zəhmət olmasa düzgün e-poçt ünvanı daxil edin',
          passwordMinLength: 'Şifrə ən azı 8 simvol olmalıdır',
          firstNameRequired: 'Ad tələb olunur',
          lastNameRequired: 'Soyad tələb olunur',
          passwordsMismatch: 'Şifrələr uyğun gəlmir',
          emailExists: 'Bu e-poçt ünvanı artıq istifadə olunur',
          registrationFailed: 'Qeydiyyat uğursuz oldu. Zəhmət olmasa yenidən cəhd edin',
        },
      },
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
        setupTitle: 'Şirkət Profili Quraşdırması',
        setupDescription: 'Daha yaxşı AI məzmunu yaratmaq üçün bizə biznesinizi tanıtmağa kömək edin',
        basicInfo: 'Əsas Məlumat',
        basicInfoDesc: 'Bizə şirkətiniz haqqında məlumat verin',
        companyLogo: 'Şirkət Loqosu',
        changeLogo: 'Loqonu Dəyişdir',
        uploadLogo: 'Loqonu Yüklə',
        dragDropLogo: 'Loqonu yükləyin və ya sürüşdürün',
        logoFileTypes: 'PNG şəffaflıqla tövsiyə olunur. JPG və ya SVG (max 10MB)',
        selectFile: 'Fayl Seçin',
        logoAnalysisHint: '💡 AI loqonuzu avtomatik təhlil edəcək və brend rənglərinizi, stilinizi və daha çox məlumatı əldə edəcək',
        logoAnalyzing: 'AI loqonu təhlil edir...',
        location: 'Yer',
        locationPlaceholder: 'Şəhər, Ölkə',
        companyNamePlaceholder: 'Şirkətinizin Adı',
        selectIndustry: 'Sənaye Seçin',
        selectCompanySize: 'Şirkət Ölçüsünü Seçin',
        websitePlaceholder: 'https://sirketiniz.com',
        validationCompanyNameRequired: 'Şirkət adı tələb olunur',
        validationIndustryRequired: 'Sənaye tələb olunur',
        validationCompanySizeRequired: 'Şirkət ölçüsü tələb olunur',
        validationUrlInvalid: 'Zəhmət olmasa düzgün URL daxil edin',
        validationMinChars: 'Zəhmət olmasa ətraflı təsvir verin (ən azı 10 simvol)',
        validationToneRequired: 'Zəhmət olmasa üstünlük verilən üslubu seçin',
        validationPostsMin: 'Minimum 1 paylaşım',
        validationPostsMax: 'Maksimum 30 paylaşım',
        validationSloganMax: 'Slogan maksimum 200 simvol ola bilər',
        successProfileCreated: 'Şirkət profili uğurla yaradıldı!',
        successProfileUpdated: 'Şirkət profili uğurla yeniləndi!',
        successProfileLogoCreated: 'Şirkət profili və loqo uğurla yaradıldı!',
        successProfileLogoUpdated: 'Şirkət profili və loqo uğurla yeniləndi!',
        errorSaveFailed: 'Şirkət profilini yadda saxlamaq alınmadı. Zəhmət olmasa yenidən cəhd edin.',
        errorBrandAnalysisNotFound: 'Brend təhlili məlumatı yoxdur',
        errorCompanyNameRequiredForSlogan: 'Slogan yaratmaq üçün şirkət adı tələb olunur',
        businessDescriptionTitle: 'Biznes Təsviri',
        businessDescriptionDesc: 'AI-ə biznesinizi daha yaxşı başa düşməyə kömək edin',
        businessDescriptionLabel: 'Şirkətiniz nə edir? *',
        businessDescriptionPlaceholder: 'Biznesinizi, məhsullarınızı və ya xidmətlərinizi ətraflı təsvir edin...',
        targetAudienceLabel: 'Hədəf auditoriyanız kimdir? *',
        targetAudiencePlaceholder: 'İdeal müştərilərinizi, onların demoqrafiyasını, maraqlarını və ehtiyaclarını təsvir edin...',
        uniqueSellingPointsLabel: 'Şirkətinizi unikal edən nədir? *',
        uniqueSellingPointsPlaceholder: 'Rəqabət üstünlüklərinizi, unikal xüsusiyyətlərinizi və ya xüsusi keyfiyyətlərinizi təsvir edin...',
        socialMediaStrategyTitle: 'Sosial Media Strategiyası',
        socialMediaStrategyDesc: 'Sosial media məqsədlərinizi və üstünlüklərinizi müəyyənləşdirin',
        socialMediaGoalsLabel: 'Sosial media məqsədləriniz nələrdir? *',
        socialMediaGoalsPlaceholder: 'Məs: Brend məlumatlılığını artırmaq, potensial müştərilər əldə etmək, müştərilərlə əlaqə qurmaq, vebsayta trafik cəlb etmək...',
        preferredToneLabel: 'Üstünlük Verilən Ünsiyyət Üslubu *',
        selectTone: 'Üslub Seçin',
        contentTopicsLabel: 'Məzmun Mövzuları',
        contentTopicsPlaceholder: 'texnologiya, innovasiya, məsləhətlər, xəbərlər',
        contentTopicsHint: 'Mövzuları vergüllə ayırın',
        keywordsLabel: 'Vacib Açar Sözlər',
        keywordsPlaceholder: 'AI, avtomatlaşdırma, səmərəlilik, inkişaf',
        keywordsHint: 'Açar sözləri vergüllə ayırın',
        avoidTopicsLabel: 'Qaçınılacaq Mövzular (İstəyə Bağlı)',
        avoidTopicsPlaceholder: 'siyasət, mübahisəli mövzular, rəqiblər',
        avoidTopicsHint: 'Mövzuları vergüllə ayırın',
        aiGenerationSettingsTitle: 'AI Yaradılma Parametrləri',
        aiGenerationSettingsDesc: 'AI məzmun yaradılması ilə bağlı tənzimləmələr',
        postsToGenerateLabel: 'Hər Dəfə Neçə Paylaşım Yaradılsın?',
        postsToGenerateHint: 'AI bir dəfədə bu qədər paylaşım yaradacaq. Tövsiyə: 10-15 arası optimal sayılır.',
        previewTitle: 'Önizləmə',
        previewDesc: 'Bu məlumat AI məzmunu yaratmaq üçün istifadə olunacaq',
        previewNotShown: 'Göstərilməyib',
        previewNotSelected: 'Seçilməyib',
        previewCompany: 'Şirkət',
        previewIndustry: 'Sənaye',
        previewTone: 'Üslub',
        previewTopics: 'Mövzular',
        brandAnalysisTitle: 'AI Brend Təhlili',
        aiSuggestion: 'AI Təklifi',
        aiGenerating: 'AI Yaradır...',
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
      privacy: {
        title: 'Gizlilik & Məlumat Saxlama',
        description: 'Məlumatlarınızın necə saxlandığını və saxlanıldığını idarə edin',
        dataRetention: 'Məlumat Saxlama Siyasəti',
        dataRetentionDesc: 'Silinmiş paylaşımların nə qədər saxlanılacağını konfiqurasiya edin',
        deletedPostsRetention: 'Silinmiş Paylaşımların Saxlanması',
        deletedPostsRetentionDesc: 'Rədd edilən paylaşımlar X gün saxlanılır və ya dərhal silinir',
        immediatelyRemoved: 'Dərhal Silinir',
        retainedForDays: '{days} gün saxlanılır',
        days: 'gün',
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
      messages: 'Mesajlar & Əlaqə',
      messagesDesc: 'Müştəri mesajları və əlaqə mərkəzi',
      socialMediaAnalysis: 'Sosial Media Analiz',
      socialMediaAnalysisDesc: 'Profil və məzmun analizi',
      adsAnalytics: 'Meta Ads Analitika',
      adsAnalyticsDesc: 'Reklam statistikası',
      metaAds: 'Meta Ads İdarəçisi',
      metaAdsDesc: 'Kampaniya idarəetməsi',
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
      publishResultTitle: 'Paylaşım Nəticəsi',
      publishResultPlatform: 'Platforma',
      publishResultAccount: 'Hədəf Hesab',
      publishResultStatus: 'Status',
      publishResultPostId: 'Post ID',
      publishResultPostLink: 'Post Link',
      publishResultSuccess: 'Uğurlu',
      publishResultFailed: 'Uğursuz',
      publishRequiresApproval: 'Təsdiq Tələb Olunur',
      publishRequiresApprovalTooltip: 'Bu paylaşım paylaşılmazdan əvvəl təsdiqlənməlidir',
      reviewGeneratedPosts: 'Review Generated Posts',
      reviewGeneratedPostsDesc: 'Review, edit and approve AI-generated content',
      imagesGenerating: 'Images are being generated in the background and will load automatically',
      bulkOperations: 'Bulk Operations',
      selectedOf: 'selected of',
      selectAll: 'Select All',
      deselectAll: 'Deselect All',
      postsSelected: 'posts selected',
      approveSelected: 'Approve Selected',
      approve: 'Approve',
      rejectSelected: 'Reject Selected',
      reject: 'Reject',
      postNumber: 'Post',
      characters: 'characters',
      waiting: 'Waiting',
      postImage: 'Post Image',
      imageGenerating: 'Image is being generated...',
      imageUploading: 'Image Uploading...',
      upload: 'Upload',
      uploadImage: 'Upload Image',
      edit: 'Edit',
      editPost: 'Edit Post',
      postContent: 'Post Content',
      description: 'Description',
      hashtags: 'Hashtags',
      saving: 'Saving...',
      saveChanges: 'Save Changes',
      designSaved: 'Design saved successfully!',
      designSaveFailed: 'Failed to save design',
      pleaseSelectAtLeastOne: 'Please select at least one post to approve.',
      pleaseSelectAtLeastOneReject: 'Please select at least one post to reject.',
      confirmApprove: 'posts will be approved?',
      confirmReject: 'posts will be rejected?',
      postsApproved: 'Posts could not be approved. Please try again.',
      postsRejected: 'Posts could not be rejected. Please try again.',
      postUpdateFailed: 'Post could not be updated. Please try again.',
      imageUploadFailed: 'Image could not be uploaded. Please try again.',
      companyProfileNotFound: 'Company profile not found. Please fill in company information first.',
      companyLogoNotFound: 'Company logo not found. Please upload logo first.',
      brandingDisabled: 'Branding is disabled. Enable it in settings.',
      postNotFound: 'Post not found.',
      noImageInPost: 'This post has no image.',
      loginRequired: 'Login required. Please log in again.',
      brandingApplied: 'Branding applied successfully! ✨',
      brandingFailed: 'Branding could not be applied',
      designEditor: 'Design Editor',
      design: 'Design',
      branded: 'Branded',
      placeholder: 'Placeholder',
      goToCalendar: 'Go to Calendar',
      editPostTitle: 'Edit Post',
      editPostDesc: 'Modify AI-generated content according to your needs',
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
      scheduledTime: 'Planlaşdırılmış Vaxt',
      publishingTo: 'Paylaşılacaq',
      willPublishAutomatically: 'Avtomatik paylaşılacaq',
      recommendedTimeAI: 'Tövsiyə Olunan Vaxt (AI)',
      aiRecommended: 'AI Tövsiyəsi',
      userOverride: 'Bu vaxtı dəyişdirə bilərsiniz',
      editPost: 'Post Redaktə Et',
      editPostDesc: 'Paylaşım məzmununu, zamanlamasını və platformalarını dəyişdirin',
      currentConnectedAccounts: 'Cari Bağlı Hesablar',
      connected: 'Bağlıdır',
      notConnected: 'Bağlı deyil',
      connect: 'Qoş',
      change: 'Dəyiş',
      connectInstagramFirst: 'Əvvəlcə Instagram qoşun',
      connectFacebookFirst: 'Əvvəlcə Facebook Səhifə qoşun',
      connectPlatformFirst: 'Əvvəlcə platforma qoşun',
      connectFirst: 'Əvvəlcə qoşun',
      postingDestination: 'Postlar bağlı hesablarınızdan dərc olunacaq. Bağlantıları Sosial Hesablar səhifəsindən idarə edin.',
      titleLabel: 'Başlıq',
      titlePlaceholder: 'Post başlığı...',
      content: 'Məzmun',
      contentPlaceholder: 'Post məzmununu yazın...',
      characters: 'simvol',
      date: 'Tarix',
      time: 'Saat',
      platforms: 'Platformalar',
      selected: 'Seçildi',
      platform: 'platforma',
      status: 'Status',
      draft: 'Qaralama',
      scheduled: 'Planlaşdırılıb',
      published: 'Dərc edilib',
      preview: 'Önizləmə',
      noContent: 'Məzmun yoxdur...',
    },
    aiContentGenerator: {
      title: 'AI Məzmun Yaradıcı',
      description: 'AI ilə cəlbedici sosial media paylaşımları yaradın',
      loading: 'Yüklənir...',
    },
    aiTools: {
      title: 'AI Alətlər',
      description: 'Daha yaxşı sosial media məzmunu yaratmaq üçün AI-dan istifadə edin',
      allTools: 'Bütün AI Alətlər',
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
      videoGeneratorDesc: 'AI ilə professional videolar yaradın',
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
    productPost: {
      title: 'Məhsul Post Yaradıcı',
      description: 'Məhsul rəsmini yükləyin, AI arxa fonu siləcək, analiz edəcək və reklam postları hazırlayacaq',
      cardTitle: 'Məhsul Reklam Şəkli Yaradıcı',
      cardDescription: 'Professional marketinq reklamı yaratmaq üçün məhsul şəklini yükləyin',
      processingStep1: 'Addım 1: Şəkil Emalı - Arxa Fon Silinməsi...',
      processingStep2: 'Addım 2: Məhsul Analizi - Strukturlaşdırılmış Analiz...',
      processingStep3: 'Addım 3: Reklam Məzmunu - Hook, Body və CTA...',
      processingStep4: 'Addım 4: AI Prompt Yaradılması...',
      processingStep5: 'Addım 5: Nano Banana ilə Professional Şəkillər...',
      processingComplete: 'Postlar tamamlanır...',
      processingStepUrl1: 'Addım 1: Sayt məzmunu çəkilir...',
      processingStepUrl2: 'Addım 2: AI ilə məhsul məlumatları analiz edilir...',
      processingStepUrl3: 'Addım 3: Məhsul şəkli yüklənir...',
      processingStepUrl4: 'Addım 4: Arxa fon silinir...',
      processingStepUrl5: 'Addım 5: Nano Banana ilə Professional Şəkillər...',
      errorImageUrlNotFound: 'Şəkil URL-i tapılmadı',
      successPostCreated: 'Post uğurla yaradıldı və posts/ bölməsinə əlavə edildi!',
      errorPostCreationFailed: 'Post yaradıla bilmədi',
      successAdImageCreated: 'Reklam şəkli uğurla yaradıldı',
      workflowStep1: 'Workflow işlədi',
      workflowStep2: 'Reklam şəkli yaradıldı',
      workflowStep3: '',
      workflowStep4: '',
      workflowStep5: '',
      download: 'Yüklə',
      open: 'Aç',
      imageWillBeCreated: 'Şəkil yaradılacaq',
      viewPosts: 'Postları Görüntülə',
      createNewPost: 'Yeni Post Yarad',
      imagePreview: 'Şəkil Önizləməsi',
      closeModalHint: 'Bağlamaq üçün ESC basın və ya xaricə klik edin',
      productImage: 'Məhsul Şəkli',
      productImageRequired: 'Məhsul Şəkli',
      productName: 'Məhsul Adı (İstəyə bağlı)',
      productNameOptional: 'Məhsul Adı (İstəyə bağlı)',
      productNamePlaceholder: 'Məsələn: iPhone 15 Pro',
      adStyle: 'Reklam Stili',
      adStyleRequired: 'Reklam Stili',
      adStylePlaceholder: 'Seçim edin...',
      aspectRatio: 'En-Boy Nisbəti',
      aspectRatioRequired: 'En-Boy Nisbəti',
      aspectRatioPlaceholder: 'Seçim edin...',
      submit: 'Göndər',
      processing: 'Hazırlanır...',
      generating: 'Reklam şəkli yaradılır...',
      pleaseWait: 'Zəhmət olmasa, gözləyin',
      createdPosts: 'Yaradılmış Postlar',
      createdPostsDesc: 'post uğurla yaradıldı',
      createdAdImage: 'Yaradılmış Reklam Şəkli',
      createdAdImageDesc: 'AI ilə yaradılmış professional reklam şəkli',
      openImage: 'Şəkli Aç',
      approveAndCreate: 'Təsdiqlə və Post Yarad',
      analyzing: 'Analiz edilir...',
      selectOption: 'Seçim edin...',
      modern: 'Modern',
      professional: 'Professional',
      playful: 'Oyunçu',
      elegant: 'Zərif',
      minimalist: 'Minimalist',
      luxury: 'Lüks',
      casual: 'Gündəlik',
      square: '1:1 (Kvadrat - 1080x1080)',
      story: '9:16 (Story - 1080x1920)',
      landscape: '16:9 (Landscape - 1920x1080)',
      portrait: '4:5 (Portret - 1080x1350)',
      facebookPost: '1.91:1 (Facebook Post - 1200x628)',
      errorImageUpload: 'Şəkil yüklənə bilmədi',
      errorLoginRequired: 'Giriş tələb olunur. Zəhmət olmasa, yenidən giriş edin.',
      errorInvalidFile: 'Şəkil faylı düzgün deyil',
      errorServerError: 'Server xətası. Zəhmət olmasa, bir az sonra yenidən cəhd edin.',
      errorFileRequired: 'Şəkil faylı tələb olunur',
      errorUrlRequired: 'Şəkil URL-i tələb olunur. Zəhmət olmasa, şəkil yükləyin.',
      errorInvalidUrl: 'Şəkil URL-i düzgün formatda deyil: {url}',
      errorImageLoad: 'Şəkil yüklənə bilmədi: {status} {statusText}',
      errorWorkflowTimeout: 'Workflow çox uzun müddət aldı (5 dəqiqədən çox). Zəhmət olmasa, yenidən cəhd edin.',
      errorWebhookConnection: 'Webhook-una qoşula bilmədi. Zəhmət olmasa, internet bağlantınızı yoxlayın.',
      errorSelectAdStyle: 'Zəhmət olmasa, Ad Style və Aspect Ratio seçin',
    },
    logoGenerator: {
      title: 'Loqo və Slogan Yaradıcısı',
      description: 'Şirkətiniz üçün professional loqo və slogan yaradın',
      back: 'Geri',
      basicInfo: 'Əsas Məlumatlar',
      basicInfoDesc: 'Şirkətiniz haqqında məlumat daxil edin',
      companyName: 'Şirkət/Məhsul Adı *',
      companyNamePlaceholder: 'məs: Timera, TechStart',
      descriptionLabel: 'Təsvir *',
      descriptionPlaceholder: 'Şirkətinizi və ya məhsulunuzu təsvir edin...',
      descriptionHint: 'Daha ətraflı təsvir, daha yaxşı logo və slogan yaradacaq',
      logoStyle: 'Logo Stili',
      logoStyleDesc: 'Logo dizayn stilini seçin',
      colorSelection: 'Rəng Seçimi',
      colorSelectionDesc: 'Logo-nun əsas rəngini seçin',
      selectedColor: 'Seçilmiş rəng:',
      categories: 'Kateqoriyalar (Tags)',
      categoriesDesc: 'Şirkətinizin aid olduğu sahələri seçin',
      categoriesSelected: 'kateqoriya seçilib',
      generateButton: 'Logo və Slogan Yarat',
      generatingButton: 'Logo Yaradılır...',
      createdLogo: 'Yaradılmış Logo',
      createdSlogan: 'Yaradılmış Slogan',
      saveToProfile: 'Şirkət Profilinə Əlavə Et',
      saving: 'Əlavə Edilir...',
      downloadLogo: 'Download Logo',
      copySlogan: 'Copy Slogan',
      sloganCopied: '✅ Slogan kopyalandı!',
      sloganCopyFailed: 'Slogan kopyalanmadı',
      logoDownloadFailed: 'Logo yüklənə bilmədi',
      emptyState: 'Logo və slogan yaradıldıqdan sonra burada görünəcək',
      errorCompanyNameRequired: 'Zəhmət olmasa şirkət adı və təsvirini daxil edin',
      errorEmptyResponse: 'Boş response alındı',
      errorLogoCreationFailed: 'Logo yaradıla bilmədi',
      errorNoLogo: '⚠️ Logo yoxdur. Əvvəlcə logo yaradın.',
      errorLogoLoadFailed: 'Logo yüklənə bilmədi',
      errorTitle: 'Xəta',
      successCreated: '✅ Logo və slogan uğurla yaradıldı!',
      successSaved: '✅ Logo və slogan şirkət profilinə uğurla əlavə edildi!',
      errorSaveFailed: 'Şirkət profilinə əlavə edilə bilmədi',
      generatedLogoAlt: 'Yaradılmış Logo',
      styleMinimalist: 'Minimalist',
      styleMinimalistDesc: 'Sadə və təmiz',
      styleElegant: 'Elegant',
      styleElegantDesc: 'Zərif və incə',
      styleModern: 'Modern',
      styleModernDesc: 'Müasir və dinamik',
      styleProfessional: 'Professional',
      styleProfessionalDesc: 'Biznes üçün',
      stylePlayful: 'Playful',
      stylePlayfulDesc: 'Şən və rəngarəng',
      colorBlue: 'Göy',
      colorPurple: 'Bənövşəyi',
      colorRed: 'Qırmızı',
      colorGreen: 'Yaşıl',
      colorOrange: 'Narıncı',
      colorIndigo: 'İndigo',
      colorBlack: 'Qara',
      colorWhite: 'Ağ',
      tagTech: 'Tech',
      tagFinance: 'Finans',
      tagHealth: 'Sağlamlıq',
      tagEducation: 'Təhsil',
      tagEcommerce: 'E-commerce',
      tagService: 'Xidmət',
      tagManufacturing: 'İstehsal',
      tagRealEstate: 'Daşınmaz Əmlak',
      tagMarketing: 'Marketing',
      tagDesign: 'Dizayn',
      tagKitchen: 'Mətbəx',
      tagFashion: 'Moda',
      tagSports: 'İdman',
      tagTravel: 'Səyahət',
      tagArt: 'İncəsənət',
    },
    hashtagGenerator: {
      title: 'Hashtag Yaradıcısı',
      description: 'Şirkətinizə uyğun hashtaglar yaradın',
      headerTitle: '#️⃣ Hashtag Yaradıcısı',
      headerDescription: 'Şirkət məlumatlarınıza və paylaşım məzmununuza uyğun hashtaglar yaradın',
      contentSectionTitle: 'Paylaşım Məzmunu',
      contentSectionDesc: 'Hashtaglar yaratmaq üçün paylaşım məzmununu daxil edin (istəyə bağlı)',
      contentLabel: 'Məzmun',
      contentPlaceholder: 'Məsələn: Yeni məhsulumuzu təqdim edirik! 🚀',
      companyInfo: 'Şirkət Məlumatları:',
      companyName: 'Şirkət:',
      industry: 'Sənaye:',
      business: 'Biznes:',
      hashtagCount: 'Hashtag Sayı',
      hashtagCountLabel: 'hashtag',
      generateButton: 'Hashtaglar Yarat',
      generatingButton: 'Hashtaglar Yaradılır...',
      generatedHashtags: 'Yaradılmış Hashtaglar',
      generatedHashtagsDesc: 'hashtag yaradıldı',
      copyAll: 'Hamısını Kopyala',
      copied: 'Kopyalandı',
      allHashtags: 'Bütün Hashtaglar:',
      copy: 'Kopyala',
      tipsTitle: '💡 Məsləhətlər',
      tip1: '• Paylaşım məzmununu daxil etməklə daha uyğun hashtaglar alacaqsınız',
      tip2: '• Şirkət məlumatlarınız avtomatik istifadə olunur',
      tip3: '• Hashtag sayını 15-25 arası saxlayın (optimal performans üçün)',
      tip4: '• Populyar və niş hashtagların qarışığı ən yaxşı nəticə verir',
      errorContentRequired: 'Zəhmət olmasa, paylaşım məzmunu və ya şirkət məlumatları daxil edin',
      errorGenerationFailed: 'Hashtaglar yaradıla bilmədi. Zəhmət olmasa yenidən cəhd edin.',
    },
    captionOptimizer: {
      title: 'Başlıq Optimizatoru',
      description: 'Daha yaxşı təşviq üçün başlıqlarınızı təkmilləşdirin',
      headerTitle: '📝 Başlıq Optimizatoru',
      headerDescription: 'Daha yaxşı təşviq üçün başlıqlarınızı təkmilləşdirin',
      captionSectionTitle: 'Başlıq / Caption',
      captionSectionDesc: 'Optimallaşdırmaq istədiyiniz başlıq və ya caption-ı daxil edin',
      originalCaptionLabel: 'Orijinal Başlıq',
      captionPlaceholder: 'Məsələn: Yeni məhsulumuzu təqdim edirik!',
      characters: 'simvol',
      contentTypeLabel: 'Məzmun Növü',
      contentTypePost: 'Paylaşım',
      contentTypeTitle: 'Başlıq',
      contentTypeDescription: 'Təsvir',
      platformLabel: 'Platform',
      platformGeneral: 'Ümumi',
      platformInstagram: 'Instagram',
      platformFacebook: 'Facebook',
      platformLinkedIn: 'LinkedIn',
      toneLabel: 'Ton',
      toneProfessional: 'Professional',
      toneCasual: 'Dostcasına',
      toneCreative: 'Yaradıcı',
      toneFriendly: 'Dostlu',
      companyInfo: 'Şirkət Məlumatları:',
      companyName: 'Şirkət:',
      industry: 'Sənaye:',
      preferredTone: 'Üstünlük Verilən Ton:',
      optimizeButton: 'Optimallaşdır',
      optimizingButton: 'Optimallaşdırılır...',
      optimizedCaption: 'Optimallaşdırılmış Başlıq',
      optimizedCaptionDesc: 'simvol dəyişiklik',
      copy: 'Kopyala',
      copied: 'Kopyalandı',
      useOptimized: 'İstifadə Et',
      original: 'Orijinal',
      optimized: 'Optimallaşdırılmış',
      tipsTitle: '💡 Məsləhətlər',
      tip1: '• Platforma uyğun başlıq seçin (Instagram, Facebook, LinkedIn)',
      tip2: '• Ton seçimi brendinizə uyğun olmalıdır',
      tip3: '• Qısa və cəlbedici başlıqlar daha yaxşı performans göstərir',
      tip4: '• Call-to-action əlavə etməyi unutmayın',
      tip5: '• Müxtəlif variantları sınayın və ən yaxşısını seçin',
      errorCaptionRequired: 'Zəhmət olmasa, başlıq və ya caption daxil edin',
      errorOptimizationFailed: 'Başlıq optimallaşdırıla bilmədi. Zəhmət olmasa yenidən cəhd edin.',
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
      permissionsPurpose: 'Bu icazələr nə üçündür?',
      permissionsPosting: 'Paylaşım: Facebook səhifələrinizə və Instagram hesabınıza məzmun paylaşmaq üçün',
      permissionsAnalytics: 'Analitika: Paylaşımlarınızın performansını izləmək üçün',
      permissionsMessages: 'Mesajlar: Müştəri mesajlarını idarə etmək üçün',
      permissionsAds: 'Reklamlar: Reklam kampaniyalarını idarə etmək üçün',
      permissionsFacebook: 'Paylaşım: Facebook səhifələrinizə və qruplara məzmun paylaşmaq üçün. Analitika: Paylaşımların performansını, çatdırılmasını və təşviq metrikalarını izləmək üçün. Mesajlar: Müştəri mesajlarını və söhbətləri idarə etmək üçün. Reklamlar: Facebook reklam kampaniyalarını idarə etmək üçün.',
      permissionsLinkedIn: 'Paylaşım: LinkedIn şirkət səhifələrinizə və şəxsi profilə məzmun paylaşmaq üçün. Analitika: Paylaşımların performansını, baxış sayını və təşviq metrikalarını izləmək üçün. Mesajlaşma: Peşəkar mesajları və əlaqələri idarə etmək üçün.',
      permissionsTikTok: 'Paylaşım: TikTok hesabınıza video paylaşmaq üçün. Analitika: Video performansını, baxış sayını və təşviq metrikalarını izləmək üçün.',
      permissionsYouTube: 'Video Yükləmə: YouTube kanalınıza video yükləmək üçün. Analitika: Video performansını, baxış sayını, baxış müddətini və abunə metrikalarını izləmək üçün. Kanal İdarəetməsi: Kanal parametrlərinizi və məzmunu idarə etmək üçün.',
      pageId: 'Səhifə ID',
      instagramId: 'Instagram ID',
      connectedAt: 'Qoşulub',
      tokenStatus: 'Token Statusu',
      tokenActive: 'Aktiv',
      tokenExpired: 'Müddəti bitib',
      disconnectWarning: 'Ayırdığınız zaman access token silinir və webhook-lar dayandırılır.',
      platformDescriptionFacebook: 'Səhifələrə və qruplara paylaşım',
      platformDescriptionInstagram: 'Şəkil və hekayə paylaşın',
      platformDescriptionLinkedIn: 'Peşəkar şəbəkə və biznes paylaşımları',
      platformDescriptionYouTube: 'Video paylaşımı və kanal idarəetməsi',
      platformDescriptionTikTok: 'Qısa video paylaşımı',
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
    companySetup: {
      title: 'Quraşdırmanı Tamamlayın',
      titleUpdate: 'Şirkət Profilini Yenilə',
      description: 'Əla məzmun yaratmaq üçün bizə şirkətiniz haqqında məlumat verin',
      descriptionUpdate: 'Daha yaxşı AI məzmunu üçün şirkət məlumatlarınızı yeniləyin',
      whyNeededTitle: 'Bu Məlumat Niyə Lazımdır',
      benefit1Title: 'Daha Yaxşı AI Məzmunu',
      benefit1Desc: 'AI biznesinizə və auditoriyanıza uyğun məzmun yaradacaq',
      benefit2Title: 'Hədəfli Mesajlar',
      benefit2Desc: 'Paylaşımlar xüsusi sənayenizə və məqsədlərinizə uyğunlaşdırılacaq',
      benefit3Title: 'Azərbaycan Dilində Məzmun',
      benefit3Desc: 'Bütün məzmun mükəmməl Azərbaycan dilində yaradılacaq',
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
      description: 'Timera.ai — это платформа управления социальными сетями на основе ИИ. Создание контента, планирование, дизайн и аналитика — все в одном месте, с вашего одобрения.',
      startFree: 'Начать бесплатно',
      howItWorksBtn: 'Как это работает?',
      stats24_7: 'ИИ-ассистент 24/7',
      stats10x: 'Контент в 10 раз быстрее',
      stats100: 'ИИ-ассистент',
    },
    features: {
      title: 'Что делает Timera.ai?',
      subtitle: 'Новая эра управления социальными сетями с искусственным интеллектом',
      aiContentCreator: {
        title: 'Создатель контента на ИИ',
        description: 'ИИ генерирует предложения текстового и визуального контента, адаптированного к вашему бренду. Вы проверяете, редактируете и одобряете перед публикацией.',
      },
      designVisual: {
        title: 'Дизайн и визуал',
        description: 'ИИ создает предложения дизайнов, соответствующие стилю вашего бренда. Логотип, цвета и тон анализируются. Вы одобряете итоговый дизайн.',
      },
      smartScheduling: {
        title: 'Умное планирование',
        description: 'ИИ рекомендует оптимальное время публикации и стратегию. Вы проверяете и планируете публикации.',
      },
      analytics: {
        title: 'Аналитика и отчеты',
        description: 'Аналитика в реальном времени и измерение производительности. ИИ предлагает следующую стратегию.',
      },
      videoContent: {
        title: 'Видео контент',
        description: 'ИИ-ассистент для создания видео-контента, адаптированного к вашему бренду. Вы проверяете и одобряете перед публикацией.',
      },
      secure: {
        title: 'Безопасно и законно',
        description: 'Официальные интеграции API и SSL-шифрование. Личные данные не хранятся.',
      },
    },
    howItWorks: {
      title: 'Как это работает?',
      subtitle: 'Управляйте маркетингом в социальных сетях с помощью ИИ за 4 простых шага',
      step1: {
        title: 'Введите информацию',
        description: 'Предоставьте информацию о вашем бренде, продукте и целях. ИИ учится на ваших данных.',
      },
      step2: {
        title: 'ИИ генерирует предложения',
        description: 'ИИ генерирует предложения тем постов, текста и визуального контента для вашей проверки.',
      },
      step3: {
        title: 'Проверьте и одобрите',
        description: 'Вы проверяете все предложения, редактируете нужные части и одобряете публикации.',
      },
      step4: {
        title: 'Запланированная публикация',
        description: 'После вашего одобрения система публикует посты в запланированное время и отслеживает результаты.',
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
          answer: 'Timera.ai — это инструмент управления социальными сетями с помощью ИИ. Платформа помогает с созданием постов, планированием, дизайном, подготовкой видео-контента, аналитическими отчетами и управлением Meta Ads (рекламные кампании Facebook и Instagram). Вы вводите информацию о бренде, ИИ генерирует предложения, а вы проверяете и одобряете все перед публикацией.',
        },
        {
          question: '✍️ ИИ создает контент полностью самостоятельно, или я могу его редактировать?',
          answer: 'ИИ генерирует предложения контента — текстового, визуального и видео форматов. Пользователи должны проверить, отредактировать и одобрить весь контент перед публикацией. Никакой контент не публикуется без вашего явного одобрения. Этот подход сочетает скорость ИИ с человеческим контролем.',
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
    auth: {
      login: {
        title: 'Войти в Timera',
        description: 'Введите свой email и пароль для доступа к аккаунту',
        emailLabel: 'Email',
        emailPlaceholder: 'Введите ваш email адрес',
        passwordLabel: 'Пароль',
        passwordPlaceholder: 'Введите ваш пароль',
        submitButton: 'Войти',
        submittingButton: 'Вход...',
        noAccount: 'Нет аккаунта?',
        signUpLink: 'Зарегистрироваться',
        errors: {
          invalidEmail: 'Пожалуйста, введите правильный email адрес',
          passwordRequired: 'Пароль обязателен',
          wrongCredentials: 'Email или пароль неверны',
          userNotFound: 'Пользователь с таким email адресом не найден',
          accountDisabled: 'Ваш аккаунт отключен. Пожалуйста, свяжитесь с поддержкой',
          networkError: 'Не удалось подключиться к серверу. Пожалуйста, проверьте интернет-соединение',
        },
      },
      register: {
        title: 'Создать аккаунт',
        description: 'Начните работу с Timera',
        firstNameLabel: 'Имя',
        firstNamePlaceholder: 'Ваше имя',
        lastNameLabel: 'Фамилия',
        lastNamePlaceholder: 'Ваша фамилия',
        emailLabel: 'Email',
        emailPlaceholder: 'email@example.com',
        companyNameLabel: 'Название компании (Необязательно)',
        companyNamePlaceholder: 'Название вашей компании',
        passwordLabel: 'Пароль',
        passwordPlaceholder: 'Создайте пароль',
        confirmPasswordLabel: 'Подтвердите пароль',
        confirmPasswordPlaceholder: 'Повторно введите пароль',
        passwordStrength: 'Надежность пароля:',
        passwordStrengthWeak: 'Слабый',
        passwordStrengthMedium: 'Средний',
        passwordStrengthGood: 'Хороший',
        passwordStrengthStrong: 'Сильный',
        passwordHint: 'Совет: Используйте заглавные и строчные буквы, цифры и специальные символы',
        passwordsMatch: 'Пароли совпадают',
        submitButton: 'Зарегистрироваться',
        submittingButton: 'Создание аккаунта...',
        hasAccount: 'Уже есть аккаунт?',
        signInLink: 'Войти',
        errors: {
          invalidEmail: 'Пожалуйста, введите правильный email адрес',
          passwordMinLength: 'Пароль должен содержать не менее 8 символов',
          firstNameRequired: 'Имя обязательно',
          lastNameRequired: 'Фамилия обязательна',
          passwordsMismatch: 'Пароли не совпадают',
          emailExists: 'Этот email адрес уже используется',
          registrationFailed: 'Регистрация не удалась. Пожалуйста, попробуйте снова',
        },
      },
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
        setupTitle: 'Настройка профиля компании',
        setupDescription: 'Помогите нам узнать ваш бизнес, чтобы создавать лучший контент ИИ',
        basicInfo: 'Основная информация',
        basicInfoDesc: 'Расскажите нам о вашей компании',
        companyLogo: 'Логотип компании',
        changeLogo: 'Изменить логотип',
        uploadLogo: 'Загрузить логотип',
        dragDropLogo: 'Перетащите логотип или нажмите для загрузки',
        logoFileTypes: 'Рекомендуется PNG с прозрачностью. JPG или SVG (макс. 10 МБ)',
        selectFile: 'Выбрать файл',
        logoAnalysisHint: '💡 ИИ автоматически проанализирует ваш логотип и извлечет цвета бренда, стиль и другую информацию',
        logoAnalyzing: 'ИИ анализирует логотип...',
        location: 'Местоположение',
        locationPlaceholder: 'Город, Страна',
        companyNamePlaceholder: 'Название вашей компании',
        selectIndustry: 'Выберите отрасль',
        selectCompanySize: 'Выберите размер компании',
        websitePlaceholder: 'https://вашакомпания.com',
        validationCompanyNameRequired: 'Название компании обязательно',
        validationIndustryRequired: 'Отрасль обязательна',
        validationCompanySizeRequired: 'Размер компании обязателен',
        validationUrlInvalid: 'Пожалуйста, введите действительный URL',
        validationMinChars: 'Пожалуйста, предоставьте подробное описание (не менее 10 символов)',
        validationToneRequired: 'Пожалуйста, выберите предпочтительный тон',
        validationPostsMin: 'Минимум 1 пост',
        validationPostsMax: 'Максимум 30 постов',
        validationSloganMax: 'Слоган может быть максимум 200 символов',
        successProfileCreated: 'Профиль компании успешно создан!',
        successProfileUpdated: 'Профиль компании успешно обновлен!',
        successProfileLogoCreated: 'Профиль компании и логотип успешно созданы!',
        successProfileLogoUpdated: 'Профиль компании и логотип успешно обновлены!',
        errorSaveFailed: 'Не удалось сохранить профиль компании. Пожалуйста, попробуйте снова.',
        errorBrandAnalysisNotFound: 'Данные анализа бренда не найдены',
        errorCompanyNameRequiredForSlogan: 'Название компании обязательно для создания слогана',
        businessDescriptionTitle: 'Описание бизнеса',
        businessDescriptionDesc: 'Помогите ИИ лучше понять ваш бизнес',
        businessDescriptionLabel: 'Чем занимается ваша компания? *',
        businessDescriptionPlaceholder: 'Подробно опишите ваш бизнес, продукты или услуги...',
        targetAudienceLabel: 'Кто ваша целевая аудитория? *',
        targetAudiencePlaceholder: 'Опишите ваших идеальных клиентов, их демографию, интересы и потребности...',
        uniqueSellingPointsLabel: 'Что делает вашу компанию уникальной? *',
        uniqueSellingPointsPlaceholder: 'Опишите ваши конкурентные преимущества, уникальные особенности или особые качества...',
        socialMediaStrategyTitle: 'Стратегия социальных сетей',
        socialMediaStrategyDesc: 'Определите ваши цели и предпочтения в социальных сетях',
        socialMediaGoalsLabel: 'Каковы ваши цели в социальных сетях? *',
        socialMediaGoalsPlaceholder: 'Например: Повысить узнаваемость бренда, привлечь потенциальных клиентов, связаться с клиентами, привлечь трафик на сайт...',
        preferredToneLabel: 'Предпочтительный тон общения *',
        selectTone: 'Выберите тон',
        contentTopicsLabel: 'Темы контента',
        contentTopicsPlaceholder: 'технологии, инновации, советы, новости',
        contentTopicsHint: 'Разделяйте темы запятыми',
        keywordsLabel: 'Важные ключевые слова',
        keywordsPlaceholder: 'ИИ, автоматизация, эффективность, развитие',
        keywordsHint: 'Разделяйте ключевые слова запятыми',
        avoidTopicsLabel: 'Темы, которых следует избегать (Необязательно)',
        avoidTopicsPlaceholder: 'политика, спорные темы, конкуренты',
        avoidTopicsHint: 'Разделяйте темы запятыми',
        aiGenerationSettingsTitle: 'Параметры создания ИИ',
        aiGenerationSettingsDesc: 'Настройки, связанные с созданием контента ИИ',
        postsToGenerateLabel: 'Сколько постов создавать каждый раз?',
        postsToGenerateHint: 'ИИ создаст столько постов за один раз. Рекомендация: 10-15 считается оптимальным.',
        previewTitle: 'Предпросмотр',
        previewDesc: 'Эта информация будет использоваться для создания контента ИИ',
        previewNotShown: 'Не показано',
        previewNotSelected: 'Не выбрано',
        previewCompany: 'Компания',
        previewIndustry: 'Отрасль',
        previewTone: 'Тон',
        previewTopics: 'Темы',
        brandAnalysisTitle: 'Анализ бренда ИИ',
        brandingParamsTitle: 'Параметры брендинга',
        brandingParamsDesc: 'Автоматически добавляйте логотип компании и слоган к изображениям, созданным ИИ',
        automaticBrandingActive: 'Автоматический брендинг активен',
        automaticBrandingDesc: 'Логотип и слоган будут автоматически добавлены ко всем новым изображениям, созданным ИИ',
        brandingRequiresLogo: '⚠️ Для включения брендинга необходимо загрузить логотип. Загрузите логотип из раздела "Логотип компании" выше.',
        sloganLabel: 'Слоган (Необязательно)',
        sloganPlaceholder: 'Например: Transform Your Social Media',
        sloganHint: 'Текст, который будет отображаться рядом с логотипом на изображениях',
        sloganChars: 'символов',
        brandingMode: 'Режим брендинга',
        standard: 'Стандартный',
        custom: 'Пользовательский',
        standardBrandingParams: 'Стандартные параметры брендинга',
        logoPosition: 'Позиция логотипа:',
        sloganPosition: 'Позиция слогана:',
        logoSize: 'Размер логотипа:',
        gradient: 'Градиент:',
        standardModeNote: '✨ Стандартный режим: Автоматические градиентные наложения будут добавлены для логотипа и слогана',
        logoPositionLabel: 'Позиция логотипа',
        logoPositionHint: 'Выберите позицию логотипа (с градиентным наложением)',
        sloganPositionLabel: 'Позиция слогана',
        sloganPositionHint: 'Слоган будет отображаться с градиентным наложением',
        logoSizeLabel: 'Размер логотипа',
        logoSizeSmall: 'Маленький (2%)',
        logoSizeMedium: 'Средний (13%)',
        logoSizeLarge: 'Большой (25%)',
        sloganSizeLabel: 'Размер слогана',
        sloganSizeSmall: 'Маленький (2%)',
        sloganSizeMedium: 'Средний (4%)',
        sloganSizeLarge: 'Большой (8%)',
        gradientEnabled: 'Градиентное наложение',
        gradientColor: 'Цвет градиента',
        gradientHeight: 'Высота градиента',
        gradientPosition: 'Позиция градиента',
        gradientTop: 'Верх',
        gradientBottom: 'Низ',
        gradientBoth: 'Оба',
        logoPositionTopLeft: 'Верхний левый',
        logoPositionTopCenter: 'Верхний центр',
        logoPositionTopRight: 'Верхний правый',
        logoPositionBottomLeft: 'Нижний левый',
        logoPositionBottomCenter: 'Нижний центр',
        logoPositionBottomRight: 'Нижний правый',
        sloganPositionTopCenter: 'Верхний центр',
        sloganPositionBottomCenter: 'Нижний центр',
        logoPositionStandard: 'Верхний центр (с градиентом)',
        sloganPositionStandard: 'Нижний центр (с градиентом)',
        logoSizeStandard: '13% от ширины изображения',
        gradientStandard: 'Автоматический (Цвета бренда)',
        aiSuggestion: 'Предложение ИИ',
        aiGenerating: 'ИИ создает...',
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
      privacy: {
        title: 'Конфиденциальность и хранение данных',
        description: 'Управляйте тем, как хранятся и сохраняются ваши данные',
        dataRetention: 'Политика хранения данных',
        dataRetentionDesc: 'Настройте, как долго хранятся удаленные посты',
        deletedPostsRetention: 'Хранение удаленных постов',
        deletedPostsRetentionDesc: 'Отклоненные посты хранятся X дней или удаляются немедленно',
        immediatelyRemoved: 'Немедленно удалено',
        retainedForDays: 'Хранится {days} дней',
        days: 'дней',
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
      messages: 'Сообщения и контакты',
      messagesDesc: 'Центр сообщений клиентов и входящих запросов',
      socialMediaAnalysis: 'Анализ социальных сетей',
      socialMediaAnalysisDesc: 'Анализ профиля и контента',
      adsAnalytics: 'Аналитика Meta Ads',
      adsAnalyticsDesc: 'Статистика кампаний',
      metaAds: 'Менеджер Meta Ads',
      metaAdsDesc: 'Управление кампаниями',
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
      publishResultTitle: 'Результат публикации',
      publishResultPlatform: 'Платформа',
      publishResultAccount: 'Целевой аккаунт',
      publishResultStatus: 'Статус',
      publishResultPostId: 'ID поста',
      publishResultPostLink: 'Ссылка на пост',
      publishResultSuccess: 'Успешно',
      publishResultFailed: 'Не удалось',
      publishRequiresApproval: 'Требуется одобрение',
      publishRequiresApprovalTooltip: 'Этот пост должен быть одобрен перед публикацией',
      reviewGeneratedPosts: 'Review Generated Posts',
      reviewGeneratedPostsDesc: 'Review, edit and approve AI-generated content',
      imagesGenerating: 'Images are being generated in the background and will load automatically',
      bulkOperations: 'Bulk Operations',
      selectedOf: 'selected of',
      selectAll: 'Select All',
      deselectAll: 'Deselect All',
      postsSelected: 'posts selected',
      approveSelected: 'Approve Selected',
      approve: 'Approve',
      rejectSelected: 'Reject Selected',
      reject: 'Reject',
      postNumber: 'Post',
      characters: 'characters',
      waiting: 'Waiting',
      postImage: 'Post Image',
      imageGenerating: 'Image is being generated...',
      imageUploading: 'Image Uploading...',
      upload: 'Upload',
      uploadImage: 'Upload Image',
      edit: 'Edit',
      editPost: 'Edit Post',
      postContent: 'Post Content',
      description: 'Description',
      hashtags: 'Hashtags',
      saving: 'Saving...',
      saveChanges: 'Save Changes',
      designSaved: 'Design saved successfully!',
      designSaveFailed: 'Failed to save design',
      pleaseSelectAtLeastOne: 'Please select at least one post to approve.',
      pleaseSelectAtLeastOneReject: 'Please select at least one post to reject.',
      confirmApprove: 'posts will be approved?',
      confirmReject: 'posts will be rejected?',
      postsApproved: 'Posts could not be approved. Please try again.',
      postsRejected: 'Posts could not be rejected. Please try again.',
      postUpdateFailed: 'Post could not be updated. Please try again.',
      imageUploadFailed: 'Image could not be uploaded. Please try again.',
      companyProfileNotFound: 'Company profile not found. Please fill in company information first.',
      companyLogoNotFound: 'Company logo not found. Please upload logo first.',
      brandingDisabled: 'Branding is disabled. Enable it in settings.',
      postNotFound: 'Post not found.',
      noImageInPost: 'This post has no image.',
      loginRequired: 'Login required. Please log in again.',
      brandingApplied: 'Branding applied successfully! ✨',
      brandingFailed: 'Branding could not be applied',
      designEditor: 'Design Editor',
      design: 'Design',
      branded: 'Branded',
      placeholder: 'Placeholder',
      goToCalendar: 'Go to Calendar',
      editPostTitle: 'Edit Post',
      editPostDesc: 'Modify AI-generated content according to your needs',
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
      scheduledTime: 'Запланированное время',
      publishingTo: 'Публикация в',
      willPublishAutomatically: 'Будет опубликовано автоматически',
      recommendedTimeAI: 'Рекомендуемое время (ИИ)',
      aiRecommended: 'Рекомендация ИИ',
      userOverride: 'Вы можете изменить это время',
      editPost: 'Редактировать пост',
      editPostDesc: 'Измените содержимое, расписание и платформы публикации',
      currentConnectedAccounts: 'Текущие подключенные аккаунты',
      connected: 'Подключено',
      notConnected: 'Не подключено',
      connect: 'Подключить',
      change: 'Изменить',
      connectInstagramFirst: 'Сначала подключите Instagram',
      connectFacebookFirst: 'Сначала подключите страницу Facebook',
      connectPlatformFirst: 'Сначала подключите платформу',
      connectFirst: 'Сначала подключите',
      postingDestination: 'Посты будут опубликованы из ваших подключенных аккаунтов. Управляйте подключениями в разделе Социальные аккаунты.',
      titleLabel: 'Заголовок',
      titlePlaceholder: 'Заголовок поста...',
      content: 'Содержимое',
      contentPlaceholder: 'Напишите содержимое поста...',
      characters: 'символов',
      date: 'Дата',
      time: 'Время',
      platforms: 'Платформы',
      selected: 'Выбрано',
      platform: 'платформа',
      status: 'Статус',
      draft: 'Черновик',
      scheduled: 'Запланировано',
      published: 'Опубликовано',
      preview: 'Предпросмотр',
      noContent: 'Нет содержимого...',
    },
    aiContentGenerator: {
      title: 'Генератор контента на ИИ',
      description: 'Создавайте увлекательные посты в социальных сетях с помощью ИИ',
      loading: 'Загрузка...',
    },
    aiTools: {
      title: 'ИИ-инструменты',
      description: 'Используйте ИИ для создания лучшего контента в социальных сетях',
      allTools: 'Все ИИ-инструменты',
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
      videoGeneratorDesc: 'Создавайте профессиональные видео с помощью ИИ',
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
    productPost: {
      title: 'Создатель постов о продуктах',
      description: 'Загрузите изображение продукта, ИИ удалит фон, проанализирует его и создаст рекламные посты',
      cardTitle: 'Генератор рекламных изображений продуктов',
      cardDescription: 'Загрузите изображение продукта для создания профессиональной маркетинговой рекламы',
      processingStep1: 'Шаг 1: Обработка изображения - Удаление фона...',
      processingStep2: 'Шаг 2: Анализ продукта - Структурированный анализ...',
      processingStep3: 'Шаг 3: Рекламный контент - Hook, Body и CTA...',
      processingStep4: 'Шаг 4: Создание промпта ИИ...',
      processingStep5: 'Шаг 5: Профессиональные изображения с Nano Banana...',
      processingComplete: 'Посты завершены...',
      processingStepUrl1: 'Шаг 1: Извлечение контента сайта...',
      processingStepUrl2: 'Шаг 2: Анализ информации о продукте с помощью ИИ...',
      processingStepUrl3: 'Шаг 3: Загрузка изображения продукта...',
      processingStepUrl4: 'Шаг 4: Удаление фона...',
      processingStepUrl5: 'Шаг 5: Профессиональные изображения с Nano Banana...',
      errorImageUrlNotFound: 'URL изображения не найден',
      successPostCreated: 'Пост успешно создан и добавлен в раздел posts/!',
      errorPostCreationFailed: 'Не удалось создать пост',
      successAdImageCreated: 'Рекламное изображение успешно создано',
      workflowStep1: 'Рабочий процесс завершен',
      workflowStep2: 'Рекламное изображение создано',
      workflowStep3: '',
      workflowStep4: '',
      workflowStep5: '',
      download: 'Скачать',
      open: 'Открыть',
      imageWillBeCreated: 'Изображение будет создано',
      viewPosts: 'Просмотреть посты',
      createNewPost: 'Создать новый пост',
      imagePreview: 'Предварительный просмотр изображения',
      closeModalHint: 'Нажмите ESC для закрытия или щелкните снаружи',
      productImage: 'Изображение продукта',
      productImageRequired: 'Изображение продукта',
      productName: 'Название продукта (Необязательно)',
      productNameOptional: 'Название продукта (Необязательно)',
      productNamePlaceholder: 'Например: iPhone 15 Pro',
      adStyle: 'Стиль рекламы',
      adStyleRequired: 'Стиль рекламы',
      adStylePlaceholder: 'Выберите опцию...',
      aspectRatio: 'Соотношение сторон',
      aspectRatioRequired: 'Соотношение сторон',
      aspectRatioPlaceholder: 'Выберите опцию...',
      submit: 'Отправить',
      processing: 'Обработка...',
      generating: 'Создание рекламного изображения...',
      pleaseWait: 'Пожалуйста, подождите',
      createdPosts: 'Созданные посты',
      createdPostsDesc: 'пост(ов) успешно создано',
      createdAdImage: 'Созданное рекламное изображение',
      createdAdImageDesc: 'Профессиональное рекламное изображение, созданное с помощью ИИ',
      openImage: 'Открыть изображение',
      approveAndCreate: 'Одобрить и создать пост',
      analyzing: 'Анализ...',
      selectOption: 'Выберите опцию...',
      modern: 'Современный',
      professional: 'Профессиональный',
      playful: 'Игривый',
      elegant: 'Элегантный',
      minimalist: 'Минималистичный',
      luxury: 'Роскошный',
      casual: 'Повседневный',
      square: '1:1 (Квадрат - 1080x1080)',
      story: '9:16 (История - 1080x1920)',
      landscape: '16:9 (Альбомная - 1920x1080)',
      portrait: '4:5 (Портрет - 1080x1350)',
      facebookPost: '1.91:1 (Пост Facebook - 1200x628)',
      errorImageUpload: 'Не удалось загрузить изображение',
      errorLoginRequired: 'Требуется вход. Пожалуйста, войдите снова.',
      errorInvalidFile: 'Неверный файл изображения',
      errorServerError: 'Ошибка сервера. Пожалуйста, попробуйте позже.',
      errorFileRequired: 'Требуется файл изображения',
      errorUrlRequired: 'Требуется URL изображения. Пожалуйста, загрузите изображение.',
      errorInvalidUrl: 'URL изображения не в правильном формате: {url}',
      errorImageLoad: 'Не удалось загрузить изображение: {status} {statusText}',
      errorWorkflowTimeout: 'Рабочий процесс занял слишком много времени (более 5 минут). Пожалуйста, попробуйте снова.',
      errorWebhookConnection: 'Не удалось подключиться к webhook. Пожалуйста, проверьте подключение к интернету.',
      errorSelectAdStyle: 'Пожалуйста, выберите стиль рекламы и соотношение сторон',
    },
    videoGenerator: {
      title: 'Генератор видео на ИИ',
      description: 'Создавайте профессиональные видео с помощью ИИ',
      cardTitle: 'Создать видео',
      cardDescription: 'Создавайте профессиональные видео из изображений с помощью ИИ',
      methodLabel: 'Метод создания видео',
      methodText: 'Видео из текста',
      methodTextDesc: 'Напишите промпт, пусть видео будет создано',
      methodImage: 'Видео из изображения',
      methodImageDesc: 'Загрузите изображение, пусть оно станет движущимся видео',
      promptLabel: 'ИИ Промпт *',
      promptPlaceholder: 'например: Красивый закат над горами с летящими птицами, кинематографическое движение камеры, замедленная съемка',
      promptDescription: 'Промпт будет обогащен профессиональной видеотехнологией на фоне',
      imageUploadLabel: 'Загрузить изображение *',
      parametersLabel: 'Параметры видео',
      durationLabel: 'Длительность (секунды)',
      fpsLabel: 'FPS (Кадров в секунду)',
      widthLabel: 'Ширина (px)',
      heightLabel: 'Высота (px)',
      generateButton: 'Создать видео',
      generatingButton: 'Создание видео...',
      errorTitle: 'Произошла ошибка',
      progressMessage: 'Создание видео... (30-60 секунд)',
      progressStep1: '📝 Промпт',
      progressStep2: '🎬 Видео',
      progressStep3: '✨ Завершено',
      resultTitle: 'Созданное видео',
      resultVideoLabel: 'Созданное видео',
      downloadButton: 'Скачать',
      copyLinkButton: 'Копировать ссылку',
      professionalPromptLabel: 'Профессиональный промпт:',
      videoInfoLabel: 'Информация о видео:',
      statusLabel: 'Статус:',
      jobIdLabel: 'ID задачи:',
      errorPromptRequired: 'Введите промпт',
      errorImageRequired: 'Загрузите изображение для видео',
      errorLoginRequired: 'Не вошли в систему. Пожалуйста, войдите снова.',
      errorServerError: 'Ошибка сервера (500). Свяжитесь с разработчиком бэкенда.',
      errorNetworkError: 'Ошибка сети. Не удается подключиться к серверу бэкенда.',
      errorVideoGenerationFailed: 'Не удалось создать видео',
      errorImageToVideo: 'Ошибка преобразования изображения в видео: {error}',
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
      permissionsPurpose: 'Для чего нужны эти разрешения?',
      permissionsPosting: 'Публикация: Для публикации контента на ваших страницах Facebook и в аккаунте Instagram',
      permissionsAnalytics: 'Аналитика: Для отслеживания производительности ваших постов',
      permissionsMessages: 'Сообщения: Для управления сообщениями и разговорами с клиентами',
      permissionsAds: 'Реклама: Для управления рекламными кампаниями',
      permissionsFacebook: 'Публикация: Для публикации контента на ваших страницах Facebook и в группах. Аналитика: Для отслеживания производительности постов, охвата и вовлеченности. Сообщения: Для управления сообщениями и разговорами с клиентами. Реклама: Для управления рекламными кампаниями Facebook.',
      permissionsLinkedIn: 'Публикация: Для публикации контента на ваших страницах компании LinkedIn и личном профиле. Аналитика: Для отслеживания производительности постов, просмотров и метрик вовлеченности. Сообщения: Для управления профессиональными сообщениями и связями.',
      permissionsTikTok: 'Публикация: Для публикации видео в вашем аккаунте TikTok. Аналитика: Для отслеживания производительности видео, просмотров и метрик вовлеченности.',
      permissionsYouTube: 'Загрузка видео: Для загрузки видео на ваш канал YouTube. Аналитика: Для отслеживания производительности видео, просмотров, времени просмотра и метрик подписчиков. Управление каналом: Для управления настройками канала и контентом.',
      pageId: 'ID страницы',
      instagramId: 'ID Instagram',
      connectedAt: 'Подключено',
      tokenStatus: 'Статус токена',
      tokenActive: 'Активен',
      tokenExpired: 'Истек',
      disconnectWarning: 'При отключении токен доступа будет удален, а вебхуки остановлены.',
      platformDescriptionFacebook: 'Публикация на страницах и в группах',
      platformDescriptionInstagram: 'Публикация фотографий и историй',
      platformDescriptionLinkedIn: 'Профессиональная сеть и бизнес-публикации',
      platformDescriptionYouTube: 'Публикация видео и управление каналом',
      platformDescriptionTikTok: 'Публикация коротких видео',
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
    logoGenerator: {
      title: 'Генератор логотипа и слогана',
      description: 'Создавайте профессиональный логотип и слоган для вашей компании',
      back: 'Назад',
      basicInfo: 'Основная информация',
      basicInfoDesc: 'Введите информацию о вашей компании',
      companyName: 'Название компании/продукта *',
      companyNamePlaceholder: 'например: Timera, TechStart',
      descriptionLabel: 'Описание *',
      descriptionPlaceholder: 'Опишите вашу компанию или продукт...',
      descriptionHint: 'Более подробное описание создаст лучший логотип и слоган',
      logoStyle: 'Стиль логотипа',
      logoStyleDesc: 'Выберите стиль дизайна логотипа',
      colorSelection: 'Выбор цвета',
      colorSelectionDesc: 'Выберите основной цвет для логотипа',
      selectedColor: 'Выбранный цвет:',
      categories: 'Категории (Теги)',
      categoriesDesc: 'Выберите отрасли, к которым относится ваша компания',
      categoriesSelected: 'категорий выбрано',
      generateButton: 'Создать логотип и слоган',
      generatingButton: 'Создание логотипа...',
      createdLogo: 'Созданный логотип',
      createdSlogan: 'Созданный слоган',
      saveToProfile: 'Добавить в профиль компании',
      saving: 'Добавление...',
      downloadLogo: 'Скачать логотип',
      copySlogan: 'Копировать слоган',
      sloganCopied: '✅ Слоган скопирован!',
      sloganCopyFailed: 'Слоган не удалось скопировать',
      logoDownloadFailed: 'Логотип не удалось скачать',
      emptyState: 'Логотип и слоган появятся здесь после создания',
      errorCompanyNameRequired: 'Пожалуйста, введите название компании и описание',
      errorEmptyResponse: 'Получен пустой ответ',
      errorLogoCreationFailed: 'Не удалось создать логотип',
      errorNoLogo: '⚠️ Нет логотипа. Пожалуйста, сначала создайте логотип.',
      errorLogoLoadFailed: 'Не удалось загрузить логотип',
      errorTitle: 'Ошибка',
      successCreated: '✅ Логотип и слоган успешно созданы!',
      successSaved: '✅ Логотип и слоган успешно добавлены в профиль компании!',
      errorSaveFailed: 'Не удалось добавить в профиль компании',
      generatedLogoAlt: 'Созданный логотип',
      styleMinimalist: 'Минималистичный',
      styleMinimalistDesc: 'Простой и чистый',
      styleElegant: 'Элегантный',
      styleElegantDesc: 'Утонченный и деликатный',
      styleModern: 'Современный',
      styleModernDesc: 'Современный и динамичный',
      styleProfessional: 'Профессиональный',
      styleProfessionalDesc: 'Для бизнеса',
      stylePlayful: 'Игривый',
      stylePlayfulDesc: 'Веселый и красочный',
      colorBlue: 'Синий',
      colorPurple: 'Фиолетовый',
      colorRed: 'Красный',
      colorGreen: 'Зеленый',
      colorOrange: 'Оранжевый',
      colorIndigo: 'Индиго',
      colorBlack: 'Черный',
      colorWhite: 'Белый',
      tagTech: 'Технологии',
      tagFinance: 'Финансы',
      tagHealth: 'Здоровье',
      tagEducation: 'Образование',
      tagEcommerce: 'Электронная коммерция',
      tagService: 'Услуги',
      tagManufacturing: 'Производство',
      tagRealEstate: 'Недвижимость',
      tagMarketing: 'Маркетинг',
      tagDesign: 'Дизайн',
      tagKitchen: 'Кухня',
      tagFashion: 'Мода',
      tagSports: 'Спорт',
      tagTravel: 'Путешествия',
      tagArt: 'Искусство',
    },
    hashtagGenerator: {
      title: 'Генератор хэштегов',
      description: 'Создавайте хэштеги, подходящие для вашей компании',
      headerTitle: '#️⃣ Генератор хэштегов',
      headerDescription: 'Создавайте хэштеги, подходящие для информации о вашей компании и содержания поста',
      contentSectionTitle: 'Содержание поста',
      contentSectionDesc: 'Введите содержание поста для создания хэштегов (необязательно)',
      contentLabel: 'Содержание',
      contentPlaceholder: 'Например: Представляем наш новый продукт! 🚀',
      companyInfo: 'Информация о компании:',
      companyName: 'Компания:',
      industry: 'Отрасль:',
      business: 'Бизнес:',
      hashtagCount: 'Количество хэштегов',
      hashtagCountLabel: 'хэштегов',
      generateButton: 'Создать хэштеги',
      generatingButton: 'Создание хэштегов...',
      generatedHashtags: 'Созданные хэштеги',
      generatedHashtagsDesc: 'хэштегов создано',
      copyAll: 'Копировать все',
      copied: 'Скопировано',
      allHashtags: 'Все хэштеги:',
      copy: 'Копировать',
      tipsTitle: '💡 Советы',
      tip1: '• Ввод содержания поста даст вам более релевантные хэштеги',
      tip2: '• Информация о вашей компании используется автоматически',
      tip3: '• Держите количество хэштегов между 15-25 (для оптимальной производительности)',
      tip4: '• Смесь популярных и нишевых хэштегов дает лучшие результаты',
      errorContentRequired: 'Пожалуйста, введите содержание поста или информацию о компании',
      errorGenerationFailed: 'Не удалось создать хэштеги. Пожалуйста, попробуйте снова.',
    },
    captionOptimizer: {
      title: 'Оптимизатор подписей',
      description: 'Оптимизируйте свои подписи для лучшего вовлечения',
      headerTitle: '📝 Оптимизатор подписей',
      headerDescription: 'Оптимизируйте свои подписи для лучшего вовлечения',
      captionSectionTitle: 'Подпись / Заголовок',
      captionSectionDesc: 'Введите подпись или заголовок, который вы хотите оптимизировать',
      originalCaptionLabel: 'Оригинальная подпись',
      captionPlaceholder: 'Например: Представляем наш новый продукт!',
      characters: 'символов',
      contentTypeLabel: 'Тип контента',
      contentTypePost: 'Пост',
      contentTypeTitle: 'Заголовок',
      contentTypeDescription: 'Описание',
      platformLabel: 'Платформа',
      platformGeneral: 'Общее',
      platformInstagram: 'Instagram',
      platformFacebook: 'Facebook',
      platformLinkedIn: 'LinkedIn',
      toneLabel: 'Тон',
      toneProfessional: 'Профессиональный',
      toneCasual: 'Неформальный',
      toneCreative: 'Креативный',
      toneFriendly: 'Дружелюбный',
      companyInfo: 'Информация о компании:',
      companyName: 'Компания:',
      industry: 'Отрасль:',
      preferredTone: 'Предпочтительный тон:',
      optimizeButton: 'Оптимизировать',
      optimizingButton: 'Оптимизация...',
      optimizedCaption: 'Оптимизированная подпись',
      optimizedCaptionDesc: 'символов (изменение)',
      copy: 'Копировать',
      copied: 'Скопировано',
      useOptimized: 'Использовать',
      original: 'Оригинал',
      optimized: 'Оптимизировано',
      tipsTitle: '💡 Советы',
      tip1: '• Выбирайте подписи, подходящие для платформы (Instagram, Facebook, LinkedIn)',
      tip2: '• Выбор тона должен соответствовать вашему бренду',
      tip3: '• Короткие и увлекательные подписи работают лучше',
      tip4: '• Не забудьте добавить призыв к действию',
      tip5: '• Попробуйте разные варианты и выберите лучший',
      errorCaptionRequired: 'Пожалуйста, введите подпись или заголовок',
      errorOptimizationFailed: 'Не удалось оптимизировать подпись. Пожалуйста, попробуйте снова.',
    },
    companySetup: {
      title: 'Завершить настройку',
      titleUpdate: 'Обновить профиль компании',
      description: 'Расскажите нам о вашей компании, чтобы создавать отличный контент',
      descriptionUpdate: 'Обновите информацию о вашей компании для лучшего контента ИИ',
      whyNeededTitle: 'Зачем нужна эта информация',
      benefit1Title: 'Лучший контент ИИ',
      benefit1Desc: 'ИИ будет создавать контент, адаптированный к вашему бизнесу и аудитории',
      benefit2Title: 'Целевые сообщения',
      benefit2Desc: 'Посты будут настроены под вашу отрасль и цели',
      benefit3Title: 'Контент на вашем языке',
      benefit3Desc: 'Весь контент будет создан на идеальном языке',
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

