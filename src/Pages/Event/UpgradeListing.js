import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import TickIcon from "../../images/tick.png";

import {
  Grid,
  Button,
  Menu,
  MenuItem,
  Typography,
  loading,
  Skeleton,
  Modal,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { makeStyles, styled } from "@mui/styles";
import CommonFunctions from "../../Common/CommonFunctions";
import axios from "../../api/axios.js";
import Sliders from "../../Components/Sliders";
import SkeletonSlider from "../../Components/SkeletonSlider";
import VoteAddedMessage from "../../Components/VoteAddedMessage";

import EthereumIcon from "../../images/Icons/Ethereum.webp";
import Polygon from "../../images/Icons/Polygon.webp";
import Solana from "../../images/Icons/Solana.webp";
import Cardano from "../../images/Icons/Cardano.webp";
import BinanceSmartChain from "../../images/Icons/Binance Smart Chain.webp";
import Cronos from "../../images/Icons/Cronos.png";
import Elrond from "../../images/Icons/Elrond.png";
import AvaxNetwork from "../../images/Icons/Avax Network.png";
import Wax from "../../images/Icons/Wax.webp";
import Tezos from "../../images/Icons/Tezos.png";
import Moonriver from "../../images/Icons/Moonriver.webp";
import Fantom from "../../images/Icons/Fantom.png";
import ImmutableX from "../../images/Icons/Immutable X.png";
import Hathor from "../../images/Icons/Hathor.png";
import Flow from "../../images/Icons/Flow.webp";
import Terra from "../../images/Icons/Terra.webp";
import ETHOnPolygon from "../../images/Icons/ETH On Polygon.svg";
import { toast } from "react-toastify";
import CustomHelmet from "../../Components/Helmet";

// Icons
import DoneIcon from "@mui/icons-material/Done";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";

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
  modalBody: {
    position: "relative",
    width: "70%",
    margin: "auto",
    overflow: "auto",
    marginTop: "50px",
    fontFamily: "Lato",
    background: theme.palette.themeCardColor.main,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "40px",
    ["@media (max-width:1440px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "80%",
    },
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "80%",
    },
  },
  modalGrid: {
    ["@media (max-width:780px)"]: {
      // eslint-disable-line no-useless-computed-key
      gridTemplateColumns: "1fr",
    },
  },
  modalBox: {
    border: `2px solid ${theme.palette.primary.main}`,
    padding: "30px 20px",
    position: "relative",
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

const UpgradeListing = ({ startCelebration }) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { name } = useParams();

  React.useEffect(() => {
    let isOwnerOfEvent =
      localStorage.getItem(encodeURIComponent(name.replaceAll(" ", "-"))) ==
      "true";
    if (!isOwnerOfEvent) {
      navigate(`/events/${encodeURIComponent(name.replaceAll(" ", "-"))}`);
    }
  }, []);

  const handleClose = () => {
    navigate(`/events/${encodeURIComponent(name.replaceAll(" ", "-"))}`, {
      state: {
        prevLocation: "upgrade",
      },
    });
  };

  const handlePayNavigation = () => {
    handleClose();
    window.open("https://pay.nftwatcher.net", "_blank");
  };

  return (
    <div className={classes.root}>
      <Box className={classes.modalBody}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{
            textAlign: "center",
            fontFamily: "Lato",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          <img src={TickIcon} /> Thank you for listing your project
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{
            mt: 2,
            textAlign: "center",
            fontFamily: "Lato",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          Your event will be publicly visible on NFTWatcher Once it's Passes 100
          votes to be officially Listed!
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{
            mt: 2,
            textAlign: "center",
            fontFamily: "Lato",
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          This Verification Process Helps our Filters Sort Out Genuine Projects
          As Hundreds Of NFT Projects are listed Everyday On NFTWatcher
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{
            mt: 2,
            textAlign: "center",
            fontFamily: "Lato",
            fontWeight: 700,
            letterSpacing: "1px",
            fontSize: "24px",
          }}
        >
          Please Select The Service You Would Like To Receive :
        </Typography>
        <Box
          className={classes.modalGrid}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            mt: 1,
            gap: "20px",
            fontFamily: "Lato",
          }}
        >
          <Box
            className={classes.modalBox}
            sx={{
              display: "grid",
              gridAutoRows: "minmax(30px, max-content)",
              gap: "10px",
              fontFamily: "Lato",
            }}
          >
            <Chip
              label="Standard"
              sx={{
                width: "fit-content",
                fontFamily: "Lato",
                textTransform: "uppercase",
              }}
            />
            <Typography
              sx={{ fontSize: "32px", fontWeight: "700", fontFamily: "Lato" }}
            >
              Free
            </Typography>
            <Typography sx={{ fontFamily: "Lato" }}>
              Listing On NFTWatcher Will Always Be Free
            </Typography>
            <Typography></Typography>
            <Typography></Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Get 100 votes to be officially listed"
                  sx={{ fontFamily: "Lato" }}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontFamily: "Lato" }}
                  primary="Your project will be visible across all channels"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontFamily: "Lato" }}
                  primary="Standard support queue"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <ReportGmailerrorredIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontFamily: "Lato" }}
                  primary="Only 3 out of 10 projects pass through vote moderation"
                />
              </ListItem>
            </List>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                width: "fit-content",
                fontFamily: "Lato",
                fontWeight: 700,
              }}
            >
              Continue
            </Button>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridAutoRows: "minmax(30px, max-content)",
              gap: "10px",
              fontFamily: "Lato",
            }}
            className={classes.modalBox}
          >
            <Typography
              sx={{
                position: "absolute",
                top: -2,
                right: -2,
                padding: "5px",
                background: "rgb(130,18,244)",
                fontFamily: "Lato",
                fontWeight: 700,
              }}
            >
              Recommonded
            </Typography>
            <Chip
              label="Express"
              sx={{
                width: "fit-content",
                fontFamily: "Lato",
                textTransform: "uppercase",
              }}
            />
            <Typography
              sx={{ fontSize: "32px", fontWeight: "700", fontFamily: "Lato" }}
            >
              130 USD
            </Typography>
            <Typography sx={{ fontFamily: "Lato" }}>
              Save time and start getting exposure immediately.
            </Typography>
            <Typography sx={{ fontFamily: "Lato" }}>
              Everything Included With Standard
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              <AddIcon sx={{ color: "rgb(130, 18, 244)" }} />
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontFamily: "Lato" }}
                  primary="Prioritised publication without vote moderation"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontFamily: "Lato" }}
                  primary="Includes 1 curated post from our
official twitter handle"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontFamily: "Lato" }}
                  primary="includes 1 day promoted featured event listing"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DoneIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontFamily: "Lato" }}
                  primary="VIP support from NFTWatcher team"
                />
              </ListItem>
            </List>
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
                fontFamily: "Lato",
                fontWeight: 700,
              }}
              onClick={() => handlePayNavigation()}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default UpgradeListing;
