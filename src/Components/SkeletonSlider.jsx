import React from 'react'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios, {ADMIN_PANEL_URL} from '../api/axios.js'
import {
    Skeleton 
} from '@mui/material';

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
}



function Sliders(props) {
    return (
        <div className="row my-3">
            {/* {props.skeleton ? */}
            <OwlCarousel className="owl-theme" autoplay={true} autoplayTimeout={5000}  responsive={responsive} loop margin={10} nav>
                    <Skeleton variant="rectangular" height={200} />
            </OwlCarousel>
        </div>
    )
}

export default Sliders
