import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import ScheduleTable from "../components/ScheduleTable";
import useLiveSchedule from "../hooks/query/useLiveschedule";
import { SavedToken } from "../types/SavedToken";
import { Appointment } from "../types/ZermeloSchedule";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Tab } from "@mui/material";

export default function Home() {
  const [tokenData, setTokenData] = useState<SavedToken | null>(null);
  const [value, setValue] = useState<string>("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    const rawToken = localStorage.getItem("token");

    if (!rawToken) return;

    try {
      const tokenData = JSON.parse(rawToken) as SavedToken;
      setTokenData(tokenData);
    } catch (e) {
      localStorage.removeItem("token");
    }
  }, []);

  const query = useLiveSchedule(tokenData);

  const todayDate = new Date("09-05-2022");
  todayDate.setHours(0, 0, 0, 0);
  const today = query.data?.response.data[0].appointments.filter((a) => {
    const date = new Date(a.start * 1000);
    date.setHours(0, 0, 0, 0);
    return date.toUTCString() === todayDate.toUTCString();
  });

  return (
    <div>
      <Appbar />
      <Container maxWidth="md">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Vandaag" value="1" />
                <Tab label="Week" value="2" />
              </TabList>
            </Box>

            <TabPanel value="1">
              {today && <ScheduleTable data={today} />}
            </TabPanel>
            <TabPanel value="2">
              {query.data?.response.data[0].appointments && (
                <ScheduleTable
                  data={query.data?.response.data[0].appointments}
                />
              )}
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
    </div>
  );
}
