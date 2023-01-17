import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate, Link } from "react-router-dom";
import {
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  CircularProgress,
} from "@mui/material";

import axios from "../api/axios.js";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  allCollectioBox: {
    background: theme.palette.themeCardColor.main,
    boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.25)",
    height: 600,
    marginTop: 50,
  },
  tableContent: {
    overflow: "scroll",
    height: 520,
  },
  allCollectionSearchBox: {
    background: theme.palette.themeCardColor.light,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      width: 400,
    },
    "& input": {
      background: "none",
      outline: "none",
      border: "none",
      width: "100%",
      color: theme.palette.mode === "light" ? "black" : "white",
    },
  },
}));

const AllCollections = () => {
  const classes = useStyles();
  const collections = useSelector((state) => state.collections);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const topCollectionsLimit = 40;

  const [allCollectionsPage, setAllCollectionsPage] = React.useState(
    collections.page ?? 1
  );
  const [allCollectionsPageCount, setAllCollectionsPageCount] = React.useState(
    collections.total_pages ?? 1
  );
  const [search, setSearch] = React.useState("");
  const [allCollectionsLoading, setAllCollectionsLoading] =
    React.useState(false);
  const [paginationLoading, setPaginationLoading] = React.useState(false);

  React.useEffect(() => {
    if (
      collections?.all_collections?.length === 0 ||
      collections?.all_collections == null
    ) {
      getAllCollections({
        limit: topCollectionsLimit,
        page: allCollectionsPage,
      });
    }
  }, []);

  const getAllCollections = async (
    params,
    isPagination = false,
    isSearching = false
  ) => {
    console.log(isSearching);
    if (allCollectionsLoading == true) return;
    if (!isPagination) {
      setAllCollectionsLoading(true);
    } else {
      if (paginationLoading) return;
      setPaginationLoading(true);
    }
    const res = await axios.get(`/collections/all_collections`, { params });
    if (res.data.totalPages) {
      setAllCollectionsPageCount(res.data.totalPages);
      setAllCollectionsPage(res.data.page);
    }
    var newCollections = [];
    if (collections?.all_collections?.length > 0 && isSearching == false) {
      newCollections = [
        ...collections.all_collections,
        ...res.data.collections,
      ];
    } else {
      newCollections = res.data.collections;
    }

    dispatch({
      type: "collections:add",
      key: "all_collections",
      data: newCollections,
    });

    dispatch({
      type: "collections:add",
      key: "page",
      data: res.data.page,
    });

    dispatch({
      type: "collections:add",
      key: "total_pages",
      data: res.data.totalPages,
    });

    if (!isPagination) {
      setAllCollectionsLoading(false);
    } else {
      setPaginationLoading(false);
    }
  };

  const searchTopCollections = (search) => {
    if (search.length == 0) {
      getAllCollections(
        {
          limit: topCollectionsLimit,
          page: 1,
        },
        false,
        true
      );
      return;
    } else {
      getAllCollections(
        {
          limit: topCollectionsLimit,
          page: 1,
          search: search,
        },
        false,
        true
      );
    }
  };

  const onScrollTable = (event) => {
    if (allCollectionsLoading == true) return;
    if (paginationLoading) return;
    if (allCollectionsPage < allCollectionsPageCount) {
      var element = event.target;
      if (
        Math.floor(element.scrollTop + element.clientHeight) ==
        element.scrollHeight
      ) {
        getAllCollections(
          search.length == 0
            ? {
                limit: topCollectionsLimit,
                page: allCollectionsPage + 1,
              }
            : {
                limit: topCollectionsLimit,
                page: allCollectionsPage + 1,
                search: search,
              },
          true
        );
      }
    }
  };

  function round(num, places) {
    num = parseFloat(num);
    places = places ? parseInt(places, 10) : 0;
    if (places > 0) {
      let length = places;
      places = "1";
      for (let i = 0; i < length; i++) {
        places += "0";
        places = parseInt(places, 10);
      }
    } else {
      places = 1;
    }
    return Math.round((num + Number.EPSILON) * (1 * places)) / (1 * places);
  }

  return (
    <Box className={classes.allCollectioBox}>
      <div style={{ height: 10 }} />
      <Box className={classes.allCollectionSearchBox}>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value.length > 3 || e.target.value.length === 0) {
              searchTopCollections(e.target.value);
            }
          }}
          placeholder={"Search by Project Name"}
        />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
            stroke="#8212F4"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 21L16.65 16.65"
            stroke="#8212F4"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Box>

      <TableContainer
        component={Paper}
        className={classes.tableContent}
        onScroll={onScrollTable}
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="All Collections">
          <TableHead style={{ background: "transparent" }}>
            <TableRow>
              <TableCell
                style={{
                  whiteSpace: "nowrap",
                  border: 0,
                  color: theme.palette.primary.main,
                }}
              >
                Collection
              </TableCell>
              <TableCell
                style={{
                  whiteSpace: "nowrap",
                  border: 0,
                  color: theme.palette.primary.main,
                }}
                align="right"
              >
                Volume(7d)
              </TableCell>
              <TableCell
                style={{
                  whiteSpace: "nowrap",
                  border: 0,
                  color: theme.palette.primary.main,
                }}
                align="right"
              >
                Sales(7d)
              </TableCell>
              <TableCell
                style={{
                  whiteSpace: "nowrap",
                  border: 0,
                  color: theme.palette.primary.main,
                }}
                align="right"
              >
                Avg Price(7d)
              </TableCell>
              <TableCell
                style={{
                  whiteSpace: "nowrap",
                  border: 0,
                  color: theme.palette.primary.main,
                }}
                align="right"
              >
                Total Supply
              </TableCell>
              <TableCell
                style={{
                  whiteSpace: "nowrap",
                  border: 0,
                  color: theme.palette.primary.main,
                }}
                align="right"
              >
                Owners
              </TableCell>
              <TableCell
                style={{
                  whiteSpace: "nowrap",
                  border: 0,
                  color: theme.palette.primary.main,
                }}
                align="right"
              >
                Owners%
              </TableCell>
              <TableCell
                style={{
                  whiteSpace: "nowrap",
                  border: 0,
                  color: theme.palette.primary.main,
                }}
                align="right"
              >
                Estimated Market Cap
              </TableCell>
              <TableCell
                style={{
                  whiteSpace: "nowrap",
                  border: 0,
                  color: theme.palette.primary.main,
                }}
                align="right"
              >
                Added
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCollectionsLoading || collections.all_collections == null
              ? [0, 1, 2, 3, 4, 5, 6, 7, 9].map((item, i) => {
                  return (
                    <TableRow key={i}>
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => {
                        return (
                          <TableCell
                            style={{ whiteSpace: "nowrap", border: 0 }}
                          >
                            <Skeleton
                              key={item}
                              height={30}
                              variant={"rectangular"}
                              animation={"wave"}
                              width={"100%"}
                            />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              : collections?.all_collections?.map((row, i) => (
                  <TableRow
                    key={i}
                    style={{ cursor: "pointer" }}
                    component={Link}
                    to={`/collection/${row.slug}`}
                  >
                    <TableCell style={{ whiteSpace: "nowrap", border: 0 }}>
                      <span className="fw-bold">#{i + 1}&nbsp;&nbsp;</span>
                      <img
                        src={row.image_url}
                        width={30}
                        height={30}
                        style={{ borderRadius: 9999 }}
                      />
                      &nbsp;&nbsp;{row.name}
                    </TableCell>
                    <TableCell
                      style={{ whiteSpace: "nowrap", border: 0 }}
                      align="right"
                    >
                      {round(row?.stats?.seven_day_volume, 2)}
                    </TableCell>
                    <TableCell
                      style={{ whiteSpace: "nowrap", border: 0 }}
                      align="right"
                    >
                      {round(row?.stats?.seven_day_sales, 2)}
                    </TableCell>
                    <TableCell
                      style={{ whiteSpace: "nowrap", border: 0 }}
                      align="right"
                    >
                      {round(row?.stats?.seven_day_average_price, 2)}
                    </TableCell>
                    <TableCell
                      style={{ whiteSpace: "nowrap", border: 0 }}
                      align="right"
                    >
                      {round(row?.stats?.total_supply, 2)}
                    </TableCell>
                    <TableCell
                      style={{ whiteSpace: "nowrap", border: 0 }}
                      align="right"
                    >
                      {row?.stats?.num_owners}
                    </TableCell>
                    <TableCell
                      style={{ whiteSpace: "nowrap", border: 0 }}
                      align="right"
                    >
                      {row?.stats?.num_owners / 100}%
                    </TableCell>
                    <TableCell
                      style={{ whiteSpace: "nowrap", border: 0 }}
                      align="right"
                    >
                      {round(row?.stats?.market_cap, 2)}
                    </TableCell>
                    <TableCell
                      style={{ whiteSpace: "nowrap", border: 0 }}
                      align="right"
                    >
                      {new Date(row?.created_at).getFullYear()}/
                      {("0" + (new Date(row?.created_at).getMonth() + 1)).slice(
                        -2
                      )}
                      /{("0" + new Date(row?.created_at).getDate()).slice(-2)}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        {paginationLoading ? (
          <Box
            className="d-flex align-items-center justify-content-center"
            my={2}
          >
            <CircularProgress />
          </Box>
        ) : null}
      </TableContainer>
    </Box>
  );
};

export default AllCollections;
