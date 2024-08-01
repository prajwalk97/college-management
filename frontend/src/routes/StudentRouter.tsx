import React, { useState } from "react";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { getUserData } from "../reducers/user/actions";
import Header from "../components/Header";
import Navbar from "../components/Student/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Student/Home";

export default function StudentRouter() {
    const [isNavbarOpen, setNavbarOpen] = useState(false);
    const user = useSelector(getUserData);

    return (
        <div>
            <Header user={user} onClickHandler={setNavbarOpen} />
            <Navbar isNavbarOpen={isNavbarOpen} onCloseHandler={setNavbarOpen} user={user} />
            <Routes>
                <Route path="/" element={<Home user={user} />} />
                {/*<Route path="/home/admin/teacher/" element={EditTeacher} />
                <Route path="/home/admin/register/" element={StudentCourse} />
                <Route path="/home/admin/course/" element={AddCourse} />
                <Route path="/home/admin/design/" element={DesignForm} /> */}
            </Routes>
            <Loading />
        </div>
    );
}
