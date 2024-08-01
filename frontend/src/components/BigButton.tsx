import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const classes = {
    link: {
        textDecoration: "none",
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 220,
        width: 220,
        padding: "20px",
    },
    typo: {
        padding: "20px",
    },
};

const initShadow = 10;
const howerShadow = 2;

export default function BigButton(props) {
    const [shadow, setShadow] = useState(initShadow);

    return (
        <Link to={props.link} style={classes.link}>
            <Paper
                elevation={shadow}
                sx={classes.paper}
                onMouseEnter={() => setShadow(howerShadow)}
                onMouseLeave={() => setShadow(initShadow)}
            >
                {props.component}
                <Typography sx={classes.typo} variant="h6">
                    {props.title}
                </Typography>
            </Paper>
        </Link>
    );
}
