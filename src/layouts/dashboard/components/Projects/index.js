/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsCheckCircleFill } from "react-icons/bs";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard Materail-UI example components
import Table from "examples/Tables/Table";

// Data
import data from "layouts/dashboard/components/Projects/data";
import React, { useEffect } from 'react';
import moment from 'moment';


function formatDateToYYYYMMDD(date) {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
  let day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getNextSunday() {
  let today = new Date();
  let dayOfWeek = today.getDay();
  let daysUntilNextSunday = 7 - dayOfWeek;
  
  if (daysUntilNextSunday === 0) {
    daysUntilNextSunday = 7;
  }

  let nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysUntilNextSunday);

  return formatDateToYYYYMMDD(nextSunday);
}

console.log(getNextSunday());


// Change this page
function Projects() {
  const [menu, setMenu] = useState(null);
  // the initial event list is empty,
  const [eventList, setEventList] = useState([])
  const { columns, rows } = data(eventList);
  // data was orignally set to be empty but when user updates the website,
  // useEffect is called, data is then populated from the api
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          // Get today's date using moment
          const today = new Date();
          // Format the dates in 'YYYY-MM-DD'
          const startDate = formatDateToYYYYMMDD(today);
          const endDate = getNextSunday();

          // API URL with dynamic dates
          const apiUrl = `https://geteventsindaterange-rozzd6eg5q-uc.a.run.app/getEventsInDateRange?startDate=${startDate}&endDate=${endDate}&country=US`;

          const response = await fetch(apiUrl);
          const event_data = await response.json();
          // set the empty array with your returned json data from get event calendar API
          setEventList(event_data);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };

    fetchEvents();
  }, []);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );

  return (
    <Card
      sx={{
        height: "100% !important",
      }}
    >
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiBox mb="auto">
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            Upcoming events
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
              &nbsp;<strong>{eventList.length}</strong> in the coming week
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </VuiBox>
        {renderMenu}
      </VuiBox>
      <VuiBox
        sx={{
          "& th": {
            borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
              `${borderWidth[1]} solid ${grey[700]}`,
          },
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                `${borderWidth[1]} solid ${grey[700]}`,
            },
          },
        }}
      >
        <Table columns={columns} rows={rows} />
      </VuiBox>
    </Card>
  );
}

export default Projects;
