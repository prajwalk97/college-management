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
import ListItemButton from '@mui/material/ListItemButton';
import { CgFeed } from "react-icons/cg";
import { BsCloudDownload } from "react-icons/bs";
import {
    AiOutlineLogout
} from "react-icons/ai";
import { Link } from "react-router-dom";
import PopUp from "../PopUp";
import { BiNotepad, BiScan } from "react-icons/bi";

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
                            <ListItemButton component={Link} to="/home/teacher">
                                <ListItemIcon>
                                    <FaChalkboardTeacher size="25px" />
                                </ListItemIcon>
                                <ListItemText primary={"Add Class Post"} />
                            </ListItemButton>
                            {user && user.is_hod && (
                                <ListItemButton component={Link} to="/home/teacher/department">
                                    <ListItemIcon>
                                        <BiNotepad size="25px" />
                                    </ListItemIcon>
                                    <ListItemText primary={"Add Department Post"} />
                                </ListItemButton>
                            )}
                            <ListItemButton component={Link} to="/home/teacher/post">
                                <ListItemIcon>
                                    <CgFeed size="25px" />
                                </ListItemIcon>
                                <ListItemText primary={"Department Post's"} />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/home/teacher/scan">
                                <ListItemIcon>
                                    <BiScan size="25px" />
                                </ListItemIcon>
                                <ListItemText primary={"Scan Document"} />
                            </ListItemButton>
                            <ListItemButton component={Link} to="/home/teacher/getObjects">
                                <ListItemIcon>
                                    <BsCloudDownload size="25px" />
                                </ListItemIcon>
                                <ListItemText primary={"Get Objects"} />
                            </ListItemButton>
                            <Divider />
                            <ListItemButton onClick={() => setOpen(true)}>
                                <ListItemIcon>
                                    <AiOutlineLogout size="20px" />
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
