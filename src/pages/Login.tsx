import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  CssBaseline,
  Box,
  Container,
  Avatar,
  Typography,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import axios from "axios";
import { useState } from "react";
import Appbar from "../components/Appbar";
import { getZermeloTokenResponse } from "../types/ZermeloTokenResponse";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const data = new FormData(event.currentTarget);

    const portal = data.get("portal") as string;
    const code = data.get("code") as string;

    axios
      .post<getZermeloTokenResponse>(
        `https://${portal}.zportal.nl/api/v3/oauth/token`,
        null,
        {
          params: {
            grant_type: "authorization_code",
            code: code.split(" ").join(""),
          },
        }
      )
      .then((res) => {
        const { access_token, token_type } = res.data;

        localStorage.setItem(
          "token",
          JSON.stringify({
            access_token,
            token_type,
            portal: portal.toLowerCase(),
          })
        );

        navigate("/");
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <Appbar />

      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="zermelocode"
              label="Zermelo Portal Name"
              name="portal"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="zermelocode"
              label="Zermelo Code"
              name="code"
            />

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isLoading}
            >
              Sign In
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
