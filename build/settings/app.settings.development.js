(function AppSettings() {
  window.AppSettings = {
    Enviroment: 'DEV',
    ApiBaseUrl: 'https://redesign-build-api.thebdxlive.com/',
    AppApiBaseUrl: 'https://dev.thebdxlive.com/api',
    ApiTimeout: 30000,
    AuthenticationRequired: 'true|{"username":"aquiros","password":"password"}',
    JwtExpiration: 2, // in minutes, 0 to use it from the server
    ApiAttempts: 3,
    EktronContactsFolder: 'https://cms.newhomesource.com/uploadedImages/BdxLive/Portal/Contacts/',
    ApiBdxLiveBaseUrl: 'http://build-api.thebdxlive.com',
    BIReportsDomain: 'https://sprint-reports.thebdxlive.com',
    BdxLiveDomain: 'https://build.thebdxlive.com',
    CommsNavTop: 0,
    CorpsNavTop: 0,
    DivsNavTop: 0,
    PartnersNavTop: 0,
    PlansNavTop: 0,
    SpecsNavTop: 0,
    EnableTrustBuilderModal: 0,
    EnableMlsNames: 'True',
    EnableChangeHistoryPlan: 'True',
    EnableChangeHistorySpec: 'True',
    EnableChangeHistoryCommunity: 'True',
    EnableNewUrlModal: 'False',
    WhatsNew: 'True',
    BuilderAuditFilesURL: 'https://build-redesign.thebdxlive.com/builder-audit',
    LeadFileFormatURL: 'https://xmlvalidation.thebdxlive.com/documents/NHS-Leads-4_4.pdf',
    RecLeadDocusignUrl: 'https://na2.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=b907d523-74b2-4eb4-a92c-3140e0dbc792&env=na2&acct=b2c6a8f5-d3c5-4610-80d6-d64f5513eacc&v=2',
    AugLeadDocusignUrl: 'https://na2.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=b907d523-74b2-4eb4-a92c-3140e0dbc792&env=na2&acct=b2c6a8f5-d3c5-4610-80d6-d64f5513eacc&v=2',
    AdExpirationDate: '03/23/2023',
    NhsDomain: 'https://s5.newhomesource.com',
    NhsCommunityPreviewPath: '/communitypreview/community-\u003Ccomm_id\u003E',
    NhsPlanPreviewPath: '/homepreview/planid-\u003Cplan_id\u003E',
    NhsMPCPreviewPath: '/masterplanpreview/\u003Cmpc_id\u003E',
    NhsSpecPreviewPath: '/homepreview/specid-\u003Cspec_id\u003E',
    Period: 3,
    SpotlightPeriodsForward: 4,
    SpotlightPeriodsBackward: 0,
    SpotlightNextPeriodOpenDate: '1-31',
    SpotlightSpotCount: 2,
    SpotlightPeriodsNextPeriod: 6,
    SpotlightStartProgram: '01/01/2024',
  };
})();
