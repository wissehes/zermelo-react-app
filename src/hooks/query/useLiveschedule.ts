import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SavedToken } from "../../types/SavedToken";
import { getZermeloMeData } from "../../types/ZermeloMeResponse";
import { getZermeloLiveSchedule } from "../../types/ZermeloSchedule";

export default function useLiveSchedule(tokenData: SavedToken | null) {
  const { data: user } = useQuery(["me", tokenData], async () => {
    if (!tokenData) {
      throw new Error("No token stored");
    }

    const { data } = await axios.get<getZermeloMeData>(
      `https://${tokenData.portal}.zportal.nl/api/v3/users/~me`,
      { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
    );

    return data;
  });

  const userId = user?.response.data[0].code;

  const query = useQuery(
    ["schedule", userId],
    async () => {
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
            student: userId,
            week: 202236,
          },
        }
      );
      return data;
    },
    { enabled: !!userId }
  );

  return query;
}
