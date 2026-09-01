import type { Source } from "./models.js";

export const candidateSources: Source[] = [
  {
    id: "seek",
    name: "SEEK",
    careersUrl: "https://www.seek.co.nz/",
    endpointUrl: null,
    sourceType: "html",
    enabled: true,
    policyStatus: "approved",
  },
  {
    id: "microsoft-careers",
    name: "Microsoft Careers",
    careersUrl:
      "https://jobs.careers.microsoft.com/global/en/search?lc=New%20Zealand",
    endpointUrl: null,
    sourceType: "html",
    enabled: true,
    policyStatus: "approved",
  },
  /* Vista is temporarily excluded from collection.
  {
    id: "vista", name: "Vista", careersUrl: "https://careers.vista.co/",
    endpointUrl: null, sourceType: "html", enabled: false, policyStatus: "pending",
  }, */
  {
    id: "xero",
    name: "Xero",
    careersUrl: "https://careers.xero.com/jobs/",
    endpointUrl: null,
    sourceType: "html",
    enabled: true,
    policyStatus: "approved",
  },
  {
    id: "serko",
    name: "Serko",
    careersUrl: "https://www.serko.com/careers",
    endpointUrl: null,
    sourceType: "html",
    enabled: true,
    policyStatus: "approved",
  },
  {
    id: "pushpay",
    name: "Pushpay",
    careersUrl: "https://pushpay.com/about-us/careers/new-zealand/",
    endpointUrl: null,
    sourceType: "html",
    enabled: true,
    policyStatus: "approved",
  },
  /* Datacom is temporarily excluded from collection.
  {
    id: "datacom", name: "Datacom", careersUrl: "https://careers.datacom.com/",
    endpointUrl: null, sourceType: "html", enabled: false, policyStatus: "pending",
  }, */
  {
    id: "trade-me-jobs",
    name: "Trade Me Jobs",
    careersUrl: "https://www.trademe.co.nz/a/jobs/it/programming-development",
    endpointUrl: null,
    sourceType: "html",
    enabled: true,
    policyStatus: "approved",
  },
];
