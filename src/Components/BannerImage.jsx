import React from "react";
import { makeStyles } from "@mui/styles";
import axios, { ADMIN_PANEL_URL } from "../api/axios.js";
import { Skeleton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  headerImg: {
    width: "100%",
    // [theme.breakpoints.down("md")]: {
    //   height: 150,
    // },
  },
}));

const BannerImage = ({}) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const banner = useSelector((state) => state.banner);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (banner?.image == null) {
      setLoading(true);
      getDataFromBackend("/banner", setBanner, true, setLoading);
    }
  }, []);

  const setBanner = (data) => {
    dispatch({
      type: "banner:add",
      data: data.banner,
    });
  };

  const getDataFromBackend = (url, setData, isLoading, setLoading) => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        if (isLoading) {
          setLoading(false);
        }
      })
      .catch(console.error);
  };

  return (
    <div className='d-flex align-items-center justify-content-center'>
      {banner?.image != null || !loading ? (
        <img
          className={`${classes.headerImg} cursor-pointer`}
          onClick={() => window.open(banner?.redirect_to)}
          aria-hidden
          src={ADMIN_PANEL_URL + banner?.image ?? ""}
          alt={"Home Page Header Image"}
          loading='lazy'
        />
      ) : (
        <Skeleton
          variant='rectangular'
          animation='wave'
          width='98%'
          height={150}
          className={`mx-auto`}
        />
      )}
    </div>
  );
};

export default BannerImage;
