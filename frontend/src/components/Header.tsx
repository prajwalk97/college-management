import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Icon,
    Box,
    useTheme,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import PopUp from "./PopUp";



// const useStyles = useTheme({
//     appBar: {
//         
//     },
//     icon: {

//     },
//     user: {
//         float: "right",
//         marginRight: "5%",
//         marginLeft: "10px",
//     },
//     title: {
//         alignSelf: "center",
//     },
// });

export default function Header({ user, onClickHandler }) {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const customtheme = createTheme({
        components: {
            // Name of the component
            MuiAppBar: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        zIndex: theme.zIndex.drawer + 1,
                        position: "sticky"
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CS
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    // Name of the slot
                    h5: {
                        alignSelf: "center",
                    },
                    h6: {
                        float: "right",
                        marginLeft: "16px",
                    }
                },
            },
            MuiIcon: {
                styleOverrides: {
                    // Name of the slot
                    root: {
                        // Some CSS
                        margin: "20px",
                        marginLeft: 0,
                        cursor: "pointer"
                    },
                    colorPrimary: {
                        margin: "20px",
                        marginRight: 0,
                    }
                },
            },
        },
    });
    return (
        <ThemeProvider theme={customtheme}>
            <AppBar position="fixed">
                <Toolbar>
                    <Box display="flex" flexGrow={1}>
                        <Icon onClick={() => onClickHandler(prev => !prev)}>
                            <img src="/assets/logo.svg" />
                        </Icon>

                        <Typography variant="h5" noWrap>
                            CollegeMate
                        </Typography>
                    </Box>
                    {user && (
                        <React.Fragment>
                            <Icon color="primary" onClick={() => setOpen(true)}>
                                <img src="/assets/user.svg" />
                            </Icon>
                            <Typography variant="h6" align="right">
                                {user.name}
                            </Typography>
                            <PopUp
                                open={open}
                                setOpen={setOpen}
                                dialog="Are you sure you want to Logout?"
                                action1="Cancel"
                                action2="Logout" />
                        </React.Fragment>

                    )}
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
