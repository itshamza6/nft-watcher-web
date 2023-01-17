import React from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Radio,
  Skeleton,
  RadioGroup,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { toast } from "react-toastify";
import axios from "../api/axios.js";
import { Markup } from "react-render-markup";

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
    width: 200,
  },
  formBox: {
    border: `1px solid ${theme.palette.primary.main}`,
    background: theme.palette.themeCardColor.light,
    padding: 20,
    borderRadius: 10,
    margin: 25,
    [theme.breakpoints.down("sm")]: {
      margin: 10,
    },
  },
  dateField: {
    width: "200px !important",
    paddingBottom: 5,
  },
  inputField: {
    background: "none",
    width: "100%",
    outline: "none",
    border: "none",
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.mode === "light" ? "black" : "white",
    width: "50%",
    marginTop: 10,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    "&::placeholder": {
      color: theme.palette.mode === "light" ? "black" : "white",
      fontWeight: "normal",
    },
  },
}));

const SubmitProject = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();
  const defaultProjectState = {
    email: null,
    project_name: null,
    agree_to_pay_listing_fee: false,
    opensea_url: null,
    website_url: null,
    project_twitter_url: null,
    project_discrod_url: null,
    short_description: null,
    project_status: null,
    items_number_in_collection: null,
    collection_blockchain: null,
    collection_contract_address: null,
    token_standard: null,
    project_sale_start_date: null,
    project_sale_end_date: null,
    project_unit_price: null,
    project_reveal_date: null,
  };
  const [project, setProject] = React.useState(defaultProjectState);
  const [value, setValue] = React.useState(new Date());

  const [firstDesc, setFirstDesc] = React.useState({});
  const [secondDesc, setSecondDesc] = React.useState({});
  const [statuses, setStatuses] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [listingFeeDesc, setListingFeeDesc] = React.useState({});

  const [blockchainEl, setBlockchainEl] = React.useState(null);
  const blockchainOpen = Boolean(blockchainEl);
  const [selectedBlockChain, setSelectedBlockChain] = React.useState("");

  React.useEffect(() => {
    getDataFromBackend(
      "/sections/project-page-first-description",
      setFirstDesc,
      false
    );
    getDataFromBackend(
      "/sections/project-page-second-description",
      setSecondDesc,
      false
    );
    getDataFromBackend(
      "/sections/project-page-listing-fee-desc",
      setListingFeeDesc,
      false
    );
    getDataFromBackend("/project/statuses", setStatuses, false);
  }, []);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const onChnageInputValue = (key, newValue) => {
    setProject({
      ...project,
      [key]: newValue,
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

  const onSubmitProject = () => {
    if (!project.email) return toast.error("Email is Required!");
    else if (!project.project_name)
      return toast.error("Project Name is Required!");
    else if (!project.opensea_url)
      return toast.error("OpenSea URL is Required!");
    else if (!isValidHttpUrl(project.opensea_url))
      return toast.error("OpenSea URL format is Invalid!");
    else if (project.website_url) {
      if (!isValidHttpUrl(project.website_url))
        return toast.error("Website URL format is Invalid!");
    } else if (!project.project_twitter_url)
      return toast.error("Twitter URL is Required!");
    else if (!isValidHttpUrl(project.project_twitter_url))
      return toast.error("Twitter URL format is Invalid!");
    else if (project.project_discrod_url) {
      if (!isValidHttpUrl(project.project_discrod_url))
        return toast.error("Discord URL format is Invalid!");
    } else if (!project.short_description)
      return toast.error("Short Description is Required!");
    else if (!project.project_status)
      return toast.error("Status of Project is Required!");
    else if (!project.items_number_in_collection)
      return toast.error("Maximum number of items is Required!");
    else if (!project.collection_blockchain)
      return toast.error("Collection's Blockchain is Required!");
    else if (!project.token_standard)
      return toast.error("Token Standard is Required!");
    else if (!project.questionAnswer)
      return toast.error("Question Answer is Request!");

    axios
      .post("projects/store", project)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setProject(defaultProjectState);
          console.log(project);
          document.getElementById("form").reset();
          // navigate('/events/'+ event.title.replaceAll(" ", "-"))
        } else {
          toast.error(res.data.message);
        }
      })
      .catch(console.log);
  };

  const getDataFromBackend = (url, setData) => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(console.error);
  };

  return (
    <div className='container'>
      <form
        id='form'
        className={`${classes.innerRoot} mx-md-5 mt-5 mx-0 shadow`}>
        <div>
          <h2
            style={{ color: theme.palette.primary.main }}
            className='text-center mx-auto w-75'>
            Get your Project Listed with Rankings on NFT Watcher!
          </h2>
          <div className='mx-md-5 mx-3 mt-5'>
            {firstDesc?.content ? (
              <Markup markup={firstDesc.content} />
            ) : (
              <>
                <Skeleton width='100%' height={20} />
                <Skeleton width='100%' height={20} />
                <Skeleton width='100%' height={20} />
                <Skeleton width='100%' height={20} />
                <Skeleton width='100%' height={20} />
                <Skeleton width={300} height={20} />
              </>
            )}
          </div>
          <br />
          <div className={classes.formBox}>
            <h6>Email*</h6>
            <input
              type='text'
              className={classes.inputField}
              value={project.email}
              onChange={(e) => onChnageInputValue("email", e.target.value)}
              placeholder='Your Email'
            />
          </div>
          <div className={classes.formBox}>
            <h6>Your Project's Name*</h6>
            <input
              type='text'
              className={classes.inputField}
              value={project.project_name}
              onChange={(e) =>
                onChnageInputValue("project_name", e.target.value)
              }
              placeholder='Your answer'
            />
          </div>
          <div className={classes.formBox}>
            {listingFeeDesc?.content ? (
              <Markup markup={listingFeeDesc.content} />
            ) : (
              <>
                <Skeleton width='100%' height={20} />
                <Skeleton width='100%' height={20} />
              </>
            )}
            <br />
            <FormControlLabel
              onChange={(e) =>
                onChnageInputValue("agree_to_pay_listing_fee", e.target.checked)
              }
              control={
                <Checkbox
                  defaultChecked={
                    project.agree_to_pay_listing_fee ? true : false
                  }
                />
              }
              label='Yes'
            />
          </div>
          <div className={classes.formBox}>
            <h6>OpenSea Link (Important)</h6>
            <p className='small'>
              Enter as https://opensea.io/collection/yourcollectionname
            </p>
            <input
              type='text'
              value={project.opensea_url}
              onChange={(e) =>
                onChnageInputValue("opensea_url", e.target.value)
              }
              className={classes.inputField}
              placeholder='Your answer'
            />
          </div>
          <div className={classes.formBox}>
            <h6>Website URL</h6>
            <input
              type='text'
              value={project.website_url}
              onChange={(e) =>
                onChnageInputValue("website_url", e.target.value)
              }
              className={classes.inputField}
              placeholder='Your answer'
            />
          </div>
          <div className={classes.formBox}>
            <h6>Your Project's Official Twitter*</h6>
            <p className='small'>
              Enter as https://twitter.com/yourtwitterhandle, if you don't have
              an official twitter for the project provide your personal twitter
            </p>
            <input
              type='text'
              value={project.project_twitter_url}
              onChange={(e) =>
                onChnageInputValue("project_twitter_url", e.target.value)
              }
              className={classes.inputField}
              placeholder='Your answer'
            />
          </div>
          <div className={classes.formBox}>
            <h6>Your Project's Official Discord</h6>
            <input
              type='text'
              value={project.project_discrod_url}
              onChange={(e) =>
                onChnageInputValue("project_discrod_url", e.target.value)
              }
              className={classes.inputField}
              placeholder='Your answer'
            />
          </div>
          <div className={classes.formBox}>
            <h6>Short Description*</h6>
            <textarea
              type='text'
              onChange={(e) =>
                onChnageInputValue("short_description", e.target.value)
              }
              className={classes.inputField}
              rows='6'
              style={{ resize: "none", width: "100%" }}
              placeholder='Your answer'>
              {project.short_description}
            </textarea>
          </div>
          <div className={classes.formBox}>
            <h6>What is the status of your project?*</h6>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              value={project.project_status}
              name='radio-buttons-group'
              onChange={(e) =>
                onChnageInputValue("project_status", e.target.value)
              }>
              {statuses?.project_status?.map((item) => {
                return (
                  <FormControlLabel
                    value={item.title}
                    control={<Radio />}
                    label={item.title}
                  />
                );
              })}
            </RadioGroup>
          </div>
          <div className={classes.formBox}>
            <h6>What is the maximum number of items in your collection?*</h6>
            <p className='small'>
              Or at least the first batch that you would like to be listed.
            </p>
            <input
              type='text'
              value={project.items_number_in_collection}
              onChange={(e) =>
                onChnageInputValue("items_number_in_collection", e.target.value)
              }
              className={classes.inputField}
              placeholder='Your answer'
            />
          </div>
          <div className={classes.formBox}>
            <h6>What is your collection's blockchain? *</h6>
            <p className='small'>(If you don't know, it's likely Ethereum)</p>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              value={project.collection_blockchain}
              name='radio-buttons-group'
              onChange={(e) =>
                onChnageInputValue("collection_blockchain", e.target.value)
              }>
              <FormControlLabel
                value='Ethereum'
                control={<Radio />}
                label='Ethereum'
              />
              <FormControlLabel
                value='Matic'
                control={<Radio />}
                label='Matic'
              />
              <FormControlLabel
                value='Binance Smart Chain'
                control={<Radio />}
                label='Binance Smart Chain'
              />
              <FormControlLabel
                value='Cardano'
                control={<Radio />}
                label='Cardano'
              />
              <FormControlLabel value='Wax' control={<Radio />} label='Wax' />
              <FormControlLabel
                value='Other'
                control={<Radio />}
                label='Other'
              />
            </RadioGroup>
          </div>
          <div className={classes.formBox}>
            <h6>
              What is your collection's contract address(es)? (If available)
            </h6>
            <input
              type='text'
              value={project.collection_contract_address}
              onChange={(e) =>
                onChnageInputValue(
                  "collection_contract_address",
                  e.target.value
                )
              }
              className={classes.inputField}
              placeholder='Your answer'
            />
          </div>
          <div className={classes.formBox}>
            <h6>What kind of token standard is your contract?*</h6>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              value={project.token_standard}
              name='radio-buttons-group'
              onChange={(e) =>
                onChnageInputValue("token_standard", e.target.value)
              }>
              <FormControlLabel
                value='ERC721'
                control={<Radio />}
                label='ERC721'
              />
              <FormControlLabel
                value='ERC1155'
                control={<Radio />}
                label='ERC1155'
              />
              <FormControlLabel
                value="I don't know"
                control={<Radio />}
                label="I don't know"
              />
              <FormControlLabel
                value='Other'
                control={<Radio />}
                label='Other'
              />
            </RadioGroup>
          </div>
          <div className={classes.formBox}>
            {secondDesc?.content ? (
              <Markup markup={secondDesc.content} />
            ) : (
              <>
                <Skeleton width='100%' height={20} />
                <Skeleton width='100%' height={20} />
                <Skeleton width='100%' height={20} />
                <Skeleton width='100%' height={20} />
                <Skeleton width='100%' height={20} />
                <Skeleton width={300} height={20} />
              </>
            )}
            <input
              type='text'
              className={classes.inputField}
              value={project.questionAnswer}
              onChange={(e) =>
                onChnageInputValue("questionAnswer", e.target.value)
              }
              placeholder='Your Answer'
            />
          </div>
          <div className={classes.formBox}>
            <h6>
              Your Project's Sale Start Date (If available) (in UTC only*)
            </h6>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                value={project.project_sale_start_date}
                onChange={(e) =>
                  onChnageInputValue("project_sale_start_date", e)
                }
                renderInput={(params) => {
                  return (
                    <div
                      className={`${classes.inputField} ${classes.dateField} d-flex align-items-center justify-content-between mt-4`}
                      role='button'
                      onClick={params.inputProps.onClick}>
                      {params.inputProps.value ?? "mm/dd/yy"}
                      <div>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4V4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V10Z'
                            fill='#8212F4'
                          />
                        </svg>
                      </div>
                    </div>
                  );
                }}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.formBox}>
            <h6>Your Project's Sale End Date (If available)</h6>
            <p className='small'>
              Specify future date if not ended yet, past date if sale already
              ended. Can leave blank if not determined yet or so long ago it
              doesn't matter.
            </p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateTimePicker
                value={project.project_sale_end_date}
                onChange={(e) => onChnageInputValue("project_sale_end_date", e)}
                renderInput={(params) => {
                  return (
                    <div
                      className={`${classes.inputField} ${classes.dateField} d-flex align-items-center justify-content-between mt-4`}
                      role='button'
                      onClick={params.inputProps.onClick}>
                      {params.inputProps.value ?? "mm/dd/yy"}
                      <div>
                        <svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M19 4H17V3C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2C15.7348 2 15.4804 2.10536 15.2929 2.29289C15.1054 2.48043 15 2.73478 15 3V4H9V3C9 2.73478 8.89464 2.48043 8.70711 2.29289C8.51957 2.10536 8.26522 2 8 2C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4V4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V12H20V19ZM20 10H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H7V7C7 7.26522 7.10536 7.51957 7.29289 7.70711C7.48043 7.89464 7.73478 8 8 8C8.26522 8 8.51957 7.89464 8.70711 7.70711C8.89464 7.51957 9 7.26522 9 7V6H15V7C15 7.26522 15.1054 7.51957 15.2929 7.70711C15.4804 7.89464 15.7348 8 16 8C16.2652 8 16.5196 7.89464 16.7071 7.70711C16.8946 7.51957 17 7.26522 17 7V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V10Z'
                            fill='#8212F4'
                          />
                        </svg>
                      </div>
                    </div>
                  );
                }}
              />
            </LocalizationProvider>
          </div>
          <div className={classes.formBox}>
            <h6>Your Project's Reveal Date (If available)</h6>
            <p className='small'>
              Specify future date if not revealed yet, past date if already
              revealed. Can leave blank if not determined yet or so long ago it
              doesn't matter.
            </p>
            <input
              type='text'
              value={project.project_reveal_date}
              onChange={(e) =>
                onChnageInputValue("project_reveal_date", e.target.value)
              }
              className={classes.inputField}
              placeholder='Your answer'
            />
          </div>
          <div className={classes.formBox}>
            <h6>If your project is upcoming, what is your Unit Price (ETH)</h6>
            <input
              type='text'
              value={project.project_unit_price}
              onChange={(e) =>
                onChnageInputValue("project_unit_price", e.target.value)
              }
              className={classes.inputField}
              placeholder='Your answer'
            />
          </div>

          <div className='d-flex align-items-center justify-content-between mx-md-4 mx-0 mb-4'>
            <Button
              className='px-4'
              onClick={onSubmitProject}
              variant='contained'>
              Submit
            </Button>
            <Button
              onClick={() => {
                document.getElementById("form").reset();
                setProject(defaultProjectState);
              }}>
              Clear Form
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const LightImageIcon = () => (
  <svg
    width='47'
    height='47'
    viewBox='0 0 47 47'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    {" "}
    <path
      d='M1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1H37C39.387 1 41.6761 1.94821 43.364 3.63604C45.0518 5.32387 46 7.61305 46 10V37C46 39.387 45.0518 41.6761 43.364 43.364C41.6761 45.0518 39.387 46 37 46H10C7.61305 46 5.32387 45.0518 3.63604 43.364C1.94821 41.6761 1 39.387 1 37V10Z'
      stroke='black'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M15.625 21.25C18.7316 21.25 21.25 18.7316 21.25 15.625C21.25 12.5184 18.7316 10 15.625 10C12.5184 10 10 12.5184 10 15.625C10 18.7316 12.5184 21.25 15.625 21.25Z'
      stroke='black'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M29.1835 24.8974L10 46.0002H37.2992C39.6068 46.0002 41.8199 45.0835 43.4516 43.4518C45.0833 41.8201 46 39.607 46 37.2994V37.0002C46 35.9517 45.6063 35.5489 44.8975 34.7727L35.83 24.8839C35.4074 24.4229 34.8933 24.0551 34.3206 23.8039C33.7479 23.5526 33.1292 23.4235 32.5038 23.4248C31.8784 23.4261 31.2601 23.5577 30.6885 23.8112C30.1168 24.0648 29.6042 24.4347 29.1835 24.8974V24.8974Z'
      stroke='black'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
);

const DarkImageIcon = () => (
  <svg
    width='47'
    height='47'
    viewBox='0 0 47 47'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1H37C39.387 1 41.6761 1.94821 43.364 3.63604C45.0518 5.32387 46 7.61305 46 10V37C46 39.387 45.0518 41.6761 43.364 43.364C41.6761 45.0518 39.387 46 37 46H10C7.61305 46 5.32387 45.0518 3.63604 43.364C1.94821 41.6761 1 39.387 1 37V10Z'
      stroke='white'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M15.625 21.25C18.7316 21.25 21.25 18.7316 21.25 15.625C21.25 12.5184 18.7316 10 15.625 10C12.5184 10 10 12.5184 10 15.625C10 18.7316 12.5184 21.25 15.625 21.25Z'
      stroke='white'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
    <path
      d='M29.1835 24.8974L10 46.0002H37.2992C39.6068 46.0002 41.8199 45.0835 43.4516 43.4518C45.0833 41.8201 46 39.607 46 37.2994V37.0002C46 35.9517 45.6063 35.5489 44.8975 34.7727L35.83 24.8839C35.4074 24.4229 34.8933 24.0551 34.3206 23.8039C33.7479 23.5526 33.1292 23.4235 32.5038 23.4248C31.8784 23.4261 31.2601 23.5577 30.6885 23.8112C30.1168 24.0648 29.6042 24.4347 29.1835 24.8974V24.8974Z'
      stroke='white'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
);

export default SubmitProject;
