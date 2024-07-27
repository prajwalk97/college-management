import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItemIcon,
    ListItemText,
    Divider,
    Toolbar,
    createTheme,
    ThemeProvider
} from "@mui/material";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import ListItemButton from '@mui/material/ListItemButton';
import {
    AiOutlineLogout,
    AiOutlineFolderAdd,
    AiOutlineUserAdd,
    AiOutlineForm,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import PopUp from "../PopUp";

const drawerWidth = 240;
const customtheme = createTheme({
    components: {
        // Name of the component
        MuiDrawer: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    width: drawerWidth,
                    flexShrink: 0,
                },
                paper: {
                    width: drawerWidth,
                    background: "#235a8c",
                    color: "white",
                    boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, .2)"
                }
            },
        },
        MuiDivider: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CS
                    background: "white",
                },
            },
        },
    },
});

export default function Navbar({ isNavbarOpen, onCloseHandler }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <ThemeProvider theme={customtheme}>
                <Drawer
                    open={isNavbarOpen} onClose={() => onCloseHandler(false)}
                >
                    <Toolbar />
                    <div style={{ overflow: "auto" }}>
                        <List>
                            <ListItemButton component={Link} to="/home/admin">
                                <ListItemIcon>
                                    <FaUserGraduate />
                                </ListItemIcon>
                                <ListItemText primary={"Student Table"} />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/home/admin/teacher">
                                <ListItemIcon>
                                    <FaChalkboardTeacher size="25px" />
                                </ListItemIcon>
                                <ListItemText primary={"Teacher Table"} />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/home/admin/register">
                                <ListItemIcon>
                                    <AiOutlineUserAdd size="25px" />
                                </ListItemIcon>
                                <ListItemText primary={"Register for Course"} />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/home/admin/course">
                                <ListItemIcon>
                                    <AiOutlineFolderAdd size="25px" />
                                </ListItemIcon>
                                <ListItemText primary={"Add Course"} />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/home/admin/design">
                                <ListItemIcon>
                                    <AiOutlineForm size="25px" />
                                </ListItemIcon>
                                <ListItemText primary={"Design form"} />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => setOpen(true)}>
                                <ListItemIcon>
                                    <AiOutlineLogout size="20px" className={"icons"} />
                                </ListItemIcon>
                                <ListItemText primary={"Log Out"} />
                            </ListItemButton>
                        </List>
                    </div>
                </Drawer>
                <PopUp
                open={open}
                setOpen={setOpen}
                dialog="Are you sure you want to Logout?"
                action1="Cancel"
                action2="Logout"
            />
            </ThemeProvider>
        </div>
    );
}
