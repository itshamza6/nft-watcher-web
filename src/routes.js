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
import PageNotFound from "./Pages/404";

// Background Images

export const routes = [
  // {path: "/", component: HomePage, layout: Layout, rootClasses: "home-star-bg", rootStyle: {backgroundImage: `url("${HomeAndNewsPageImg}")`}},
  {
    path: "/",
    component: HomePage,
    layout: Layout,
    rootClasses: "home-page",
    newsletter: true,
    title:
      "NFTWatcher: Rarity Tools And Upcoming NFT Collections - NFT Calendar",
  },
  {
    path: "/contact-us",
    component: ContactUs,
    layout: Layout,
    rootClasses: "contact-us-page",
    newsletter: true,
    title: "Contact Us | NFTWatcher",
  },
  {
    path: "/terms-and-conditions",
    component: TermsAndConditions,
    layout: Layout,
    rootClasses: "terms-and-conditions-page",
    newsletter: true,
    title: "Terms And Conditions | NFTWatcher",
  },
  {
    path: "/privacy-policy",
    component: PrivacyPolicy,
    layout: Layout,
    rootClasses: "privacy-policy-page",
    newsletter: true,
    title: "Privacy Policy | NFTWatcher",
  },
  {
    path: "/advertise",
    component: Advertise,
    layout: Layout,
    rootClasses: "advertise-page",
    newsletter: true,
    title: "Advertise NFT Project | NFTWatcher",
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
    title: "List Your Upcoming NFT Drop | NFTWatcher",
  },
  {
    path: "/events",
    component: EventHomePage,
    layout: Layout,
    rootClasses: "events-page",
    newsletter: true,
    title: "Upcoming NFT Drops Ranked By Dates | NFTWatcher",
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
    path: "/project/submit",
    component: SubmitProject,
    layout: Layout,
    rootClasses: "submit-project-page",
    newsletter: true,
    title: "List Your NFT Project With Rarity | NFTWatcher",
  },
  {
    path: "*",
    component: PageNotFound,
    layout: Layout,
    rootClasses: "page-not-found-page",
    newsletter: false,
    title: "Page Not Found | NFTWatcher",
  },
];
