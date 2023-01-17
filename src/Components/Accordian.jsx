import React from "react";
import {
  Grid,
  Button,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

function Accordian({ faqs }) {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className='mx-md-5 mx-0 px-md-5 px-0'>
      {faqs.map((item, i) => {
        return (
          <Accordion
            expanded={expanded === "panel" + i}
            onChange={handleChange("panel" + i)}
            style={{
              background: "none",
              border: "none",
              boxShadow: "none",
              borderBottom: `1px solid ${theme.palette.primary.main}`,
              borderRadius: 0,
            }}>
            <AccordionSummary
              aria-controls='panel1bh-content'
              id='panel1bh-header'>
              <Typography
                style={{ textTransform: "uppercase" }}
                sx={{
                  width: "100%",
                  flexShrink: 0,
                }}>
                <span
                  style={{
                    fontSize: 20,
                    color: "#62BD00",
                    fontWeight: "bolder",
                  }}>
                  {expanded !== "panel" + i ? "+" : "-"}
                </span>
                &nbsp;&nbsp;{item?.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item?.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}

      {/* <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} style={{ background: 'none', border: 'none', boxShadow: 'none', borderBottom: `1px solid ${theme.palette.primary.main}`, borderRadius: 0 }}>
                <AccordionSummary
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography sx={{ width: '100%', flexShrink: 0 }}>
                        <span style={{ fontSize: 20, color: '#62BD00', fontWeight: 'bolder' }}>{expanded !== 'panel2' ? "+" : "-"}</span>
                        &nbsp;&nbsp;
                        HOW CAN I PAY ?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                        Aliquam eget maximus est, id dignissim quam.
                    </Typography>
                </AccordionDetails>
            </Accordion> */}
    </div>
  );
}

export default Accordian;
