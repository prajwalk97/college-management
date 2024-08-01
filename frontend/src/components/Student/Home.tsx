import React from "react";
import BigButton from "../BigButton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Icon } from "@mui/material";

const classes = {
    root: {
        height: "70%",
        width: "70%",
    },
    container: {
        height: "100%",
    },
    grid: {
        height: "90vh",
        alignItems: "center",
        justifyContent: "center"
    },
};

const lgColumns = 4;

export default function Home({ user }) {

    return (
        <div>
            <Container sx={classes.container}>
                <Grid
                    container
                    spacing={5}
                    sx={classes.grid}
                >
                    <Grid item lg={lgColumns} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BigButton
                            component={
                                <Icon sx={classes.root}>
                                    <img src="/assets/department.svg" />
                                </Icon>
                            }
                            title={"Notice Board"}
                            link="/home/student/department"
                        />
                    </Grid>
                    <Grid item lg={lgColumns}>
                        <BigButton
                            component={
                                <Icon sx={classes.root}>
                                    <img src="/assets/classroom.svg" />
                                </Icon>
                            }
                            title={"Class Post"}
                            link={"/home/student/class"}
                        />
                    </Grid>
                    <Grid item lg={lgColumns}>
                        <BigButton
                            component={
                                <Icon sx={classes.root}>
                                    <img src="/assets/placement.svg" />
                                </Icon>
                            }
                            title={"Placement"}
                            link={"/home/student/placement"}
                        />
                    </Grid>
                    <Grid item lg={lgColumns}>
                        <BigButton
                            component={
                                <Icon sx={classes.root}>
                                    <img src="/assets/notes.svg" />
                                </Icon>
                            }
                            title={"Course Notes"}
                        />
                    </Grid>
                    {user && user.is_spc ? (
                        <Grid item lg={lgColumns}>
                            <BigButton
                                component={
                                    <Icon sx={classes.root}>
                                        <img src="/assets/create.svg" />
                                    </Icon>
                                }
                                title={"Add Company"}
                                link={"/home/student/creation"}
                            />
                        </Grid>
                    ) : (
                        <div></div>
                    )}
                </Grid>
            </Container>
        </div >
    );
}
