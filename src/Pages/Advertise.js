import React from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import { Grid, Button } from "@mui/material";

import { makeStyles } from "@mui/styles";
import Vector1 from "../images/vector-1.png";
import StarImg from "../images/starfly.png";
import Accordian from "../Components/Accordian";
import axios from "../api/axios.js";
import AdvertiseSlider from "../Components/AdvertiseSlider";
import { useSelector, useDispatch } from "react-redux";
import NewLogoImage from "../images/new twitter 1.png";
import NftWatcherStats from "../images/nftwatcher stats.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  promoteNFTWatcher: {
    border: `1px solid ${theme.palette.primary.main}`,
    background: theme.palette.themeCardColor.main,
  },
}));

const Advertise = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  var classes = useStyles();
  const advertisePage = useSelector((state) => state.advertise);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (advertisePage.length === 0) {
      getAdvertisePage();
    }
  }, []);

  const getAdvertisePage = () => {
    axios
      .get("/advertise")
      .then((res) => {
        dispatch({
          type: "advertise:add",
          data: res.data.advertise,
        });
      })
      .catch(console.log);
  };

  const whyPrmoteNftWatcherItems = [
    {
      icon: (
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.6366 22.5C25.1486 20.67 27.4376 19.5 29.9996 19.5C32.5616 19.5 34.8506 20.67 36.3626 22.5C37.358 23.7069 37.9898 25.172 38.1841 26.7244C38.3785 28.2768 38.1275 29.8524 37.4603 31.2675C36.7931 32.6826 35.7373 33.8789 34.416 34.7167C33.0948 35.5545 31.5625 35.9993 29.9981 35.9993C28.4336 35.9993 26.9013 35.5545 25.5801 34.7167C24.2588 33.8789 23.203 32.6826 22.5358 31.2675C21.8687 29.8524 21.6176 28.2768 21.812 26.7244C22.0063 25.172 22.6381 23.7069 23.6336 22.5H23.6366Z"
            fill="#8212F4"
          />
          <path
            d="M41.2504 27.75C41.2504 25.854 40.7824 24.066 39.9544 22.5H52.5004C53.6939 22.5 54.8385 22.9741 55.6824 23.818C56.5263 24.6619 57.0004 25.8065 57.0004 27V28.5C57.0004 33.261 53.3824 38.136 47.0554 39.852C46.4052 38.684 45.4547 37.7111 44.3022 37.0338C43.1497 36.3566 41.8371 35.9996 40.5004 36H37.6504C38.7875 34.9479 39.6944 33.6717 40.314 32.2518C40.9336 30.832 41.2524 29.2992 41.2504 27.75Z"
            fill="#8212F4"
          />
          <path
            d="M40.5 39C41.0914 38.9984 41.6773 39.1137 42.224 39.3393C42.7706 39.5649 43.2673 39.8963 43.6855 40.3145C44.1037 40.7327 44.4351 41.2294 44.6607 41.7761C44.8863 42.3227 45.0016 42.9086 45 43.5V45C45 50.913 39.42 57 30 57C20.58 57 15 50.913 15 45V43.5C14.9984 42.9086 15.1137 42.3227 15.3393 41.7761C15.5649 41.2294 15.8963 40.7327 16.3145 40.3145C16.7327 39.8963 17.2294 39.5649 17.7761 39.3393C18.3227 39.1137 18.9086 38.9984 19.5 39H40.5Z"
            fill="#8212F4"
          />
          <path
            d="M3 28.5C3 33.261 6.618 38.136 12.945 39.852C13.5952 38.684 14.5457 37.7111 15.6982 37.0338C16.8507 36.3566 18.1633 35.9996 19.5 36H22.35C21.2129 34.9479 20.306 33.6717 19.6864 32.2518C19.0668 30.832 18.748 29.2992 18.75 27.75C18.75 25.854 19.218 24.066 20.049 22.5H7.5C6.30653 22.5 5.16193 22.9741 4.31802 23.818C3.47411 24.6619 3 25.8065 3 27V28.5Z"
            fill="#8212F4"
          />
          <path
            d="M26.25 11.25C26.25 9.06196 25.3808 6.96354 23.8336 5.41637C22.2865 3.86919 20.188 3 18 3C15.812 3 13.7135 3.86919 12.1664 5.41637C10.6192 6.96354 9.75 9.06196 9.75 11.25C9.75 13.438 10.6192 15.5365 12.1664 17.0836C13.7135 18.6308 15.812 19.5 18 19.5C20.188 19.5 22.2865 18.6308 23.8336 17.0836C25.3808 15.5365 26.25 13.438 26.25 11.25V11.25Z"
            fill="#8212F4"
          />
          <path
            d="M50.25 11.25C50.25 9.06196 49.3808 6.96354 47.8336 5.41637C46.2865 3.86919 44.188 3 42 3C39.812 3 37.7135 3.86919 36.1664 5.41637C34.6192 6.96354 33.75 9.06196 33.75 11.25C33.75 13.438 34.6192 15.5365 36.1664 17.0836C37.7135 18.6308 39.812 19.5 42 19.5C44.188 19.5 46.2865 18.6308 47.8336 17.0836C49.3808 15.5365 50.25 13.438 50.25 11.25V11.25Z"
            fill="#8212F4"
          />
        </svg>
      ),
      title: "Large Community",
      desc: "WITH OVER 10,000  DAILY USERS, NFTWatcher CAN PROUDLY STATE THAT WE ARE REAL INFLUENCERS WHEN IT COMES TO UPCOMING AND ONGOING SALES OF NFT PROJECTS. WE ARE NOT JUST A PLATFORM. WE ARE A BIG COMMUNITY.",
    },
    {
      icon: (
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="367.424px"
          height="367.424px"
          viewBox="0 0 367.424 367.424"
          style={{
            width: 80,
            height: 80,
            fill: theme.palette.primary.main,
          }}
          // style="enable-background:new 0 0 367.424 367.424;"
        >
          <g>
            <g>
              <path
                d="M331.832,324.933c-14.176-33.603-62.084-139.134-62.084-139.134c16.688-19.688,26.781-45.129,26.781-72.893
			C296.529,50.65,245.881,0,183.625,0C121.37,0,70.719,50.65,70.719,112.906c0,27.764,10.096,53.205,26.781,72.893L35.297,325.877
			c-1.396,3.145-0.723,6.828,1.699,9.273c2.422,2.442,6.084,3.161,9.258,1.801l41.352-17.828l14.506,42.633
			c1.109,3.26,4.104,5.506,7.541,5.66c0.127,0.004,0.254,0.008,0.377,0.008c3.295,0,6.297-1.938,7.645-4.969l60.736-136.779
			c1.73,0.082,3.467,0.135,5.215,0.135s3.482-0.053,5.215-0.135l60.736,136.779c1.348,3.028,4.348,4.969,7.645,4.969
			c0.123,0,0.248-0.004,0.375-0.008c3.439-0.154,6.432-2.4,7.543-5.66l14.506-42.633l41.064,17.545
			c1.07,0.459,2.193,0.684,3.309,0.684c0.033,0,0.074,0,0.086,0c4.623,0,8.393-3.353,8.727-8.051
			C332.908,328.216,332.666,326.907,331.832,324.933z M111.063,336.131l-10.537-30.967c-0.75-2.209-2.393-4.002-4.523-4.949
			c-1.078-0.477-2.238-0.719-3.395-0.719c-1.127,0-2.254,0.229-3.312,0.682l-30.035,12.951l50.891-114.602
			c14.322,12.305,31.727,21.104,50.908,25.018L111.063,336.131z M87.445,112.906c0-53.035,43.145-96.18,96.18-96.18
			c53.033,0,96.177,43.145,96.177,96.18c0,53.033-43.145,96.178-96.177,96.178C130.59,209.084,87.445,165.94,87.445,112.906z
			 M277.953,300.178c-2.141-0.914-4.574-0.901-6.705,0.037c-2.133,0.947-3.773,2.74-4.525,4.949l-10.535,30.967l-49.996-112.586
			c19.18-3.912,36.586-12.713,50.906-25.018l50.891,114.602L277.953,300.178z"
              />
              <path
                d="M183.625,37.635c-41.502,0-75.271,33.77-75.271,75.271s33.77,75.27,75.271,75.27c41.501,0,75.269-33.768,75.269-75.27
			S225.127,37.635,183.625,37.635z M183.625,171.449c-32.281,0-58.545-26.262-58.545-58.543c0-32.281,26.264-58.543,58.545-58.543
			c32.281,0,58.542,26.262,58.542,58.543C242.168,145.187,215.906,171.449,183.625,171.449z"
              />
            </g>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      ),
      title: "Trusted Platform",
      desc: "NOT EVERY PROJECT WILL BE ALLOWED ON OUR PLATFORM. After A NFT PROJECT GETS POSTED - OUR TEAM REVIEWS ESSENTIAL DETAILS. THAT'S WHY OUR USERS TRUST US! PROJECTS ON NFTWatcher HELP USERS MAKE THE RIGHT DECISION.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 512.167 512.167"
          style={{ width: 80, height: 80, fill: theme.palette.primary.main }}
        >
          <g>
            <circle
              style={{ fill: theme.palette.primary.main }}
              cx="152.106"
              cy="136.058"
              r="64.32"
            />
            <circle
              style={{ fill: theme.palette.primary.main }}
              cx="360.106"
              cy="376.057"
              r="64.32"
            />

            <rect
              xmlns="http://www.w3.org/2000/svg"
              x="240.083"
              y="-5.073"
              transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 256.0833 618.2399)"
              style={{ fill: theme.palette.primary.main, borderRadius: 10 }}
              width="40"
              height="540.313"
            />
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      ),
      title: "It's Free",
      desc: "TO HELP EVEN THE SMALLEST PROJECTS TO GET AUDIENCE COVERAGE, WE OFFER A FREE PLAN. to get the upcoming projects posted WE ALSO OFFER AN AFFORDABLE PREMIUM PLAN",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="512px"
          height="512px"
          viewBox="-96 0 512 512"
          style={{ width: 80, height: 80, fill: theme.palette.primary.main }}
        >
          <path d="M296 160H180.6l42.6-129.8C227.2 15 215.7 0 200 0H56C44 0 33.8 8.9 32.2 20.8l-32 240C-1.7 275.2 9.5 288 24 288h118.7L96.6 482.5c-3.6 15.2 8 29.5 23.3 29.5 8.4 0 16.4-4.4 20.8-12l176-304c9.3-15.9-2.2-36-20.7-36z" />
        </svg>
      ),
      title: "10,000 Daily Visitors",
      desc: "10,000 USERS ARE BROWSING OUR PLATFORM EVERY DAY LOOKING FOR THE NEXT NFT TO BUY.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 60 60"
          style={{ width: 80, height: 80, fill: theme.palette.primary.main }}
        >
          <g>
            <path d="M55.783,8H4.217C1.892,8,0,9.892,0,12.217v35.566C0,50.108,1.892,52,4.217,52h51.566C58.108,52,60,50.108,60,47.783V12.217   C60,9.892,58.108,8,55.783,8z M58,47.783C58,49.006,57.006,50,55.783,50H4.217C2.994,50,2,49.006,2,47.783V12.217   C2,10.994,2.994,10,4.217,10h51.566C57.006,10,58,10.994,58,12.217V47.783z" />
            <path d="M22.642,36.248L19,34.388v-0.387c1.628-0.889,2.773-2.353,3.412-4.364C23.381,29.123,24,28.122,24,27v-1   c0-0.926-0.431-1.785-1.151-2.349c-0.624-3.78-3.262-5.696-7.849-5.696c-0.217,0-0.429,0.008-0.636,0.024   c-1.202,0.097-2.363-0.162-3.224-0.74c-0.409-0.276-0.718-0.544-0.915-0.793c-0.444-0.568-1.369-0.593-1.843-0.062   c-0.227,0.254-0.334,0.596-0.294,0.936c0.042,0.374,0.105,0.809,0.2,1.286c0.193,0.975,0.193,0.975-0.078,1.558   c-0.102,0.221-0.228,0.49-0.376,0.853c-0.331,0.811-0.566,1.699-0.701,2.647C6.424,24.229,6,25.083,6,26v1   c0,1.122,0.619,2.123,1.588,2.637c0.639,2.012,1.784,3.476,3.412,4.364v0.376l-3.769,1.858C5.855,36.985,5,38.425,5,39.993v1.325   C5,42.121,5,44,15,44s10-1.879,10-2.682v-1.245C25,38.441,24.094,36.974,22.642,36.248z" />
            <path d="M30,23h10c0.553,0,1-0.447,1-1s-0.447-1-1-1H30c-0.553,0-1,0.447-1,1S29.447,23,30,23z" />
            <path d="M44,23h1c0.553,0,1-0.447,1-1s-0.447-1-1-1h-1c-0.553,0-1,0.447-1,1S43.447,23,44,23z" />
            <path d="M31,38h-1c-0.553,0-1,0.447-1,1s0.447,1,1,1h1c0.553,0,1-0.447,1-1S31.553,38,31,38z" />
            <path d="M37,38h-2c-0.553,0-1,0.447-1,1s0.447,1,1,1h2c0.553,0,1-0.447,1-1S37.553,38,37,38z" />
            <path d="M42,38h-1c-0.553,0-1,0.447-1,1s0.447,1,1,1h1c0.553,0,1-0.447,1-1S42.553,38,42,38z" />
            <path d="M48,38h-2c-0.553,0-1,0.447-1,1s0.447,1,1,1h2c0.553,0,1-0.447,1-1S48.553,38,48,38z" />
            <path d="M51.29,38.29C51.109,38.479,51,38.74,51,39s0.109,0.52,0.29,0.71C51.479,39.89,51.74,40,52,40s0.52-0.11,0.71-0.29   C52.89,39.52,53,39.26,53,39s-0.11-0.521-0.29-0.71C52.33,37.92,51.66,37.92,51.29,38.29z" />
            <path d="M52,27H30c-0.553,0-1,0.447-1,1s0.447,1,1,1h22c0.553,0,1-0.447,1-1S52.553,27,52,27z" />
            <path d="M52,33H30c-0.553,0-1,0.447-1,1s0.447,1,1,1h22c0.553,0,1-0.447,1-1S52.553,33,52,33z" />
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      ),
      title: "THOUSANDS OF PROJECTS",
      desc: "EVERYDAY NEW NFT CREATORS CREATE THEIR LISTING ON NFTWATCHER. WE HAVE A DATABASE OF THOUSANDS OF PROJECTS.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70px"
          height="70px"
          viewBox="0 0 24 24"
          style={{ fill: theme.palette.primary.main }}
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zM9.399 8h-2l-3.2 8h2.154l.4-1h3.29l.4 1h2.155L9.399 8zM19 8h-2v2h-1a3 3 0 0 0-.176 5.995L16 16h3V8zm-2 4v2h-1l-.117-.007a1 1 0 0 1 0-1.986L16 12h1zm-8.601-1.115L9.244 13H7.552l.847-2.115z" />
          </g>
        </svg>
      ),
      title: "Paid Promotions",
      desc: "WE OFFER DIFFERENT TYPES OF PROMOTIONS TO HELP YOU ACCELERATE YOUR PROJECT TO THE NEXT LEVEL.",
    },
  ];

  return (
    <div className={classes.root}>
      <div className="container">
        <div className="row mt-5 d-flex align-items-center justify-content-center">
          <div className="col-md-6 col-12">
            <h3
              className="d-flex align-items-center"
              style={{ fontFamily: "Jura", fontWeight: "bold" }}
            >
              <p className="m-0" style={{ color: theme.palette.primary.main }}>
                Promote
              </p>{" "}
              &nbsp; your NFT Project
            </h3>
            <p>
              We are the #1 NFT Listing Platform for upcoming and ongoing NFT
              Events. We can help you to grow your audience for your upcoming
              and live NFT Projects.
            </p>
            <Button
              className="px-4 py-2"
              variant="contained"
              component={Link}
              to="/events/submit"
              style={{
                textTransform: "capitalize",
                borderRadius: 10,
                boxShadow: "none",
              }}
            >
              Submit NFT
            </Button>
            <Button
              className="px-4 py-2 ms-md-3 ms-2"
              variant="contained"
              href="https://pay.nftwatcher.net"
              target="_blank"
              style={{
                textTransform: "capitalize",
                borderRadius: 10,
                boxShadow: "none",
                background: "#F8CB00",
              }}
            >
              Book Your Slot
            </Button>
          </div>
          <div className="col-md-6 col-12 mt-md-0 mt-5 d-flex align-items-center justify-content-center">
            <img
              src={Vector1}
              className="d-flex mx-auto"
              style={{ width: "80%", height: "100%" }}
              alt="Logo Image"
            />
          </div>
        </div>
        <h3 className="text-center mt-5">Why Promote with NFT Watcher?</h3>
        <Grid
          container
          spacing={5}
          mt={5}
          justifyContent="center"
          className="px-md-5 px-0"
        >
          {whyPrmoteNftWatcherItems.map((item) => {
            return (
              <Grid
                item
                xl={3}
                lg={4}
                sm={6}
                xs={12}
                className={`d-flex text-center align-items-center flex-column `}
              >
                <Grid
                  className={`p-5 ${classes.promoteNFTWatcher}`}
                  style={{ minHeight: 310 }}
                >
                  {item.icon}
                  <br />
                  <br />
                  <h4>{item.title}</h4>
                  <br />
                  <small
                    className="text-center"
                    style={{
                      fontFamily: "Lato",
                      fontSize: 12,
                      display: "block",
                    }}
                  >
                    {item.desc}
                  </small>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Button
          className="px-4 py-2 mt-5 d-flex mx-auto"
          variant="contained"
          style={{
            textTransform: "capitalize",
            borderRadius: 6,
            boxShadow: "none",
            width: 200,
          }}
          component={Link}
          to="/events/submit"
        >
          Submit NFT Projects
        </Button>
        <h3 className="text-center mt-5">SELL OUT WITH NFT Watcher</h3>
        <div className="row mt-5 d-flex align-items-center justify-content-center">
          <div className="col-md-6 col-12">
            <h3
              className="d-flex align-items-center"
              style={{ fontFamily: "Jura", fontWeight: "bold" }}
            >
              <p className="m-0" style={{ color: theme.palette.primary.main }}>
                Reach
              </p>{" "}
              &nbsp; the right audience
            </h3>
            <p>
              The word NFT exploded in every single part of the globe, everyone
              is talking about it, some in disbelief, but no one can deny, the
              NFT industry has reached a level of development no one ever
              imagined!
            </p>
            <p>
              You have a project? You don’t know how to advertise your idea the
              best way possible? You want to reach the right audience and people
              for you? Don’t think twice, become a part of NFTWatcher. We’ll
              help you get there!
            </p>
            <Button
              className="px-4 py-2"
              variant="contained"
              style={{
                textTransform: "capitalize",
                borderRadius: 6,
                boxShadow: "none",
              }}
              component={Link}
              to="/events/submit"
            >
              Submit NFT Project
            </Button>
          </div>
          <div className="col-md-6 col-12 mt-md-0 mt-5 d-flex align-items-center justify-content-center">
            <img src={NftWatcherStats} width="60%" />
          </div>
        </div>
        <div className="row mt-5 d-flex align-items-center justify-content-center">
          <div className="col-md-6 col-12 mt-md-0 mt-5 order-md-first order-last">
            <img src={NewLogoImage} width="100%" />
          </div>
          <div className="col-md-6 col-12 order-md-last order-first">
            <h3
              className="d-flex align-items-center"
              style={{ fontFamily: "Jura", fontWeight: "bold" }}
            >
              <p className="m-0" style={{ color: theme.palette.primary.main }}>
                FEATURED
              </p>{" "}
              &nbsp; PLACEMENTS
            </h3>
            <p>
              Have you ever thought about how you can bring more collectors to
              your collection? How can you maximize the exposure of your arts to
              become the greatest artist out there? Luckily, we have everything
              you need to help your journey to the top, as one of the greatest
              platform for upcoming NFT collections in the world!
            </p>
            <p>
              Get your project banner on our homepage and enjoy the ride to the
              top as we work in advertising your project to our audience!
            </p>
            <Button
              className="px-4 py-2"
              variant="contained"
              style={{
                textTransform: "capitalize",
                borderRadius: 6,
                boxShadow: "none",
              }}
              href="https://pay.nftwatcher.net"
              target="_blank"
            >
              Book Your Slot
            </Button>
          </div>
        </div>
        <div
          className={
            "d-flex align-items-center justify-content-center flex-column mt-5"
          }
        >
          <h5 style={{ fontWeight: "bolder" }}>
            <img src={StarImg} width={20} height={20} className="me-2 mb-1" />
            Get 10% discount on any ads!
          </h5>
          <p>
            Put a backlink to NFTWatcher on your project website and recieve a
            10% discount for any ad package!
          </p>
        </div>
        {advertisePage.pricing_sliders ? (
          <>
            <h3 className="text-center mt-4">Pricing</h3>
            <AdvertiseSlider
              sliders={advertisePage.pricing_sliders}
              theme={theme}
            />
          </>
        ) : null}
        <br /> <br /> <br /> <br />
        {advertisePage.pricing_boxes ? (
          <Grid
            container
            spacing={2}
            mt={5}
            justifyContent="center"
            className="px-md-5 px-0"
          >
            {advertisePage.pricing_boxes.map((item, i) => (
              <Grid
                item
                xl={3}
                lg={3}
                sm={6}
                xs={12}
                className={`d-flex text-center align-items-center flex-column `}
              >
                <Grid className={`p-4 pb-5 ${classes.promoteNFTWatcher}`}>
                  <h4 className="mt-3" style={{ fontWeight: 600 }}>
                    {item.title}
                  </h4>
                  <br />
                  <h4 style={{ fontWeight: 600 }}>{item.price}</h4>
                  <br />
                  <p style={{ fontSize: 12, lineHeight: 2 }}>
                    {item.description}
                  </p>
                  <br />
                  <Button
                    className="px-4 py-2"
                    variant="contained"
                    onClick={() => window.open(item.redirect_url)}
                    style={{
                      textTransform: "capitalize",
                      borderRadius: 0,
                      boxShadow: "none",
                    }}
                  >
                    Click here
                  </Button>
                  <br />
                  <br />
                </Grid>
              </Grid>
            ))}
          </Grid>
        ) : null}
        <br />
        {advertisePage.faqs ? (
          <>
            <h1 className="font-jura text-center mt-5">
              Frequently Asked Questions (FAQs)
            </h1>{" "}
            <br />
            <Accordian faqs={advertisePage.faqs ?? []} />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Advertise;
