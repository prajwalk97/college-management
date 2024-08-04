import React, { useState, useEffect } from "react";
import Post from "../Post";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import { trackPromise } from "react-promise-tracker";

const classes = {
    root: {
        alignItems: "center",
        justifyContent: "center",
    },
    typo: {
        margin: "10px",
        padding: "20px",
        color: "#523e02",
    },
};

export default function DepartmentPost({ user }) {
    const [posts, setPosts] = useState([]);
    const navigateTo = useNavigate();
    useEffect(() => {
        console.log(user);
        trackPromise(
            axios
                .get("/department/post", {
                    headers: {
                        "x-auth-token": localStorage["x-auth-token"],
                    },
                    params: {
                        d_id: user.d_id,
                        year: user.year,
                    },
                })
                .then((result) => {
                    console.log(result);
                    setPosts(result.data);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 300) {
                        alert(err.response.data);
                    } else {
                        console.log(err);
                        alert("Sorry!! There is something wrong with the Server");
                    }
                })
        );
    }, []);

    const feed = posts.map((post, index) => {
        const curDate = new Date();
        const pubDate = new Date(post.date);
        // console.log("posts", post.date, curDate, pubDate);
        const millisecondsInDay = 1000 * 60 * 60 * 24;
        const timeElapsed = (curDate - pubDate) / millisecondsInDay;
        return (<Grid item key={index} xs={12} sx={{ justifyContent: "center" }} >
            <Post timeElapsed={Math.floor(timeElapsed)} key={post.p_id} title={post.title} message={post.message} course={post.name} author={post.author} />
        </Grid >);
    });
    return (
        <Container>
            <Typography variant="h4" align="left" sx={classes.typo}>
                {user.d_name} Notice Board
            </Typography>

            <Grid
                container
                sx={classes.root}
            >
                {feed}
            </Grid>
        </Container>
    );
}
