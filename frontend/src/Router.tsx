import React from "react";
import { Routes, Route } from 'react-router';
import { FirstPage } from "./components/FirstPage";
import SignIn from "./components/SignIn";
import AdminRouter from "./routes/AdminRouter";
import TeacherRouter from "./routes/TeacherRouter";
import StudentRouter from "./routes/StudentRouter";
import { ForgotPassword } from "./components/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword/ResetPassword";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/home/admin/*" element={<AdminRouter />} />
            <Route path="/home/student/*" element={<StudentRouter />} />
            <Route path="/home/teacher/*" element={<TeacherRouter />} />
            <Route path="/login/teacher/*" element={<SignIn isTeacher={true} isAdmin={false} />} />
            <Route path="/login/student/*" element={<SignIn isTeacher={false} isAdmin={false} />} />
            <Route path="/login/admin/*" element={<SignIn isTeacher={false} isAdmin={true} />} />
        </Routes>
    );
}

export default (Router);
