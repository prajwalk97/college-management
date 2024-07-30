import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { trackPromise } from "react-promise-tracker";
import Loading from "./Loading";
import { createTheme, ThemeProvider } from "@mui/material";
import { updateJWT } from "../reducers/auth/actions";
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

export default function SignIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isWrong, setWrong] = useState(false);
    const dispatch = useDispatch();
    const onSigninHandler = (data) => {
        localStorage.setItem("x-auth-token", data.token);
        setWrong(false);
        dispatch(updateJWT(data.token));
    }

    let text = " SIGN IN";
    const navigateTo = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.clear();
        if (props.isAdmin) {
            trackPromise(
                axios
                    .post(
                        "auth/admin",
                        { email, password },
                        {
                            headers: { "x-auth-token": localStorage["x-auth-token"] },
                        }
                    )
                    .then((result) => {
                        onSigninHandler(result.data);
                        navigateTo("/home/admin", { replace: true });
                    })
                    .catch((err) => {
                        if (err.response && err.response.status === 400) setWrong(true);
                        else {
                            console.log(err);
                            alert("Sorry There is something wrong with the server");
                        }
                    })
            );
        } else if (props.isTeacher) {
            trackPromise(
                axios
                    .post(
                        "auth/instructor",
                        { email, password },
                        {
                            headers: { "x-auth-token": localStorage["x-auth-token"] },
                        }
                    )
                    .then((result) => {
                        onSigninHandler(result.data);
                        navigateTo("/home/teacher", { replace: true });
                    })
                    .catch((err) => {
                        console.log(err.response);
                        if (err.response && err.response.status === 400) setWrong(true);
                        else {
                            console.log(err);
                            alert("Sorry There is something wrong with the server");
                        }
                    })
            );
        } else {
            trackPromise(
                axios
                    .post(
                        "auth/student",
                        { email, password },
                        {
                            headers: { "x-auth-token": localStorage["x-auth-token"] },
                        }
                    )
                    .then((result) => {
                        onSigninHandler(result.data);
                        navigateTo("/home/student", { replace: true });
                    })
                    .catch((err) => {
                        if (err.response && err.response.status === 400) setWrong(true);
                        else {
                            console.log(err);
                            alert("Sorry There is something wrong with the server");
                        }
                    })
            );
        }
    };

    if (props.isAdmin) text = "ADMIN" + text;
    else if (props.isTeacher) text = "TEACHER" + text;
    else text = "STUDENT" + text;

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Paper>
                    <Avatar >
                        <SchoolOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {text}
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {isWrong ? (
                            <Typography color="secondary" variant="subtitle1">
                                *Wrong Email or Password
                            </Typography>
                        ) : (
                            <br />
                        )}
                        <Loading />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleClick}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/reset" style={{ textDecoration: "none" }}>Forgot password?</Link>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}


