import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import {
  TextField,
  Button,
  Menu,
  MenuItem,
  Checkbox,
  Chip,
  Select,
  OutlinedInput,
  Box,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { toast } from "react-toastify";
import {
  LightImageIcon,
  DarkImageIcon,
  Ethereum,
} from "../../Components/SvgIcons";
import axios from "../../api/axios.js";
import moment from "moment";
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

const blockchains = [
  {
    name: "Ethereum",
    icon: (
      <img src={EthereumIcon} style={{ width: 20 }} alt={"Blockchain Icon"} />
    ),
  },
  {
    name: "Polygon",
    icon: (
      <img
        src={Polygon}
        style={{ width: 20 }}
        className="me-1"
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Solana",
    icon: <img src={Solana} style={{ width: 20 }} alt={"Blockchain Icon"} />,
  },
  {
    name: "Cardano",
    icon: <img src={Cardano} style={{ width: 20 }} alt={"Blockchain Icon"} />,
  },
  {
    name: "Binance Smart Chain",
    icon: (
      <img
        src={BinanceSmartChain}
        style={{ width: 20 }}
        alt={"Blockchain Icon"}
      />
    ),
  },
  {
    name: "Cronos",
    icon: <img src={Cronos} style={{ width: 20 }} alt={"Blockchain Icon"} />,
  },
  {
    name: "Elrond",
    icon: <img src={Elrond} style={{ width: 20 }} alt={"Blockchain Icon"} />,
  },
  {
    name: "Avax Network",
    icon: (
      <img src={AvaxNetwork} style={{ width: 20 }} alt={"Blockchain Icon"} />
    ),
  },
  {
    name: "Wax",
    icon: <img src={Wax} style={{ width: 20 }} alt={"Blockchain Icon"} />,
  },
  {
    name: "Tezos",
    icon: <img src={Tezos} style={{ width: 20 }} alt={"Blockchain Icon"} />,
  },
  {
    name: "Moonriver",
    icon: <img src={Moonriver} style={{ width: 20 }} alt={"Blockchain Icon"} />,
  },
  {
    name: "Fantom",
    icon: <img src={Fantom} style={{ width: 20 }} alt={"Blockchain Icon"} />,
  },
  {
    name: "Immutable X",
    icon: (
      <img src={ImmutableX} style={{ width: 20 }} alt={"Blockchain Icon"} />
    ),
  },
  {
    name: "Hathor",
    icon: <img src={Hathor} style={{ width: 20 }} alt={"Blockchain Icon"} />,
  },
  {
    name: "FLOW",
    icon: <img src={Flow} style={{ width: 20 }} alt={"Blockchain Icon"} />,
  },
  {
    name: "Terra",
    icon: <img src={Terra} style={{ width: 20 }} alt={"Blockchain Icon"} />,
  },
  {
    name: "ETH On Polygon",
    icon: (
      <img src={ETHOnPolygon} style={{ width: 15 }} alt={"Blockchain Icon"} />
    ),
  },
];

const useStyles = makeStyles((theme) => ({
  innerRoot: {
    background: theme.palette.themeCardColor.main,
    padding: "10px 15px",
  },
  divider: {
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
    },
  },
  input: {
    padding: 10,
    border: `1px solid ${theme.palette.primary.main}`,
    background: theme.palette.themeCardColor.light,
    color: theme.palette.mode === "light" ? "black" : "white",
    outline: "none",
    borderRadius: 5,
    resize: "none",
    marginTop: 5,
    width: "49%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  dropdownItem: {
    width: 230,
    display: "flex",
    alignItem: "center",
    justifyContent: "start",
    paddingLeft: 10,
  },
}));

const SubmitEvent = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();
  const [event, setEvent] = React.useState({
    presale: "No",
    launched_date: new Date(),
    blockchain_contact_address: null,
    telegram_url: null,
    reddit_url: null,
    instagram_url: null,
  });

  const [blockchainEl, setBlockchainEl] = React.useState(null);
  const blockchainOpen = Boolean(blockchainEl);

  const [presaleEl, setPreSaleEl] = React.useState(null);
  const presaleOpen = Boolean(presaleEl);

  const handleChangeDate = (key, newValue) => {
    setEvent({
      ...event,
      [key]: newValue,
    });
  };

  const onChangeEventValue = (key, newValue) => {
    setEvent({
      ...event,
      [key]: newValue,
    });
  };

  const onChangeEventField = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeImage = (e) => {
    setEvent({
      ...event,
      image: e.target.files[0],
      selectedImage: window.URL.createObjectURL(e.target.files[0]),
    });
  };

  const isValidHttpUrl = (string) => {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  };

  const onSubmitEvent = () => {
    if (!event.title) return toast.error("Title is Required!");
    else if (!event.description) return toast.error("Description is Required!");
    else if (!event.image) return toast.error("Image is Required!");
    else if (!event.launched_date)
      return toast.error("Launch Date is Required!");
    else if (!event.blockchain) return toast.error("Blockchain is Required!");
    else if (!event.contact_email)
      return toast.error("Contact Email is Required!");
    else if (!event.website_url)
      return toast.error("Event Website URL is Required!");
    else if (!isValidHttpUrl(event.website_url))
      return toast.error(
        "Event Website URL format is Invalid! (Https Missing)"
      );
    else if (!event.twitter_url) return toast.error("Twitter URL is Required!");
    else if (!isValidHttpUrl(event.twitter_url))
      return toast.error("Twitter URL format is Invalid! (Https Missing)");
    else if (!event.discord_url) return toast.error("Discord URL is Required!");
    else if (!isValidHttpUrl(event.discord_url))
      return toast.error("Discord URL format is Invalid! (Https Missing)");
    else if (!event.unit_price) {
      return toast.error("Unit Price is Required!");
    } else if (!event.total_supply) {
      return toast.error("Total Supply is Required!");
    } else if (event.presale !== "No") {
      if (!event.presale_date) return toast.error("PreSale Date is Required!");
    }

    if (event.telegram_url) {
      if (!isValidHttpUrl(event.telegram_url))
        return toast.error("Telegram URL format is Invalid! (Https Missing)");
    }
    if (event.reddit_url) {
      if (!isValidHttpUrl(event.reddit_url))
        return toast.error("Reddit URL format is Invalid! (Https Missing)");
    }
    if (event.instagram_url) {
      if (!isValidHttpUrl(event.instagram_url))
        return toast.error("Instagram URL format is Invalid! (Https Missing)");
    }

    if (event.market_place_url) {
      if (!isValidHttpUrl(event.market_place_url))
        return toast.error(
          "Market Place URL format is Invalid! (Https Missing)"
        );
    }

    if (event.opensea_url) {
      if (!isValidHttpUrl(event.opensea_url))
        return toast.error("OpenSea URL format is Invalid! (Https Missing)");
    }

    let formData = new FormData();
    formData.append("title", event.title); //append the values with key, value pair
    formData.append("description", event.description);
    formData.append("image", event.image);
    formData.append(
      "launched_date",
      moment(event.launched_date).format("YYYY-MM-DD HH:mm:ss")
    );
    formData.append("blockchain_value", event.blockchain);
    formData.append(
      "blockchain_contact_address",
      event.blockchain_contact_address
    );
    formData.append("market_place_url", event.market_place_url);
    formData.append("contact_email", event.contact_email);
    formData.append("website_url", event.website_url);
    formData.append("unit_price", event.unit_price);
    formData.append("opensea_url", event.opensea_url);
    formData.append("total_supply", event.total_supply);
    formData.append("twitter_url", event.twitter_url);
    formData.append("discord_url", event.discord_url);
    formData.append("telegram_url", event.telegram_url);
    formData.append("reddit_url", event.reddit_url);
    formData.append("instagram_url", event.instagram_url);
    formData.append("is_presale", event.presale == "No" ? 0 : 1);
    if (event.presale_date) {
      formData.append(
        "presale_date",
        moment(event.presale_date).format("YYYY-MM-DD HH:mm:ss")
      );
    }

    axios
      .post("drops/store", formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          localStorage.setItem("votedAddedRedirection", true);
          localStorage.setItem(
            "votedAddedRedirectionMessage",
            res.data.message
          );
          // navigate('/events')
          navigate(
            "/events/" + encodeURIComponent(event.title.replaceAll(" ", "-"))
          );
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <div className={`${classes.innerRoot} mx-md-5 mt-5 mx-0 shadow`}>
        <h4>Submit Your Event</h4>
        <div className={classes.divider} />
        <div className="mt-2 d-flex align-items-start flex-column">
          <label className="mt-2">Event Title</label>
          <input
            type="text"
            className={`${classes.input}`}
            name="title"
            value={event.title}
            onChange={onChangeEventField}
          />
          <label className="mt-2">Event Description (Content)</label>
          <textarea
            type="text"
            className={`${classes.input} w-100`}
            rows="5"
            name="description"
            value={event.description}
            onChange={onChangeEventField}
          />
          <small className="mt-2 mb-4">
            Please provide a detailed description of the project (120+ words).
          </small>
        </div>
        <div className={classes.divider} />
        <div className="mt-2 d-flex align-items-start flex-column">
          <label className="pt-3" for="uploadImage">
            <label className="">Cover image</label>
            <div
              className={`${
                classes.input
              } d-flex align-items-center justify-content-center flex-column ${
                !event.image ? null : "p-0"
              }`}
              style={{
                cursor: "pointer",
                width: 150,
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              {!event.image ? (
                <>
                  <div className="pt-2">
                    {theme.palette.mode === "light" ? (
                      <LightImageIcon />
                    ) : (
                      <DarkImageIcon />
                    )}
                  </div>
                  <small className="pb-2 mt-3">Choose File</small>
                </>
              ) : (
                <img
                  src={event.selectedImage}
                  style={{ width: 150, height: 150 }}
                />
              )}
            </div>
          </label>
          <input
            type="file"
            className="d-none"
            id="uploadImage"
            name="image"
            onChange={onChangeImage}
          />
          <small className="mt-2 mb-4">PNG, JPG, GIF, png up to 1MB</small>
        </div>
        <div className={classes.divider} />
        <div className="mt-2 d-flex align-items-start flex-column">
          <h4>Event Title</h4>
          <div className="row w-100">
            <div className="col-md-6 col-12">
              <label className="mt-2">Select Launch Date</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                  value={event.launched_date ?? new Date()}
                  onChange={(value) => handleChangeDate("launched_date", value)}
                  renderInput={(params) => {
                    // <TextField {...params} className={classes.input} />
                    // <input type="text" onClick={params.inputProps.onClick} value={params.inputProps.value} className={classes.input} />
                    return (
                      <div
                        className={`${classes.input} mb-3 d-flex align-items-center justify-content-between w-100`}
                        role="button"
                        onClick={params.inputProps.onClick}
                      >
                        {!params.inputProps.value
                          ? "Select Date"
                          : params.inputProps.value}
                        <div>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4V4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V10Z"
                              fill="#8212F4"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="col-md-6 col-12">
              <label className="mt-2">
                Select PreSale Date{" "}
                {event.presale == "No" ? "(Optional)" : null}
              </label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDateTimePicker
                  value={event.presale_date ?? "dd/mm/yy"}
                  onChange={(value) => handleChangeDate("presale_date", value)}
                  renderInput={(params) => {
                    return (
                      <div
                        className={`${classes.input} mb-3 d-flex align-items-center justify-content-between w-100`}
                        role="button"
                        onClick={params.inputProps.onClick}
                      >
                        {!params.inputProps.value
                          ? "Select Date"
                          : params.inputProps.value}
                        <div>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4V4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V10Z"
                              fill="#8212F4"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>
        <div className={classes.divider} />
        <div className="mt-2 d-flex align-items-start flex-column">
          <h4>Event Details</h4>
          <small>Help us categorize the event.</small>
          <div className="row d-flex align-items-center justify-content-center w-100">
            <div className="col-md-6 col-12" style={{ padding: "0 0 0 12px" }}>
              <label className="mt-2">Blockchain</label>
              <Button
                className={`${classes.input} w-100 d-flex align-items-center justify-content-between`}
                onClick={(event) => setBlockchainEl(event.currentTarget)}
              >
                {event.blockchain ? event.blockchain : "Select Value"}
                <div className="ms-3">
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
                anchorEl={blockchainEl}
                open={blockchainOpen}
                onClose={() => setBlockchainEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {blockchains.map((item, i) => (
                  <MenuItem
                    key={i}
                    className={classes.dropdownItem}
                    onClick={() => {
                      onChangeEventValue("blockchain", item.name);
                      setBlockchainEl(null);
                    }}
                  >
                    <div style={{ width: 30 }}>{item.icon}</div>
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <div
              className="col-md-6 col-12 mt-md-3 mt-0"
              style={{ padding: "0 0 0 20px" }}
            >
              {/* <label className='mt-2'>
                Blockchain {event.blockchain_contact_address}
              </label> */}
              <input
                type="text"
                className={`${classes.input} w-100 mt-3`}
                placeholder="Contact Address (Optional)"
                name="blockchain_contact_address"
                value={event.blockchain_contact_address}
                onChange={onChangeEventField}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-12">
            <label className="mt-2">
              MarketPlace URL Other then OpenSea (Optional)
            </label>
            <input
              type="text"
              className={`${classes.input} w-100`}
              placeholder="https://Rarible.com/ProjectName"
              name="market_place_url"
              value={event.market_place_url}
              onChange={onChangeEventField}
            />
          </div>
          <div className="col-md-6 col-12">
            <label className="mt-2">PreSale</label>
            <Button
              className={`${classes.input} w-100 d-flex align-items-center justify-content-between`}
              onClick={(event) => setPreSaleEl(event.currentTarget)}
            >
              {event.presale ? event.presale : "Select Value"}
              <div className="ms-3">
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
              anchorEl={presaleEl}
              open={presaleOpen}
              onClose={() => setPreSaleEl(null)}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {["No", "Yes"].map((item, i) => (
                <MenuItem
                  key={i}
                  className={classes.dropdownItem}
                  onClick={() => {
                    onChangeEventValue("presale", item);
                    setPreSaleEl(null);
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>

        <div className="mt-2 d-flex align-items-start flex-column">
          <h4>Event Links</h4>
          <label className="mt-4">Contact Email address</label>
          <input
            type="email"
            className={`${classes.input}`}
            placeholder="your@mail.com"
            name="contact_email"
            value={event.contact_email}
            onChange={onChangeEventField}
          />
          <small className="mt-2">
            We will use this email address in case we need to contact you.
          </small>
          <div className={`${classes.divider} mt-3 w-50`} />
          <div className="row w-100">
            <div className="col-md-6 col-12 d-flex flex-column">
              <label className="mt-4">Event Website</label>
              <input
                type="text"
                className={`${classes.input} w-100`}
                placeholder="https://yourwebsitenft.com"
                name="website_url"
                value={event.website_url}
                onChange={onChangeEventField}
              />
            </div>
            <div className="col-md-6 col-12 d-flex flex-column">
              <label className="mt-4">Unit Price </label>
              <input
                type="number"
                className={`${classes.input} w-100`}
                placeholder="0.00"
                name="unit_price"
                value={event.unit_price}
                onChange={onChangeEventField}
              />
            </div>
          </div>
          <div className="row w-100">
            <div className="col-md-6 col-12 d-flex flex-column">
              <label className="mt-4">OpenSea URL (Optional)</label>
              <input
                type="text"
                className={`${classes.input} w-100`}
                placeholder="https://opensea.io/collection/ProjectName"
                name="opensea_url"
                value={event.opensea_url}
                onChange={onChangeEventField}
              />
            </div>
            <div className="col-md-6 col-12 d-flex flex-column">
              <label className="mt-4">Total Supply </label>
              <input
                type="number"
                className={`${classes.input} w-100`}
                placeholder="8888"
                name="total_supply"
                value={event.total_supply}
                onChange={onChangeEventField}
              />
            </div>
          </div>
        </div>
        <div className={`${classes.divider} mt-5 mb-3`} />
        <div className="row w-100">
          <div className="row w-100">
            <div className="col-md-6 col-12 d-flex flex-column">
              <label className="mt-4">Project Twitter</label>
              <input
                type="text"
                className={`${classes.input} w-100`}
                placeholder="https://Twitter.com/YourProject"
                name="twitter_url"
                value={event.twitter_url}
                onChange={onChangeEventField}
              />
            </div>
            <div className="col-md-6 col-12 d-flex flex-column">
              <label className="mt-4">Official Discord Server</label>
              <input
                type="text"
                className={`${classes.input} w-100`}
                placeholder="https://Discord.com/Invite/...."
                name="discord_url"
                value={event.discord_url}
                onChange={onChangeEventField}
              />
            </div>
          </div>
          <div className="row w-100">
            <div className="col-md-6 col-12 d-flex flex-column">
              <label className="mt-4">Telegram (Optional)</label>
              <input
                type="text"
                className={`${classes.input} w-100`}
                placeholder="https://t.me/YourProject"
                name="telegram_url"
                value={event.telegram_url}
                onChange={onChangeEventField}
              />
            </div>
            <div className="col-md-6 col-12 d-flex flex-column">
              <label className="mt-4">Reddit (Optional)</label>
              <input
                type="text"
                className={`${classes.input} w-100`}
                placeholder="https://yourwebsitenft.com"
                name="reddit_url"
                value={event.reddit_url}
                onChange={onChangeEventField}
              />
            </div>
          </div>
          <div className="row w-100">
            <div className="col-md-6 col-12 d-flex flex-column">
              <label className="mt-4">Instagram (Optional)</label>
              <input
                type="text"
                className={`${classes.input} w-100`}
                placeholder="https://Instagram.com/..."
                name="instagram_url"
                value={event.instagram_url}
                onChange={onChangeEventField}
              />
            </div>
          </div>
        </div>

        <div className="row w-100 mt-4">
          <div className="col-md-6 col-12 d-flex flex-row align-items-center justify-content-start">
            <Checkbox />
            <p className="m-0">I have read and agreed to the terms of use</p>
          </div>
          <div className="col-md-6 col-12 d-flex flex-row align-items-center justify-content-md-end justify-content-center mt-md-0 mt-3">
            <Button
              variant="contained"
              style={{ borderRadius: 5 }}
              onClick={onSubmitEvent}
            >
              Submit Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitEvent;
