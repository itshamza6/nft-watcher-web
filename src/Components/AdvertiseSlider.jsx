import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios, { ADMIN_PANEL_URL } from "../api/axios.js";
import { Skeleton } from "@mui/material";

const responsive = {
  0: {
    items: 1,
  },
  576: {
    items: 1,
  },
  767: {
    items: 4,
  },
  10000: {
    items: 4,
  },
};

function AdvertiseService(props) {
  return (
    <div className='row my-3'>
      <OwlCarousel
        className='owl-theme'
        autoplay={true}
        autoplayTimeout={2000}
        responsive={responsive}
        loop
        margin={10}
        nav>
        {props.sliders?.map((data, index) => (
          <a class='item'>
            <div className='mt-md-0 mt-3'>
              <img
                src={ADMIN_PANEL_URL + data.image_url}
                style={{
                  height: 150,
                  width: "100%",
                }}
              />
            </div>
          </a>
        ))}
      </OwlCarousel>
    </div>
  );
}

export default AdvertiseService;
