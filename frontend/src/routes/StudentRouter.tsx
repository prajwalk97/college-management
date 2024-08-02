import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUserData } from "../reducers/user/actions";
import Header from "../components/Header";
import Navbar from "../components/Student/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../components/Student/Home";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import DepartmentPost from "../components/Student/DepartmentPost";
import ClassPost from "../components/Student/ClassPost";

export default function StudentRouter() {
    const [isNavbarOpen, setNavbarOpen] = useState(false);
    const user = useSelector(getUserData);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    useEffect(() => {
        trackPromise(
            axios
                .get("/getUser", {
                    headers: { "x-auth-token": localStorage["x-auth-token"] },
                })
                .then((results) => {
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
    }, []);
    return (
        <div>
            <Header user={user} onClickHandler={setNavbarOpen} />
            <Navbar isNavbarOpen={isNavbarOpen} onCloseHandler={setNavbarOpen} user={user} />
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                <Route
                    path="/department"
                    element={<DepartmentPost user={user} />}
                />
                <Route path="/class" element={<ClassPost />} />
                {/*<Route path="/home/admin/teacher/" element={EditTeacher} />
                <Route path="/home/admin/register/" element={StudentCourse} />
                <Route path="/home/admin/course/" element={AddCourse} />
                <Route path="/home/admin/design/" element={DesignForm} /> */}
            </Routes>
            <Loading />
        </div>
    );
}
