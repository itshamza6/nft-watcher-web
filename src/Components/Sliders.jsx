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
    items: 3,
  },
  10000: {
    items: 4,
  },
};

function Sliders(props) {
  return (
    <div className='row my-3'>
      <OwlCarousel
        className='owl-theme'
        autoplay={true}
        autoplayTimeout={5000}
        responsive={responsive}
        loop
        margin={10}
        nav>
        {props.sliders?.map((data, index) => (
          <a target='_blank' href={data.redirect_to} class='item'>
            <div className='mt-md-0 mt-3'>
              <img
                src={ADMIN_PANEL_URL + data.image}
                style={{
                  width: "98%",
                  border: `3px solid ${props.theme.palette.primary.main}`,
                }}
              />
            </div>
          </a>
        ))}
      </OwlCarousel>
    </div>
  );
}

export default Sliders;
