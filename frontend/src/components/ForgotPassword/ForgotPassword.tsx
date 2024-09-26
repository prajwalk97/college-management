import { ThemeProvider } from "@emotion/react";
import { Container, CssBaseline, Paper, Avatar, Typography, TextField, Button, createTheme } from "@mui/material";
import React from "react";
import { useState } from "react"
import Loading from "../Loading";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import axios from "axios";
import { useLocation } from "react-router-dom";

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

export const ForgotPassword = () => {
    const location = useLocation();
    const { userType } = location.state;
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await axios.post('/forgot-password', { email, userType });
            setMessage(response.data.message);
        } catch (error) {
            console.log(error.response?.data.message);
            setMessage(error.response?.data.message);
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
                        Enter Email Address getting password change link
                    </Typography>
                    <form style={{
                        width: "100%", // Fix IE 11 issue.
                        marginTop: "10px",
                    }} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                        />
                        {/* {isWrong ? (
                            <Typography color="secondary" variant="subtitle1">
                                *Wrong Email or Password
                            </Typography>
                        ) : (
                            <br />
                        )} */}
                        <Loading />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Send link!
                        </Button>
                        {message ?
                            (<Typography color="secondary" variant="subtitle1">
                                {message}
                            </Typography>
                            ) : null
                        }
                    </form>
                </Paper>
            </Container>
        </ThemeProvider >
    );
}