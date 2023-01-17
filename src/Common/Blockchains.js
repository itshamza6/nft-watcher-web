import React from "react";
import EthereumIcon from "../images/Icons/Ethereum.png";
import Polygon from "../images/Icons/Polygon.png";
import Solana from "../images/Icons/Solana.png";
import Cardano from "../images/Icons/Cardano.png";
import BinanceSmartChain from "../images/Icons/Binance Smart Chain.png";
import Cronos from "../images/Icons/Cronos.png";
import Elrond from "../images/Icons/Elrond.png";
import AvaxNetwork from "../images/Icons/Avax Network.png";
import Wax from "../images/Icons/Wax.png";
import Tezos from "../images/Icons/Tezos.png";
import Moonriver from "../images/Icons/Moonriver.png";
import Fantom from "../images/Icons/Fantom.png";
import ImmutableX from "../images/Icons/Immutable X.png";
import Hathor from "../images/Icons/Hathor.png";
import Flow from "../images/Icons/Flow.png";
import Terra from "../images/Icons/Terra.png";
import ETHOnPolygon from "../images/Icons/ETH On Polygon.svg";

const Blockchains = [
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
      <img src={ETHOnPolygon} style={{ width: 15 }} alt={"Blockchain Icon"} />
    ),
  },
];

export default Blockchains;
