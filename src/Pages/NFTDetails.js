import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Button,
  Menu,
  MenuItem,
  Typography,
  Stack,
  Pagination,
  Skeleton,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import PricingImg from "../images/pricingImg.png";
import OpenseaLogo from "../images/openseaLogo.png";
import HeaderImg from "../images/Header.png";
import CollectionBoxImg from "../images/collectionBoxImg.png";
import MoreRecentImg from "../images/moreRecent.png";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Accordian from "../Components/Accordian";
import OpenSeaModel from "../Components/OpenSeaModel";
import { useSelector, useDispatch } from "react-redux";
import axios from "../api/axios.js";
import { toast } from "react-toastify";

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
      items: 3,
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  leftSide: {
    background: theme.palette.themeCardColor.main,
    minHeight: "100%",
    marginTop: "-10px",
  },
  rightSide: {},
  appBarIcon: {
    cursor: "pointer",
    background: theme.palette.themeCardColor.main,
    borderRadius: 5,
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  activeFiltersBox: {
    background: theme.palette.themeCardColor.main,
    minHeight: 50,
    borderRadius: 4,
    border: `1px solid ${theme.palette.primary.main}`,
  },
  activeFilter: {
    border: `1px solid ${theme.palette.primary.main}`,
    background: theme.palette.themeCardColor.light,
    borderRadius: 4,
    position: "relative",
  },
  activeFilterCloseIcon: {
    position: "absolute",
    top: -12,
    right: -8,
    cursor: "pointer",
  },
  sortByButton: {
    background: theme.palette.themeCardColor.main,
    color: theme.palette.mode === "light" ? "black" : "white",
    textTransform: "capitalize",
    width: 250,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
  },
  sortByMenuItem: {
    width: 250,
    textTransform: "capitalize",
  },
  paginationInput: {
    background: theme.palette.themeCardColor.main,
    width: 80,
    margin: "0 10px",
    border: "none",
    outline: "none",
    padding: "5px 0",
    textAlign: "center",
    borderRadius: 4,
    color: theme.palette.mode === "light" ? "black" : "white",
    border: `1px solid ${theme.palette.primary.main}`,
  },
  filteredItemTypeOne: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    position: "relative",
  },
  input: {
    width: "100%",
    padding: 5,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    background: "transparent",
    outline: "none",
    color: theme.palette.mode === "light" ? "black" : "white",
    "&::-webkit-input-placeholder": {
      color: theme.palette.mode === "light" ? "black" : "white",
    },
  },
  themeButton: {
    color: theme.palette.mode === "light" ? "black" : "white",
  },
  cursorPointer: {
    cursor: "pointer",
  },
  moreRecentcollectionItem: {
    height: 350,
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 8,
    position: "relative",
    cursor: "pointer",
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
  paginationRoot: {
    "& .Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

const NFTDetails = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { slug } = useParams();
  const classes = useStyles();
  const collections = useSelector((state) => state.collections);
  const dispatch = useDispatch();

  const limits = {
    newestCollectionsLimit: 12,
    recentlyCollectionsLimit: 15,
    moreRecentlyCollectionsLimit: 20,
    topFilteredCollectionsLimit: 10,
    topCollectionsLimit: 20,
  };

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  // More Recent Collections
  const [moreRecentlyCollectionsLoading, setMoreRecentlyCollectionsLoading] =
    React.useState(false);

  const setCollectionsData = (data, key) => {
    dispatch({
      type: "collections:add",
      key: key,
      data: data.collections,
    });
  };

  const getCollectionsFromBackend = async (url, key, setLoading, params) => {
    const res = await axios.get(`/collections/${url}`, { params });
    setCollectionsData(res.data, key);
    setLoading(false);
  };

  const [collection, setCollection] = React.useState({});
  const [collectionLoading, setCollectionLoading] = React.useState(true);
  const [assets, setAssets] = React.useState([]);
  const [filteredAssets, setFilteredAssets] = React.useState([]);
  const [assetsLoading, setAssetsLoading] = React.useState(true);
  const [modelState, setModelState] = React.useState(false);

  const [sortByEl, setSortByEl] = React.useState(null);
  const [projectEl, setProjectEl] = React.useState(null);
  const [metaEl, setMetaEl] = React.useState(null);
  const [traitsEl, setTraitsEl] = React.useState({});
  const sortByOpen = Boolean(sortByEl);
  const projectOpen = Boolean(projectEl);
  const metaOpen = Boolean(metaEl);
  const [selectedSortBy, setSelectedSortBy] = React.useState({
    key: "rarity:ranking",
    value: "Rarity",
  });
  const [selectedProject, setSelectedProject] = React.useState("");
  const [selectedMeta, setSelectedMeta] = React.useState("");

  const [filters, setFilters] = React.useState({});
  const [traitFilters, setTraitFilters] = React.useState({});
  const [price, setPrice] = React.useState({});

  const [assetsCount, setAssetCount] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const assetsLimit = 30;
  const [assetsPage, setAssetsPage] = React.useState(1);

  const [assetId, setAssetId] = React.useState("");
  const [tokenId, setTokenId] = React.useState("");
  const [defaultParams, setDefaultParams] = React.useState({});
  const [collectionSlugs, setCollectionSlugs] = React.useState([]);

  React.useEffect(() => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    window.addEventListener("resize", handleResize);

    getCollection();
    setFilterUsingParams();

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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [slug]);

  React.useEffect(() => {
    const collection_names = collections?.collection_names ?? [];
    if (collection_names?.length > 0) {
      const fCollection = collection_names.filter(
        (item) => item.slug == slug
      )[0];

      document.title = fCollection?.name
        ? `${fCollection?.name} | NFTWatcher`
        : "NFTWatcher";
    } else {
      document.title = `${slug} | NFTWatcher`;
    }
  }, [collections?.collection_names]);

  React.useEffect(() => {
    if (price["Min ETH"] == "" && filters["Min ETH"] != null) {
      delete filters["Min ETH"];
      setFilters({
        ...filters,
      });
    }
    if (price["Max ETH"] == "" && filters["Max ETH"] != null) {
      delete filters["Max ETH"];
      setFilters({
        ...filters,
      });
    }

    const params = {};
    if (filters["Buy Now"] == "on") {
      params.listing_type = "buy:now";
    }

    if (filters["Auction"] == "on") {
      params.listing_type2 = "on:auction";
    }

    // if (filters["Trait Count"].length > 0) {
    //   params.listing_type2 = "on:auction";
    // }

    if (price["Min ETH"] != "" && filters["Min ETH"] != null) {
      params.price_greater_than = filters["Min ETH"];
    }

    if (price["Max ETH"] != "" && filters["Max ETH"] != null) {
      params.price_less_than = filters["Max ETH"];
    }

    // traits=Accessory=Bars:Category=Metallic
    var traitParams = "";
    Object.keys(traitFilters).map((item, i) => {
      traitParams += `${item}=${traitFilters[item]}`;
      if (i + 1 != Object.keys(traitFilters).length) {
        traitParams += ":";
      }
    });

    if (traitParams.length > 0) {
      params.traits = traitParams;
    }

    const urlParams = new URLSearchParams({
      ...filters,
      traits: JSON.stringify(traitFilters),
    });
    navigate({
      pathname: window.location.pathname,
      search: urlParams.toString(),
    });

    setDefaultParams(params);
    getAssets(params, false);
  }, [filters, traitFilters, slug]);

  const setFilterUsingParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    setDefaultParams(urlParams.toString());
    const entries = urlParams.entries();
    const params = paramsToObject(entries);

    if (Object.keys(params).length > 0) {
      setTraitFilters(JSON.parse(params.traits));
      delete params["traits"];
      setFilters(params);
    } else {
      getAssets();
    }
  };

  function paramsToObject(entries) {
    const result = {};
    for (const [key, value] of entries) {
      // each 'entry' is a [key, value] tupple
      result[key] = value;
    }
    return result;
  }

  const getAssets = (params = {}, useDefaultParams = true) => {
    setAssetsLoading(true);
    let dParams = {};
    if (Object.keys(defaultParams).length > 0 && useDefaultParams === true) {
      dParams = defaultParams;
    }
    axios
      .get(`/assets/${slug}`, {
        params: {
          limit: assetsLimit ?? 10,
          sortBy: selectedSortBy.key,
          ...dParams,
          ...params,
        },
      })
      .then((res) => {
        setAssets(res.data.assets);
        setAssetsPage(res.data.page);
        setAssetCount(res.data.total);
        setTotalPages(res.data.total_pages);
        setAssetsLoading(false);
      });
  };

  const nextAssetsPage = () => {
    if (assetsLoading) return;
    setAssetsPage(parseInt(assetsPage) + 1);
    getAssets({
      page: parseInt(assetsPage) + 1,
    });
  };

  const gotoAssetsPage = (number) => {
    if (assetsLoading) return;
    setAssetsPage(parseInt(number));
    getAssets({
      page: parseInt(number),
    });
  };

  const prevAssetsPage = () => {
    if (assetsLoading) return;
    setAssetsPage(parseInt(assetsPage) - 1);
    getAssets({
      page: parseInt(assetsPage) - 1,
    });
  };

  const onSelectSortByOption = (item) => {
    setSortByEl(null);
    getAssets({ sortBy: item.key });
    setSelectedSortBy(item);
  };

  const onSelectTraits = (name, value) => {
    setTraitsEl({});
    setMetaEl(null);
    setTraitFilters({
      ...traitFilters,
      [name]: value,
    });
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

  const capitalizeText = (string) => {
    return string.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });
  };

  const getCollection = () => {
    setCollectionLoading(true);
    axios
      .get(`/collection/${slug}`)
      .then((res) => {
        if (res.data.success) {
          setCollection(res.data.collection);
          setCollectionLoading(false);
        } else {
          toast.error("This Collection Does't exists on nftwatcher.net!");
        }
      })
      .catch(console.error);
  };

  function handleResize() {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }

  const openAssetModel = (item) => {
    setAssetId(item.token_id);
    setModelState(true);
  };

  return (
    <div className={classes.root}>
      <OpenSeaModel
        open={modelState}
        slug={slug}
        assetId={assetId}
        onClose={() => setModelState(false)}
      />
      <div className="row">
        <div className={`${classes.leftSide} col-lg-3 col-12 pe-0`}>
          {collections?.collection_names?.length > 0 ? (
            <div
              className="d-flex mx-auto flex-column mt-5 mb-3"
              style={{ width: "80%" }}
            >
              {/* <p className="font-jura">Project</p> */}
              <Button
                className={`${classes.sortByButton} d-flex align-items-center justify-content-between`}
                onClick={(event) => setProjectEl(event.currentTarget)}
              >
                Project -{" "}
                {
                  collections?.collection_names?.find((i) => i.slug === slug)
                    ?.name
                }
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.541 21.631C5.48088 21.4976 4.49536 21.015 3.73992 20.2594C2.98448 19.5038 2.50214 18.5181 2.369 17.458C2.1276 15.6486 2.00434 13.8254 2 12C2.00436 10.1743 2.12762 8.35073 2.369 6.541C2.50251 5.4811 2.985 4.49578 3.74039 3.74039C4.49578 2.985 5.4811 2.50251 6.541 2.369C8.35073 2.12762 10.1743 2.00436 12 2C13.8257 2.0043 15.6493 2.12756 17.459 2.369C18.519 2.50235 19.5044 2.98478 20.2598 3.7402C21.0152 4.49562 21.4977 5.48103 21.631 6.541C21.8724 8.35073 21.9956 10.1743 22 12C21.9957 13.8258 21.8724 15.6493 21.631 17.459C21.4978 18.519 21.0154 19.5045 20.26 20.26C19.5045 21.0154 18.519 21.4978 17.459 21.631C15.6493 21.8724 13.8258 21.9957 12 22C10.1743 21.9956 8.35073 21.8724 6.541 21.631V21.631Z"
                      fill="#FCFCFD"
                    />
                    <path
                      d="M14.793 9.79303L12 12.586L9.20697 9.79303C9.01944 9.60556 8.76513 9.50024 8.49997 9.50024C8.23481 9.50024 7.9805 9.60556 7.79297 9.79303C7.6055 9.98056 7.50018 10.2349 7.50018 10.5C7.50018 10.7652 7.6055 11.0195 7.79297 11.207L11.293 14.707C11.4805 14.8945 11.7348 14.9998 12 14.9998C12.2651 14.9998 12.5194 14.8945 12.707 14.707L16.207 11.207C16.3944 11.0195 16.4998 10.7652 16.4998 10.5C16.4998 10.2349 16.3944 9.98056 16.207 9.79303C16.0194 9.60556 15.7651 9.50024 15.5 9.50024C15.2348 9.50024 14.9805 9.60556 14.793 9.79303V9.79303Z"
                      fill="#8212F4"
                    />
                  </svg>
                </div>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={projectEl}
                open={projectOpen}
                onClose={() => setProjectEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {collections?.collection_names?.map((item, i) => (
                  <MenuItem
                    key={i}
                    className={classes.sortByMenuItem}
                    onClick={() => {
                      setProjectEl(null);
                      navigate("/collection/" + item.slug);
                    }}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>

              <div className="d-flex align-items-center justify-content-center mt-3 mb-3 w-100">
                <input
                  type="text"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                  className={`${classes.input}`}
                  placeholder="ID"
                />
                <div
                  className="ms-2"
                  style={{
                    marginRight: "-4px",
                  }}
                  role="button"
                  onClick={() => {
                    setAssetId(tokenId);
                    setModelState(true);
                  }}
                >
                  <svg
                    width="35"
                    height="35"
                    viewBox="0 0 35 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="34"
                      height="34"
                      rx="5.5"
                      fill={"none"}
                      stroke="#8212F4"
                    />
                    <path
                      d="M27 26L22.514 21.506L27 26ZM25 15.5C25 17.7543 24.1045 19.9163 22.5104 21.5104C20.9163 23.1045 18.7543 24 16.5 24C14.2457 24 12.0837 23.1045 10.4896 21.5104C8.89553 19.9163 8 17.7543 8 15.5C8 13.2457 8.89553 11.0837 10.4896 9.48959C12.0837 7.89553 14.2457 7 16.5 7C18.7543 7 20.9163 7.89553 22.5104 9.48959C24.1045 11.0837 25 13.2457 25 15.5V15.5Z"
                      stroke="#8212F4"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="font-jura mb-2">Item Filters</h3>
              <p>Listing Type</p>
              <div className="d-flex align-items-center justify-content-between">
                <Button
                  variant={
                    filters["Buy Now"] == "on" ? "contained" : "outlined"
                  }
                  className={`${classes.themeButton} px-4 text-capitalize`}
                  onClick={() => {
                    if (filters["Buy Now"] == "on") {
                      delete filters["Buy Now"];
                      setFilters({
                        ...filters,
                      });
                    } else {
                      setFilters({
                        ...filters,
                        "Buy Now": "on",
                      });
                    }
                  }}
                >
                  Buy now
                </Button>
                <Button
                  variant={
                    filters["Auction"] == "on" ? "contained" : "outlined"
                  }
                  className={`${classes.themeButton} px-4 text-capitalize`}
                  onClick={() => {
                    if (filters["Auction"] == "on") {
                      delete filters["Auction"];
                      setFilters({
                        ...filters,
                      });
                    } else {
                      setFilters({
                        ...filters,
                        Auction: "on",
                      });
                    }
                  }}
                >
                  Auction
                </Button>
              </div>

              <p className="mt-3">Price (Buy Now only)</p>
              <div className="d-flex align-items-center justify-content-center mt-3 mb-3 w-100">
                <input
                  type="number"
                  value={price.minETH}
                  onChange={(e) =>
                    setPrice({ ...price, "Min ETH": e.target.value })
                  }
                  className={`${classes.input} text-center`}
                  placeholder="Min ETH"
                />
                <p className="px-2">_</p>
                <input
                  type="number"
                  value={price.maxETH}
                  onChange={(e) =>
                    setPrice({ ...price, "Max ETH": e.target.value })
                  }
                  className={`${classes.input} text-center`}
                  placeholder="Max ETH"
                />
              </div>
              <Button
                variant="contained"
                className="px-4 w-100"
                onClick={() => {
                  setFilters({
                    ...filters,
                    ...price,
                  });
                }}
              >
                Apply Now
              </Button>

              {/* <p className="mt-3 font-jura">Rarity</p>
                        <div className="d-flex align-items-center justify-content-center mt-3 mb-3 w-100">
                            <input type="number" className={`${classes.input} text-center`} placeholder="Min Rank" />
                            <p className="px-2">_</p>
                            <input type="number" className={`${classes.input} text-center`} placeholder="Max Rank" />
                        </div>
                        <Button variant="contained" className="px-4 w-100">
                            Apply Now
                        </Button> */}

              {/* <p className="mt-3 font-jura">Trait Filters</p>
                        <div className="d-flex align-items-center justify-content-between">
                            <Button variant="outlined" className="px-4" className={`${classes.themeButton} text-capitalize`}>
                                Collapse All
                            </Button>
                            <Button variant="outlined" className="px-4" className={`${classes.themeButton} text-capitalize`}>
                                Expand All
                            </Button>
                        </div> */}
              {Object.keys(collection?.traits_count ?? {}).length > 0 && (
                <>
                  <p className="mt-3 font-jura">META</p>
                  <Button
                    className={`${classes.sortByButton} d-flex align-items-center justify-content-between`}
                    onClick={(event) => setMetaEl(event.currentTarget)}
                  >
                    Trait Count - {traitFilters["Trait Count"]}
                    <div>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.541 21.631C5.48088 21.4976 4.49536 21.015 3.73992 20.2594C2.98448 19.5038 2.50214 18.5181 2.369 17.458C2.1276 15.6486 2.00434 13.8254 2 12C2.00436 10.1743 2.12762 8.35073 2.369 6.541C2.50251 5.4811 2.985 4.49578 3.74039 3.74039C4.49578 2.985 5.4811 2.50251 6.541 2.369C8.35073 2.12762 10.1743 2.00436 12 2C13.8257 2.0043 15.6493 2.12756 17.459 2.369C18.519 2.50235 19.5044 2.98478 20.2598 3.7402C21.0152 4.49562 21.4977 5.48103 21.631 6.541C21.8724 8.35073 21.9956 10.1743 22 12C21.9957 13.8258 21.8724 15.6493 21.631 17.459C21.4978 18.519 21.0154 19.5045 20.26 20.26C19.5045 21.0154 18.519 21.4978 17.459 21.631C15.6493 21.8724 13.8258 21.9957 12 22C10.1743 21.9956 8.35073 21.8724 6.541 21.631V21.631Z"
                          fill="#FCFCFD"
                        />
                        <path
                          d="M14.793 9.79303L12 12.586L9.20697 9.79303C9.01944 9.60556 8.76513 9.50024 8.49997 9.50024C8.23481 9.50024 7.9805 9.60556 7.79297 9.79303C7.6055 9.98056 7.50018 10.2349 7.50018 10.5C7.50018 10.7652 7.6055 11.0195 7.79297 11.207L11.293 14.707C11.4805 14.8945 11.7348 14.9998 12 14.9998C12.2651 14.9998 12.5194 14.8945 12.707 14.707L16.207 11.207C16.3944 11.0195 16.4998 10.7652 16.4998 10.5C16.4998 10.2349 16.3944 9.98056 16.207 9.79303C16.0194 9.60556 15.7651 9.50024 15.5 9.50024C15.2348 9.50024 14.9805 9.60556 14.793 9.79303V9.79303Z"
                          fill="#8212F4"
                        />
                      </svg>
                    </div>
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={metaEl}
                    open={metaOpen}
                    onClose={() => setMetaEl(null)}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {Object.keys(collection?.traits_count ?? {}).map(
                      (item, i) => (
                        <MenuItem
                          key={i}
                          className={classes.sortByMenuItem}
                          onClick={() => onSelectTraits("Trait Count", item)}
                        >
                          {item} - {collection?.traits_count[item]}
                        </MenuItem>
                      )
                    )}
                  </Menu>
                </>
              )}

              <p className="mt-3 font-jura">Attributes</p>
              {!collectionLoading
                ? Object.keys(collection?.traits ?? {}).map((item, i) => {
                    if (item === "Rank") {
                      return null;
                    }
                    return (
                      <>
                        <Button
                          className={`${classes.sortByButton} d-flex align-items-center justify-content-between`}
                          onClick={(event) =>
                            setTraitsEl({
                              [item]: event.currentTarget,
                            })
                          }
                        >
                          {item} - {traitFilters[item]}
                          <div>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.541 21.631C5.48088 21.4976 4.49536 21.015 3.73992 20.2594C2.98448 19.5038 2.50214 18.5181 2.369 17.458C2.1276 15.6486 2.00434 13.8254 2 12C2.00436 10.1743 2.12762 8.35073 2.369 6.541C2.50251 5.4811 2.985 4.49578 3.74039 3.74039C4.49578 2.985 5.4811 2.50251 6.541 2.369C8.35073 2.12762 10.1743 2.00436 12 2C13.8257 2.0043 15.6493 2.12756 17.459 2.369C18.519 2.50235 19.5044 2.98478 20.2598 3.7402C21.0152 4.49562 21.4977 5.48103 21.631 6.541C21.8724 8.35073 21.9956 10.1743 22 12C21.9957 13.8258 21.8724 15.6493 21.631 17.459C21.4978 18.519 21.0154 19.5045 20.26 20.26C19.5045 21.0154 18.519 21.4978 17.459 21.631C15.6493 21.8724 13.8258 21.9957 12 22C10.1743 21.9956 8.35073 21.8724 6.541 21.631V21.631Z"
                                fill="#FCFCFD"
                              />
                              <path
                                d="M14.793 9.79303L12 12.586L9.20697 9.79303C9.01944 9.60556 8.76513 9.50024 8.49997 9.50024C8.23481 9.50024 7.9805 9.60556 7.79297 9.79303C7.6055 9.98056 7.50018 10.2349 7.50018 10.5C7.50018 10.7652 7.6055 11.0195 7.79297 11.207L11.293 14.707C11.4805 14.8945 11.7348 14.9998 12 14.9998C12.2651 14.9998 12.5194 14.8945 12.707 14.707L16.207 11.207C16.3944 11.0195 16.4998 10.7652 16.4998 10.5C16.4998 10.2349 16.3944 9.98056 16.207 9.79303C16.0194 9.60556 15.7651 9.50024 15.5 9.50024C15.2348 9.50024 14.9805 9.60556 14.793 9.79303V9.79303Z"
                                fill="#8212F4"
                              />
                            </svg>
                          </div>
                        </Button>
                        <Menu
                          id="basic-menu"
                          anchorEl={traitsEl[item]}
                          open={Boolean(traitsEl[item])}
                          onClose={() =>
                            setTraitsEl({
                              [item]: null,
                            })
                          }
                          MenuListProps={{
                            "aria-labelledby": "basic-button",
                          }}
                        >
                          {Object.keys(collection.traits[item]).map(
                            (optionValue, i) => (
                              <MenuItem
                                key={i}
                                className={classes.sortByMenuItem}
                                onClick={() =>
                                  onSelectTraits(
                                    item,
                                    capitalizeText(optionValue)
                                  )
                                }
                              >
                                {optionValue} -{" "}
                                {collection.traits[item][optionValue]}
                              </MenuItem>
                            )
                          )}
                        </Menu>
                        <br />
                      </>
                    );
                  })
                : null}
            </div>
          ) : null}
        </div>
        <div className="col-lg-9 col-12">
          <div className="mx-4">
            <div className="d-flex align-items-center justify-content-center mt-4">
              {!collectionLoading ? (
                collection.banner_image_url ? (
                  <img
                    style={{ width: "100%", height: "30vh", borderRadius: 10 }}
                    aria-hidden
                    src={collection.banner_image_url}
                    alt={"Home Page Header Image"}
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "30vh",
                      borderRadius: 10,
                      backgroundColor: "rgba(0,0,0,0.3)",
                    }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <h1 className="text-center text-white">
                      Image Not
                      <br /> Available
                    </h1>
                  </div>
                )
              ) : (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={"30vh"}
                  className={`mx-auto`}
                />
              )}
            </div>
            <br />

            {/* Profile Header */}
            <div
              className={`d-flex align-items-center justify-content-between ${
                dimensions.width > 768 ? null : "flex-column"
              } mt-2`}
            >
              {!collectionLoading ? (
                <img
                  src={collection.image_url}
                  style={{ width: 100, height: 100, borderRadius: 9999 }}
                  alt={"Home Page Header Image"}
                  loading="lazy"
                />
              ) : (
                <Skeleton
                  variant="rectangular"
                  style={{ width: 100, height: 100, borderRadius: 9999 }}
                />
              )}
              <div className="d-flex align-items-center justify-content-center flex-column mt-2">
                {!collectionLoading ? (
                  <h1 className={"font-jura"}>{collection.name}</h1>
                ) : (
                  <Skeleton
                    variant={"rectangular"}
                    width={150}
                    height={30}
                    className="mb-3"
                  />
                )}
                <Button
                  className="px-3"
                  size={"small"}
                  onClick={() =>
                    window.open("https://opensea.io/collection/" + slug)
                  }
                  style={{
                    background: "#F6BE00",
                    color: "black",
                    textTransform: "capitalize",
                    fontSize: 12,
                    fontWeight: "bold",
                  }}
                >
                  View on OpenSea{" "}
                  <img src={OpenseaLogo} width={25} className="ms-2" />
                </Button>
              </div>
              {dimensions.width > 768 ? (
                <div className="mt-2">
                  <svg
                    width="2"
                    height="109"
                    viewBox="0 0 2 109"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1"
                      y1="4.37114e-08"
                      x2="0.999995"
                      y2="109"
                      stroke="white"
                      stroke-opacity="0.5"
                      stroke-width="2"
                    />
                  </svg>
                </div>
              ) : null}
              <div
                className="d-flex align-items-center justify-content-center flex-column mt-2"
                style={{ maxWidth: 500, minWidth: 400 }}
              >
                {!collectionLoading ? (
                  <p className="font-jura text-center">
                    {collection?.description ? (
                      <>
                        {collection?.description}
                        {/* {collection?.description?.slice(0, 100)}
                        {collection?.description?.length > 100 ? ".." : null} */}
                      </>
                    ) : (
                      "Description Not Available"
                    )}
                  </p>
                ) : (
                  <Skeleton
                    variant="rectangular"
                    width={300}
                    height={50}
                    className="mb-3"
                  />
                )}
                <div className="d-flex align-items-center justify-content-center">
                  {collection?.twitter_url ? (
                    <div
                      className={` ${classes.appBarIcon}`}
                      onClick={() => window.open(collection?.twitter_url)}
                    >
                      <svg
                        width="14"
                        height="11"
                        viewBox="0 0 14 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14 1.30215C13.4848 1.523 12.9313 1.67227 12.3503 1.73941C12.9434 1.39574 13.3988 0.851518 13.6132 0.203085C13.0494 0.526554 12.4326 0.754458 11.7893 0.87695C11.2654 0.337276 10.5189 0 9.69276 0C8.10649 0 6.82041 1.24336 6.82041 2.77689C6.82041 2.99456 6.84584 3.20648 6.89478 3.40977C4.50767 3.29393 2.39127 2.18841 0.974586 0.50832C0.727398 0.918456 0.585758 1.39553 0.585758 1.90438C0.585758 2.86783 1.09288 3.71776 1.86353 4.21577C1.40741 4.20196 0.961324 4.08285 0.562516 3.86839C0.562352 3.88003 0.562352 3.89166 0.562352 3.90334C0.562352 5.2488 1.55241 6.37119 2.86634 6.6263C2.44338 6.73751 1.99972 6.75379 1.56926 6.67389C1.93473 7.77713 2.99551 8.57995 4.25234 8.60242C3.26933 9.34719 2.03082 9.79117 0.68518 9.79117C0.453305 9.79117 0.224711 9.778 0 9.75236C1.2711 10.5403 2.78086 11 4.40289 11C9.68609 11 12.5751 6.76853 12.5751 3.09894C12.5751 2.97849 12.5723 2.85873 12.5668 2.73966C13.1291 2.34665 13.6144 1.85987 14 1.30215"
                          fill={`${
                            theme.palette.mode === "light" ? "black" : "white"
                          }`}
                        />
                      </svg>
                    </div>
                  ) : null}

                  {collection?.website_url ? (
                    <div
                      className={`ms-3 ${classes.appBarIcon}`}
                      onClick={() => window.open(collection?.website_url)}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.10004 13.94C5.08004 13.94 5.05337 13.9533 5.03337 13.9533C3.74004 13.3133 2.68671 12.2533 2.04004 10.96C2.04004 10.94 2.05337 10.9133 2.05337 10.8933C2.86671 11.1333 3.70671 11.3133 4.54004 11.4533C4.68671 12.2933 4.86004 13.1266 5.10004 13.94Z"
                          fill={`${
                            theme.palette.mode === "light" ? "black" : "white"
                          }`}
                        />
                        <path
                          d="M13.96 10.9666C13.3 12.2933 12.2 13.3666 10.86 14.0133C11.1133 13.1666 11.3267 12.3133 11.4667 11.4533C12.3067 11.3133 13.1333 11.1333 13.9467 10.8933C13.94 10.92 13.96 10.9466 13.96 10.9666Z"
                          fill={`${
                            theme.palette.mode === "light" ? "black" : "white"
                          }`}
                        />
                        <path
                          d="M14.0133 5.13991C13.1733 4.88657 12.3267 4.67991 11.4667 4.53324C11.3267 3.67324 11.12 2.81991 10.86 1.98657C12.24 2.64657 13.3533 3.75991 14.0133 5.13991Z"
                          fill={`${
                            theme.palette.mode === "light" ? "black" : "white"
                          }`}
                        />
                        <path
                          d="M5.10003 2.06004C4.86003 2.87337 4.68669 3.70004 4.54669 4.54004C3.68669 4.67337 2.83336 4.88671 1.98669 5.14004C2.63336 3.80004 3.70669 2.70004 5.03336 2.04004C5.05336 2.04004 5.08003 2.06004 5.10003 2.06004Z"
                          fill={`${
                            theme.palette.mode === "light" ? "black" : "white"
                          }`}
                        />
                        <path
                          d="M10.3267 4.39325C8.78001 4.21992 7.22001 4.21992 5.67334 4.39325C5.84001 3.47992 6.05334 2.56659 6.35334 1.68659C6.36667 1.63325 6.36001 1.59325 6.36667 1.53992C6.89334 1.41325 7.43334 1.33325 8.00001 1.33325C8.56001 1.33325 9.10667 1.41325 9.62667 1.53992C9.63334 1.59325 9.63334 1.63325 9.64667 1.68659C9.94667 2.57325 10.16 3.47992 10.3267 4.39325Z"
                          fill={`${
                            theme.palette.mode === "light" ? "black" : "white"
                          }`}
                        />
                        <path
                          d="M4.39337 10.3267C3.47337 10.16 2.56671 9.94667 1.68671 9.64667C1.63337 9.63334 1.59337 9.64001 1.54004 9.63334C1.41337 9.10667 1.33337 8.56667 1.33337 8.00001C1.33337 7.44001 1.41337 6.89334 1.54004 6.37334C1.59337 6.36667 1.63337 6.36667 1.68671 6.35334C2.57337 6.06001 3.47337 5.84001 4.39337 5.67334C4.22671 7.22001 4.22671 8.78001 4.39337 10.3267Z"
                          fill={`${
                            theme.palette.mode === "light" ? "black" : "white"
                          }`}
                        />
                        <path
                          d="M14.6667 8.00001C14.6667 8.56667 14.5867 9.10667 14.46 9.63334C14.4067 9.64001 14.3667 9.63334 14.3134 9.64667C13.4267 9.94001 12.52 10.16 11.6067 10.3267C11.78 8.78001 11.78 7.22001 11.6067 5.67334C12.52 5.84001 13.4334 6.05334 14.3134 6.35334C14.3667 6.36667 14.4067 6.37334 14.46 6.37334C14.5867 6.90001 14.6667 7.44001 14.6667 8.00001Z"
                          fill={`${
                            theme.palette.mode === "light" ? "black" : "white"
                          }`}
                        />
                        <path
                          d="M10.3267 11.6067C10.16 12.5267 9.94667 13.4334 9.64667 14.3134C9.63334 14.3667 9.63334 14.4067 9.62667 14.46C9.10667 14.5867 8.56001 14.6667 8.00001 14.6667C7.43334 14.6667 6.89334 14.5867 6.36667 14.46C6.36001 14.4067 6.36667 14.3667 6.35334 14.3134C6.06001 13.4267 5.84001 12.5267 5.67334 11.6067C6.44667 11.6934 7.22001 11.7534 8.00001 11.7534C8.78001 11.7534 9.56001 11.6934 10.3267 11.6067Z"
                          fill={`${
                            theme.palette.mode === "light" ? "black" : "white"
                          }`}
                        />
                        <path
                          d="M10.5089 10.5088C8.84153 10.7192 7.15855 10.7192 5.49115 10.5088C5.28078 8.84141 5.28078 7.15843 5.49115 5.49103C7.15855 5.28066 8.84153 5.28066 10.5089 5.49103C10.7193 7.15843 10.7193 8.84141 10.5089 10.5088Z"
                          fill={`${
                            theme.palette.mode === "light" ? "black" : "white"
                          }`}
                        />
                      </svg>
                    </div>
                  ) : null}

                  {collection?.discord_url ? (
                    <div
                      className={`ms-3 ${classes.appBarIcon}`}
                      onClick={() => window.open(collection?.discord_url)}
                    >
                      <svg
                        width="16"
                        height="12"
                        viewBox="0 0 16 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.544 0.995228C12.5241 0.535261 11.4308 0.195286 10.2876 0.00196664C10.2774 1.20537e-05 10.2669 0.00127166 10.2574 0.00557126C10.248 0.00987087 10.2401 0.0169978 10.2349 0.0259649C10.0949 0.271947 9.93894 0.592591 9.82961 0.845906C8.61709 0.664743 7.38439 0.664743 6.17187 0.845906C6.05011 0.565166 5.91279 0.291429 5.76057 0.0259649C5.75541 0.0168874 5.74761 0.00959926 5.7382 0.00507316C5.72879 0.00054707 5.71822 -0.0010018 5.70791 0.000633336C4.56532 0.193953 3.47207 0.533928 2.45148 0.994562C2.4427 0.998244 2.43525 1.00452 2.43014 1.01256C0.355628 4.06234 -0.212998 7.03679 0.0663156 9.97391C0.0670929 9.98111 0.0693258 9.98807 0.0728784 9.99437C0.0764311 10.0007 0.0812292 10.0062 0.0869808 10.0106C1.29782 10.8921 2.64835 11.5637 4.08203 11.9971C4.09202 12.0002 4.10271 12.0002 4.1127 11.9971C4.12269 11.994 4.13151 11.988 4.13802 11.9798C4.446 11.5665 4.72065 11.1298 4.9553 10.6712C4.96929 10.6445 4.95596 10.6125 4.92796 10.6019C4.49733 10.4397 4.08008 10.244 3.68005 10.0166C3.67287 10.0125 3.66681 10.0066 3.66243 9.99963C3.65804 9.99261 3.65547 9.98461 3.65494 9.97635C3.65442 9.96809 3.65595 9.95983 3.6594 9.9523C3.66285 9.94478 3.66812 9.93823 3.67472 9.93325C3.75872 9.87125 3.84271 9.80659 3.9227 9.74193C3.9299 9.73611 3.93858 9.73241 3.94776 9.73124C3.95694 9.73006 3.96626 9.73145 3.9747 9.73526C6.59251 10.9112 9.42764 10.9112 12.0148 9.73526C12.0232 9.73123 12.0327 9.72965 12.042 9.73071C12.0513 9.73177 12.0601 9.73543 12.0674 9.74126C12.1474 9.80659 12.2308 9.87125 12.3154 9.93325C12.3221 9.93813 12.3275 9.94459 12.331 9.95205C12.3346 9.95951 12.3362 9.96773 12.3358 9.97599C12.3354 9.98424 12.333 9.99227 12.3287 9.99935C12.3245 10.0064 12.3185 10.0124 12.3114 10.0166C11.9128 10.2459 11.4982 10.4399 11.0629 10.6012C11.0562 10.6036 11.0501 10.6075 11.045 10.6124C11.0399 10.6174 11.0359 10.6234 11.0333 10.63C11.0308 10.6366 11.0296 10.6437 11.03 10.6508C11.0304 10.6579 11.0323 10.6649 11.0355 10.6712C11.2755 11.1292 11.5502 11.5651 11.8521 11.9791C11.8584 11.9876 11.8672 11.9939 11.8772 11.9973C11.8872 12.0006 11.898 12.0008 11.9081 11.9978C13.3443 11.5656 14.697 10.8937 15.9092 10.0106C15.9151 10.0064 15.92 10.0011 15.9237 9.99488C15.9274 9.98868 15.9297 9.98175 15.9305 9.97458C16.2638 6.57882 15.3719 3.62837 13.5647 1.01389C13.5602 1.0054 13.5529 0.998774 13.544 0.995228ZM5.3466 8.18537C4.55866 8.18537 3.9087 7.47276 3.9087 6.59882C3.9087 5.72422 4.54599 5.01227 5.3466 5.01227C6.15321 5.01227 6.79716 5.73022 6.7845 6.59882C6.7845 7.47343 6.14721 8.18537 5.3466 8.18537ZM10.6629 8.18537C9.87427 8.18537 9.22499 7.47276 9.22499 6.59882C9.22499 5.72422 9.86161 5.01227 10.6629 5.01227C11.4695 5.01227 12.1134 5.73022 12.1008 6.59882C12.1008 7.47343 11.4702 8.18537 10.6629 8.18537Z"
                          fill={`${
                            theme.palette.mode === "light" ? "black" : "white"
                          }`}
                        />
                      </svg>
                    </div>
                  ) : null}

                  {collection?.telegram_url ? (
                    <div
                      className={`ms-3 ${classes.appBarIcon}`}
                      onClick={() => window.open(collection?.telegram_url)}
                    >
                      <svg
                        style={{ padding: 3 }}
                        width="24"
                        height="20"
                        viewBox="0 0 24 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.1094 0.336534L1.42436 8.31303C0.0126919 8.88003 0.0208587 9.66753 1.16536 10.0187L6.47603 11.6754L18.7634 3.92287C19.3444 3.56937 19.8752 3.75953 19.4389 4.14687L9.48369 13.1314H9.48136L9.48369 13.1325L9.11736 18.6065C9.65403 18.6065 9.89086 18.3604 10.1919 18.0699L12.7714 15.5615L18.1369 19.5247C19.1262 20.0695 19.8367 19.7895 20.0829 18.6089L23.605 2.00953C23.9655 0.564034 23.0532 -0.0904657 22.1094 0.336534Z"
                          fill={`${
                            theme.palette.mode === "light" ? "black" : "white"
                          }`}
                        />
                      </svg>
                    </div>
                  ) : null}
                  {collection?.instagram_url ? (
                    <div className={`ms-3 ${classes.appBarIcon}`}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.2 0H9.8C12.1196 0 14 1.8804 14 4.2V9.8C14 12.1196 12.1196 14 9.8 14H4.2C1.8804 14 0 12.1196 0 9.8V4.2C0 1.8804 1.8804 0 4.2 0ZM11.2 2.1C11.55 2.1 11.9 2.45 11.9 2.8C11.9 3.15 11.55 3.5 11.2 3.5C10.85 3.5 10.5 3.15 10.5 2.8C10.5 2.45 10.85 2.1 11.2 2.1ZM10.5 7C10.5 5.06975 8.93025 3.5 7 3.5C5.06975 3.5 3.5 5.06975 3.5 7C3.5 8.93025 5.06975 10.5 7 10.5C8.93025 10.5 10.5 8.93025 10.5 7ZM7 4.9C5.8402 4.9 4.9 5.8402 4.9 7C4.9 8.1598 5.8402 9.1 7 9.1C8.1598 9.1 9.1 8.1598 9.1 7C9.1 5.8402 8.1598 4.9 7 4.9Z"
                          fill={`${
                            theme.palette.mode === "light" ? "black" : "white"
                          }`}
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <br />

            <div className="row">
              {!collectionLoading ? (
                <div className="col-md-3 col-12">
                  <div
                    className={`d-flex align-items-center justify-content-center flex-column py-2 mt-3`}
                    style={{
                      background: theme.palette.themeCardColor.main,
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: 6,
                    }}
                  >
                    <p style={{ color: theme.palette.primary.main }}>
                      Total Volume
                    </p>
                    <h4>
                      {round(
                        collection?.stats?.total_volume,
                        2
                      ).toLocaleString() ?? "0"}{" "}
                      ETH
                    </h4>
                  </div>
                </div>
              ) : (
                <div className="col-md-3 col-12">
                  <Skeleton
                    className="py-2 mt-3"
                    variant="rectangular"
                    width={"100%"}
                    height={100}
                  />
                </div>
              )}
              {!collectionLoading ? (
                <div className="col-md-3 col-12">
                  <div
                    className={`d-flex align-items-center justify-content-center flex-column py-2 mt-3`}
                    style={{
                      background: theme.palette.themeCardColor.main,
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: 6,
                    }}
                  >
                    <p style={{ color: theme.palette.primary.main }}>
                      7 Day Volume
                    </p>
                    <h4>
                      {round(
                        collection?.stats?.seven_day_volume,
                        2
                      ).toLocaleString() ?? "0"}{" "}
                      ETH
                    </h4>
                  </div>
                </div>
              ) : (
                <div className="col-md-3 col-12">
                  <Skeleton
                    className="py-2 mt-3"
                    variant="rectangular"
                    width={"100%"}
                    height={100}
                  />
                </div>
              )}
              {!collectionLoading ? (
                <div className="col-md-3 col-12">
                  <div
                    className={`d-flex align-items-center justify-content-center flex-column py-2 mt-3`}
                    style={{
                      background: theme.palette.themeCardColor.main,
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: 6,
                    }}
                  >
                    <p style={{ color: theme.palette.primary.main }}>
                      7 Day Avg Price
                    </p>
                    <h4>
                      {round(
                        collection?.stats?.seven_day_average_price,
                        2
                      ).toLocaleString() ?? "0"}{" "}
                      ETH
                    </h4>
                  </div>
                </div>
              ) : (
                <div className="col-md-3 col-12">
                  <Skeleton
                    className="py-2 mt-3"
                    variant="rectangular"
                    width={"100%"}
                    height={100}
                  />
                </div>
              )}

              {!collectionLoading ? (
                <div className="col-md-3 col-12">
                  <div
                    className={`d-flex align-items-center justify-content-center flex-column py-2 mt-3`}
                    style={{
                      background: theme.palette.themeCardColor.main,
                      border: `2px solid ${theme.palette.primary.main}`,
                      borderRadius: 6,
                    }}
                  >
                    <p style={{ color: theme.palette.primary.main }}>Owners</p>
                    <h4>{collection?.stats?.num_owners} Owners</h4>
                  </div>
                </div>
              ) : (
                <div className="col-md-3 col-12">
                  <Skeleton
                    className="py-2 mt-3"
                    variant="rectangular"
                    width={"100%"}
                    height={100}
                  />
                </div>
              )}
            </div>

            {Object.keys(filters).length > 0 ||
            Object.keys(traitFilters).length > 0 ? (
              <>
                <h3 className="mt-5 font-jura">Active Filters</h3>
                <div
                  className={`${classes.activeFiltersBox} p-2 d-flex align-items-center`}
                >
                  {Object.keys(filters).map((item) => {
                    return (
                      <div
                        className={`${classes.activeFilter} d-flex align-items-center me-4`}
                      >
                        <div
                          className={classes.activeFilterCloseIcon}
                          onClick={() => {
                            delete filters[item];
                            setFilters({
                              ...filters,
                            });
                          }}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="3.75"
                              y="2.5"
                              width="7.5"
                              height="10"
                              fill="#8212F4"
                            />
                            <path
                              d="M12.8434 2.18828C9.91851 -0.729426 5.11863 -0.729426 2.1937 2.18828C-0.731232 5.10598 -0.731232 9.89401 2.1937 12.8117C5.11863 15.7294 9.84351 15.7294 12.7684 12.8117C15.6934 9.89401 15.7684 5.10598 12.8434 2.18828V2.18828ZM9.61852 10.6421L7.51857 8.54738L5.41862 10.6421L4.36865 9.59476L6.46859 7.5L4.36865 5.40524L5.41862 4.35786L7.51857 6.45262L9.61852 4.35786L10.6685 5.40524L8.56854 7.5L10.6685 9.59476L9.61852 10.6421V10.6421Z"
                              fill={`${
                                theme.palette.mode == "light"
                                  ? "black"
                                  : "white"
                              }`}
                            />
                          </svg>
                        </div>
                        <span className="py-2 px-2">{item}</span>
                        <p
                          className="m-0 py-2 px-2"
                          style={{
                            background: theme.palette.primary.main,
                            color: "white",
                          }}
                        >
                          {filters[item]}
                        </p>
                      </div>
                    );
                  })}

                  {Object.keys(traitFilters).map((item) => {
                    return (
                      <div
                        className={`${classes.activeFilter} d-flex align-items-center me-4`}
                      >
                        <div
                          className={classes.activeFilterCloseIcon}
                          onClick={() => {
                            delete traitFilters[item];
                            setTraitFilters({
                              ...traitFilters,
                            });
                          }}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="3.75"
                              y="2.5"
                              width="7.5"
                              height="10"
                              fill="#8212F4"
                            />
                            <path
                              d="M12.8434 2.18828C9.91851 -0.729426 5.11863 -0.729426 2.1937 2.18828C-0.731232 5.10598 -0.731232 9.89401 2.1937 12.8117C5.11863 15.7294 9.84351 15.7294 12.7684 12.8117C15.6934 9.89401 15.7684 5.10598 12.8434 2.18828V2.18828ZM9.61852 10.6421L7.51857 8.54738L5.41862 10.6421L4.36865 9.59476L6.46859 7.5L4.36865 5.40524L5.41862 4.35786L7.51857 6.45262L9.61852 4.35786L10.6685 5.40524L8.56854 7.5L10.6685 9.59476L9.61852 10.6421V10.6421Z"
                              fill={`${
                                theme.palette.mode == "light"
                                  ? "black"
                                  : "white"
                              }`}
                            />
                          </svg>
                        </div>
                        <span className="py-2 px-2">{item}</span>
                        <p
                          className="m-0 py-2 px-2"
                          style={{
                            background: theme.palette.primary.main,
                            color: "white",
                          }}
                        >
                          {traitFilters[item]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : null}

            <div
              className={`d-flex align-items-center justify-content-between ${
                dimensions.width > 768 ? null : "flex-column"
              } mt-3`}
            >
              <p className={`m-0 h6 mt-2`}>
                {assetsCount?.toLocaleString()} Total {collection.name ?? ""}
              </p>
              <p className={`m-0 h6 mt-2`}>
                Price Floor: {collection?.stats?.floor_price ?? "0"} ETH
              </p>
              <div className="mt-2">
                <Button
                  className={`${classes.sortByButton} d-flex align-items-center justify-content-between`}
                  onClick={(event) => setSortByEl(event.currentTarget)}
                >
                  Sort By - {selectedSortBy.value}
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.541 21.631C5.48088 21.4976 4.49536 21.015 3.73992 20.2594C2.98448 19.5038 2.50214 18.5181 2.369 17.458C2.1276 15.6486 2.00434 13.8254 2 12C2.00436 10.1743 2.12762 8.35073 2.369 6.541C2.50251 5.4811 2.985 4.49578 3.74039 3.74039C4.49578 2.985 5.4811 2.50251 6.541 2.369C8.35073 2.12762 10.1743 2.00436 12 2C13.8257 2.0043 15.6493 2.12756 17.459 2.369C18.519 2.50235 19.5044 2.98478 20.2598 3.7402C21.0152 4.49562 21.4977 5.48103 21.631 6.541C21.8724 8.35073 21.9956 10.1743 22 12C21.9957 13.8258 21.8724 15.6493 21.631 17.459C21.4978 18.519 21.0154 19.5045 20.26 20.26C19.5045 21.0154 18.519 21.4978 17.459 21.631C15.6493 21.8724 13.8258 21.9957 12 22C10.1743 21.9956 8.35073 21.8724 6.541 21.631V21.631Z"
                        fill="#FCFCFD"
                      />
                      <path
                        d="M14.793 9.79303L12 12.586L9.20697 9.79303C9.01944 9.60556 8.76513 9.50024 8.49997 9.50024C8.23481 9.50024 7.9805 9.60556 7.79297 9.79303C7.6055 9.98056 7.50018 10.2349 7.50018 10.5C7.50018 10.7652 7.6055 11.0195 7.79297 11.207L11.293 14.707C11.4805 14.8945 11.7348 14.9998 12 14.9998C12.2651 14.9998 12.5194 14.8945 12.707 14.707L16.207 11.207C16.3944 11.0195 16.4998 10.7652 16.4998 10.5C16.4998 10.2349 16.3944 9.98056 16.207 9.79303C16.0194 9.60556 15.7651 9.50024 15.5 9.50024C15.2348 9.50024 14.9805 9.60556 14.793 9.79303V9.79303Z"
                        fill="#8212F4"
                      />
                    </svg>
                  </div>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={sortByEl}
                  open={sortByOpen}
                  onClose={() => setSortByEl(null)}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {[
                    { key: "rarity:ranking", value: "Rarity" },
                    { key: "price:low:high", value: "Price: Low -> High" },
                    { key: "price:high:low", value: "Price: High -> Low" },
                    { key: "recently:listed", value: "Recently Listed" },
                    { key: "by:id", value: "ID" },
                  ].map((item, i) => (
                    <MenuItem
                      key={i}
                      className={classes.sortByMenuItem}
                      onClick={() => {
                        onSelectSortByOption(item);
                      }}
                    >
                      {item.value}
                    </MenuItem>
                  ))}
                </Menu>
              </div>

              <div
                className={`d-flex align-items-center justify-content-between mt-2`}
              >
                {assetsPage > 1 ? (
                  <Button
                    variant={"contained"}
                    className="me-3"
                    size={"small"}
                    onClick={prevAssetsPage}
                    style={{
                      borderRadius: 6,
                      color: "white",
                      textTransform: "capitalize",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Prev
                  </Button>
                ) : null}
                <p className={`m-0 h6`}>Page</p>
                <input
                  type="number"
                  className={classes.paginationInput}
                  value={assetsPage}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      gotoAssetsPage(assetsPage);
                    }
                  }}
                  onChange={(e) => {
                    if (parseInt(e.target.value) <= totalPages) {
                      setAssetsPage(parseInt(e.target.value));
                    }
                  }}
                />
                <p className={`m-0 h6`}>of {totalPages}</p>
                {assetsPage < totalPages ? (
                  <Button
                    variant={"contained"}
                    className="ms-3"
                    size={"small"}
                    onClick={nextAssetsPage}
                    style={{
                      borderRadius: 6,
                      color: "white",
                      textTransform: "capitalize",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    Next
                  </Button>
                ) : null}
              </div>
            </div>

            <br />
            <br />

            <Grid container spacing={2} mt={5}>
              {assetsLoading == false
                ? assets?.map((item) => {
                    return (
                      <Grid item lg={3} md={4} sm={6} xs={12}>
                        <div
                          className={classes.filteredItemTypeOne}
                          style={{
                            background: theme.palette.themeCardColor.main,
                          }}
                        >
                          <div
                            className={`d-flex align-items-center justify-content-between py-2 mx-2`}
                          >
                            <Typography
                              variant={"p"}
                              component="p"
                              className="d-flex align-items-center"
                            >
                              #{item.ranking_no}
                            </Typography>
                            <Typography
                              variant={"p"}
                              component="p"
                              className="d-flex align-items-center"
                              style={{ color: "grey", fontWeight: "bold" }}
                            >
                              {item?.owner?.user?.username
                                ? item?.owner?.user?.username
                                : item?.owner?.address.substr(0, 7)}
                            </Typography>
                          </div>
                          {item.image_preview_url ? (
                            <img
                              src={item.image_preview_url}
                              style={{
                                height: 250,
                                width: "100%",
                                cursor: "pointer",
                              }}
                              onClick={() => openAssetModel(item)}
                            />
                          ) : item?.animation_original_url ? (
                            <video
                              onClick={() => openAssetModel(item)}
                              style={{
                                height: 250,
                                width: "100%",
                                cursor: "pointer",
                              }}
                              autoPlay
                              playsinline
                              muted
                              loop
                            >
                              <source
                                src={item?.animation_original_url}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <div
                              onClick={() => openAssetModel(item)}
                              style={{
                                height: 250,
                                width: "100%",
                                cursor: "pointer",
                              }}
                              className={`d-flex align-items-center justify-content-center`}
                            >
                              <h1 className="text-center">
                                Image Not
                                <br /> Available
                              </h1>
                            </div>
                          )}
                          <Typography
                            variant={"p"}
                            component="p"
                            className="justify-content-center d-flex align-items-center"
                            style={{ height: 45 }}
                          >
                            {item.name}
                          </Typography>
                        </div>
                      </Grid>
                    );
                  })
                : [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    17, 18, 19,
                  ].map((item) => {
                    return (
                      <Grid key={item} item lg={3} md={4} sm={6} xs={12}>
                        <Skeleton
                          width="100%"
                          height={340}
                          variant="rectangular"
                        />
                      </Grid>
                    );
                  })}
            </Grid>

            {/* <div className="d-flex align-items-center justify-content-end mt-3">
                        <Button>
                            Load More →
                        </Button>
                    </div> */}

            <Stack spacing={2} mt={3}>
              <Pagination
                count={totalPages}
                variant="outlined"
                shape="rounded"
                hide
                page={assetsPage}
                onChange={(e, page) => {
                  if (assetsLoading) return;
                  setAssetsPage(parseInt(page));
                  getAssets({
                    page: parseInt(page),
                  });
                }}
                className={classes.paginationRoot}
              />
            </Stack>

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
              <OwlCarousel
                key={`carousel_${[0, 1, 2, 3, 4, 5, 6, 7, 8].length}`}
                className={`${classes.carousel} owl-theme`}
                margin={10}
                {...carouselOptions}
                navContainerClass={classes.navContainerClass}
              >
                {(moreRecentlyCollectionsLoading &&
                  collections?.more_recently?.length == 0) ||
                collections?.more_recently == null
                  ? [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12].map((item) => {
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
                    })
                  : collections?.more_recently?.map((item, i) => {
                      return (
                        <Grid key={item} item lg={12} md={12} sm={6} xs={12}>
                          <div
                            className={`${classes.moreRecentcollectionItem} carouselItem`}
                            onClick={() => navigate(`/collection/${item.slug}`)}
                          >
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
                              className="mx-3 d-flex align-items-center"
                              style={{ height: 45 }}
                            >
                              {item.name}
                            </Typography>
                          </div>
                        </Grid>
                      );
                    })}
              </OwlCarousel>
            </Grid>

            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetails;
