import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { routes } from "./routes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@mui/material/styles";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { Paper } from "@mui/material";
import { darkTheme, lightTheme } from "./Themes";

import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const [theme, setTheme] = React.useState("dark");
  const [celebration, setCelebration] = React.useState(false);

  const startCelebration = (milliSeconds) => {
    setCelebration(true);
    setTimeout(() => {
      setCelebration(false);
    }, milliSeconds);
  };

  React.useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme != null) {
      changeTheme(theme);
    } else {
      changeTheme("dark");
    }
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    if (newTheme == "dark") {
      document.body.classList.remove("background-light");
      document.body.classList.add("background-dark");
    } else {
      document.body.classList.remove("background-dark");
      document.body.classList.add("background-light");
    }
  };

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <CssBaseline />
        <ToastContainer
          toastClassName={"bg-dark text-white"}
          draggable
          pauseOnHover
          closeOnClick
          autoClose={5000}
          position="top-right"
        />
        <Router>
          <Routes>
            {routes.map((item, i) => {
              if (item.layout != null) {
                return (
                  <Route
                    exact
                    path={item.path}
                    element={
                      <item.layout
                        title={item.title}
                        theme={theme}
                        celebration={celebration}
                        setTheme={changeTheme}
                        rootStyle={item.rootStyle}
                        newsletter={item.newsletter ?? false}
                        rootClasses={item.rootClasses}
                      >
                        <Helmet prioritizeSeoTags>
                          <title>{item.title}</title>
                        </Helmet>
                        <item.component
                          startCelebration={startCelebration}
                          theme={theme}
                        />
                      </item.layout>
                    }
                  />
                );
              } else {
                return (
                  <Route
                    exact
                    path={item.path}
                    element={<item.component theme={theme} />}
                  />
                );
              }
            })}
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
