import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Skeleton,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import convert from "ethereum-unit-converter";
import axios from "../api/axios.js";
import { toast } from "react-toastify";
import OpenseaLogo from "../images/openseaLogo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255,255,255,.4)",
    zIndex: 99999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  innerRoot: {
    width: "60%",
    height: "90vh",
    zIndex: 9999999999,
    [theme.breakpoints.down("md")]: {
      height: "100vh",
      width: "100%",
    },
  },
  model: {
    width: "100%",
    height: "100%",
    overflowY: "scroll",
    background: theme.palette.themeCardColor.main,
    margin: "0 auto",
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    right: 30,
    top: 30,
    cursor: "pointer",
  },
  image: {
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100%",
    height: "55vh",
    borderRadius: 10,
  },
  viewOpenseaBox: {
    width: "100%",
    height: "20vh",
    marginTop: 10,
    background: theme.palette.themeCardColor.light,
    borderRadius: 10,
  },
  listItem: {
    borderBottom: `1px solid #0673DB`,
  },
}));

const OpenSeaModel = ({ open, onClose, assetId, slug }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();

  const [asset, setAsset] = React.useState(null);

  React.useEffect(() => {
    if (open === true && assetId != null) {
      setAsset(null);
      getAsset(assetId);
    }
  }, [assetId, open]);

  const getAsset = async (id) => {
    const res = await axios.get(`/assets/${slug}/${id}`);
    if (res.data.success) {
      console.log(res.data.asset);
      setAsset(res.data.asset);
    } else {
      toast.error("Unable to find NFT With Id " + assetId);
      onClose();
    }
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
    <>
      {open ? (
        <div onClick={() => onClose()}>
          <div className={`${classes.root}`}>
            <div
              onClick={(e) => e.stopPropagation()}
              className={`d-flex mx-auto shadow position-relative ${classes.innerRoot}`}
            >
              <div className={classes.model} onClick={() => {}}>
                {asset !== null ? (
                  <>
                    <div
                      className={classes.closeButton}
                      onClick={() => {
                        setAsset(null);
                        onClose();
                      }}
                    >
                      <svg
                        width="29"
                        height="29"
                        viewBox="0 0 29 29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="7.25"
                          y="4.83325"
                          width="14.5"
                          height="19.3333"
                          fill="#8212F4"
                        />
                        <path
                          d="M24.8307 4.23067C19.1758 -1.41022 9.89601 -1.41022 4.24115 4.23067C-1.41372 9.87157 -1.41372 19.1284 4.24115 24.7693C9.89601 30.4102 19.0308 30.4102 24.6857 24.7693C30.3405 19.1284 30.4855 9.87157 24.8307 4.23067V4.23067ZM18.5958 20.5748L14.5359 16.5249L10.476 20.5748L8.44605 18.5499L12.5059 14.5L8.44605 10.4501L10.476 8.42519L14.5359 12.4751L18.5958 8.42519L20.6258 10.4501L16.5659 14.5L20.6258 18.5499L18.5958 20.5748V20.5748Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="mt-3">
                      <h3>Rarity Rank #{asset?.ranking_no ?? "0"}</h3>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-6 col-12">
                        {asset?.image_url ? (
                          <img
                            src={asset?.image_url}
                            className={classes.image}
                          />
                        ) : asset?.animation_original_url ? (
                          <video
                            className={classes.image}
                            controls
                            autoPlay
                            muted
                            loop
                          >
                            <source
                              src={asset?.animation_original_url}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <div
                            className={`${classes.image} d-flex align-items-center justify-content-center`}
                          >
                            <h1 className="text-center">
                              Image Not
                              <br /> Available
                            </h1>
                          </div>
                        )}
                        <div className={`${classes.viewOpenseaBox} px-2 py-2`}>
                          <div className="d-flex align-items-center justify-content-between">
                            <p className="m-0">Name : {asset?.name ?? "N/A"}</p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <p className="m-0">
                              Owner:{" "}
                              {asset?.owner?.user?.username ??
                                asset?.owner?.address?.substr(0, 10)}{" "}
                            </p>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <p
                              className="m-0"
                              style={{ overflowWrap: "anywhere" }}
                            >
                              ID: {asset?.token_id ?? "N/A"}
                            </p>
                          </div>
                          <Button
                            variant="contained"
                            className="px-4 text-capitalize w-100  mt-3"
                            style={{
                              background: "#F6BE00",
                              color: "black",
                              fontWeight: "bold",
                            }}
                            onClick={() => window.open(asset?.permalink)}
                          >
                            View on OpenSea{" "}
                            <img
                              src={OpenseaLogo}
                              width={25}
                              className="ms-2"
                            />
                            {asset?.current_price > 0 &&
                            asset?.current_price != null
                              ? `(${convert(
                                  asset?.current_price,
                                  "wei",
                                  "ether"
                                )} ETH)`
                              : null}
                          </Button>
                        </div>
                      </div>
                      <div className="col-md-6 col-12 mt-md-0 mt-4">
                        <div style={{ overflowY: "scroll", height: "78vh" }}>
                          <div
                            className="d-flex flex-column align-items-center shadow mb-4 p-2"
                            style={{
                              backgroundColor: theme.palette.primary.main,
                              borderRadius: 10,
                            }}
                          >
                            <h5>Rarity Score</h5>
                            <h5
                              className="text-center py-2"
                              style={{
                                backgroundColor:
                                  theme.palette.themeCardColor.main,
                                width: "100%",
                              }}
                            >
                              {round(asset?.rarityScore, 2)}
                            </h5>
                          </div>
                          {asset?.traits.map((item, i) => (
                            <div key={i} className={`${classes.listItem} mx-2`}>
                              <div className="d-flex align-items-center justify-content-between">
                                <p
                                  style={{ color: theme.palette.primary.main }}
                                  className="m-0"
                                >
                                  {item?.trait_type ?? "N/A"}
                                </p>
                                <p
                                  style={{ color: theme.palette.primary.main }}
                                  className="m-0"
                                >
                                  +{round(item.rarityScore, 2)}
                                </p>
                              </div>
                              <div className="d-flex align-items-center justify-content-between my-2">
                                <p className="m-0">{item?.value ?? "N/A"}</p>
                                <p className="m-0">
                                  {item?.trait_count ?? "N/A"}
                                </p>
                              </div>
                            </div>
                          ))}
                          <br />
                          <br />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    className={`${classes.innerRoot} d-flex align-items-center justify-content-center flex-direction-column w-100`}
                  >
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      width={500}
                      height={20}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OpenSeaModel;
