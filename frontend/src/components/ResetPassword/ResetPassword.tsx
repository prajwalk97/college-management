import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, Paper, Avatar, Typography, TextField, Button, createTheme } from "@mui/material";
import React from "react";
import { useState } from "react"
import Loading from "../Loading";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom'

const theme = createTheme({
    components: {
        // Name of the component
        MuiAvatar: {
            styleOverrides: {
                // Name of the slot
                root: {
                    margin: (1),
                    // backgroundColor: theme.palette.secondary.main,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                // Name of the slot
                root: {
                    marginTop: "18px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px"
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    margin: "13px 0 12px",
                },
            },
        },
    },
});

export const ResetPassword = () => {
    const { token } = useParams();
    const navigateTo = useNavigate();
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/reset-password/${token}`, { password });
            alert(response.data.message);
            navigateTo('/'); // Redirect to login page after success
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Paper>
                    <Avatar >
                        <SchoolOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Enter new password
                    </Typography>
                    <form style={{
                        width: "100%", // Fix IE 11 issue.
                        marginTop: "10px",
                    }} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                            fullWidth
                            name="OTP"
                            label="Enter new Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Loading />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            reset password
                        </Button>
                    </form>
                </Paper>
            </Container>
        </ThemeProvider >
    );
}