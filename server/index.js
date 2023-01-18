const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 5000;
const express = require("express");
const app = express();
const routes = require("../src/seo-titles");
const axios = require("axios");

app.use("/", express.static(path.join(__dirname, "../", "build")));

app.get("*", async (req, res) => {
  const indexFile = path.resolve("./build/site.html");
  const file = fs.readFileSync(indexFile).toString();
  let title =
    "NFTWatcher : Rarity Tools And Upcoming NFT Collections - NFT Calendar";
  let imageURL = "https" + "://" + req.get("host") + "/favicon.png";
  let desc =
    "NFT’s Sorted By Rarity Ranks, Find The Rariest Nft Projects Based On Their Ranks (Cryptopunks , Bored Ape Yatch Club , Doodles & NFT Calender";

  let routeFound = routes.map((item) => {
    if (req.url.includes(".")) return false;
    let url = req.url;
    if (url.lastIndexOf("/") === url.length - 1) {
      url = url.slice(0, url.length - 1);
    }
    if (url == item.url) {
      title = item.title;
      if (item?.description) {
        desc = item?.description;
      }
      return true;
    } else {
      return false;
    }
  });

  if (!routeFound.includes(true)) {
    if (
      req.url.includes("/collection/") &&
      req.url.length > "/collection/".length + 2
    ) {
      let slug = req.url.split("/")[2].split("?")[0];

      const res = await axios.get(
        `https://nft-apis.nftwatcher.net/api/collection/${slug}`
      );

      if (res?.data?.collection?.name) {
        imageURL = res?.data?.collection?.banner_image_url;
        desc = res?.data?.collection?.description;
        title = res?.data?.collection?.name + " | NFTWatcher";
      } else {
        title = "Page Not Found | NFTWatcher";
      }
    } else if (
      req.url.includes("/events/") &&
      req.url.length > "/events/".length + 2
    ) {
      let slug = req.url.split("/")[2].split("?")[0];

      const { data } = await axios.get(
        `https://nft-apis.nftwatcher.net/api/drops/show/${encodeURI(
          slug.replaceAll("-", " ")
        )}`
      );
      if (data?.title) {
        imageURL = data?.base_url_for_get_image + data.image;
        desc = data?.description;
        title = data?.title + " | NFTWatcher";
      } else {
        title = "Page Not Found | NFTWatcher";
      }
    } else {
      title = "Page Not Found | NFTWatcher";
    }
  }

  desc = desc.replace(
    desc.charAt(0),
    desc.charAt(0).replace(desc.charAt(0), desc.charAt(0).toUpperCase())
  );
  res.send(
    `${file
      .replace(
        `<title data-rh="true"></title>`,
        `<title data-rh="true">${title}</title>`
      )
      .replace(
        `<meta name="description" content="" />`,
        `<meta name="description" content="${desc}" />`
      )
      .replace(
        "<metaTags />",
        `
        <meta property="og:image" content="${imageURL}">
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nftwatcher.net/">
        <meta property="og:description" content="${desc}" />
        <meta property="og:title" content="${title}">
        
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:url" content="https://nftwatcher.net/">
        <meta property="twitter:title" content="${title}">
        <meta property="twitter:description" content="${desc}">
        <meta property="twitter:image" content="${imageURL}">`
      )}`
  );
});

app.listen(port, () => {
  console.log("SSR is running on port no. " + port);
});
