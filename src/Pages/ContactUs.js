import React from "react";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import Accordian from "../Components/Accordian";
import axios from "../api/axios.js";

function ContactUs(props) {
  const theme = useTheme();
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

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <div className="mt-5" style={{ width: 300 }}>
        {props.theme == "dark" ? (
          <svg
            viewBox="0 0 407 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M71.3557 39.6206V47.8718C71.3557 49.4054 71.4032 50.9389 71.3178 52.4676C71.0853 56.6824 69.7095 60.3571 65.6011 62.0498C61.3314 63.8197 57.3653 63.1349 53.8024 59.846C42.4497 49.3716 31.0306 39.0034 19.602 28.5965C18.9046 27.96 18.1788 27.3475 17.007 26.2962V62.0064C11.6176 62.0064 6.50345 62.0788 1.39877 61.8907C0.924355 61.8907 0.0988765 60.2414 0.0893882 59.3541C-0.000750258 48.2769 0.0277145 37.195 0.0277145 26.113C0.0277145 21.0687 -0.0529357 16.0244 0.0609234 10.9802C0.231712 3.45233 5.03752 -1.09041 11.7979 0.226113C13.9992 0.650488 16.2384 2.06829 17.9653 3.60182C29.2705 13.729 40.4335 24.0056 51.6486 34.234C52.365 34.885 53.1145 35.5023 54.2768 36.5053V1.21471H190.006C188.009 3.8333 186.263 6.14807 184.489 8.44838C182.359 11.1972 180.694 14.978 177.914 16.3765C175.134 17.775 171.158 16.8057 167.709 16.8298C164.184 16.8587 160.659 16.8298 156.831 16.8298V61.7267H138.267V17.0854H71.3747C71.3747 19.2072 71.2134 21.2761 71.4791 23.2822C71.555 23.8754 72.8549 24.7289 73.5997 24.7289C80.602 24.8399 87.6044 24.7916 94.6019 24.7916H120.405C119.722 25.896 119.319 26.6242 118.84 27.2993C116.468 30.675 113.934 33.9205 111.671 37.3637C110.49 39.1577 109.114 39.6785 107.06 39.6592C96.3383 39.5628 85.6118 39.6158 74.8901 39.6158L71.3557 39.6206Z"
              fill="url(#paint0_linear_291_1122)"
            />
            <path
              d="M178.98 60C178.247 60 177.727 59.52 177.42 58.56L170.02 35.12C169.86 34.6133 169.933 34.1067 170.24 33.6C170.56 33.0933 171.02 32.84 171.62 32.84C171.94 32.84 172.247 32.9467 172.54 33.16C172.833 33.36 173.047 33.68 173.18 34.12L179.7 54.88H178.82L185.02 34.32C185.167 33.84 185.413 33.48 185.76 33.24C186.12 33 186.487 32.88 186.86 32.88C187.26 32.88 187.647 33 188.02 33.24C188.393 33.48 188.647 33.84 188.78 34.32L194.98 54.88H194.1L200.62 34.12C200.767 33.68 200.973 33.3667 201.24 33.18C201.52 32.98 201.82 32.88 202.14 32.88C202.727 32.88 203.193 33.1067 203.54 33.56C203.887 34.0133 203.967 34.5333 203.78 35.12L196.38 58.56C196.06 59.52 195.473 60 194.62 60H194.54C193.647 60 193.06 59.52 192.78 58.56L186.34 37.72H187.22L180.74 58.56C180.607 59.04 180.407 59.4 180.14 59.64C179.887 59.88 179.5 60 178.98 60ZM206.489 59.84C205.423 59.4267 205.103 58.6933 205.529 57.64L215.049 34.2C215.449 33.32 216.076 32.88 216.929 32.88H217.009C217.876 32.92 218.463 33.36 218.769 34.2L228.449 57.64C228.876 58.6933 228.569 59.4267 227.529 59.84C226.476 60.2533 225.743 59.9467 225.329 58.92L223.169 53.68H210.709L208.649 58.92C208.236 59.96 207.516 60.2667 206.489 59.84ZM212.029 50.32H221.789L216.809 38.2L212.029 50.32ZM239.327 60C238.767 60 238.347 59.86 238.067 59.58C237.787 59.3 237.647 58.88 237.647 58.32V36.28H229.887C229.327 36.28 228.907 36.14 228.627 35.86C228.347 35.58 228.207 35.16 228.207 34.6C228.207 34.04 228.347 33.62 228.627 33.34C228.907 33.06 229.327 32.92 229.887 32.92H248.767C249.327 32.92 249.747 33.06 250.027 33.34C250.307 33.62 250.447 34.04 250.447 34.6C250.447 35.16 250.307 35.58 250.027 35.86C249.747 36.14 249.327 36.28 248.767 36.28H241.007V58.32C241.007 58.8533 240.86 59.2667 240.567 59.56C240.287 59.8533 239.874 60 239.327 60ZM262.176 60C259.122 60 256.862 59.2733 255.396 57.82C253.942 56.3533 253.216 54.0933 253.216 51.04V41.84C253.216 38.76 253.942 36.4933 255.396 35.04C256.849 33.5733 259.096 32.8533 262.136 32.88H266.976C269.482 32.88 271.396 33.4 272.716 34.44C274.036 35.4667 274.802 37.0933 275.016 39.32C275.096 39.88 274.989 40.3067 274.696 40.6C274.402 40.8933 273.976 41.04 273.416 41.04C272.402 41.04 271.816 40.48 271.656 39.36C271.522 38.1333 271.096 37.3067 270.376 36.88C269.669 36.4533 268.536 36.24 266.976 36.24H262.136C260.722 36.2267 259.609 36.3867 258.796 36.72C257.996 37.0533 257.422 37.6333 257.076 38.46C256.742 39.2733 256.576 40.4 256.576 41.84V51.04C256.576 52.4667 256.742 53.5867 257.076 54.4C257.422 55.2133 258.002 55.7933 258.816 56.14C259.629 56.4733 260.749 56.64 262.176 56.64H266.976C268.536 56.64 269.669 56.4267 270.376 56C271.096 55.56 271.522 54.7333 271.656 53.52C271.816 52.4 272.402 51.84 273.416 51.84C273.976 51.84 274.402 51.9867 274.696 52.28C274.989 52.5733 275.096 53 275.016 53.56C274.802 55.8 274.036 57.4333 272.716 58.46C271.396 59.4867 269.482 60 266.976 60H262.176ZM283.707 60C283.267 60 282.874 59.8333 282.527 59.5C282.194 59.1533 282.027 58.76 282.027 58.32V34.56C282.027 34.12 282.194 33.7333 282.527 33.4C282.874 33.0533 283.267 32.88 283.707 32.88C284.147 32.88 284.534 33.0533 284.867 33.4C285.214 33.7333 285.387 34.12 285.387 34.56V44.6H301.707V34.56C301.707 34.12 301.874 33.7333 302.207 33.4C302.541 33.0533 302.934 32.88 303.387 32.88C303.827 32.88 304.214 33.0533 304.547 33.4C304.894 33.7333 305.067 34.12 305.067 34.56V58.32C305.067 58.76 304.894 59.1533 304.547 59.5C304.214 59.8333 303.827 60 303.387 60C302.934 60 302.541 59.8333 302.207 59.5C301.874 59.1533 301.707 58.76 301.707 58.32V47.96H285.387V58.32C285.387 58.76 285.214 59.1533 284.867 59.5C284.534 59.8333 284.147 60 283.707 60ZM315.074 60C313.954 60 313.394 59.44 313.394 58.32V34.56C313.394 33.44 313.954 32.88 315.074 32.88H329.434C330.554 32.88 331.114 33.44 331.114 34.56C331.114 35.68 330.554 36.24 329.434 36.24H316.754V44.64H324.714C325.834 44.64 326.394 45.2 326.394 46.32C326.394 47.44 325.834 48 324.714 48H316.754V56.64H329.434C330.554 56.64 331.114 57.2 331.114 58.32C331.114 59.44 330.554 60 329.434 60H315.074ZM354.936 60.08C354.496 60.36 354.076 60.4467 353.676 60.34C353.276 60.2333 352.936 59.96 352.656 59.52L346.456 49.2H340.856V58.32C340.856 59.44 340.296 60 339.176 60C338.056 60 337.496 59.44 337.496 58.32V34.56C337.496 33.44 338.056 32.88 339.176 32.88H348.536C350.976 32.88 352.843 33.5333 354.136 34.84C355.443 36.1333 356.096 38 356.096 40.44V41.64C356.096 43.76 355.603 45.4533 354.616 46.72C353.629 47.9733 352.203 48.7533 350.336 49.06L355.576 57.8C356.083 58.7333 355.869 59.4933 354.936 60.08ZM340.856 45.84H348.536C350.056 45.84 351.136 45.52 351.776 44.88C352.416 44.24 352.736 43.16 352.736 41.64V40.44C352.736 38.9333 352.416 37.86 351.776 37.22C351.136 36.5667 350.056 36.24 348.536 36.24H340.856V45.84Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear_291_1122"
                x1="-0.000750261"
                y1="31.4997"
                x2="182.814"
                y2="31.4997"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#0673DB" />
                <stop offset="0.9" stop-color="#8212F4" />
              </linearGradient>
            </defs>
          </svg>
        ) : (
          <svg
            viewBox="0 0 407 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M71.3557 39.6206V47.8718C71.3557 49.4054 71.4031 50.9389 71.3178 52.4676C71.0853 56.6825 69.7095 60.3571 65.6011 62.0498C61.3314 63.8197 57.3653 63.1349 53.8024 59.846C42.4497 49.3716 31.0306 39.0034 19.602 28.5965C18.9046 27.96 18.1788 27.3475 17.007 26.2962V62.0064C11.6176 62.0064 6.50345 62.0788 1.39877 61.8907C0.924355 61.8907 0.0988765 60.2414 0.0893882 59.3541C-0.000750258 48.2769 0.0277145 37.195 0.0277145 26.113C0.0277145 21.0687 -0.0529357 16.0244 0.0609234 10.9802C0.231712 3.45233 5.03752 -1.09041 11.7979 0.226113C13.9992 0.650488 16.2384 2.06829 17.9653 3.60182C29.2705 13.729 40.4335 24.0056 51.6486 34.234C52.365 34.885 53.1145 35.5023 54.2768 36.5053V1.21471H190.006C188.009 3.8333 186.263 6.14807 184.489 8.44838C182.359 11.1972 180.694 14.978 177.914 16.3765C175.134 17.775 171.158 16.8057 167.709 16.8298C164.184 16.8587 160.659 16.8298 156.831 16.8298V61.7267H138.267V17.0854H71.3747C71.3747 19.2072 71.2134 21.2761 71.4791 23.2822C71.555 23.8754 72.8549 24.7289 73.5997 24.7289C80.602 24.8399 87.6044 24.7916 94.6019 24.7916H120.405C119.722 25.896 119.319 26.6242 118.84 27.2993C116.468 30.675 113.934 33.9205 111.671 37.3637C110.49 39.1577 109.114 39.6785 107.06 39.6592C96.3383 39.5628 85.6118 39.6158 74.8901 39.6158L71.3557 39.6206Z"
              fill="url(#paint0_linear_1_2)"
            />
            <path
              d="M178.98 60C178.247 60 177.727 59.52 177.42 58.56L170.02 35.12C169.86 34.6133 169.933 34.1067 170.24 33.6C170.56 33.0933 171.02 32.84 171.62 32.84C171.94 32.84 172.247 32.9467 172.54 33.16C172.833 33.36 173.047 33.68 173.18 34.12L179.7 54.88H178.82L185.02 34.32C185.167 33.84 185.413 33.48 185.76 33.24C186.12 33 186.487 32.88 186.86 32.88C187.26 32.88 187.647 33 188.02 33.24C188.393 33.48 188.647 33.84 188.78 34.32L194.98 54.88H194.1L200.62 34.12C200.767 33.68 200.973 33.3667 201.24 33.18C201.52 32.98 201.82 32.88 202.14 32.88C202.727 32.88 203.193 33.1067 203.54 33.56C203.887 34.0133 203.967 34.5333 203.78 35.12L196.38 58.56C196.06 59.52 195.473 60 194.62 60H194.54C193.647 60 193.06 59.52 192.78 58.56L186.34 37.72H187.22L180.74 58.56C180.607 59.04 180.407 59.4 180.14 59.64C179.887 59.88 179.5 60 178.98 60ZM206.489 59.84C205.423 59.4267 205.103 58.6933 205.529 57.64L215.049 34.2C215.449 33.32 216.076 32.88 216.929 32.88H217.009C217.876 32.92 218.463 33.36 218.769 34.2L228.449 57.64C228.876 58.6933 228.569 59.4267 227.529 59.84C226.476 60.2533 225.743 59.9467 225.329 58.92L223.169 53.68H210.709L208.649 58.92C208.236 59.96 207.516 60.2667 206.489 59.84ZM212.029 50.32H221.789L216.809 38.2L212.029 50.32ZM239.327 60C238.767 60 238.347 59.86 238.067 59.58C237.787 59.3 237.647 58.88 237.647 58.32V36.28H229.887C229.327 36.28 228.907 36.14 228.627 35.86C228.347 35.58 228.207 35.16 228.207 34.6C228.207 34.04 228.347 33.62 228.627 33.34C228.907 33.06 229.327 32.92 229.887 32.92H248.767C249.327 32.92 249.747 33.06 250.027 33.34C250.307 33.62 250.447 34.04 250.447 34.6C250.447 35.16 250.307 35.58 250.027 35.86C249.747 36.14 249.327 36.28 248.767 36.28H241.007V58.32C241.007 58.8533 240.86 59.2667 240.567 59.56C240.287 59.8533 239.874 60 239.327 60ZM262.176 60C259.122 60 256.862 59.2733 255.396 57.82C253.942 56.3533 253.216 54.0933 253.216 51.04V41.84C253.216 38.76 253.942 36.4933 255.396 35.04C256.849 33.5733 259.096 32.8533 262.136 32.88H266.976C269.482 32.88 271.396 33.4 272.716 34.44C274.036 35.4667 274.802 37.0933 275.016 39.32C275.096 39.88 274.989 40.3067 274.696 40.6C274.402 40.8933 273.976 41.04 273.416 41.04C272.402 41.04 271.816 40.48 271.656 39.36C271.522 38.1333 271.096 37.3067 270.376 36.88C269.669 36.4533 268.536 36.24 266.976 36.24H262.136C260.722 36.2267 259.609 36.3867 258.796 36.72C257.996 37.0533 257.422 37.6333 257.076 38.46C256.742 39.2733 256.576 40.4 256.576 41.84V51.04C256.576 52.4667 256.742 53.5867 257.076 54.4C257.422 55.2133 258.002 55.7933 258.816 56.14C259.629 56.4733 260.749 56.64 262.176 56.64H266.976C268.536 56.64 269.669 56.4267 270.376 56C271.096 55.56 271.522 54.7333 271.656 53.52C271.816 52.4 272.402 51.84 273.416 51.84C273.976 51.84 274.402 51.9867 274.696 52.28C274.989 52.5733 275.096 53 275.016 53.56C274.802 55.8 274.036 57.4333 272.716 58.46C271.396 59.4867 269.482 60 266.976 60H262.176ZM283.707 60C283.267 60 282.874 59.8333 282.527 59.5C282.194 59.1533 282.027 58.76 282.027 58.32V34.56C282.027 34.12 282.194 33.7333 282.527 33.4C282.874 33.0533 283.267 32.88 283.707 32.88C284.147 32.88 284.534 33.0533 284.867 33.4C285.214 33.7333 285.387 34.12 285.387 34.56V44.6H301.707V34.56C301.707 34.12 301.874 33.7333 302.207 33.4C302.541 33.0533 302.934 32.88 303.387 32.88C303.827 32.88 304.214 33.0533 304.547 33.4C304.894 33.7333 305.067 34.12 305.067 34.56V58.32C305.067 58.76 304.894 59.1533 304.547 59.5C304.214 59.8333 303.827 60 303.387 60C302.934 60 302.541 59.8333 302.207 59.5C301.874 59.1533 301.707 58.76 301.707 58.32V47.96H285.387V58.32C285.387 58.76 285.214 59.1533 284.867 59.5C284.534 59.8333 284.147 60 283.707 60ZM315.074 60C313.954 60 313.394 59.44 313.394 58.32V34.56C313.394 33.44 313.954 32.88 315.074 32.88H329.434C330.554 32.88 331.114 33.44 331.114 34.56C331.114 35.68 330.554 36.24 329.434 36.24H316.754V44.64H324.714C325.834 44.64 326.394 45.2 326.394 46.32C326.394 47.44 325.834 48 324.714 48H316.754V56.64H329.434C330.554 56.64 331.114 57.2 331.114 58.32C331.114 59.44 330.554 60 329.434 60H315.074ZM354.936 60.08C354.496 60.36 354.076 60.4467 353.676 60.34C353.276 60.2333 352.936 59.96 352.656 59.52L346.456 49.2H340.856V58.32C340.856 59.44 340.296 60 339.176 60C338.056 60 337.496 59.44 337.496 58.32V34.56C337.496 33.44 338.056 32.88 339.176 32.88H348.536C350.976 32.88 352.843 33.5333 354.136 34.84C355.443 36.1333 356.096 38 356.096 40.44V41.64C356.096 43.76 355.603 45.4533 354.616 46.72C353.629 47.9733 352.203 48.7533 350.336 49.06L355.576 57.8C356.083 58.7333 355.869 59.4933 354.936 60.08ZM340.856 45.84H348.536C350.056 45.84 351.136 45.52 351.776 44.88C352.416 44.24 352.736 43.16 352.736 41.64V40.44C352.736 38.9333 352.416 37.86 351.776 37.22C351.136 36.5667 350.056 36.24 348.536 36.24H340.856V45.84Z"
              fill="black"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1_2"
                x1="-0.000750261"
                y1="31.4997"
                x2="182.814"
                y2="31.4997"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#0673DB" />
                <stop offset="0.9" stop-color="#8212F4" />
              </linearGradient>
            </defs>
          </svg>
        )}
      </div>

      <br />
      <div className="d-flex align-items-center justify-content-center flex-column mt-5">
        <h5 style={{ fontWeight: "bold" }}>Promote Your NFT Project!</h5>
        <p className="m-0">GET THE VISIBILITY YOU NEED.</p>
        <p className="m-0">
          By Promoting on NFTWatcher.net, your Project will be visible on top of
          all other Projects.
        </p>
      </div>

      <br />
      <p className="mt-5 h2">Contact Us</p>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 col-12 px-4">
            <div
              className="px-3 py-3"
              style={{
                background: theme.palette.primary.main,
                borderRadius: 10,
              }}
            >
              <p className="h3 text-white font-jura fw-bolder">Advertising</p>
              <p className="text-white" style={{ fontSize: 20 }}>
                For advertising or promotional enquires, please email to
                promote@nftwatcher.net or send us a dm on our official twitter
                page.
              </p>
            </div>
          </div>
          <div className="col-md-6 col-12 px-4 mt-md-0 mt-3">
            <div
              className="px-3 py-3"
              style={{
                background: theme.palette.primary.main,
                borderRadius: 10,
              }}
            >
              <p className="h3 text-white font-jura fw-bolder">Support</p>
              <p className="text-white" style={{ fontSize: 20 }}>
                For support and general enquires, please email to
                support@nftwatcher.net
              </p>
              <br />
            </div>
          </div>
        </div>
      </div>

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
  );
}

export default ContactUs;