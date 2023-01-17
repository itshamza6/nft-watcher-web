import React from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Typography,
  Grid,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Pagination,
  Skeleton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "../api/axios.js";
import ImageIcon from "@mui/icons-material/Image";
import { useSelector, useDispatch } from "react-redux";

// Custom Components
import AllCollections from "../Components/AllCollections";
import BannerImage from "../Components/BannerImage";

const carouselOptions = {
  margin: 30,
  responsiveClass: true,
  nav: true,
  dots: false,
  autoplayTimeout: 3000,
  loop: true,
  autoplay: true,
  navText: ["<", ">"],
  smartSpeed: 1000,
  responsive: {
    0: {
      items: 1,
    },
    400: {
      items: 1,
    },
    600: {
      items: 2,
    },
    700: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  topCollectionItem: {
    cursor: "pointer",
    "&:hover": {
      background: theme.palette.primary.main,
      color: "white",
    },
  },
  carousel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .carouselItem": {
      background: theme.palette.themeCardColor.main,
      color: theme.palette.mode == "light" ? "black" : "white",
    },
  },
  navContainerClass: {
    "& button": {
      position: "absolute",
      top: "45%",
      transform: "translateY(-50%)",
      border: "1px solid white",
      right: 20,
      background: "none",
      color: theme.palette.mode === "light" ? "black" : "white",
      fontSize: 20,
    },
    "& button:first-child": {
      top: "55%",
      marginTop: 10,
    },
    "& button.disabled": {
      border: "1px solid grey",
      color: "grey",
    },
  },
  collectionItem: {
    height: 430,
    border: `1px solid ${theme.palette.primary.main}`,
    background: theme.palette.themeCardColor.main,
    borderRadius: 10,
    position: "relative",
    cursor: "pointer",
  },
  collectionPlaceholderImage: {
    width: "100%",
    height: 230,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  moreRecentcollectionItem: {
    height: 350,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 8,
    position: "relative",
    cursor: "pointer",
  },
  featuredImg: {
    position: "absolute",
    top: 3,
    right: 5,
  },
  recentlyCollected: {
    background: theme.palette.themeCardColor.main,
    width: "100%",
    borderRadius: 20,
    padding: "20px 1px",
    paddingBottom: "45px !important",
    marginTop: 20,
    opacity: 0.8,
  },
  recentlyCollectedBox: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  topCollectionsBox: {
    background: theme.palette.themeCardColor.main,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
  },
  paginationRoot: {
    "& .Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  hyperLink: {
    textDecoration: "none !important",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const FeaturedImg = () => {
  return (
    <svg
      width="108"
      height="23"
      viewBox="0 0 108 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M102.535 0H12.0108C11.1449 0 10.3144 0.246961 9.70204 0.686554C9.0897 1.12615 8.7457 1.72236 8.7457 2.34404C8.7457 2.96572 9.0897 3.56194 9.70204 4.00153C10.3144 4.44112 11.1449 4.68808 12.0108 4.68808H35.085V5.95064H24.5397C23.6738 5.95064 22.8433 6.1976 22.2309 6.63719C21.6186 7.07678 21.2746 7.673 21.2746 8.29468C21.2746 8.91636 21.6186 9.51257 22.2309 9.95217C22.8433 10.3918 23.6738 10.6387 24.5397 10.6387H35.085V11.3581H13.7695C12.9036 11.3581 12.073 11.605 11.4607 12.0446C10.8484 12.4842 10.5044 13.0804 10.5044 13.7021C10.5044 14.3238 10.8484 14.92 11.4607 15.3596C12.073 15.7992 12.9036 16.0462 13.7695 16.0462H35.085V18.307H24.2739C23.4079 18.307 22.5774 18.554 21.9651 18.9936C21.3527 19.4332 21.0087 20.0294 21.0087 20.6511C21.0087 21.2727 21.3527 21.869 21.9651 22.3085C22.5774 22.7481 23.4079 22.9951 24.2739 22.9951H102.535C103.981 22.9951 105.368 22.5826 106.391 21.8485C107.414 21.1143 107.988 20.1185 107.988 19.0802V3.91489C107.988 2.8766 107.414 1.88083 106.391 1.14665C105.368 0.412461 103.981 0 102.535 0V0Z"
        fill="url(#paint0_linear_26_30)"
      />
      <path
        d="M18.6638 8.31919C18.6647 8.01118 18.5809 7.70608 18.4171 7.4214C18.2533 7.13671 18.0129 6.87805 17.7095 6.66026C17.4061 6.44247 17.0458 6.26983 16.6492 6.15226C16.2527 6.03469 15.8277 5.9745 15.3987 5.97514H9.26374C8.83356 5.9732 8.4071 6.03244 8.00897 6.14943C7.61084 6.26642 7.24893 6.43885 6.9441 6.65678C6.63928 6.8747 6.39758 7.1338 6.23296 7.41912C6.06834 7.70445 5.98405 8.01035 5.98496 8.31919C5.98496 8.94002 6.32803 9.53549 6.93889 9.97495C7.54975 10.4144 8.3785 10.6619 9.24329 10.6632H15.3782C15.8087 10.6652 16.2355 10.606 16.634 10.489C17.0325 10.3721 17.3949 10.1997 17.7003 9.98189C18.0056 9.76403 18.248 9.50497 18.4133 9.21962C18.5787 8.93426 18.6638 8.62825 18.6638 8.31919Z"
        fill="url(#paint1_linear_26_30)"
      />
      <path
        d="M18.6638 20.651C18.6638 20.0294 18.3198 19.4332 17.7075 18.9936C17.0951 18.554 16.2646 18.307 15.3987 18.307H3.26514C2.39917 18.307 1.56867 18.554 0.956337 18.9936C0.344003 19.4332 -1.96356e-06 20.0294 -1.96356e-06 20.651C-0.00180046 20.9595 0.0813775 21.2651 0.244745 21.5503C0.408113 21.8356 0.648445 22.0948 0.951911 22.3131C1.25538 22.5315 1.61598 22.7045 2.01298 22.8224C2.40998 22.9403 2.83553 23.0006 3.26514 23H15.3987C15.8283 23.0006 16.2538 22.9403 16.6508 22.8224C17.0478 22.7045 17.4084 22.5315 17.7119 22.3131C18.0154 22.0948 18.2557 21.8356 18.4191 21.5503C18.5824 21.2651 18.6656 20.9595 18.6638 20.651Z"
        fill="url(#paint2_linear_26_30)"
      />
      <path
        d="M47.752 15C47.416 15 47.248 14.832 47.248 14.496V7.368C47.248 7.032 47.416 6.864 47.752 6.864H52.168C52.324 6.864 52.446 6.91 52.534 7.002C52.626 7.09 52.672 7.212 52.672 7.368C52.672 7.704 52.504 7.872 52.168 7.872H48.256V10.392H50.668C51.004 10.392 51.172 10.56 51.172 10.896C51.172 11.232 51.004 11.4 50.668 11.4H48.256V14.496C48.256 14.832 48.088 15 47.752 15ZM53.7922 12.372V12.66C53.7922 13.176 53.8862 13.528 54.0742 13.716C54.2622 13.9 54.6162 13.992 55.1362 13.992H56.1202C56.5282 13.992 56.8302 13.954 57.0262 13.878C57.2222 13.802 57.3522 13.668 57.4162 13.476C57.4602 13.324 57.5202 13.208 57.5962 13.128C57.6762 13.048 57.7962 13.008 57.9562 13.008C58.1242 13.008 58.2522 13.052 58.3402 13.14C58.4282 13.228 58.4562 13.356 58.4242 13.524C58.3362 14.02 58.1002 14.39 57.7162 14.634C57.3322 14.878 56.8002 15 56.1202 15H55.1362C54.3402 15 53.7482 14.808 53.3602 14.424C52.9762 14.04 52.7842 13.452 52.7842 12.66V11.268C52.7842 10.456 52.9762 9.86 53.3602 9.48C53.7482 9.096 54.3402 8.908 55.1362 8.916H56.1202C56.9202 8.916 57.5122 9.108 57.8962 9.492C58.2802 9.872 58.4722 10.464 58.4722 11.268V11.868C58.4722 12.204 58.3042 12.372 57.9682 12.372H53.7922ZM55.1362 9.924C54.6162 9.916 54.2622 10.006 54.0742 10.194C53.8862 10.382 53.7922 10.74 53.7922 11.268V11.364H57.4642V11.268C57.4642 10.744 57.3702 10.39 57.1822 10.206C56.9982 10.018 56.6442 9.924 56.1202 9.924H55.1362ZM62.5497 15C61.8777 15 61.3777 14.836 61.0497 14.508C60.7217 14.18 60.5577 13.68 60.5577 13.008C60.5577 12.336 60.7197 11.836 61.0437 11.508C61.3717 11.18 61.8737 11.016 62.5497 11.016H65.0877C65.0637 10.596 64.9537 10.31 64.7577 10.158C64.5617 10.002 64.2257 9.924 63.7497 9.924H63.0537C62.6537 9.924 62.3557 9.952 62.1597 10.008C61.9637 10.06 61.8257 10.156 61.7457 10.296C61.6737 10.464 61.5997 10.58 61.5237 10.644C61.4477 10.708 61.3337 10.74 61.1817 10.74C61.0137 10.74 60.8817 10.694 60.7857 10.602C60.6897 10.506 60.6617 10.38 60.7017 10.224C60.8217 9.772 61.0717 9.442 61.4517 9.234C61.8357 9.022 62.3697 8.916 63.0537 8.916H63.7497C64.5497 8.916 65.1417 9.108 65.5257 9.492C65.9097 9.876 66.1017 10.468 66.1017 11.268V14.496C66.1017 14.832 65.9337 15 65.5977 15C65.2617 15 65.0937 14.832 65.0937 14.496V14.226C64.6657 14.742 64.0417 15 63.2217 15H62.5497ZM62.5497 13.992H63.2217C63.5177 13.992 63.7957 13.966 64.0557 13.914C64.3157 13.858 64.5377 13.758 64.7217 13.614C64.9097 13.47 65.0337 13.264 65.0937 12.996V12.024H62.5497C62.1537 12.024 61.8897 12.09 61.7577 12.222C61.6297 12.354 61.5657 12.616 61.5657 13.008C61.5657 13.404 61.6297 13.668 61.7577 13.8C61.8897 13.928 62.1537 13.992 62.5497 13.992ZM71.0504 15C70.2584 15 69.6744 14.812 69.2984 14.436C68.9224 14.06 68.7344 13.48 68.7344 12.696V9.924H68.1464C67.8104 9.924 67.6424 9.756 67.6424 9.42C67.6424 9.084 67.8104 8.916 68.1464 8.916H68.7344V8.04C68.7344 7.704 68.9024 7.536 69.2384 7.536C69.5744 7.536 69.7424 7.704 69.7424 8.04V8.916H71.1224C71.4584 8.916 71.6264 9.084 71.6264 9.42C71.6264 9.756 71.4584 9.924 71.1224 9.924H69.7424V12.696C69.7424 13.204 69.8344 13.548 70.0184 13.728C70.2024 13.904 70.5464 13.992 71.0504 13.992C71.2064 13.992 71.3284 14.032 71.4164 14.112C71.5084 14.192 71.5544 14.32 71.5544 14.496C71.5544 14.832 71.3864 15 71.0504 15ZM78.4537 8.916C78.7897 8.916 78.9577 9.084 78.9577 9.42V14.496C78.9577 14.832 78.7897 15 78.4537 15C78.1177 15 77.9497 14.832 77.9497 14.496V14.298C77.5257 14.766 76.9017 15 76.0777 15H75.7417C74.9417 15 74.3497 14.808 73.9657 14.424C73.5817 14.04 73.3897 13.448 73.3897 12.648V9.42C73.3897 9.084 73.5577 8.916 73.8937 8.916C74.2297 8.916 74.3977 9.084 74.3977 9.42V12.648C74.3977 13.172 74.4917 13.528 74.6797 13.716C74.8717 13.9 75.2257 13.992 75.7417 13.992H76.0777C76.5577 13.992 76.9757 13.938 77.3317 13.83C77.6877 13.718 77.8937 13.544 77.9497 13.308V9.42C77.9497 9.084 78.1177 8.916 78.4537 8.916ZM81.959 15C81.623 15 81.455 14.832 81.455 14.496V9.42C81.455 9.084 81.623 8.916 81.959 8.916C82.295 8.916 82.463 9.084 82.463 9.42V9.888C82.699 9.568 82.999 9.326 83.363 9.162C83.731 8.998 84.151 8.916 84.623 8.916C84.959 8.916 85.127 9.084 85.127 9.42C85.127 9.756 84.959 9.924 84.623 9.924C83.931 9.924 83.403 10.052 83.039 10.308C82.675 10.564 82.483 10.902 82.463 11.322V14.496C82.463 14.832 82.295 15 81.959 15ZM87.0618 12.372V12.66C87.0618 13.176 87.1558 13.528 87.3438 13.716C87.5318 13.9 87.8858 13.992 88.4058 13.992H89.3898C89.7978 13.992 90.0998 13.954 90.2958 13.878C90.4918 13.802 90.6218 13.668 90.6858 13.476C90.7298 13.324 90.7898 13.208 90.8658 13.128C90.9458 13.048 91.0658 13.008 91.2258 13.008C91.3938 13.008 91.5218 13.052 91.6098 13.14C91.6978 13.228 91.7258 13.356 91.6938 13.524C91.6058 14.02 91.3698 14.39 90.9858 14.634C90.6018 14.878 90.0698 15 89.3898 15H88.4058C87.6098 15 87.0178 14.808 86.6298 14.424C86.2458 14.04 86.0538 13.452 86.0538 12.66V11.268C86.0538 10.456 86.2458 9.86 86.6298 9.48C87.0178 9.096 87.6098 8.908 88.4058 8.916H89.3898C90.1898 8.916 90.7818 9.108 91.1658 9.492C91.5498 9.872 91.7418 10.464 91.7418 11.268V11.868C91.7418 12.204 91.5738 12.372 91.2378 12.372H87.0618ZM88.4058 9.924C87.8858 9.916 87.5318 10.006 87.3438 10.194C87.1558 10.382 87.0618 10.74 87.0618 11.268V11.364H90.7338V11.268C90.7338 10.744 90.6398 10.39 90.4518 10.206C90.2678 10.018 89.9138 9.924 89.3898 9.924H88.4058ZM96.0112 15C95.2152 15 94.6232 14.808 94.2352 14.424C93.8512 14.036 93.6592 13.444 93.6592 12.648V11.268C93.6592 10.468 93.8512 9.876 94.2352 9.492C94.6232 9.108 95.2152 8.916 96.0112 8.916H98.3392V7.056C98.3392 6.72 98.5072 6.552 98.8432 6.552C99.1792 6.552 99.3472 6.72 99.3472 7.056V14.496C99.3472 14.832 99.1792 15 98.8432 15C98.5072 15 98.3392 14.832 98.3392 14.496V14.412C98.1512 14.604 97.9052 14.75 97.6012 14.85C97.2972 14.95 96.9192 15 96.4672 15H96.0112ZM96.0112 13.992H96.4672C96.9952 13.992 97.4392 13.924 97.7992 13.788C98.1592 13.652 98.3392 13.444 98.3392 13.164V9.924H96.0112C95.4912 9.924 95.1372 10.02 94.9492 10.212C94.7612 10.4 94.6672 10.752 94.6672 11.268V12.648C94.6672 13.168 94.7612 13.522 94.9492 13.71C95.1412 13.898 95.4952 13.992 96.0112 13.992Z"
        fill="black"
      />
      <defs>
        <linearGradient
          id="paint0_linear_26_30"
          x1="98.8542"
          y1="-7.90808"
          x2="43.7985"
          y2="42.3425"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F9D700" />
          <stop offset="0.55" stop-color="#F8CB00" />
          <stop offset="1" stop-color="#F6BE00" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_26_30"
          x1="1553.69"
          y1="-234.013"
          x2="1100.3"
          y2="569.421"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F9D700" />
          <stop offset="0.55" stop-color="#F8CB00" />
          <stop offset="1" stop-color="#F6BE00" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_26_30"
          x1="2469.79"
          y1="-148.435"
          x2="2115.05"
          y2="775.85"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F9D700" />
          <stop offset="0.55" stop-color="#F8CB00" />
          <stop offset="1" stop-color="#F6BE00" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();
  const collections = useSelector((state) => state.collections);
  const dispatch = useDispatch();

  const limits = {
    newestCollectionsLimit: 12,
    recentlyCollectionsLimit: 15,
    moreRecentlyCollectionsLimit: 20,
    topFilteredCollectionsLimit: 10,
  };

  const [newestCollectionsLoading, setNewestCollectionsLoading] =
    React.useState(false);
  const [recentlyCollectionsLoading, setRecentlyCollectionsLoading] =
    React.useState(false);
  const [moreRecentlyCollectionsLoading, setMoreRecentlyCollectionsLoading] =
    React.useState(false);
  const [topCollectionsBoxLoading, setTopCollectionsBoxLoading] =
    React.useState(false);
  const [topCollections, setTopCollections] = React.useState({});

  React.useEffect(() => {
    if (collections?.newest?.length === 0 || collections?.newest == null) {
      setNewestCollectionsLoading(true);
      getCollectionsFromBackend(
        "newest",
        "newest",
        setNewestCollectionsLoading,
        {
          limit: limits.newestCollectionsLimit,
        }
      );
    }

    if (collections?.recently?.length === 0 || collections?.recently == null) {
      setRecentlyCollectionsLoading(true);
      getCollectionsFromBackend(
        "newest",
        "recently",
        setRecentlyCollectionsLoading,
        {
          limit: limits.recentlyCollectionsLimit,
          offset: limits.newestCollectionsLimit,
        }
      );
    }

    if (
      collections?.more_recently?.length === 0 ||
      collections?.more_recently == null
    ) {
      setMoreRecentlyCollectionsLoading(true);
      getCollectionsFromBackend(
        "newest",
        "more_recently",
        setMoreRecentlyCollectionsLoading,
        {
          limit: limits.moreRecentlyCollectionsLimit,
          offset:
            limits.newestCollectionsLimit + limits.recentlyCollectionsLimit,
        }
      );
    }

    getTopCollections();
    // if (
    //   collections?.top_collections_by_seven_day_volume?.length === 0 ||
    //   collections?.top_collections_by_seven_day_volume == null
    // ) {
    //   setTopCollectionsBoxLoading(true);
    //   getCollectionsFromBackend(
    //     "top_collections_by_seven_day_volume",
    //     "top_collections_by_seven_day_volume",
    //     setTopCollectionsBoxLoading,
    //     {
    //       limit: limits.topFilteredCollectionsLimit,
    //     }
    //   );
    // }

    // if (
    //   collections?.top_collections_by_total_volume?.length === 0 ||
    //   collections?.top_collections_by_total_volume == null
    // ) {
    //   setTopCollectionsBoxLoading(true);
    //   getCollectionsFromBackend(
    //     "top_collections_by_total_volume",
    //     "top_collections_by_total_volume",
    //     setTopCollectionsBoxLoading,
    //     {
    //       limit: limits.topFilteredCollectionsLimit,
    //     }
    //   );
    // }

    // if (
    //   collections?.top_collections_by_seven_day_avg_price?.length === 0 ||
    //   collections?.top_collections_by_seven_day_avg_price == null
    // ) {
    //   setTopCollectionsBoxLoading(true);
    //   getCollectionsFromBackend(
    //     "top_collections_by_seven_day_avg_price",
    //     "top_collections_by_seven_day_avg_price",
    //     setTopCollectionsBoxLoading,
    //     {
    //       limit: limits.topFilteredCollectionsLimit,
    //     }
    //   );
    // }

    // if (
    //   collections?.top_collections_by_owner_count?.length === 0 ||
    //   collections?.top_collections_by_owner_count == null
    // ) {
    //   setTopCollectionsBoxLoading(true);
    //   getCollectionsFromBackend(
    //     "top_collections_by_owner_count",
    //     "top_collections_by_owner_count",
    //     setTopCollectionsBoxLoading,
    //     {
    //       limit: limits.topFilteredCollectionsLimit,
    //     }
    //   );
    // }
  }, []);

  const getTopCollections = async () => {
    if (
      collections?.top_collections_by_seven_day_volume?.length === 0 ||
      collections?.top_collections_by_seven_day_volume == null
    ) {
      const res = await axios.get("/collections/top_collections");
      setCollection(
        {
          collections: res.data.collections.top_collections_by_seven_day_volume,
        },
        "top_collections_by_seven_day_volume"
      );
      setCollection(
        { collections: res.data.collections.top_collections_by_total_volume },
        "top_collections_by_total_volume"
      );
      setCollection(
        {
          collections:
            res.data.collections.top_collections_by_seven_day_avg_price,
        },
        "top_collections_by_seven_day_avg_price"
      );
      setCollection(
        { collections: res.data.collections.top_collections_by_owner_count },
        "top_collections_by_owner_count"
      );
      console.log({
        collections: res.data.collections.top_collections_by_owner_count,
      });
      setTopCollections({
        top_collections_by_seven_day_volume:
          res.data.collections.top_collections_by_seven_day_volume,
        top_collections_by_total_volume:
          res.data.collections.top_collections_by_total_volume,
        top_collections_by_seven_day_avg_price:
          res.data.collections.top_collections_by_seven_day_avg_price,
        top_collections_by_owner_count:
          res.data.collections.top_collections_by_owner_count,
      });
    } else {
      setTopCollections({
        top_collections_by_seven_day_volume:
          collections.top_collections_by_seven_day_volume,
        top_collections_by_total_volume:
          collections.top_collections_by_total_volume,
        top_collections_by_seven_day_avg_price:
          collections.top_collections_by_seven_day_avg_price,
        top_collections_by_owner_count:
          collections.top_collections_by_owner_count,
      });
    }
  };

  const setCollection = (data, key) => {
    dispatch({
      type: "collections:add",
      key: key,
      data: data.collections,
    });
  };

  const getCollectionsFromBackend = async (url, key, setLoading, params) => {
    const res = await axios.get(`/collections/${url}`, { params });
    setCollection(res.data, key);
    setLoading(false);
  };

  function round(num, places) {
    num = parseFloat(num);
    places = places ? parseInt(places, 10) : 0;
    if (places > 0) {
      let length = places;
      places = "1";
      for (let i = 0; i < length; i++) {
        places += "0";
        places = parseInt(places, 10);
      }
    } else {
      places = 1;
    }
    return Math.round((num + Number.EPSILON) * (1 * places)) / (1 * places);
  }

  return (
    <div className="mx-md-5 mx-3">
      <div className="mt-4">
        <BannerImage />
      </div>
      <br />
      <Typography variant="h4" component="h2">
        <span
          style={{
            fontFamily: "Jura",
            color: theme.palette.primary.main,
            borderBottom: `3px solid ${theme.palette.primary.main}`,
          }}
        >
          Newest
        </span>{" "}
        <span style={{ fontFamily: "Jura" }}>Collections</span>
      </Typography>
      <Grid container spacing={4} mt={1}>
        {(newestCollectionsLoading && collections?.newest?.length === 0) ||
        collections?.newest == null
          ? [0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
              return (
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Skeleton
                    key={item}
                    height={300}
                    variant={"rectangular"}
                    animation={"wave"}
                    width={"100%"}
                  />
                </Grid>
              );
            })
          : collections?.newest?.map((item, i) => {
              return (
                <CollectionItem
                  key={i}
                  item={{
                    owners: item.stats.num_owners,
                    slug: item.slug,
                    total_volume: item.stats.total_volume,
                    name: item.name,
                    image: item.banner_image_url,
                    image2: item.image_url,
                    id: i,
                    desc: item.description ?? "N/A",
                    featured: item.featured,
                  }}
                />
              );
            })}
      </Grid>
      <br />
      <br />
      <br />
      <br />
      <Typography variant="h4" component="h2">
        <span style={{ fontFamily: "Jura" }}>Collections Listed</span>{" "}
        <span
          style={{
            fontFamily: "Jura",
            color: theme.palette.primary.main,
            borderBottom: `3px solid ${theme.palette.primary.main}`,
          }}
        >
          Recently
        </span>
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="start"
        className={`${classes.recentlyCollected} d-flex mx-auto w-100`}
      >
        {(recentlyCollectionsLoading && collections?.recently?.length === 0) ||
        collections?.recently == null
          ? [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15].map((item) => {
              return (
                <Grid item lg={2.3} md={4} sm={6} xs={12}>
                  <Skeleton
                    key={item}
                    style={{ borderRadius: 10 }}
                    height={50}
                    variant={"rectangular"}
                    animation={"wave"}
                    width={"90%"}
                  />
                </Grid>
              );
            })
          : collections?.recently?.map((item, i) => {
              return (
                <Grid item xl={2} lg={2.3} md={4} sm={6} xs={12}>
                  <Link
                    exact
                    to={`/collection/${item.slug}`}
                    className={`${classes.hyperLink} d-flex align-items-center`}
                  >
                    <img
                      src={item.image_url}
                      style={{ width: 50, height: 50, borderRadius: 9999 }}
                    />
                    <Typography>
                      <span
                        className="mx-2"
                        style={{
                          fontFamily: "Lato",
                          fontSize: 18,
                          fontWeight: "500",
                          color:
                            theme.palette.mode == "dark" ? "white" : "black",
                        }}
                      >
                        {item.name}
                      </span>
                    </Typography>
                  </Link>
                </Grid>
              );
            })}
      </Grid>

      <Typography variant="h4" component="h2" mt={5}>
        <span style={{ fontFamily: "Jura" }}>More </span>
        <span
          style={{
            fontFamily: "Jura",
            color: theme.palette.primary.main,
            borderBottom: `3px solid ${theme.palette.primary.main}`,
          }}
        >
          Recent{" "}
        </span>
        <span style={{ fontFamily: "Jura" }}>Collections</span>
      </Typography>

      <Grid
        container
        spacing={2}
        mt={5}
        justifyContent="center"
        className="mx-auto d-flex w-100"
      >
        {(moreRecentlyCollectionsLoading &&
          collections?.more_recently?.length === 0) ||
        collections?.more_recently == null ? (
          <OwlCarousel
            key={`carousel_${[0, 1, 2, 3, 4, 5, 6, 7, 8].length}`}
            className={`${classes.carousel} owl-theme`}
            margin={10}
            {...carouselOptions}
            navContainerClass={classes.navContainerClass}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12].map((item) => {
              return (
                <Grid item lg={12} md={12} sm={6} xs={12}>
                  <Skeleton
                    key={item}
                    height={300}
                    variant={"rectangular"}
                    animation={"wave"}
                    width={"100%"}
                  />
                </Grid>
              );
            })}
          </OwlCarousel>
        ) : (
          <OwlCarousel
            key={`carousel_${[0, 1, 2, 3, 4, 5, 6, 7, 8].length}`}
            className={`${classes.carousel} owl-theme`}
            margin={10}
            {...carouselOptions}
            navContainerClass={classes.navContainerClass}
          >
            {collections?.more_recently?.map((item, i) => {
              return (
                <Grid
                  key={item}
                  item
                  lg={12}
                  md={12}
                  sm={6}
                  xs={12}
                  className={`${classes.moreRecentcollectionItem} carouselItem`}
                >
                  <Link
                    exact
                    to={`/collection/${item.slug}`}
                    className={`${classes.hyperLink}`}
                  >
                    {/* <div> */}
                    <img
                      src={item.image_url}
                      style={{
                        height: 300,
                        width: "100%",
                        borderRadius: 8,
                      }}
                      className="mx-auto d-flex"
                    />
                    <Typography
                      variant={"h6"}
                      component="h6"
                      className={`mx-3 d-flex align-items-center themedText`}
                      style={{
                        height: 45,
                      }}
                    >
                      {item.name}
                    </Typography>
                    {/* </div> */}
                  </Link>
                </Grid>
              );
            })}
          </OwlCarousel>
        )}
      </Grid>

      <Typography variant="h4" component="h2" mt={5}>
        <span
          style={{
            fontFamily: "Jura",
            color: theme.palette.primary.main,
            borderBottom: `3px solid ${theme.palette.primary.main}`,
          }}
        >
          Top{" "}
        </span>
        <span style={{ fontFamily: "Jura" }}>Collections</span>
      </Typography>

      <Grid container spacing={2} mt={3} justifyContent="center">
        {[
          { name: "7 Day Volume", key: "top_collections_by_seven_day_volume" },
          { name: "By Total Volume", key: "top_collections_by_total_volume" },
          {
            name: "By 7 Day Average Price",
            key: "top_collections_by_seven_day_avg_price",
          },
          { name: "By Owner Count", key: "top_collections_by_owner_count" },
        ].map((item, i) => {
          return (
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <div className={classes.topCollectionsBox}>
                <Typography
                  variant={"h6"}
                  component="h6"
                  className="px-3 py-2 mb-2 d-flex align-items-center"
                >
                  <span className="">{item.name}</span>
                </Typography>
                {(topCollectionsBoxLoading &&
                  topCollections[item.key]?.length === 0) ||
                topCollections[item.key] == null
                  ? [0, 1, 2, 3, 4, 5, 6, 7, 9].map((item) => {
                      return (
                        <div
                          className={`d-flex align-items-center px-2 py-1 flex-row my-auto mb-2`}
                        >
                          <Skeleton
                            key={item}
                            height={50}
                            style={{ borderRadius: 10 }}
                            variant={"rectangular"}
                            animation={"wave"}
                            width={"100%"}
                          />
                        </div>
                      );
                    })
                  : topCollections[item.key]?.map((item, i) => {
                      return (
                        <Link exact to={`/collection/${item.slug}`}>
                          <div
                            key={i}
                            className={`d-flex align-items-center px-2 py-1 flex-row my-auto mb-2 ${classes.topCollectionItem}`}
                          >
                            <p className="m-0 fw-bold" style={{ width: 28 }}>
                              #{i + 1}
                            </p>
                            <img
                              src={item.image_url}
                              style={{
                                width: 35,
                                height: 35,
                                borderRadius: 9999,
                              }}
                              className="ms-2"
                            />
                            <div className="ms-3">
                              <p className="m-0">{item.name}</p>
                              <p
                                style={{ fontSize: 12, opacity: "0.7" }}
                                className="m-0"
                              >
                                {round(item?.stats?.total_volume, 2)} ETH
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
              </div>
            </Grid>
          );
        })}
      </Grid>

      <Typography variant="h4" component="h2" mt={5}>
        <span
          style={{
            fontFamily: "Jura",
            color: theme.palette.primary.main,
            borderBottom: `3px solid ${theme.palette.primary.main}`,
          }}
        >
          All{" "}
        </span>
        <span style={{ fontFamily: "Jura" }}>Collections</span>
      </Typography>

      <AllCollections />

      {/* {allCollectionsPageCount > 1 ? (
          <Stack
            style={{
              padding: "20px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            spacing={2}
            m={3}>
            <Pagination
              count={allCollectionsPageCount}
              variant='outlined'
              shape='rounded'
              hide
              page={allCollectionsPage}
              onChange={(e, page) => {
                if (allCollectionsLoading) return;
                setAllCollectionsPage(parseInt(page));
                setAllCollectionsLoading(true);
                getCollectionsFromBackend(
                  "all_collections",
                  "all_collections",
                  setAllCollectionsLoading,
                  {
                    limit: limits.topCollectionsLimit,
                    page: parseInt(page),
                  }
                );
              }}
              className={classes.paginationRoot}
            />
          </Stack>
        ) : null} */}
    </div>
  );
};

const CollectionItem = ({ item }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();

  function round(num, places) {
    num = parseFloat(num);
    places = places ? parseInt(places, 10) : 0;
    if (places > 0) {
      let length = places;
      places = "1";
      for (let i = 0; i < length; i++) {
        places += "0";
        places = parseInt(places, 10);
      }
    } else {
      places = 1;
    }
    return Math.round((num + Number.EPSILON) * (1 * places)) / (1 * places);
  }

  return (
    <Grid
      item
      lg={3}
      md={4}
      sm={6}
      xs={12}
      component={Link}
      to={`/collection/${item.slug}`}
    >
      <div className={classes.collectionItem}>
        {item.image ? (
          <img
            src={item.image}
            style={{ height: 230, width: "100%", borderRadius: 10 }}
          />
        ) : (
          <div className={classes.collectionPlaceholderImage}>
            <ImageIcon style={{ fontSize: 100 }} />
          </div>
        )}
        {item.featured ? (
          <div className={classes.featuredImg}>
            <FeaturedImg />
          </div>
        ) : null}
        <div className="px-2">
          <div className="d-flex align-items-start justify-content-between mt-3">
            <div>
              <Typography
                color={theme.palette.primary.main}
                variant="h6"
                component="h6"
                style={{ fontWeight: "bold" }}
              >
                {item.name}
              </Typography>
              <p style={{ fontSize: 12 }}>
                Owners: {item.owners ?? "0"} <br /> Total Volume:{" "}
                {round(item.total_volume, 2).toLocaleString() ?? "0"} ETH
              </p>
            </div>
            <img
              src={item.image2}
              style={{ width: 50, height: 50, borderRadius: 9999 }}
            />
          </div>
          <p style={{ fontSize: 12 }}>
            {item.desc.slice(0, 150)}
            {item.desc.length > 150 ? ".." : null}
          </p>
        </div>
      </div>
    </Grid>
  );
};

export default HomePage;
