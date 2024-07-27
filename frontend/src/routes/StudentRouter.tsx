import React, { useState } from "react";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { getUserData } from "../reducers/user/actions";
import Header from "../components/Header";
import Navbar from "../components/Student/Navbar";

export default function StudentRouter() {
    const [isNavbarOpen, setNavbarOpen] = useState(false);
    const user = useSelector(getUserData);

    return (
        <div>
            <Header user={user} onClickHandler={setNavbarOpen} />
            <Navbar isNavbarOpen={isNavbarOpen} onCloseHandler={setNavbarOpen} user={user} />
            <main>
                {/* <Route path="/home/admin/" element={EditStudent} />
                <Route path="/home/admin/teacher/" element={EditTeacher} />
                <Route path="/home/admin/register/" element={StudentCourse} />
                <Route path="/home/admin/course/" element={AddCourse} />
                <Route path="/home/admin/design/" element={DesignForm} /> */}
                <Loading />
            </main>
        </div>
    );
}
