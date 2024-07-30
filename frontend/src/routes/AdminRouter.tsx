import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateUserData } from "../reducers/user/actions";
import Header from "../components/Header";
import Navbar from "../components/Admin/Navbar";
import { trackPromise } from "react-promise-tracker";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import EditStudent from "../components/Admin/EditStudent";
import EditTeacher from "../components/Admin/EditTeacher";
import StudentCourse from "../components/Admin/CreateCourse";

export default function AdminRouter() {
    const [isNavbarOpen, setNavbarOpen] = useState(false);
    const user = useSelector(getUserData);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    useEffect(() => {
        trackPromise(
            axios
                .get("/getUser/admin", {
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
            <Navbar isNavbarOpen={isNavbarOpen} onCloseHandler={setNavbarOpen} />
            <Routes>
                <Route path="/" element={<EditStudent />} />
                <Route path="/teacher" element={<EditTeacher />} />
                <Route path="/course" element={<StudentCourse />} />
                {/* <Route path="/home/admin/course/" element={AddCourse} />
                <Route path="/home/admin/design/" element={DesignForm} /> */}
            </Routes>
            <Loading />
        </div>
    );
}
