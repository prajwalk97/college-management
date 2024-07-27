import Icon from "@mui/material/Icon";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { useState } from "react";
// import "fontsource-roboto";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";
const theme = createTheme({
    components: {
        // Name of the component
        MuiContainer: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    height: 300,
                    width: 300,
                    padding: 20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    padding: 20,
                    display: "inline"
                },
            },
        },
        MuiIcon: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    height: "80%",
                    width: "80%",
                },
            },
        },
    },
});

const initShadow = 10;
const howerShadow = 2;

export const FirstPage = () => {
    const [shadow1, setShadow1] = useState(initShadow);
    const [shadow2, setShadow2] = useState(initShadow);
    const [shadow3, setShadow3] = useState(initShadow);

    return (<>
        <ThemeProvider theme={theme}>
            <Container>
                <Grid
                    container
                    spacing={3}
                // justify="center"
                // alignItems="center"

                >
                    <Grid item>
                        <Link to={"/login/admin"} >
                            <Paper
                                elevation={shadow3}
                                onMouseEnter={() => setShadow3(howerShadow)}
                                onMouseLeave={() => setShadow3(initShadow)}
                            >
                                <Icon>
                                    <img src="/assets/admin.svg" />
                                </Icon>
                                <Typography variant="h6">
                                    I AM AN ADMIN
                                </Typography>
                            </Paper>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to={"/login/teacher"}>
                            <Paper
                                elevation={shadow1}
                                onMouseEnter={() => setShadow1(howerShadow)}
                                onMouseLeave={() => setShadow1(initShadow)}
                            >
                                <Icon>
                                    <img src="/assets/teacher.svg" />
                                </Icon>
                                <Typography variant="h6">
                                    I AM A TEACHER
                                </Typography>
                            </Paper>
                        </Link>
                    </Grid>

                    <Grid item>
                        <Link to={"/login/student"} >
                            <Paper
                                // square="false"
                                elevation={shadow2}
                                onMouseEnter={() => setShadow2(howerShadow)}
                                onMouseLeave={() => setShadow2(initShadow)}
                            >
                                <Icon >
                                    <img src="/assets/student.svg" />
                                </Icon>
                                <Typography variant="h6">
                                    I AM A STUDENT
                                </Typography>
                            </Paper>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    </>
    );
}
