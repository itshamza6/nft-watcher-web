import HomePage from "./Pages/HomePage";
import ContactUs from "./Pages/ContactUs";
import Layout from "./Layout";
import TermsAndConditions from "./Pages/TermsAndConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Advertise from "./Pages/Advertise";
import NFTDetails from "./Pages/NFTDetails";
import SubmitProject from "./Pages/SubmitProject";
import SubmitEvent from "./Pages/Event/SubmitEvent";
import EventHomePage from "./Pages/Event/HomePage";
import ShowEvent from "./Pages/Event/ShowEvent";
import UpgradeListing from "./Pages/Event/UpgradeListing";
import PageNotFound from "./Pages/404";
import SEOTitles from "./seo-titles";

// Background Images

export const routes = [
  // {path: "/", component: HomePage, layout: Layout, rootClasses: "home-star-bg", rootStyle: {backgroundImage: `url("${HomeAndNewsPageImg}")`}},
  {
    path: "/",
    component: HomePage,
    layout: Layout,
    rootClasses: "home-page",
    newsletter: true,
    title: SEOTitles?.find((_) => _.url === "")?.title,
  },
  {
    path: "/contact-us",
    component: ContactUs,
    layout: Layout,
    rootClasses: "contact-us-page",
    newsletter: true,
    title: SEOTitles?.find((_) => _.url?.includes("contact-us") == true)?.title,
  },
  {
    path: "/terms-and-conditions",
    component: TermsAndConditions,
    layout: Layout,
    rootClasses: "terms-and-conditions-page",
    newsletter: true,
    title: SEOTitles?.find(
      (_) => _.url?.includes("terms-and-conditions") == true
    )?.title,
  },
  {
    path: "/privacy-policy",
    component: PrivacyPolicy,
    layout: Layout,
    rootClasses: "privacy-policy-page",
    newsletter: true,
    title: SEOTitles?.find((_) => _.url?.includes("privacy-policy") == true)
      ?.title,
  },
  {
    path: "/advertise",
    component: Advertise,
    layout: Layout,
    rootClasses: "advertise-page",
    newsletter: true,
    title: SEOTitles?.find((_) => _.url?.includes("advertise") == true)?.title,
  },
  {
    path: "/collection/:slug",
    component: NFTDetails,
    layout: Layout,
    rootClasses: "nft-details-page",
    newsletter: true,
  },
  {
    path: "/events/submit",
    component: SubmitEvent,
    layout: Layout,
    rootClasses: "submit-event-page",
    newsletter: true,
    title: SEOTitles?.find((_) => _.url?.includes("events/submit") == true)
      ?.title,
  },
  {
    path: "/events",
    component: EventHomePage,
    layout: Layout,
    rootClasses: "events-page",
    newsletter: true,
    title: SEOTitles?.find((_) => _.url?.includes("/events") == true)?.title,
  },
  {
    path: "/events/tab/:selectedTab",
    component: EventHomePage,
    layout: Layout,
    rootClasses: "events-page",
    newsletter: true,
  },
  {
    path: "/events/:name",
    component: ShowEvent,
    layout: Layout,
    rootClasses: "show-events-page",
    newsletter: true,
  },
  {
    path: "/events/:name/upgrade",
    component: UpgradeListing,
    layout: Layout,
    rootClasses: "show-events-page",
    newsletter: true,
  },
  {
    path: "/project/submit",
    component: SubmitProject,
    layout: Layout,
    rootClasses: "submit-project-page",
    newsletter: true,
    title: SEOTitles?.find((_) => _.url?.includes("project/submit") == true)
      ?.title,
  },
  {
    path: "*",
    component: PageNotFound,
    layout: Layout,
    rootClasses: "page-not-found-page",
    newsletter: false,
    title: SEOTitles?.find((_) => _.url === "*")?.title,
  },
];
