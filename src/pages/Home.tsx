import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import ScheduleTable from "../components/ScheduleTable";
import { SavedToken } from "../types/SavedToken";
import { getZermeloLiveSchedule } from "../types/ZermeloSchedule";

export default function Home() {
  //   const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [tokenData, setTokenData] = useState<SavedToken | null>(null);
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

  const queryClient = useQueryClient();

  const query = useQuery(["schedule", tokenData], async () => {
    if (!tokenData) {
      throw new Error("No token stored");
    }
    const { data } = await axios.get<getZermeloLiveSchedule>(
      `https://${tokenData.portal}.zportal.nl/api/v3/liveschedule`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        params: {
          student: 107012,
          week: 202236,
        },
      }
    );
    return data;
  });

  return (
    <div className="App">
      <Appbar />

      {tokenData && <p>Token: {tokenData.access_token}</p>}

      {query.data?.response.data[0].appointments && (
        <ScheduleTable data={query.data?.response.data[0].appointments} />
      )}
    </div>
  );
}
