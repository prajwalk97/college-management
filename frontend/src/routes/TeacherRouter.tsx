import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUserData } from "../reducers/user/actions";
import Header from "../components/Header";
import Navbar from "../components/Teacher/Navbar";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateDeptPost from "../components/Teacher/CreateDeptPost";
import TeacherPost from "../components/Teacher/TeacherPost";
import CreateClassPost from "../components/Teacher/CreateClassPost";

export default function TeacherRouter() {
    const [isNavbarOpen, setNavbarOpen] = useState(false);
    const user = useSelector(getUserData);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    useEffect(() => {
        trackPromise(
            axios
                .get("/getUser/teacher", {
                    headers: { "x-auth-token": localStorage["x-auth-token"] },
                })
                .then((results) => {
                    console.log(results.data);
                    console.log(results.data);
                    dispatch(updateUserData(results.data));
                })
                .catch((err) => {
                    if (err.response && err.response.status === 400) {
                        alert(err.response.data);
                        navigateTo('/', { replace: true })
                    } else {
                        alert("Sorry!! There is something wrong with the Server");
                    }
                })
        );
    }, [])
    return (
        <div>
            <Header user={user} onClickHandler={setNavbarOpen} />
            <Navbar isNavbarOpen={isNavbarOpen} onCloseHandler={setNavbarOpen} user={user} />
            <Routes>
                <Route
                    path="/post"
                    element={<TeacherPost user={user} />}
                />
                <Route
                    path="/department"
                    element={<CreateDeptPost user={user} />}
                />
                <Route
                    path="/class"
                    element={<CreateClassPost />} />
            </Routes>
            <Loading />
        </div>
    );
}

