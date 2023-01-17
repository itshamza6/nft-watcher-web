import React from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import NewsLetter from "./Components/NewsLetter";
import Confetti from "react-confetti";
import { useLocation } from "react-router-dom";

const Layout = (props) => {
  const { children, theme, setTheme, celebration } = props;
  const { width, height } = {
    width: window.innerWidth,
    height: window.innerHeight + 100,
  };
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={props.rootClasses} style={props.rootStyle}>
      <Navbar theme={theme} setTheme={setTheme} />
      {celebration ? (
        <Confetti
          style={{ position: "fixed" }}
          width={width}
          height={height}
          numberOfPieces={500}
        />
      ) : null}
      {children}
      {props.newsletter ? <NewsLetter /> : null}
      <Footer />
    </div>
  );
};

export default Layout;
