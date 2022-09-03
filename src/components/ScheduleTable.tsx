import { Appointment } from "../types/ZermeloSchedule";

import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

const formatDate = (date: number) => {
  const dateObj = new Date(date * 1000);
  const formatOptions: Intl.DateTimeFormatOptions = {
    // year: "",
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return dateObj.toLocaleDateString("nl-NL", formatOptions);
};

export default function ScheduleTable(props: { data: Appointment[] }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Wanneer</TableCell>
            <TableCell>Vak</TableCell>
            <TableCell>Docent</TableCell>
            <TableCell>Locatie</TableCell>
            <TableCell>Klas</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.data.map((e) => (
            <TableRow
              key={e.start}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{formatDate(e.start)}</TableCell>
              <TableCell>{e.subjects.join(", ")}</TableCell>
              <TableCell>
                {e.teachers.map((t) => (
                  <Chip label={t} />
                ))}
              </TableCell>
              <TableCell>{e.locations.join(", ")}</TableCell>
              <TableCell>{e.groups.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
