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
import { FaChalkboardTeacher } from "react-icons/fa";
import HomeIcon from "@mui/icons-material/Home";
import { BiChalkboard } from "react-icons/bi";
import ListItemButton from '@mui/material/ListItemButton';
import {
    AiOutlineLogout,
    AiOutlineFolderAdd,
    AiTwotoneNotification,
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

export default function Navbar({ user, isNavbarOpen, onCloseHandler }) {
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
                            <ListItemButton component={Link} to="/home/student">
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Home"} />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/home/student/class">
                                <ListItemIcon>
                                    <FaChalkboardTeacher size="25px" />
                                </ListItemIcon>
                                <ListItemText primary={"Class Post"} />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/home/student/department">
                                <ListItemIcon>
                                    <BiChalkboard size="25px" />
                                </ListItemIcon>
                                <ListItemText primary={"Notice Board"} />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/home/student/placement">
                                <ListItemIcon>
                                    <AiTwotoneNotification size="20px" />
                                </ListItemIcon>
                                <ListItemText primary={"Placement"} />
                            </ListItemButton>
                            {
                                user && user.is_spc ? (
                                    <ListItemButton component={Link} to="/home/student/creation">
                                        <ListItemIcon>
                                            <AiOutlineFolderAdd size="20px" />
                                        </ListItemIcon>
                                        <ListItemText primary={"Add Company"} />
                                    </ListItemButton>
                                ) : null
                            }
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
