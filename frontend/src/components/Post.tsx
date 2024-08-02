import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const classes = {
    root: {
        width: "80%",
        padding: "20px",
        margin: "20px",
        borderColor: "#2e2e2e",
    },
    upper: {
        color: "#d4b168",
    },
};

export default function Post(props) {
    var text = props.timeElapsed + " days ago";
    const author = props.author;
    if (author) {
        text = "- posted by " + author + "," + props.timeElapsed + " days ago";
    }
    var upper;
    if (props.course) {
        upper = (
            <Typography variant="h6" align="left" sx={classes.upper}>
                {props.course}
            </Typography>
        );
    } else {
        upper = <div></div>;
    }
    return (
        <Paper elevation={5} sx={classes.root}>
            <Typography align="left" variant="h5">
                {props.title}
            </Typography>
            {upper}
            <Typography variant="subtitle1" color="textSecondary" align="left">
                {text}
                {props.timeElapsed <= 4 ? (<span style={{
                    padding: "3px 16px",
                    borderRadius: "6px",
                    margin: "10px",
                    color: classes.upper.color,
                    background: "linear-gradient(to right, white, yellow)",
                    boxShadow: "inset 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19), 1px 1px 14px 0px rgba(0, 0, 0, 0.12)",
                }}>New</span >) : null}
            </Typography>
            {
                props.year && (
                    <Typography variant="subtitle2" color="textSecondary" align="left">
                        Year - {props.year}
                    </Typography>
                )
            }
            <br />
            <Typography align="justify" variant="body1">
                {props.message}
            </Typography>
        </Paper >
    );
}
