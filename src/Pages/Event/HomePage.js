import React from "react";
import { Link, useNavigate, useParams, useHistory } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Button,
  Menu,
  MenuItem,
  Typography,
  Skeleton,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import CollectionBoxImg from "../../images/collectionBoxImg.png";
import AdsImage from "../../images/pricingImg.png";
import axios, { ADMIN_PANEL_URL } from "../../api/axios.js";
import Sliders from "../../Components/Sliders";
import SkeletonSlider from "../../Components/SkeletonSlider";
import BannerImage from "../../Components/BannerImage";
import { toast } from "react-toastify";
import CommonFunctions from "../../Common/CommonFunctions";
import Blockchains from "../../Common/Blockchains.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  featuredEvent: {
    background: theme.palette.themeCardColor.main,
    padding: 0,
    borderRadius: 10,
    border: `2px solid ${theme.palette.primary.main}`,
    overflow: "hidden",
  },
  featuredEventTitle: {
    color: "#FF00F5",
    fontSize: 20,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    // '&:hover': {
    // }
  },
  ellipseText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  featuredEventIcons: {
    background: theme.palette.cardColor.main,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "2px 7px 7px 7px",
    borderRadius: 5,
    cursor: "pointer",
    "& svg": {
      fill: "green",
      width: 20,
      height: 20,
    },
  },
  dropsIcon: {
    background: theme.palette.cardColor.main,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "2px 5px",
    borderRadius: 5,
    cursor: "pointer",
  },
  dropsButton: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "20px",
    padding: "5px 25px",
    background: "linear-gradient(90deg, #0F6CDD 0%, #8212F4 100%)",
    cursor: "pointer",
  },
  preSale: {
    position: "absolute",
    top: 2,
    right: 5,
    background: "#F6BE00",
    color: "black",
    padding: "3px 8px",
    borderRadius: 5,
    fontWeight: "bold",
    "& p": {
      fontSize: 12,
    },
  },
  searchBox: {
    background: theme.palette.themeCardColor.main,
    borderRadius: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  seaarchInput: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
  },
}));

const HomePage = ({ startCelebration }) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  let { selectedTab } = useParams();
  if (!selectedTab) {
    selectedTab = "upcoming-drops-ranked-by-dates";
  }
  const [sliders, setSliders] = React.useState([]);
  const [featuredEvents, setFeaturedEvents] = React.useState([]);
  const [filteredDrops, setFilteredDrops] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [voteLoading, setVoteLoading] = React.useState(false);
  const [banner, setBanner] = React.useState({});
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    getDataFromBackend("/sliders", setSliders, false);
    getDataFromBackend("/drops/featured", setFeaturedEvents, false);
    getDataFromBackend("/banner", setBanner, false);
  }, []);

  React.useEffect(() => {
    setLoading(true);
    if (search.length > 0) {
      setFeaturedEvents([]);
      getDataFromBackend("/drops/featured", setFeaturedEvents, true);
    }
    setFilteredDrops([]);
    if (selectedTab == "upcoming-drops-ranked-by-dates") {
      document.title = "Upcoming NFT Drops Ranked By Dates | NFTWatcher";
      getDataFromBackend("/drops/rankedByDates", setFilteredDrops, true);
    } else if (selectedTab == "upcoming-drops-ranked-by-votes") {
      document.title = "Upcoming NFT Drops Ranked By Votes | NFTWatcher";
      getDataFromBackend("/drops/rankedByVotes", setFilteredDrops, true);
    } else if (selectedTab == "newly-listed-drops") {
      document.title = "Upcoming NFT Drops Ranked By Votes | NFTWatcher";
      getDataFromBackend("/drops/newlyDrops", setFilteredDrops, true);
    } else if (selectedTab == "completed-drops") {
      document.title =
        "Completed Drops | NFTWatcher -  Upcoming NFT Drops Ranked By Dates | NFTWatcher";
      getDataFromBackend("/drops/completedDrops", setFilteredDrops, true);
    } else {
      navigate("/events");
    }
  }, [selectedTab, search]);

  const getDataFromBackend = (url, setData, isFilterDrops) => {
    axios
      .get(url, { params: { search } })
      .then((res) => {
        setData(res.data);
        if (isFilterDrops) {
          setLoading(false);
        }
      })
      .catch(console.error);
  };

  const addVote = (id) => {
    if (id) {
      setVoteLoading(true);
      CommonFunctions.addVote(
        id,
        startCelebration,
        (res) => {
          const oldDrops = filteredDrops;
          const dropIndex = filteredDrops.findIndex((item) => item._id === id);
          oldDrops[dropIndex].votes = res.data.votes;
          setFilteredDrops(oldDrops);
          setVoteLoading(false);
        },
        (error) => {
          setVoteLoading(false);
          console.log(error);
          console.log("Failed to Add Vote!");
        }
      );
    }
  };

  const onSearchEvent = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className={classes.root}>
      <div className={`${classes.innerRoot} mx-md-5 mt-4 mx-3`}>
        <div className="row mb-4">
          <BannerImage />
        </div>
        {/* <div className="row my-3">
                    <div className="col-md-4 col-12 mt-md-0 mt-3">
                        <img src={AdsImage} style={{height: 200, width: '100%', border: `3px solid ${theme.palette.primary.main}`}} />
                    </div>
                    <div className="col-md-4 col-12 mt-md-0 mt-3">
                        <img src={AdsImage} style={{height: 200, width: '100%', border: `3px solid ${theme.palette.primary.main}`}} />
                    </div>
                    <div className="col-md-4 col-12 mt-md-0 mt-3">
                        <img src={AdsImage} style={{height: 200, width: '100%', border: `3px solid ${theme.palette.primary.main}`}} />
                    </div>
                </div> */}

        {sliders.length > 0 ? (
          <Sliders sliders={sliders} theme={theme} />
        ) : (
          <SkeletonSlider />
        )}

        <div className="row">
          <div className="col-md-6 col-12 d-flex align-items-center justify-content-md-start justify-content-center mt-md-0 mb-1">
            <Typography variant="h4" component="h2">
              <span style={{ fontFamily: "Jura" }}>Featured</span>{" "}
              <span
                style={{
                  fontFamily: "Jura",
                  color: theme.palette.primary.main,
                  borderBottom: `3px solid ${theme.palette.primary.main}`,
                }}
              >
                Events
              </span>
            </Typography>
          </div>
          <div className="col-md-6 col-12 d-flex align-items-center justify-content-md-end justify-content-center mt-md-0 mt-3">
            <div className={`mx-2 ${classes.searchBox}`}>
              <div className="mx-2 mt-n1">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 13.6667L11.0093 10.6707L14 13.6667ZM12.6667 6.66667C12.6667 8.16956 12.0697 9.6109 11.0069 10.6736C9.94424 11.7363 8.5029 12.3333 7.00001 12.3333C5.49712 12.3333 4.05578 11.7363 2.99307 10.6736C1.93037 9.6109 1.33334 8.16956 1.33334 6.66667C1.33334 5.16377 1.93037 3.72243 2.99307 2.65973C4.05578 1.59702 5.49712 1 7.00001 1C8.5029 1 9.94424 1.59702 11.0069 2.65973C12.0697 3.72243 12.6667 5.16377 12.6667 6.66667V6.66667Z"
                    stroke="white"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <div>
                <input
                  className={`py-2 ${classes.seaarchInput}`}
                  type="text"
                  autoComplete={"off"}
                  name="search"
                  value={search}
                  onChange={onSearchEvent}
                  placeholder="Search..."
                />
              </div>
              <div
                className="mx-2"
                style={
                  search.length === 0
                    ? { visibility: "hidden" }
                    : { cursor: "pointer" }
                }
                onClick={() => setSearch("")}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.2748 1.75062C7.93481 -0.583541 4.0949 -0.583541 1.75496 1.75062C-0.584986 4.08479 -0.584986 7.91521 1.75496 10.2494C4.0949 12.5835 7.87481 12.5835 10.2148 10.2494C12.5547 7.91521 12.6147 4.08479 10.2748 1.75062ZM7.69482 8.51372L6.01486 6.8379L4.3349 8.51372L3.49492 7.67581L5.17488 6L3.49492 4.32419L4.3349 3.48628L6.01486 5.16209L7.69482 3.48628L8.5348 4.32419L6.85484 6L8.5348 7.67581L7.69482 8.51372Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <Button variant="contained" component={Link} to="/events/submit">
              List Your Drop
            </Button>
          </div>
        </div>

        <div className="row my-4">
          {featuredEvents.length > 0 || !loading
            ? featuredEvents.map((item, index) => {
                let diffDays = 0;
                let is_mint = false;
                let is_mint_live = false;
                if (
                  item.is_presale &&
                  new Date(CommonFunctions.getUTCDate(item.presale_date)) >
                    new Date()
                ) {
                  const date1 = new Date(
                    CommonFunctions.getUTCDate(item.presale_date)
                  );
                  const date2 = new Date();
                  const diffTime = Math.abs(date2 - date1);
                  diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                } else {
                  if (
                    new Date(
                      CommonFunctions.getUTCDate(item.launched_date)
                    ).getTime() > new Date().getTime()
                  ) {
                    is_mint = true;
                    const date1 = new Date(
                      CommonFunctions.getUTCDate(item.launched_date)
                    );
                    const date2 = new Date();
                    const diffTime = Math.abs(date2 - date1);
                    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                  } else {
                    const myLaunchDate = new Date(
                      CommonFunctions.getUTCDate(item.launched_date)
                    );
                    if (
                      new Date().getDate() <= myLaunchDate.getDate() + 2 &&
                      // myLaunchDate.getDate() <= new Date().getDate() &&
                      myLaunchDate.getMonth() == new Date().getMonth() &&
                      myLaunchDate.getFullYear() == new Date().getFullYear()
                    ) {
                      is_mint_live = true;
                    }
                  }
                }

                return (
                  <div className="col-lg-6 col-12 py-3 px-4" key={index}>
                    <div className={`${classes.featuredEvent} row`}>
                      <div className="col-md-5 col-12 p-0">
                        <div className="position-relative">
                          {is_mint_live ? (
                            <div
                              className={classes.preSale}
                              style={{ background: "green", color: "white" }}
                            >
                              <p className="m-0">Mint Live</p>
                            </div>
                          ) : is_mint && diffDays > 0 ? (
                            <div
                              className={classes.preSale}
                              style={{
                                background: theme.palette.primary.main,
                                color: "white",
                              }}
                            >
                              <p className="m-0">Mint in {diffDays} Days</p>
                            </div>
                          ) : item.is_presale && diffDays > 0 ? (
                            <div className={classes.preSale}>
                              <p className="m-0">Pre Sale in {diffDays} Days</p>
                            </div>
                          ) : null}
                          <Link
                            exact
                            to={`/events/${encodeURIComponent(
                              item.title.replaceAll(" ", "-")
                            )}`}
                          >
                            <img
                              src={item.base_url_for_get_image + item.image}
                              className="cursor-pointer"
                              style={{ height: 273, width: "100%" }}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-7 col-12 d-flex justify-content-between flex-column">
                        <div className="my-2">
                          <Link
                            exact
                            to={`/events/${encodeURIComponent(
                              item.title.replaceAll(" ", "-")
                            )}`}
                          >
                            <p
                              className={`cursor-pointer font-jura ${classes.featuredEventTitle}`}
                            >
                              {item.title}
                            </p>
                          </Link>
                        </div>
                        <div className="my-2">
                          <small
                            // className={classes.ellipseText}
                            style={{ fontSize: 16 }}
                          >
                            Launch Date:{" "}
                            <span>
                              {CommonFunctions.getUTCDate(item.launched_date)}
                              (UTC)
                            </span>
                          </small>
                        </div>
                        <div className="my-2">
                          <small
                            className="d-flex align-items-center m-0 p-0"
                            style={{ fontSize: 16 }}
                          >
                            Unit Price:{" "}
                            <span className="ms-2">
                              {item.unit_price} {"  "}{" "}
                              <span className="mb-4 ms-1">
                                {
                                  Blockchains?.filter(
                                    (i) => i.name == item.blockchain_value
                                  )[0]?.icon
                                }
                              </span>
                            </span>
                          </small>
                        </div>
                        <div className="my-2">
                          <small className="" style={{ fontSize: 16 }}>
                            Total Supply: <span>{item.total_supply}</span>
                          </small>
                        </div>
                        <div>
                          <div
                            style={{
                              borderBottom: `2px solid ${theme.palette.primary.main}`,
                              width: "85%",
                            }}
                          />
                        </div>
                        <div className="mb-3 mt-2 d-flex align-items-center justify-content-between">
                          <div
                            className={`${classes.featuredEventIcons} ms-4`}
                            onClick={() => window.open(item.twitter_url)}
                          >
                            <svg
                              width="20"
                              height="15"
                              viewBox="0 0 20 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20 1.77567C19.2641 2.07682 18.4733 2.28036 17.6433 2.37193C18.4905 1.90328 19.1411 1.16116 19.4474 0.276934C18.642 0.718028 17.7608 1.02881 16.8419 1.19584C16.0934 0.459922 15.027 0 13.8468 0C11.5807 0 9.74344 1.69549 9.74344 3.78666C9.74344 4.0835 9.77977 4.37247 9.84969 4.64969C6.43953 4.49172 3.41609 2.9842 1.39227 0.693164C1.03914 1.25244 0.836797 1.90299 0.836797 2.59688C0.836797 3.91067 1.56125 5.06967 2.66219 5.74878C2.01059 5.72994 1.37332 5.56753 0.803594 5.27508C0.803359 5.29095 0.803359 5.30681 0.803359 5.32274C0.803359 7.15746 2.21773 8.68798 4.09477 9.03586C3.49054 9.18752 2.85674 9.20971 2.2418 9.10075C2.76391 10.6052 4.2793 11.6999 6.07477 11.7306C4.67047 12.7462 2.90117 13.3516 0.978828 13.3516C0.647578 13.3516 0.321016 13.3336 0 13.2987C1.81586 14.3731 3.97266 15 6.28984 15C13.8373 15 17.9644 9.22981 17.9644 4.22582C17.9644 4.06158 17.9605 3.89827 17.9525 3.7359C18.7558 3.19998 19.4492 2.53618 20 1.77567Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div>
                            <svg
                              width="2"
                              height="38"
                              viewBox="0 0 2 38"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <line
                                x1="1"
                                y1="4.37115e-08"
                                x2="0.999998"
                                y2="38"
                                stroke="#8212F4"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                          <div
                            className={classes.featuredEventIcons}
                            onClick={() => window.open(item.website_url)}
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.85948 20.149C7.83058 20.149 7.79206 20.1676 7.76316 20.1676C5.89459 19.2746 4.37276 17.7956 3.43848 15.991C3.43848 15.9631 3.45774 15.9259 3.45774 15.8979C4.63282 16.2328 5.84643 16.484 7.05041 16.6793C7.26231 17.8514 7.51273 19.0141 7.85948 20.149Z"
                                fill="white"
                              />
                              <path
                                d="M20.6604 16.0003C19.7069 17.8514 18.1176 19.349 16.1816 20.2513C16.5476 19.0699 16.8559 17.8793 17.0581 16.6793C18.2717 16.484 19.4661 16.2328 20.6412 15.8979C20.6315 15.9352 20.6604 15.9724 20.6604 16.0003Z"
                                fill="white"
                              />
                              <path
                                d="M20.7375 7.87032C19.5239 7.51684 18.3006 7.22848 17.0581 7.02384C16.8559 5.82387 16.5573 4.63321 16.1816 3.47046C18.1754 4.39136 19.7839 5.9448 20.7375 7.87032Z"
                                fill="white"
                              />
                              <path
                                d="M7.85939 3.57283C7.51264 4.70768 7.26221 5.86113 7.05994 7.03318C5.81744 7.21922 4.58457 7.51689 3.36133 7.87037C4.29561 6.00066 5.84634 4.46582 7.76307 3.54492C7.79196 3.54492 7.83049 3.57283 7.85939 3.57283Z"
                                fill="white"
                              />
                              <path
                                d="M15.411 6.82847C13.1764 6.58662 10.9226 6.58662 8.68799 6.82847C8.92878 5.55409 9.237 4.27971 9.67043 3.05185C9.6897 2.97743 9.68007 2.92162 9.6897 2.8472C10.4506 2.67046 11.2308 2.55884 12.0495 2.55884C12.8586 2.55884 13.6484 2.67046 14.3997 2.8472C14.4093 2.92162 14.4093 2.97743 14.4286 3.05185C14.862 4.28902 15.1702 5.55409 15.411 6.82847Z"
                                fill="white"
                              />
                              <path
                                d="M6.83848 15.1073C5.50929 14.8748 4.19937 14.5771 2.92797 14.1585C2.85091 14.1399 2.79312 14.1492 2.71607 14.1399C2.53306 13.405 2.41748 12.6516 2.41748 11.8609C2.41748 11.0795 2.53306 10.3168 2.71607 9.59122C2.79312 9.58191 2.85091 9.58191 2.92797 9.56331C4.209 9.15402 5.50929 8.84705 6.83848 8.6145C6.59769 10.7726 6.59769 12.9492 6.83848 15.1073Z"
                                fill="white"
                              />
                              <path
                                d="M21.6813 11.8609C21.6813 12.6516 21.5657 13.405 21.3827 14.1399C21.3056 14.1492 21.2478 14.1399 21.1708 14.1585C19.8897 14.5678 18.5798 14.8748 17.2603 15.1073C17.5107 12.9492 17.5107 10.7726 17.2603 8.6145C18.5798 8.84705 19.8994 9.14472 21.1708 9.56331C21.2478 9.58191 21.3056 9.59122 21.3827 9.59122C21.5657 10.3261 21.6813 11.0795 21.6813 11.8609Z"
                                fill="white"
                              />
                              <path
                                d="M15.411 16.8933C15.1702 18.177 14.862 19.4421 14.4286 20.6699C14.4093 20.7444 14.4093 20.8002 14.3997 20.8746C13.6484 21.0513 12.8586 21.1629 12.0495 21.1629C11.2308 21.1629 10.4506 21.0513 9.6897 20.8746C9.68007 20.8002 9.6897 20.7444 9.67043 20.6699C9.24663 19.4328 8.92878 18.177 8.68799 16.8933C9.80528 17.0142 10.9226 17.098 12.0495 17.098C13.1764 17.098 14.3033 17.0142 15.411 16.8933Z"
                                fill="white"
                              />
                              <path
                                d="M15.6743 15.3616C13.2653 15.6551 10.8337 15.6551 8.42473 15.3616C8.12079 13.0351 8.12079 10.6868 8.42473 8.36029C10.8337 8.06675 13.2653 8.06675 15.6743 8.36029C15.9782 10.6868 15.9782 13.0351 15.6743 15.3616Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div>
                            <svg
                              width="2"
                              height="38"
                              viewBox="0 0 2 38"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <line
                                x1="1"
                                y1="4.37115e-08"
                                x2="0.999998"
                                y2="38"
                                stroke="#8212F4"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                          <div
                            className={classes.featuredEventIcons}
                            onClick={() => window.open(item.discord_url)}
                          >
                            <svg
                              width="24"
                              height="19"
                              viewBox="0 0 24 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.0119 1.60611C18.55 0.884797 16.9831 0.351654 15.3445 0.0484942C15.3299 0.0454291 15.3148 0.0474043 15.3013 0.0541469C15.2878 0.0608895 15.2765 0.0720657 15.269 0.0861279C15.0684 0.471873 14.8448 0.9747 14.6881 1.37194C12.9503 1.08785 11.1835 1.08785 9.44559 1.37194C9.27106 0.931694 9.07425 0.502423 8.85608 0.0861279C8.84868 0.0718926 8.83749 0.0604635 8.82401 0.0533658C8.81052 0.0462681 8.79538 0.0438391 8.7806 0.0464033C7.14296 0.349563 5.57603 0.882707 4.11324 1.60506C4.10066 1.61084 4.08999 1.62069 4.08267 1.63329C1.10932 6.4159 0.294326 11.0804 0.694658 15.6863C0.695772 15.6976 0.698972 15.7085 0.704064 15.7184C0.709156 15.7283 0.716033 15.7369 0.724277 15.7438C2.45974 17.1263 4.39542 18.1794 6.45026 18.859C6.46459 18.8639 6.47991 18.8639 6.49423 18.859C6.50854 18.8542 6.52119 18.8447 6.53052 18.8319C6.97194 18.1837 7.36558 17.499 7.7019 16.7798C7.72196 16.738 7.70285 16.6878 7.66272 16.6711C7.04551 16.4168 6.44748 16.1099 5.87413 15.7532C5.86383 15.7468 5.85515 15.7377 5.84887 15.7266C5.84258 15.7156 5.8389 15.7031 5.83814 15.6901C5.83738 15.6772 5.83958 15.6642 5.84452 15.6524C5.84947 15.6406 5.85702 15.6304 5.86649 15.6226C5.98687 15.5253 6.10726 15.4239 6.22191 15.3225C6.23223 15.3134 6.24466 15.3076 6.25782 15.3058C6.27098 15.3039 6.28435 15.3061 6.29644 15.3121C10.0485 17.1561 14.112 17.1561 17.8201 15.3121C17.8322 15.3057 17.8457 15.3033 17.859 15.3049C17.8724 15.3066 17.885 15.3123 17.8955 15.3215C18.0102 15.4239 18.1296 15.5253 18.251 15.6226C18.2605 15.6302 18.2682 15.6403 18.2733 15.652C18.2784 15.6637 18.2808 15.6766 18.2802 15.6896C18.2797 15.7025 18.2762 15.7151 18.2701 15.7262C18.264 15.7373 18.2554 15.7466 18.2452 15.7532C17.6739 16.1128 17.0796 16.417 16.4557 16.67C16.4461 16.6738 16.4374 16.6798 16.4301 16.6876C16.4228 16.6954 16.4171 16.7048 16.4134 16.7152C16.4097 16.7256 16.408 16.7367 16.4086 16.7479C16.4091 16.759 16.4118 16.7699 16.4165 16.7798C16.7605 17.498 17.1541 18.1816 17.5869 18.8308C17.5959 18.8441 17.6085 18.8541 17.6228 18.8593C17.6372 18.8646 17.6527 18.8648 17.6672 18.8601C19.7256 18.1823 21.6644 17.1287 23.4018 15.7438C23.4103 15.7373 23.4174 15.7289 23.4226 15.7192C23.4279 15.7095 23.4312 15.6986 23.4324 15.6874C23.9101 10.3622 22.6317 5.73536 20.0415 1.63538C20.0351 1.62206 20.0246 1.61167 20.0119 1.60611ZM8.26274 12.8816C7.13341 12.8816 6.20185 11.7641 6.20185 10.3936C6.20185 9.02203 7.11525 7.90556 8.26274 7.90556C9.41883 7.90556 10.3418 9.03144 10.3236 10.3936C10.3236 11.7651 9.41024 12.8816 8.26274 12.8816ZM15.8824 12.8816C14.7521 12.8816 13.8215 11.7641 13.8215 10.3936C13.8215 9.02203 14.734 7.90556 15.8824 7.90556C17.0385 7.90556 17.9615 9.03144 17.9433 10.3936C17.9433 11.7651 17.0395 12.8816 15.8824 12.8816Z"
                                fill="white"
                              />
                            </svg>
                          </div>
                          <div style={{ width: "15%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : [0, 1, 2, 3].map((item, index) => {
                return (
                  <div className="col-lg-6 col-12 py-3 px-4" key={index}>
                    <div className={`${classes.featuredEvent} row`}>
                      <div className="col-md-5 col-12 p-0">
                        <Skeleton
                          variant="rectangular"
                          animation="wave"
                          height={270}
                        />
                      </div>
                      <div className="col-md-7 col-12 d-flex justify-content-between flex-column ps-3">
                        <br />
                        <Skeleton variant="text" animation="wave" height={50} />
                        <br />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          className="mb-2"
                        />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          className="mb-2"
                        />
                        <Skeleton
                          variant="text"
                          animation="wave"
                          className="mb-2"
                        />
                        <div className="my-3 d-flex align-items-center justify-content-between">
                          <Skeleton
                            variant="rectangular"
                            animation="wave"
                            width={40}
                            height={40}
                          />
                          <Skeleton
                            variant="rectangular"
                            animation="wave"
                            width={5}
                            height={40}
                          />
                          <Skeleton
                            variant="rectangular"
                            animation="wave"
                            width={40}
                            height={40}
                          />
                          <Skeleton
                            variant="rectangular"
                            animation="wave"
                            width={5}
                            height={40}
                          />
                          <Skeleton
                            variant="rectangular"
                            animation="wave"
                            width={40}
                            height={40}
                          />
                          <div style={{ width: "15%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        <div
          className="d-flex align-items-center justify-content-between flex-md-row flex-column my-4"
          style={{ borderBottom: `2px solid ${theme.palette.primary.main}` }}
        >
          {[
            {
              title: "Upcoming Drops Ranked By Dates",
              key: "upcoming-drops-ranked-by-dates",
            },
            {
              title: "Upcoming Drops Ranked By Votes",
              key: "upcoming-drops-ranked-by-votes",
            },
            { title: "Newly Listed Drops", key: "newly-listed-drops" },
            { title: "Completed Drops", key: "completed-drops" },
          ].map((item) => {
            return (
              <Button
                onClick={() => navigate(`/events/tab/${item.key}`)}
                variant={selectedTab === item.key ? "contained" : null}
                className="w-100 m-0"
                style={{ borderRadius: 0, textTransform: "capitalize" }}
              >
                {item.title}
              </Button>
            );
          })}
        </div>

        {!loading ? (
          <div className="row my-4">
            {filteredDrops.map((item, index) => {
              let diffDays = 0;
              let is_mint = false;
              let is_mint_live = false;
              if (
                item.is_presale &&
                new Date(CommonFunctions.getUTCDate(item.presale_date)) >
                  new Date()
              ) {
                const date1 = new Date(
                  CommonFunctions.getUTCDate(item.presale_date)
                );
                const date2 = new Date();
                const diffTime = Math.abs(date2 - date1);
                diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              } else {
                if (
                  new Date(
                    CommonFunctions.getUTCDate(item.launched_date)
                  ).getTime() > new Date().getTime()
                ) {
                  is_mint = true;
                  const date1 = new Date(
                    CommonFunctions.getUTCDate(item.launched_date)
                  );
                  const date2 = new Date();
                  const diffTime = Math.abs(date2 - date1);
                  diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                } else {
                  const myLaunchDate = new Date(
                    CommonFunctions.getUTCDate(item.launched_date)
                  );
                  if (
                    new Date().getDate() <= myLaunchDate.getDate() + 2 &&
                    // myLaunchDate.getDate() <= new Date().getDate() &&
                    myLaunchDate.getMonth() == new Date().getMonth() &&
                    myLaunchDate.getFullYear() == new Date().getFullYear()
                  ) {
                    is_mint_live = true;
                  }
                }
              }

              return (
                <div className="col-xl-4 col-lg-6 col-12 px-3 py-1" key={index}>
                  <div className={`${classes.featuredEvent} row`}>
                    <div className="col-md-5 col-12 p-0">
                      <div className="position-relative">
                        {is_mint_live ? (
                          <div
                            className={classes.preSale}
                            style={{ background: "green", color: "white" }}
                          >
                            <p className="m-0">Mint Live</p>
                          </div>
                        ) : is_mint && diffDays > 0 ? (
                          <div
                            className={classes.preSale}
                            style={{
                              background: theme.palette.primary.main,
                              color: "white",
                            }}
                          >
                            <p className="m-0">Mint in {diffDays} Days</p>
                          </div>
                        ) : item.is_presale && diffDays > 0 ? (
                          <div className={classes.preSale}>
                            <p className="m-0">Pre Sale in {diffDays} Days</p>
                          </div>
                        ) : null}
                        <Link
                          exact
                          to={`/events/${encodeURIComponent(
                            item.title.replaceAll(" ", "-")
                          )}`}
                        >
                          <img
                            src={item.base_url_for_get_image + item.image}
                            className="cursor-pointer"
                            style={{ height: 235, width: "100%" }}
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-7 col-12 d-flex justify-content-between flex-column">
                      <div className="my-2">
                        <Link
                          exact
                          to={`/events/${encodeURIComponent(
                            item.title.replaceAll(" ", "-")
                          )}`}
                        >
                          <p
                            className="font-jura cursor-pointer"
                            style={{
                              fontSize: 22,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "hidden",
                            }}
                          >
                            {item.title}
                          </p>
                        </Link>
                      </div>
                      <div className="">
                        <small style={{ fontSize: "14px", fontWeight: 500 }}>
                          Launch Date:{" "}
                          <span>
                            {CommonFunctions.getUTCDate(item.launched_date)}
                            (UTC)
                          </span>
                        </small>
                      </div>
                      <div className="">
                        <small
                          style={{ fontSize: "14px", fontWeight: 500 }}
                          className="d-flex align-items-center"
                        >
                          Unit Price:{" "}
                          <span
                            style={{ fontWeight: "normal" }}
                            className="ms-2"
                          >
                            {item.unit_price} {"  "}{" "}
                            <span className="mb-2 ms-1">
                              {
                                Blockchains?.filter(
                                  (i) => i.name == item.blockchain_value
                                )[0]?.icon
                              }
                            </span>
                          </span>
                        </small>
                      </div>
                      <div className="">
                        <small style={{ fontSize: "14px", fontWeight: 500 }}>
                          Total Supply:{" "}
                          <span style={{ fontWeight: "normal" }}>
                            {item.total_supply}
                          </span>
                        </small>
                      </div>
                      <div className="my-3 d-flex align-items-center justify-content-between">
                        <a
                          className={`${classes.dropsIcon} d-flex align-items-center justify-content-center`}
                          style={{ height: 35, width: 35 }}
                          href={item.twitter_url}
                        >
                          <svg
                            width="14"
                            height="11"
                            viewBox="0 0 14 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14 1.30215C13.4848 1.523 12.9313 1.67227 12.3503 1.73941C12.9434 1.39574 13.3988 0.851519 13.6132 0.203085C13.0494 0.526554 12.4326 0.754458 11.7893 0.87695C11.2654 0.337276 10.5189 0 9.69276 0C8.10649 0 6.82041 1.24336 6.82041 2.77689C6.82041 2.99456 6.84584 3.20648 6.89478 3.40977C4.50767 3.29393 2.39127 2.18841 0.974586 0.50832C0.727398 0.918456 0.585758 1.39553 0.585758 1.90438C0.585758 2.86783 1.09288 3.71776 1.86353 4.21577C1.40741 4.20196 0.961324 4.08285 0.562516 3.86839C0.562352 3.88003 0.562352 3.89166 0.562352 3.90334C0.562352 5.2488 1.55241 6.37119 2.86634 6.6263C2.44338 6.73751 1.99972 6.75379 1.56926 6.67388C1.93473 7.77713 2.99551 8.57995 4.25234 8.60242C3.26933 9.34719 2.03082 9.79117 0.68518 9.79117C0.453305 9.79117 0.224711 9.778 0 9.75236C1.2711 10.5403 2.78086 11 4.40289 11C9.68609 11 12.5751 6.76853 12.5751 3.09894C12.5751 2.97849 12.5723 2.85873 12.5668 2.73966C13.1291 2.34665 13.6144 1.85987 14 1.30215Z"
                              fill="white"
                            />
                          </svg>
                        </a>
                        <a
                          className={`${classes.dropsIcon} d-flex align-items-center justify-content-center`}
                          style={{ height: 35, width: 35 }}
                          href={item.website_url}
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
                              fill="white"
                            />
                            <path
                              d="M13.9601 10.9666C13.3001 12.2933 12.2001 13.3666 10.8601 14.0133C11.1134 13.1666 11.3268 12.3133 11.4668 11.4533C12.3068 11.3133 13.1334 11.1333 13.9468 10.8933C13.9401 10.92 13.9601 10.9466 13.9601 10.9666Z"
                              fill="white"
                            />
                            <path
                              d="M14.0134 5.14003C13.1734 4.88669 12.3268 4.68003 11.4668 4.53336C11.3268 3.67336 11.1201 2.82003 10.8601 1.98669C12.2401 2.64669 13.3534 3.76003 14.0134 5.14003Z"
                              fill="white"
                            />
                            <path
                              d="M5.09991 2.06004C4.85991 2.87337 4.68657 3.70004 4.54657 4.54004C3.68657 4.67337 2.83324 4.88671 1.98657 5.14004C2.63324 3.80004 3.70657 2.70004 5.03324 2.04004C5.05324 2.04004 5.07991 2.06004 5.09991 2.06004Z"
                              fill="white"
                            />
                            <path
                              d="M10.3267 4.39337C8.78001 4.22004 7.22001 4.22004 5.67334 4.39337C5.84001 3.48004 6.05334 2.56671 6.35334 1.68671C6.36667 1.63337 6.36001 1.59337 6.36667 1.54004C6.89334 1.41337 7.43334 1.33337 8.00001 1.33337C8.56001 1.33337 9.10667 1.41337 9.62667 1.54004C9.63334 1.59337 9.63334 1.63337 9.64667 1.68671C9.94667 2.57337 10.16 3.48004 10.3267 4.39337Z"
                              fill="white"
                            />
                            <path
                              d="M4.39325 10.3267C3.47325 10.16 2.56659 9.94667 1.68659 9.64667C1.63325 9.63334 1.59325 9.64001 1.53992 9.63334C1.41325 9.10667 1.33325 8.56667 1.33325 8.00001C1.33325 7.44001 1.41325 6.89334 1.53992 6.37334C1.59325 6.36667 1.63325 6.36667 1.68659 6.35334C2.57325 6.06001 3.47325 5.84001 4.39325 5.67334C4.22659 7.22001 4.22659 8.78001 4.39325 10.3267Z"
                              fill="white"
                            />
                            <path
                              d="M14.6667 8.00001C14.6667 8.56667 14.5867 9.10667 14.46 9.63334C14.4067 9.64001 14.3667 9.63334 14.3134 9.64667C13.4267 9.94001 12.52 10.16 11.6067 10.3267C11.78 8.78001 11.78 7.22001 11.6067 5.67334C12.52 5.84001 13.4334 6.05334 14.3134 6.35334C14.3667 6.36667 14.4067 6.37334 14.46 6.37334C14.5867 6.90001 14.6667 7.44001 14.6667 8.00001Z"
                              fill="white"
                            />
                            <path
                              d="M10.3267 11.6067C10.16 12.5267 9.94667 13.4334 9.64667 14.3134C9.63334 14.3667 9.63334 14.4067 9.62667 14.46C9.10667 14.5867 8.56001 14.6667 8.00001 14.6667C7.43334 14.6667 6.89334 14.5867 6.36667 14.46C6.36001 14.4067 6.36667 14.3667 6.35334 14.3134C6.06001 13.4267 5.84001 12.5267 5.67334 11.6067C6.44667 11.6934 7.22001 11.7534 8.00001 11.7534C8.78001 11.7534 9.56001 11.6934 10.3267 11.6067Z"
                              fill="white"
                            />
                            <path
                              d="M10.5088 10.5089C8.84141 10.7193 7.15843 10.7193 5.49103 10.5089C5.28066 8.84153 5.28066 7.15855 5.49103 5.49115C7.15843 5.28078 8.84141 5.28078 10.5088 5.49115C10.7192 7.15855 10.7192 8.84153 10.5088 10.5089Z"
                              fill="white"
                            />
                          </svg>
                        </a>
                        <a
                          className={`${classes.dropsIcon} d-flex align-items-center justify-content-center`}
                          style={{ height: 35, width: 35 }}
                          href={item.discord_url}
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
                              fill="white"
                            />
                          </svg>
                        </a>
                        <div
                          className={classes.dropsButton}
                          onClick={() =>
                            !voteLoading ? addVote(item._id) : () => {}
                          }
                        >
                          <div className="d-flex align-items-center justify-content-between">
                            <svg
                              width="12"
                              height="16"
                              viewBox="0 0 12 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.75 0.745645C6.75 0.00189489 5.79219 -0.278418 5.37031 0.338145C1.5 5.99533 7 6.25002 7 9.00002C7 10.1135 6.09031 11.0144 4.97344 10.9997C3.87437 10.9856 3 10.0694 3 8.97033V6.29814C3 5.62002 2.17281 5.29096 1.70531 5.78252C0.86875 6.66127 0 8.16658 0 10C0 13.3085 2.69156 16 6 16C9.30844 16 12 13.3085 12 10C12 4.67846 6.75 3.96877 6.75 0.745645Z"
                                fill="#FCFCFC"
                              />
                            </svg>
                            <small className="mx-2 text-white">
                              {item.votes}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="row my-4">
            {[0, 1, 2, 3, 5, 6].map((item, i) => (
              <div className="col-xl-4 col-lg-6 col-12 px-3 py-1" key={i}>
                <div className={`${classes.featuredEvent} row`}>
                  <div className="col-md-5 col-12 p-0">
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      height={"100%"}
                    />
                  </div>
                  <div className="col-md-7 col-12 d-flex justify-content-between flex-column">
                    <div className="my-2">
                      <Skeleton variant="text" animation="wave" />
                    </div>
                    <div className="">
                      <Skeleton variant="text" animation="wave" />
                    </div>
                    <div className="">
                      <Skeleton variant="text" animation="wave" />
                    </div>
                    <div className="">
                      <Skeleton variant="text" animation="wave" />
                    </div>
                    <div className="my-3 d-flex align-items-center justify-content-between">
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={30}
                        width={30}
                      />
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={30}
                        width={30}
                      />
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={30}
                        width={30}
                      />
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        height={30}
                        width={70}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
