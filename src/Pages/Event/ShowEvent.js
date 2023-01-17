import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import {
  Grid,
  Button,
  Menu,
  MenuItem,
  Typography,
  loading,
  Skeleton,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { makeStyles, styled } from "@mui/styles";
import CommonFunctions from "../../Common/CommonFunctions";
import axios from "../../api/axios.js";
import Sliders from "../../Components/Sliders";
import SkeletonSlider from "../../Components/SkeletonSlider";
import VoteAddedMessage from "../../Components/VoteAddedMessage";

import EthereumIcon from "../../images/Icons/Ethereum.png";
import Polygon from "../../images/Icons/Polygon.png";
import Solana from "../../images/Icons/Solana.png";
import Cardano from "../../images/Icons/Cardano.png";
import BinanceSmartChain from "../../images/Icons/Binance Smart Chain.png";
import Cronos from "../../images/Icons/Cronos.png";
import Elrond from "../../images/Icons/Elrond.png";
import AvaxNetwork from "../../images/Icons/Avax Network.png";
import Wax from "../../images/Icons/Wax.png";
import Tezos from "../../images/Icons/Tezos.png";
import Moonriver from "../../images/Icons/Moonriver.png";
import Fantom from "../../images/Icons/Fantom.png";
import ImmutableX from "../../images/Icons/Immutable X.png";
import Hathor from "../../images/Icons/Hathor.png";
import Flow from "../../images/Icons/Flow.png";
import Terra from "../../images/Icons/Terra.png";
import ETHOnPolygon from "../../images/Icons/ETH On Polygon.svg";
import { toast } from "react-toastify";

const blockchains = [
  {
    name: "Ethereum",
    icon: (
      <img
        src={EthereumIcon}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Polygon",
    icon: (
      <img
        src={Polygon}
        style={{ width: 20, marginBottom: "6px" }}
        className="me-1"
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Solana",
    icon: (
      <img
        src={Solana}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Cardano",
    icon: (
      <img
        src={Cardano}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Binance Smart Chain",
    icon: (
      <img
        src={BinanceSmartChain}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Cronos",
    icon: (
      <img
        src={Cronos}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Elrond",
    icon: (
      <img
        src={Elrond}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Avax Network",
    icon: (
      <img
        src={AvaxNetwork}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Wax",
    icon: (
      <img
        src={Wax}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Tezos",
    icon: (
      <img
        src={Tezos}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Moonriver",
    icon: (
      <img
        src={Moonriver}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Fantom",
    icon: (
      <img
        src={Fantom}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Immutable X",
    icon: (
      <img
        src={ImmutableX}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Hathor",
    icon: (
      <img
        src={Hathor}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "FLOW",
    icon: (
      <img
        src={Flow}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Terra",
    icon: (
      <img
        src={Terra}
        style={{ width: 20, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "ETH On Polygon",
    icon: (
      <img
        src={ETHOnPolygon}
        style={{ width: 15, marginBottom: "6px" }}
        alt={"Blockchain Icon"}
      />
    ),
  },
];

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip enterTouchDelay={0} {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    maxWidth: 200,
    fontSize: theme.typography.pxToRem(12),
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  reactionIconBox: {
    border: `1px solid ${theme.palette.primary.main}`,
    background: theme.palette.themeCardColor.main,
    borderRadius: 10,
    minWidth: 60,
    marginTop: 10,
    minHeight: 55,
    cursor: "pointer",
  },
  tag: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 5,
    padding: 5,
    background: theme.palette.themeCardColor.main,
  },
  voteButton: {
    borderRadius: 50,
    background: "linear-gradient(90deg, #0F6CDD 0%, #8212F4 100%)",
    color: "white",
    minWidth: 120,
    minHeight: 40,
    fontSize: 20,
  },
  socialMediaIcon: {
    background: theme.palette.cardColor.main,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: 7,
    borderRadius: 5,
    width: 42,
    height: 42,
    fontSize: 15,
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: 42,
      height: 42,
    },
  },
}));

const HomePage = ({ startCelebration }) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const { name } = useParams();

  const [loading, setLoading] = React.useState(false);
  const [voteLoading, setVoteLoading] = React.useState(false);
  const [drop, setDrop] = React.useState("");
  const [sliders, setSliders] = React.useState([]);
  const [reactionLoading, setReactionLoading] = React.useState(false);

  const [votedAddedRedirection, setVotedAddedRedirection] =
    React.useState(false);
  const [votedAddedRedirectionMessage, setVotedAddedRedirectionMessage] =
    React.useState(false);

  React.useEffect(async () => {
    document.title = `${name.replaceAll("-", " ")} | NFTWatcher`;
    const votedAddedRedirection = localStorage.getItem("votedAddedRedirection");
    const votedAddedRedirectionMessage = localStorage.getItem(
      "votedAddedRedirectionMessage"
    );
    setVotedAddedRedirection(votedAddedRedirection);
    setVotedAddedRedirectionMessage(votedAddedRedirectionMessage);

    localStorage.removeItem("votedAddedRedirection");
    localStorage.removeItem("votedAddedRedirectionMessage");

    setLoading(true);
    await getDataFromBackend("/sliders", setSliders);
    axios
      .get("/drops/show/" + encodeURI(name.replaceAll("-", " ")))
      .then((res) => {
        setDrop(res.data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const getDataFromBackend = (url, setData) => {
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch(console.error);
  };

  const addVote = () => {
    if (drop._id) {
      setVoteLoading(true);
      CommonFunctions.addVote(
        drop._id,
        startCelebration,
        (res) => {
          if (res != null) {
            if (res.data.votes >= 0) {
              setDrop({
                ...drop,
                votes: res.data.votes,
              });
            }
          }
          setVoteLoading(false);
        },
        (error) => {
          setVoteLoading(false);
          console.log(error);
          console.log("Failed to add vote!");
        }
      );
    }
  };

  const addReactionVote = (name) => {
    setReactionLoading(true);
    if (drop._id) {
      axios
        .post("/drops/reaction/vote", {
          drop_id: drop._id,
          reaction_name: name,
        })
        .then((res) => {
          setDrop({
            ...drop,
            [name]: res.data[name],
          });
          toast.success("Reaction Added!");
          setReactionLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setReactionLoading(false);
        });
    }
  };

  return (
    <div className={classes.root}>
      <div className={`${classes.innerRoot} mx-md-5 mt-5 mx-3`}>
        {votedAddedRedirection ? (
          <>
            <VoteAddedMessage message={votedAddedRedirectionMessage} />
            <br />
          </>
        ) : null}

        {sliders.length > 0 ? (
          <Sliders sliders={sliders} theme={theme} />
        ) : (
          loading && <SkeletonSlider />
        )}
        <br />

        <div className="row">
          <div className="col-lg-5 col-12">
            {drop.image ? (
              <img
                src={drop.base_url_for_get_image + drop.image}
                style={{ width: "100%" }}
              />
            ) : (
              loading && (
                <Skeleton variant="rectangular" animation="wave" height={550} />
              )
            )}
            <div className="row">
              <Button
                className={`${classes.reactionIconBox} col d-flex align-items-center justify-content-center flex-column m-2`}
                onClick={() =>
                  !reactionLoading ? addReactionVote("reaction_one") : {}
                }
              >
                <p className="m-0" style={{ fontSize: 13 }}>
                  🚀
                </p>
                <p
                  className="m-0"
                  style={{
                    color: theme.palette.mode === "light" ? "black" : "white",
                  }}
                >
                  {drop.reaction_one}
                </p>
              </Button>
              <Button
                className={`${classes.reactionIconBox} col d-flex align-items-center justify-content-center flex-column m-2`}
                onClick={() =>
                  !reactionLoading ? addReactionVote("reaction_two") : {}
                }
              >
                <p className="m-0" style={{ fontSize: 13 }}>
                  🔥
                </p>
                <p
                  className="m-0"
                  style={{
                    color: theme.palette.mode === "light" ? "black" : "white",
                  }}
                >
                  {drop.reaction_two}
                </p>
              </Button>
              <Button
                className={`${classes.reactionIconBox} col d-flex align-items-center justify-content-center flex-column m-2`}
                onClick={() =>
                  !reactionLoading ? addReactionVote("reaction_three") : {}
                }
              >
                <p className="m-0" style={{ fontSize: 13 }}>
                  💎
                </p>
                <p
                  className="m-0"
                  style={{
                    color: theme.palette.mode === "light" ? "black" : "white",
                  }}
                >
                  {drop.reaction_three}
                </p>
              </Button>
              <Button
                className={`${classes.reactionIconBox} col d-flex align-items-center justify-content-center flex-column m-2`}
                onClick={() =>
                  !reactionLoading ? addReactionVote("reaction_four") : {}
                }
              >
                <p className="m-0" style={{ fontSize: 13 }}>
                  ❤️
                </p>
                <p
                  className="m-0"
                  style={{
                    color: theme.palette.mode === "light" ? "black" : "white",
                  }}
                >
                  {drop.reaction_four}
                </p>
              </Button>
              <Button
                className={`${classes.reactionIconBox} col d-flex align-items-center justify-content-center flex-column m-2`}
                onClick={() =>
                  !reactionLoading ? addReactionVote("reaction_five") : {}
                }
              >
                <p className="m-0" style={{ fontSize: 13 }}>
                  😀
                </p>
                <p
                  className="m-0"
                  style={{
                    color: theme.palette.mode === "light" ? "black" : "white",
                  }}
                >
                  {drop.reaction_five}
                </p>
              </Button>
              <Button
                className={`${classes.reactionIconBox} col d-flex align-items-center justify-content-center flex-column m-2`}
                onClick={() =>
                  !reactionLoading ? addReactionVote("reaction_six") : {}
                }
              >
                <p className="m-0" style={{ fontSize: 13 }}>
                  👍
                </p>
                <p
                  className="m-0"
                  style={{
                    color: theme.palette.mode === "light" ? "black" : "white",
                  }}
                >
                  {drop.reaction_six}
                </p>
              </Button>
            </div>
          </div>
          <div className="col-lg-7 mt-lg-0 mt-5 col-12">
            <div className="d-md-flex d-block align-items-center justify-content-between">
              {drop.title ? (
                <div className="d-flex align-items-center flex-row">
                  <h2 className="font-jura">{drop.title}</h2>
                  {drop.blockchain_value ? (
                    <div
                      className={`${classes.tag} d-flex align-items-cetner mx-2 justify-content-between flex-row px-2 pt-2`}
                    >
                      {
                        blockchains.filter(
                          (item) => item.name === drop.blockchain_value
                        )[0].icon
                      }
                      <p style={{ whiteSpace: "nowrap" }} className="m-0 ms-2">
                        {drop.blockchain_value}
                      </p>
                    </div>
                  ) : (
                    loading && <Skeleton width={150} height={80} />
                  )}
                </div>
              ) : (
                loading && (
                  <Skeleton
                    width={100}
                    height={50}
                    variant="text"
                    animation="wave"
                  />
                )
              )}
              <div className="d-flex align-items-center justify-content-between my-md-0 mb-3">
                <div className="d-md-none d-flex align-items-center justify-content-center flex-column mt-3 w-100">
                  {drop.votes || drop.votes != null ? (
                    <VoteButton
                      voteLoading={voteLoading}
                      onClick={addVote}
                      votes={drop.votes}
                      classes={classes}
                      theme={theme}
                    />
                  ) : (
                    loading && (
                      <Skeleton
                        className={`d-flex align-items-center justify-content-cneter px-4 mb-2`}
                        width={100}
                        height={60}
                      />
                    )
                  )}
                </div>
              </div>
              {/* <div className="d-flex align-items-cetner justify-content-between flex-row mb-md-0 mb-3">
              </div> */}
              <div className="d-md-flex d-none align-items-center justify-content-center flex-column mt-3">
                {drop.votes || drop.votes != null ? (
                  <VoteButton
                    voteLoading={voteLoading}
                    onClick={addVote}
                    votes={drop.votes}
                    classes={classes}
                    theme={theme}
                  />
                ) : (
                  loading && (
                    <Skeleton
                      className={`d-flex align-items-center justify-content-cneter px-4 mb-2`}
                      width={100}
                      height={60}
                    />
                  )
                )}
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-start">
              {/* {drop.blockchain_contact_address} */}
              {drop.blockchain_contact_address ? (
                drop.blockchain_contact_address != "null" ? (
                  <div className="d-flex align-items-cneter flex-row">
                    <p className="m-0">
                      Contract Address:{" "}
                      <small>{drop.blockchain_contact_address}</small>
                    </p>
                    <div
                      className="ms-3 cursor-pointer mb-1 justify-content-center"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          drop.blockchain_contact_address
                        );
                        toast("Copied to clipboard");
                      }}
                    >
                      <svg
                        width="18"
                        height="22"
                        viewBox="0 0 18 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 3V15C5 15.5304 5.21071 16.0391 5.58579 16.4142C5.96086 16.7893 6.46957 17 7 17H15C15.5304 17 16.0391 16.7893 16.4142 16.4142C16.7893 16.0391 17 15.5304 17 15V6.242C17 5.97556 16.9467 5.71181 16.8433 5.46624C16.7399 5.22068 16.5885 4.99824 16.398 4.812L13.083 1.57C12.7094 1.20466 12.2076 1.00007 11.685 1H7C6.46957 1 5.96086 1.21071 5.58579 1.58579C5.21071 1.96086 5 2.46957 5 3V3Z"
                          stroke="#8212F4"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13 17V19C13 19.5304 12.7893 20.0391 12.4142 20.4142C12.0391 20.7893 11.5304 21 11 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H5"
                          stroke="#8212F4"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                ) : null
              ) : (
                loading && <Skeleton variant="text" height={30} width={400} />
              )}
            </div>

            <div className="d-flex flex-lg-row flex-column align-items-center justify-content-start my-4">
              <div className="row mt-lg-0 mt-3">
                {drop.twitter_url ? (
                  drop.twitter_url &&
                  drop.twitter_url != "undefined" &&
                  drop.twitter_url != "null" ? (
                    <a
                      className={`${classes.socialMediaIcon} mt-2 mx-1 d-flex align-items-center col-sm-12 col-2 justify-content-center`}
                      href={drop.twitter_url}
                      target="_blank"
                    >
                      <svg
                        style={{ transform: "scale(0.8)" }}
                        width="27"
                        height="22"
                        viewBox="0 0 27 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M26.8915 3.29196C25.9268 3.70553 24.8902 3.98503 23.8022 4.11078C24.9129 3.46721 25.7656 2.44809 26.1672 1.23382C25.1114 1.83955 23.9563 2.26633 22.7517 2.49571C21.7705 1.48511 20.3728 0.853516 18.8257 0.853516C15.8552 0.853516 13.4468 3.18186 13.4468 6.05357C13.4468 6.4612 13.4945 6.85804 13.5861 7.23873C9.11597 7.0218 5.15274 4.95158 2.49984 1.80541C2.03695 2.57344 1.77171 3.46681 1.77171 4.41969C1.77171 6.22387 2.72135 7.81547 4.16449 8.74806C3.31035 8.72219 2.475 8.49915 1.72818 8.09755C1.72788 8.11934 1.72788 8.14112 1.72788 8.163C1.72788 10.6825 3.58189 12.7843 6.04237 13.2621C5.25032 13.4703 4.41952 13.5008 3.61343 13.3512C4.29783 15.4171 6.28426 16.9205 8.63782 16.9626C6.79702 18.3573 4.47776 19.1887 1.95789 19.1887C1.52367 19.1887 1.0956 19.164 0.674805 19.116C3.0551 20.5915 5.8823 21.4524 8.91975 21.4524C18.8132 21.4524 24.2231 13.5284 24.2231 6.65665C24.2231 6.4311 24.218 6.20684 24.2076 5.98387C25.2606 5.2479 26.1694 4.33634 26.8915 3.29196"
                          fill="white"
                        />
                      </svg>
                    </a>
                  ) : null
                ) : (
                  loading && (
                    <Skeleton variant="rectangular" width={50} height={50} />
                  )
                )}
                {drop.website_url ? (
                  drop.website_url &&
                  drop.website_url != "undefined" &&
                  drop.website_url != "null" ? (
                    <a
                      className={`${classes.socialMediaIcon} mt-2 mx-1 d-flex align-items-center col-sm-12 col-2 justify-content-center`}
                      href={drop.website_url}
                      target="_blank"
                    >
                      <svg
                        style={{ transform: "scale(0.8)" }}
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.61352 26.0314C9.57638 26.0314 9.52685 26.0561 9.48971 26.0561C7.08781 24.8676 5.13162 22.899 3.93066 20.4971C3.93066 20.46 3.95543 20.4104 3.95543 20.3733C5.4659 20.819 7.0259 21.1533 8.57352 21.4133C8.8459 22.9733 9.16781 24.5209 9.61352 26.0314Z"
                          fill="white"
                        />
                        <path
                          d="M26.0677 20.5095C24.842 22.9733 22.7991 24.9666 20.3105 26.1676C20.781 24.5952 21.1772 23.0104 21.4372 21.4133C22.9972 21.1533 24.5324 20.819 26.0429 20.3733C26.0305 20.4228 26.0677 20.4723 26.0677 20.5095Z"
                          fill="white"
                        />
                        <path
                          d="M26.1667 9.68847C24.6067 9.21799 23.0344 8.83418 21.4372 8.5618C21.1772 6.96466 20.7934 5.37989 20.3105 3.83228C22.8734 5.05799 24.941 7.12561 26.1667 9.68847Z"
                          fill="white"
                        />
                        <path
                          d="M9.61345 3.96854C9.16773 5.47902 8.84583 7.01425 8.58583 8.57425C6.98869 8.82187 5.40392 9.21806 3.83154 9.68854C5.0325 7.19997 7.02583 5.15711 9.48964 3.9314C9.52678 3.9314 9.5763 3.96854 9.61345 3.96854Z"
                          fill="white"
                        />
                        <path
                          d="M19.3201 8.30175C16.4477 7.97985 13.5506 7.97985 10.6782 8.30175C10.9877 6.60556 11.3839 4.90937 11.9411 3.27509C11.9658 3.17604 11.9535 3.10175 11.9658 3.00271C12.9439 2.76747 13.9468 2.6189 14.9992 2.6189C16.0392 2.6189 17.0544 2.76747 18.0201 3.00271C18.0325 3.10175 18.0325 3.17604 18.0573 3.27509C18.6144 4.92175 19.0106 6.60556 19.3201 8.30175Z"
                          fill="white"
                        />
                        <path
                          d="M8.30102 19.3209C6.59245 19.0113 4.90864 18.6151 3.27435 18.058C3.17531 18.0332 3.10102 18.0456 3.00197 18.0332C2.76674 17.0551 2.61816 16.0523 2.61816 14.9999C2.61816 13.9599 2.76674 12.9447 3.00197 11.979C3.10102 11.9666 3.17531 11.9666 3.27435 11.9418C4.92102 11.397 6.59245 10.9885 8.30102 10.679C7.9915 13.5513 7.9915 16.4485 8.30102 19.3209Z"
                          fill="white"
                        />
                        <path
                          d="M27.3801 14.9999C27.3801 16.0523 27.2316 17.0551 26.9963 18.0332C26.8973 18.0456 26.823 18.0332 26.7239 18.058C25.0773 18.6028 23.3935 19.0113 21.6973 19.3209C22.0192 16.4485 22.0192 13.5513 21.6973 10.679C23.3935 10.9885 25.0896 11.3847 26.7239 11.9418C26.823 11.9666 26.8973 11.979 26.9963 11.979C27.2316 12.9571 27.3801 13.9599 27.3801 14.9999Z"
                          fill="white"
                        />
                        <path
                          d="M19.3201 21.698C19.0106 23.4066 18.6144 25.0904 18.0573 26.7247C18.0325 26.8237 18.0325 26.898 18.0201 26.997C17.0544 27.2323 16.0392 27.3809 14.9992 27.3809C13.9468 27.3809 12.9439 27.2323 11.9658 26.997C11.9535 26.898 11.9658 26.8237 11.9411 26.7247C11.3963 25.078 10.9877 23.4066 10.6782 21.698C12.1144 21.859 13.5506 21.9704 14.9992 21.9704C16.4477 21.9704 17.8963 21.859 19.3201 21.698Z"
                          fill="white"
                        />
                        <path
                          d="M19.6586 19.6594C16.562 20.05 13.4365 20.05 10.3399 19.6594C9.9492 16.5628 9.9492 13.4372 10.3399 10.3406C13.4365 9.94993 16.562 9.94993 19.6586 10.3406C20.0493 13.4372 20.0493 16.5628 19.6586 19.6594Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  ) : null
                ) : (
                  loading && (
                    <Skeleton variant="rectangular" width={50} height={50} />
                  )
                )}

                {drop.discord_url ? (
                  drop.discord_url &&
                  drop.discord_url != "undefined" &&
                  drop.discord_url != "null" ? (
                    <a
                      className={`${classes.socialMediaIcon} mt-2 mx-1 d-flex align-items-center col-sm-12 col-2 justify-content-center`}
                      href={drop.discord_url}
                      target="_blank"
                    >
                      <svg
                        style={{ transform: "scale(0.8)" }}
                        width="31"
                        height="23"
                        viewBox="0 0 31 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M25.6909 1.88746C23.7761 1.02393 21.7237 0.385669 19.5773 0.0227351C19.5582 0.0190656 19.5384 0.0214304 19.5207 0.0295023C19.503 0.0375743 19.4883 0.0509542 19.4785 0.0677889C19.2157 0.529591 18.9228 1.13156 18.7176 1.60713C16.4412 1.26702 14.127 1.26702 11.8506 1.60713C11.622 1.08007 11.3642 0.566165 11.0784 0.0677889C11.0688 0.0507469 11.0541 0.0370644 11.0364 0.0285672C11.0188 0.02007 10.9989 0.0171622 10.9796 0.020232C8.83451 0.383166 6.78206 1.02143 4.86602 1.88621C4.84954 1.89313 4.83556 1.90492 4.82597 1.92C0.93132 7.64559 -0.136205 13.2298 0.388171 18.7439C0.389631 18.7574 0.393823 18.7704 0.400492 18.7823C0.407162 18.7941 0.41617 18.8044 0.426968 18.8127C2.70017 20.4677 5.23563 21.7284 7.92718 22.5421C7.94594 22.5479 7.96601 22.5479 7.98476 22.5421C8.00352 22.5363 8.02009 22.525 8.0323 22.5096C8.61049 21.7337 9.12611 20.9139 9.56664 20.0529C9.59292 20.0029 9.56789 19.9428 9.51533 19.9228C8.70687 19.6183 7.92353 19.2509 7.17253 18.8239C7.15903 18.8162 7.14766 18.8053 7.13943 18.7921C7.13121 18.7789 7.12638 18.7639 7.12539 18.7484C7.12439 18.7329 7.12727 18.7174 7.13375 18.7033C7.14023 18.6892 7.15011 18.6769 7.16252 18.6675C7.3202 18.5511 7.47789 18.4297 7.62807 18.3083C7.64159 18.2974 7.65787 18.2905 7.67511 18.2883C7.69234 18.286 7.70985 18.2887 7.72569 18.2958C12.6403 20.5035 17.9629 20.5035 22.82 18.2958C22.8359 18.2882 22.8535 18.2853 22.871 18.2873C22.8885 18.2893 22.9051 18.2961 22.9188 18.3071C23.069 18.4297 23.2255 18.5511 23.3844 18.6675C23.3969 18.6767 23.407 18.6888 23.4137 18.7028C23.4203 18.7168 23.4235 18.7323 23.4227 18.7477C23.422 18.7632 23.4174 18.7783 23.4094 18.7916C23.4014 18.8049 23.3902 18.816 23.3769 18.8239C22.6285 19.2545 21.8501 19.6186 21.0328 19.9215C21.0203 19.9261 21.0089 19.9332 20.9993 19.9426C20.9897 19.9519 20.9823 19.9632 20.9774 19.9756C20.9726 19.988 20.9704 20.0014 20.9711 20.0147C20.9718 20.028 20.9754 20.0411 20.9815 20.0529C21.4321 20.9127 21.9477 21.7312 22.5146 22.5084C22.5264 22.5243 22.5428 22.5362 22.5616 22.5425C22.5804 22.5488 22.6007 22.5491 22.6197 22.5434C25.3159 21.732 27.8555 20.4706 30.1312 18.8127C30.1423 18.8049 30.1516 18.7949 30.1585 18.7832C30.1654 18.7716 30.1698 18.7586 30.1713 18.7451C30.797 12.37 29.1225 6.83087 25.7297 1.9225C25.7214 1.90655 25.7076 1.89412 25.6909 1.88746ZM10.3013 15.3861C8.822 15.3861 7.60179 14.0482 7.60179 12.4075C7.60179 10.7656 8.79822 9.42897 10.3013 9.42897C11.8156 9.42897 13.0245 10.7768 13.0007 12.4075C13.0007 14.0495 11.8043 15.3861 10.3013 15.3861ZM20.2819 15.3861C18.8014 15.3861 17.5825 14.0482 17.5825 12.4075C17.5825 10.7656 18.7776 9.42897 20.2819 9.42897C21.7962 9.42897 23.0052 10.7768 22.9814 12.4075C22.9814 14.0495 21.7975 15.3861 20.2819 15.3861Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  ) : null
                ) : (
                  loading && (
                    <Skeleton variant="rectangular" width={50} height={50} />
                  )
                )}

                {drop.market_place_url ? (
                  drop.market_place_url &&
                  drop.market_place_url != "undefined" &&
                  drop.market_place_url != "null" ? (
                    <a
                      className={`${classes.socialMediaIcon} mt-2 mx-1 d-flex align-items-center col-sm-12 col-2 justify-content-center`}
                      href={drop.market_place_url}
                      target="_blank"
                    >
                      <svg
                        style={{ transform: "scale(0.8)" }}
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M3.11216 9.33374H4.66773V17.1116H23.3345V9.33374H24.8901V17.1116H26.8346C26.9377 17.1116 27.0366 17.1526 27.1096 17.2255C27.1825 17.2984 27.2235 17.3973 27.2235 17.5005V18.2783C27.2235 18.3814 27.1825 18.4803 27.1096 18.5532C27.0366 18.6262 26.9377 18.6671 26.8346 18.6671H1.1677C1.06456 18.6671 0.965644 18.6262 0.892712 18.5532C0.819781 18.4803 0.778809 18.3814 0.778809 18.2783V17.5005C0.778809 17.3973 0.819781 17.2984 0.892712 17.2255C0.965644 17.1526 1.06456 17.1116 1.1677 17.1116H3.11216V9.33374ZM3.11216 21.7783V26.445H24.8901V21.7783H3.11216ZM2.33438 20.2227C2.1281 20.2227 1.93026 20.3047 1.7844 20.4505C1.63854 20.5964 1.55659 20.7942 1.55659 21.0005V27.2228C1.55659 27.4291 1.63854 27.6269 1.7844 27.7727C1.93026 27.9186 2.1281 28.0006 2.33438 28.0006H25.6679C25.8742 28.0006 26.072 27.9186 26.2179 27.7727C26.3637 27.6269 26.4457 27.4291 26.4457 27.2228V21.0005C26.4457 20.7942 26.3637 20.5964 26.2179 20.4505C26.072 20.3047 25.8742 20.2227 25.6679 20.2227H2.33438Z"
                          fill="white"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M3.25814 1.55557L1.58979 6.1546C1.56734 6.21617 1.55576 6.28118 1.55557 6.34672V8.20562C1.55557 8.83485 2.05879 9.33341 2.66702 9.33341C3.27369 9.33341 3.7777 8.83563 3.7777 8.2064C3.7777 8.00012 3.85964 7.80228 4.0055 7.65642C4.15137 7.51056 4.3492 7.42861 4.55548 7.42861C4.76176 7.42861 4.95959 7.51056 5.10546 7.65642C5.25132 7.80228 5.33326 8.00012 5.33326 8.2064C5.33326 8.83485 5.83727 9.33341 6.44472 9.33341C7.05139 9.33341 7.55539 8.83563 7.55539 8.2064C7.55539 8.00012 7.63734 7.80228 7.7832 7.65642C7.92906 7.51056 8.1269 7.42861 8.33318 7.42861C8.53946 7.42861 8.73729 7.51056 8.88315 7.65642C9.02902 7.80228 9.11096 8.00012 9.11096 8.2064C9.11096 8.83485 9.61496 9.33341 10.2224 9.33341C10.8291 9.33341 11.3331 8.83563 11.3331 8.20718C11.3331 8.00089 11.415 7.80306 11.5609 7.6572C11.7068 7.51134 11.9046 7.42939 12.1109 7.42939C12.3172 7.42939 12.515 7.51134 12.6608 7.6572C12.8067 7.80306 12.8887 8.00089 12.8887 8.20718C12.8894 8.83563 13.3934 9.33341 14.0001 9.33341C14.6068 9.33341 15.1116 8.83563 15.1116 8.2064C15.1116 8.00012 15.1935 7.80228 15.3394 7.65642C15.4852 7.51056 15.6831 7.42861 15.8893 7.42861C16.0956 7.42861 16.2935 7.51056 16.4393 7.65642C16.5852 7.80228 16.6671 8.00012 16.6671 8.2064C16.6671 8.83485 17.1704 9.33341 17.7778 9.33341C18.3845 9.33341 18.8885 8.83563 18.8893 8.20718C18.8893 8.00089 18.9712 7.80306 19.1171 7.6572C19.2629 7.51134 19.4608 7.42939 19.667 7.42939C19.8733 7.42939 20.0712 7.51134 20.217 7.6572C20.3629 7.80306 20.4448 8.00089 20.4448 8.20718C20.4448 8.83563 20.9488 9.33341 21.5555 9.33341C22.163 9.33341 22.667 8.83563 22.667 8.2064C22.667 8.00012 22.7489 7.80228 22.8948 7.65642C23.0406 7.51056 23.2385 7.42861 23.4447 7.42861C23.651 7.42861 23.8489 7.51056 23.9947 7.65642C24.1406 7.80228 24.2225 8.00012 24.2225 8.2064C24.2225 8.83485 24.7257 9.33341 25.3332 9.33341C25.9414 9.33341 26.4447 8.83563 26.4447 8.2064V6.3475C26.4445 6.2817 26.4329 6.21643 26.4104 6.1546L24.7421 1.55557H3.25891H3.25814ZM24.7149 1.4809L24.8253 1.44046L24.7149 1.4809ZM23.4447 10.1003C23.1979 10.3506 22.9038 10.5492 22.5794 10.6846C22.2551 10.82 21.907 10.8895 21.5555 10.889C21.2041 10.8894 20.8562 10.8199 20.532 10.6845C20.2078 10.5491 19.9137 10.3505 19.667 10.1003C19.4203 10.3506 19.1261 10.5492 18.8017 10.6846C18.4774 10.82 18.1293 10.8895 17.7778 10.889C17.4264 10.8894 17.0785 10.8199 16.7543 10.6845C16.4301 10.5491 16.136 10.3505 15.8893 10.1003C15.6426 10.3506 15.3484 10.5492 15.024 10.6846C14.6997 10.82 14.3516 10.8895 14.0001 10.889C13.6486 10.8895 13.3005 10.82 12.9762 10.6846C12.6518 10.5492 12.3577 10.3506 12.1109 10.1003C11.8642 10.3505 11.5702 10.5491 11.2459 10.6845C10.9217 10.8199 10.5738 10.8894 10.2224 10.889C9.48274 10.889 8.81463 10.5864 8.33318 10.1003C8.08648 10.3505 7.79245 10.5491 7.46823 10.6845C7.14401 10.8199 6.79608 10.8894 6.44472 10.889C6.09323 10.8895 5.74517 10.82 5.42081 10.6846C5.09645 10.5492 4.80229 10.3506 4.55548 10.1003C4.30888 10.3504 4.01498 10.5489 3.69089 10.6843C3.36681 10.8197 3.01903 10.8893 2.6678 10.889C1.18768 10.889 0 9.68186 0 8.2064V6.3475C0 6.10094 0.0427782 5.85594 0.126779 5.62416L1.82235 0.949674C1.92294 0.671453 2.10684 0.430999 2.34901 0.261062C2.59118 0.0911251 2.87985 -3.40431e-05 3.17569 9.53684e-09H24.8261C25.1218 0.000343426 25.4102 0.0917647 25.652 0.261827C25.8939 0.431889 26.0775 0.672335 26.1779 0.950452L27.8734 5.62416C27.9582 5.85594 28.001 6.10094 28.001 6.3475V8.2064C28.0002 9.68186 26.8125 10.889 25.3332 10.889C24.9818 10.8894 24.6339 10.8199 24.3097 10.6845C23.9855 10.5491 23.6914 10.3505 23.4447 10.1003Z"
                          fill="white"
                        />
                        <path
                          d="M6.22266 15.1667C6.22266 15.0636 6.26363 14.9647 6.33655 14.8917C6.40948 14.8188 6.50839 14.7778 6.61152 14.7778H8.94471C9.04784 14.7778 9.14675 14.8188 9.21967 14.8917C9.2926 14.9647 9.33357 15.0636 9.33357 15.1667V16.7222C9.33357 16.8253 9.2926 16.9242 9.21967 16.9971C9.14675 17.07 9.04784 17.111 8.94471 17.111H6.61152C6.50839 17.111 6.40948 17.07 6.33655 16.9971C6.26363 16.9242 6.22266 16.8253 6.22266 16.7222V15.1667Z"
                          fill="white"
                        />
                        <path
                          d="M7.77832 15.9443C7.77832 15.8412 7.81929 15.7422 7.89222 15.6693C7.96514 15.5964 8.06405 15.5554 8.16718 15.5554H10.5004C10.6035 15.5554 10.7024 15.5964 10.7753 15.6693C10.8483 15.7422 10.8892 15.8412 10.8892 15.9443V16.722C10.8892 16.8251 10.8483 16.9241 10.7753 16.997C10.7024 17.0699 10.6035 17.1109 10.5004 17.1109H8.16718C8.06405 17.1109 7.96514 17.0699 7.89222 16.997C7.81929 16.9241 7.77832 16.8251 7.77832 16.722V15.9443Z"
                          fill="white"
                        />
                        <path
                          d="M14.0002 15.9444C14.0002 16.2538 13.8773 16.5506 13.6585 16.7693C13.4397 16.9881 13.143 17.111 12.8336 17.111C12.5242 17.111 12.2275 16.9881 12.0087 16.7693C11.7899 16.5506 11.667 16.2538 11.667 15.9444C11.667 15.635 11.7899 15.3383 12.0087 15.1195C12.2275 14.9007 12.5242 14.7778 12.8336 14.7778C13.143 14.7778 13.4397 14.9007 13.6585 15.1195C13.8773 15.3383 14.0002 15.635 14.0002 15.9444Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  ) : null
                ) : (
                  loading && (
                    <Skeleton variant="rectangular" width={50} height={50} />
                  )
                )}

                {drop.opensea_url ? (
                  drop.opensea_url &&
                  drop.opensea_url != "undefined" &&
                  drop.opensea_url != "null" ? (
                    <a
                      className={`${classes.socialMediaIcon} mt-2 mx-1 d-flex align-items-center col-sm-12 col-2 justify-content-center`}
                      href={drop.opensea_url}
                      target="_blank"
                    >
                      <svg
                        style={{ transform: "scale(0.8)" }}
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M34.9603 17.5075C34.9603 27.1458 27.146 34.9601 17.5078 34.9601C7.8695 34.9601 0.0551758 27.1458 0.0551758 17.5075C0.0551758 7.86926 7.8695 0.0549316 17.5078 0.0549316C27.148 0.0549316 34.9603 7.86926 34.9603 17.5075Z"
                          fill="#2081E2"
                        />
                        <path
                          d="M8.66556 18.0942L8.74085 17.9758L13.281 10.8734C13.3473 10.7694 13.5033 10.7802 13.5535 10.8931C14.312 12.593 14.9665 14.707 14.6599 16.0232C14.529 16.5647 14.1704 17.2981 13.7669 17.9758C13.7149 18.0745 13.6575 18.1713 13.5965 18.2645C13.5679 18.3076 13.5194 18.3327 13.4674 18.3327H8.79824C8.67272 18.3327 8.59921 18.1964 8.66556 18.0942Z"
                          fill="white"
                        />
                        <path
                          d="M28.9023 19.4136V20.5379C28.9023 20.6024 28.8629 20.6598 28.8055 20.6849C28.4541 20.8355 27.2509 21.3878 26.7506 22.0835C25.474 23.8605 24.4985 26.4013 22.3181 26.4013H13.2217C9.9978 26.4013 7.38525 23.7798 7.38525 20.545V20.441C7.38525 20.355 7.45517 20.2851 7.54124 20.2851H12.6121C12.7125 20.2851 12.786 20.3783 12.7771 20.4769C12.7412 20.8068 12.8022 21.1439 12.9582 21.4505C13.2594 22.062 13.8834 22.4439 14.5576 22.4439H17.0679V20.4841H14.5863C14.459 20.4841 14.3837 20.337 14.4572 20.233C14.4841 20.1918 14.5146 20.1488 14.5469 20.1004C14.7818 19.7669 15.1171 19.2487 15.4506 18.6587C15.6783 18.2607 15.8988 17.8357 16.0764 17.4089C16.1122 17.3318 16.1409 17.2529 16.1696 17.1758C16.218 17.0395 16.2682 16.9122 16.3041 16.7849C16.34 16.6773 16.3686 16.5644 16.3973 16.4586C16.4816 16.0964 16.5175 15.7127 16.5175 15.3146C16.5175 15.1586 16.5103 14.9954 16.496 14.8394C16.4888 14.6691 16.4673 14.4987 16.4457 14.3284C16.4314 14.1778 16.4045 14.0289 16.3758 13.8729C16.34 13.6452 16.2897 13.4193 16.2324 13.1916L16.2126 13.1055C16.1696 12.9495 16.1337 12.8007 16.0836 12.6447C15.9419 12.1552 15.7787 11.6782 15.6066 11.2317C15.5438 11.0542 15.4721 10.8839 15.4004 10.7135C15.2946 10.4571 15.187 10.224 15.0884 10.0035C15.0382 9.90303 14.9951 9.81158 14.9521 9.71835C14.9037 9.61255 14.8535 9.50676 14.8033 9.40637C14.7674 9.32926 14.7262 9.25753 14.6975 9.1858L14.3909 8.61919C14.3478 8.54208 14.4196 8.45063 14.5038 8.47395L16.4224 8.99393H16.4278C16.4314 8.99393 16.4332 8.99574 16.435 8.99574L16.6878 9.06566L16.9657 9.14458L17.0679 9.17324V8.03285C17.0679 7.48236 17.509 7.03589 18.0542 7.03589C18.3267 7.03589 18.5741 7.14706 18.7517 7.32815C18.9292 7.50927 19.0403 7.75672 19.0403 8.03285V9.72554L19.2448 9.78289C19.2609 9.7883 19.277 9.79546 19.2914 9.80621C19.3416 9.84387 19.4133 9.89944 19.5047 9.96761C19.5765 10.025 19.6536 10.0949 19.7468 10.1666C19.9315 10.3154 20.1521 10.5073 20.3941 10.7279C20.4587 10.7834 20.5214 10.8408 20.5788 10.8982C20.8908 11.1887 21.2405 11.5294 21.574 11.9059C21.6672 12.0117 21.7587 12.1193 21.8519 12.2323C21.9451 12.347 22.0438 12.46 22.1298 12.573C22.2428 12.7236 22.3647 12.8796 22.4705 13.0428C22.5207 13.1199 22.5781 13.1987 22.6265 13.2759C22.7628 13.482 22.8829 13.6954 22.9977 13.9088C23.0461 14.0074 23.0963 14.115 23.1394 14.2208C23.2667 14.5059 23.3671 14.7964 23.4316 15.0869C23.4513 15.1496 23.4657 15.2178 23.4729 15.2787V15.2931C23.4944 15.3791 23.5016 15.4706 23.5087 15.5638C23.5374 15.8615 23.5231 16.1591 23.4585 16.4586C23.4316 16.5859 23.3958 16.706 23.3527 16.8334C23.3097 16.9553 23.2667 17.0826 23.2111 17.2027C23.1035 17.4519 22.9762 17.7012 22.8256 17.9343C22.7771 18.0204 22.7198 18.1118 22.6624 18.1979C22.5996 18.2893 22.5351 18.3754 22.4777 18.4597C22.3988 18.5673 22.3145 18.6802 22.2285 18.7806C22.1514 18.8864 22.0725 18.9922 21.9864 19.0855C21.8663 19.2271 21.7515 19.3616 21.6313 19.4907C21.5597 19.575 21.4825 19.6611 21.4036 19.7382C21.3266 19.8242 21.2476 19.9013 21.1759 19.973C21.0558 20.0932 20.9554 20.1864 20.8711 20.2635L20.6739 20.4446C20.6452 20.4697 20.6075 20.4841 20.5681 20.4841H19.0403V22.4439H20.9625C21.3929 22.4439 21.8017 22.2915 22.1316 22.0118C22.2446 21.9132 22.7377 21.4864 23.3204 20.8427C23.3402 20.8212 23.3653 20.805 23.394 20.7979L28.7033 19.263C28.8019 19.2343 28.9023 19.3096 28.9023 19.4136Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  ) : null
                ) : (
                  loading && (
                    <Skeleton variant="rectangular" width={50} height={50} />
                  )
                )}

                {drop.reddit_url ? (
                  drop.reddit_url &&
                  drop.reddit_url != "undefined" &&
                  drop.reddit_url != "null" ? (
                    <a
                      className={`${classes.socialMediaIcon} mt-2 mx-1 d-flex align-items-center col-sm-12 col-2 justify-content-center`}
                      href={drop.reddit_url}
                      target="_blank"
                    >
                      <svg
                        style={{ transform: "scale(0.8)" }}
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M32 16C32 24.836 24.836 32 16 32C7.164 32 0 24.836 0 16C0 7.164 7.164 0 16 0C24.836 0 32 7.164 32 16ZM26.2507 14.744C26.5093 15.1133 26.656 15.5493 26.672 16C26.679 16.4409 26.561 16.8747 26.3316 17.2513C26.1022 17.6279 25.7709 17.9319 25.376 18.128C25.3947 18.3627 25.3947 18.5973 25.376 18.832C25.376 22.416 21.2 25.328 16.048 25.328C10.896 25.328 6.72 22.416 6.72 18.832C6.70199 18.5977 6.70199 18.3623 6.72 18.128C6.4149 17.9852 6.14434 17.778 5.92692 17.5207C5.7095 17.2633 5.55038 16.962 5.4605 16.6373C5.37062 16.3126 5.3521 15.9724 5.40623 15.6399C5.46035 15.3074 5.58583 14.9905 5.77405 14.7111C5.96226 14.4317 6.20874 14.1964 6.49655 14.0213C6.78435 13.8462 7.10666 13.7355 7.44131 13.6968C7.77596 13.6582 8.11502 13.6924 8.43518 13.7972C8.75534 13.902 9.04901 14.0749 9.296 14.304C11.1396 13.0536 13.3086 12.3696 15.536 12.336L16.72 6.784C16.7333 6.71973 16.7592 6.65873 16.7963 6.60455C16.8333 6.55036 16.8807 6.50407 16.9358 6.46835C16.9909 6.43264 17.0525 6.4082 17.117 6.39647C17.1816 6.38474 17.2479 6.38594 17.312 6.4L21.232 7.184C21.4234 6.8551 21.7258 6.6052 22.0849 6.47916C22.444 6.35313 22.8362 6.3592 23.1912 6.4963C23.5462 6.6334 23.8407 6.89254 24.0219 7.22721C24.2031 7.56188 24.259 7.95016 24.1797 8.32236C24.1004 8.69455 23.891 9.02629 23.5891 9.25802C23.2872 9.48975 22.9127 9.6063 22.5326 9.58675C22.1526 9.5672 21.7919 9.41282 21.5154 9.15133C21.2389 8.88985 21.0647 8.53837 21.024 8.16L17.6 7.44L16.56 12.432C18.7603 12.4792 20.8999 13.1627 22.72 14.4C22.963 14.1664 23.2537 13.9882 23.5721 13.8776C23.8905 13.767 24.229 13.7266 24.5645 13.7593C24.9 13.792 25.2244 13.8969 25.5155 14.0669C25.8065 14.2369 26.0574 14.4679 26.2507 14.744ZM10.9413 16.7107C10.8245 16.8854 10.7433 17.0815 10.7023 17.2876C10.6613 17.4937 10.6612 17.7059 10.7022 17.9121C10.785 18.3284 11.0298 18.6948 11.3827 18.9307C11.7356 19.1665 12.1677 19.2525 12.5841 19.1698C12.7902 19.1288 12.9863 19.0476 13.161 18.9309C13.3358 18.8141 13.4859 18.6641 13.6027 18.4893C13.8385 18.1364 13.9245 17.7043 13.8418 17.2879C13.759 16.8716 13.5142 16.5052 13.1613 16.2693C12.8084 16.0335 12.3763 15.9475 11.9599 16.0302C11.5436 16.113 11.1772 16.3578 10.9413 16.7107ZM16.016 23.232C17.436 23.2907 18.8333 22.92 19.968 22.064C20.0529 21.9813 20.1014 21.8682 20.1029 21.7497C20.1044 21.6311 20.0587 21.5169 19.976 21.432C19.935 21.39 19.8862 21.3564 19.8322 21.3333C19.7783 21.3101 19.7203 21.2979 19.6617 21.2971C19.5431 21.2956 19.4289 21.3413 19.344 21.424C18.373 22.1206 17.1933 22.4649 16 22.4C14.8082 22.4533 13.634 22.0976 12.672 21.392C12.5891 21.324 12.4839 21.2892 12.3767 21.2945C12.2696 21.2997 12.1683 21.3446 12.0925 21.4205C12.0166 21.4963 11.9717 21.5976 11.9665 21.7047C11.9612 21.8119 11.996 21.9171 12.064 22C13.1992 22.8554 14.5958 23.2908 16.016 23.232ZM18.7907 18.9947C19.0547 19.1707 19.348 19.328 19.664 19.328C19.881 19.3305 20.0963 19.2889 20.2966 19.2055C20.497 19.1222 20.6783 18.9989 20.8295 18.8432C20.9807 18.6875 21.0986 18.5027 21.1761 18.2999C21.2535 18.0972 21.2889 17.8808 21.28 17.664C21.2799 17.3876 21.2082 17.116 21.0719 16.8756C20.9356 16.6351 20.7394 16.4341 20.5023 16.2921C20.2652 16.15 19.9954 16.0718 19.7191 16.0651C19.4428 16.0583 19.1695 16.1233 18.9257 16.2535C18.682 16.3838 18.4762 16.575 18.3283 16.8085C18.1804 17.042 18.0955 17.3098 18.0819 17.5859C18.0683 17.8619 18.1265 18.1368 18.2507 18.3836C18.3749 18.6305 18.5609 18.841 18.7907 18.9947Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  ) : null
                ) : (
                  loading && (
                    <Skeleton variant="rectangular" width={50} height={50} />
                  )
                )}

                {drop.telegram_url ? (
                  drop.telegram_url &&
                  drop.telegram_url != "undefined" &&
                  drop.telegram_url != "null" ? (
                    <a
                      className={`${classes.socialMediaIcon} mt-2 mx-1 d-flex align-items-center col-sm-12 col-2 justify-content-center`}
                      href={drop.telegram_url}
                      target="_blank"
                    >
                      <svg
                        style={{ transform: "scale(0.8)" }}
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.1094 4.33653L3.42436 12.313C2.01269 12.88 2.02086 13.6675 3.16536 14.0187L8.47603 15.6754L20.7634 7.92287C21.3444 7.56937 21.8752 7.75953 21.4389 8.14687L11.4837 17.1314H11.4814L11.4837 17.1325L11.1174 22.6065C11.654 22.6065 11.8909 22.3604 12.1919 22.0699L14.7714 19.5615L20.1369 23.5247C21.1262 24.0695 21.8367 23.7895 22.0829 22.6089L25.605 6.00953C25.9655 4.56403 25.0532 3.90953 24.1094 4.33653Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  ) : null
                ) : (
                  loading && (
                    <Skeleton variant="rectangular" width={50} height={50} />
                  )
                )}

                {drop.instagram_url ? (
                  drop.instagram_url &&
                  drop.instagram_url != "undefined" &&
                  drop.instagram_url != "null" ? (
                    <a
                      className={`${classes.socialMediaIcon} mt-2 mx-1 d-flex align-items-center col-sm-12 col-2 justify-content-center`}
                      href={drop.instagram_url}
                      target="_blank"
                    >
                      <svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.9634 9.04736C12.2368 9.04736 9.23096 12.0532 9.23096 15.7798C9.23096 19.5063 12.2368 22.5122 15.9634 22.5122C19.6899 22.5122 22.6958 19.5063 22.6958 15.7798C22.6958 12.0532 19.6899 9.04736 15.9634 9.04736ZM15.9634 20.1567C13.5552 20.1567 11.5864 18.1938 11.5864 15.7798C11.5864 13.3657 13.5493 11.4028 15.9634 11.4028C18.3774 11.4028 20.3403 13.3657 20.3403 15.7798C20.3403 18.1938 18.3716 20.1567 15.9634 20.1567V20.1567ZM24.5415 8.77197C24.5415 9.64502 23.8384 10.3423 22.9712 10.3423C22.0981 10.3423 21.4009 9.63916 21.4009 8.77197C21.4009 7.90479 22.104 7.20166 22.9712 7.20166C23.8384 7.20166 24.5415 7.90479 24.5415 8.77197ZM29.0005 10.3657C28.9009 8.26221 28.4204 6.39893 26.8794 4.86377C25.3442 3.32861 23.481 2.84814 21.3774 2.74268C19.2095 2.61963 12.7114 2.61963 10.5435 2.74268C8.4458 2.84229 6.58252 3.32275 5.0415 4.85791C3.50049 6.39307 3.02588 8.25635 2.92041 10.3599C2.79736 12.5278 2.79736 19.0259 2.92041 21.1938C3.02002 23.2974 3.50049 25.1606 5.0415 26.6958C6.58252 28.231 8.43994 28.7114 10.5435 28.8169C12.7114 28.9399 19.2095 28.9399 21.3774 28.8169C23.481 28.7173 25.3442 28.2368 26.8794 26.6958C28.4146 25.1606 28.895 23.2974 29.0005 21.1938C29.1235 19.0259 29.1235 12.5337 29.0005 10.3657V10.3657ZM26.1997 23.52C25.7427 24.6685 24.8579 25.5532 23.7036 26.0161C21.9751 26.7017 17.8735 26.5435 15.9634 26.5435C14.0532 26.5435 9.9458 26.6958 8.22314 26.0161C7.07471 25.5591 6.18994 24.6743 5.72705 23.52C5.0415 21.7915 5.19971 17.6899 5.19971 15.7798C5.19971 13.8696 5.04736 9.76221 5.72705 8.03955C6.18408 6.89111 7.06885 6.00635 8.22314 5.54346C9.95166 4.85791 14.0532 5.01611 15.9634 5.01611C17.8735 5.01611 21.981 4.86377 23.7036 5.54346C24.8521 6.00049 25.7368 6.88525 26.1997 8.03955C26.8853 9.76807 26.7271 13.8696 26.7271 15.7798C26.7271 17.6899 26.8853 21.7974 26.1997 23.52Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  ) : null
                ) : (
                  loading && (
                    <Skeleton variant="rectangular" width={50} height={50} />
                  )
                )}
              </div>
            </div>
            <div className="d-flex align-items-center my-4">
              <div className="col-3">
                <p className="m-0">Unit Price </p>
                {drop.total_supply ? (
                  <p className="m-0">
                    {drop.unit_price}{" "}
                    {
                      blockchains?.filter(
                        (item) => item.name === drop.blockchain_value
                      )[0].icon
                    }
                  </p>
                ) : (
                  loading && <Skeleton variant="text" height={30} width={150} />
                )}
              </div>
              <div className="me-5 d-lg-block d-none">
                <svg
                  width="2"
                  height="57"
                  viewBox="0 0 2 57"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    opacity="0.5"
                    x1="1"
                    y1="4.37114e-08"
                    x2="0.999997"
                    y2="57"
                    stroke={"grey"}
                    stroke-width="2"
                  />
                </svg>
              </div>
              {drop.is_presale == true ? (
                <div className="w-50 ms-lg-0 ms-5">
                  <p className="m-0">Presale Date </p>
                  {drop.presale_date ? (
                    <p className="m-0">
                      {CommonFunctions.getUTCDate(drop.presale_date)}
                      (UTC)
                    </p>
                  ) : (
                    loading && (
                      <Skeleton variant="text" height={30} width={150} />
                    )
                  )}
                </div>
              ) : null}
            </div>

            <div className="d-flex align-items-center my-4">
              <div className="w-25">
                <p className="m-0">Maximum Supply</p>
                {drop.total_supply ? (
                  <p className="m-0">{drop.total_supply}</p>
                ) : (
                  loading && <Skeleton variant="text" height={30} width={150} />
                )}
              </div>
              <div className="me-5 d-lg-block d-none">
                <svg
                  width="2"
                  height="57"
                  viewBox="0 0 2 57"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    opacity="0.5"
                    x1="1"
                    y1="4.37114e-08"
                    x2="0.999997"
                    y2="57"
                    stroke={"grey"}
                    stroke-width="2"
                  />
                </svg>
              </div>
              <div className="w-50 ms-lg-0 ms-5">
                <p className="m-0">Launch Date</p>
                {drop.launched_date ? (
                  <p className="m-0">
                    {CommonFunctions.getUTCDate(drop.launched_date)}
                    (UTC)
                  </p>
                ) : (
                  loading && <Skeleton variant="text" height={30} width={150} />
                )}
              </div>
            </div>

            <div className="mt-3">
              <h2 className="font-jura d-flex">
                What is{" "}
                {drop.title
                  ? drop.title
                  : loading && (
                      <Skeleton variant="text" width={100} className="mx-3" />
                    )}{" "}
                ?{" "}
              </h2>
              {drop.description ? (
                <div
                  className="shadow p-2"
                  style={{ background: theme.palette.themeCardColor.main }}
                >
                  <p className="m-0" style={{ whiteSpace: "pre-line" }}>
                    {drop.description}
                  </p>
                </div>
              ) : (
                loading && (
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    mt={0}
                    className="shadow m-0 p-0"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VoteButton = ({ votes, classes, theme, onClick, voteLoading }) => {
  return (
    <>
      <Button
        className={`${classes.voteButton} d-flex align-items-center justify-content-cneter px-3`}
        onClick={!voteLoading ? onClick : () => {}}
      >
        <svg
          width="17"
          height="23"
          viewBox="0 0 17 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5625 1.07186C9.5625 0.00272393 8.2056 -0.400225 7.60794 0.486083C2.125 8.61828 9.91667 8.98439 9.91667 12.9375C9.91667 14.5381 8.62794 15.8332 7.0457 15.8121C5.4887 15.7918 4.25 14.4747 4.25 12.8948V9.05357C4.25 8.07877 3.07815 7.60574 2.41586 8.31236C1.23073 9.57556 0 11.7394 0 14.375C0 19.1309 3.81305 23 8.5 23C13.187 23 17 19.1309 17 14.375C17 6.72528 9.5625 5.7051 9.5625 1.07186Z"
            fill="white"
          />
        </svg>
        <p className="m-0 ms-2">{votes}</p>
      </Button>
      <p style={{ fontSize: 12 }} className="m-0">
        Votes:
        <span style={{ color: theme.palette.primary.main }}>
          {" "}
          {votes < 100 ? votes : 100}/100
          <HtmlTooltip title="Newly Listed Projects Need 100 Votes To Be Fully Listed On Nftwatcher.net">
            <span
              className="cursor-pointer ms-2"
              style={{
                fontSize: 10,
                background: "grey",
                padding: "1px 5px",
                borderRadius: 9999,
                color: "black",
              }}
            >
              ?
            </span>
          </HtmlTooltip>
        </span>
      </p>
    </>
  );
};

export default HomePage;
