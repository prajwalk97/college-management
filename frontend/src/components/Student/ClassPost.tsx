import React, { useState, useEffect } from "react";
import Post from "../Post";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import { trackPromise } from "react-promise-tracker";

const classes = {
    root: {
        alignItems: "center",
        justifyContent: "center",
    },
    typo: {
        margin: "20px",
        padding: "10px",
        color: "#523e02",
    },
};

export default function ClassPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        trackPromise(
            axios
                .get("course/posts", {
                    headers: { "x-auth-token": localStorage["x-auth-token"] },
                })
                .then((result) => {
                    console.log(result.data);
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
                Course Feed
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
