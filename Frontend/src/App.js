import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//->Pages/User
const Home = React.lazy(() => import("./Pages/User/Home/Home"));
const UserSignup = React.lazy(() => import("./Pages/User/Signup/UserSignup"));
const UserLogin = React.lazy(() => import("./Pages/User/Login/UserLogin"));
const BookAppointment = React.lazy(() => import("./Pages/User/BookAppointment/BookAppointment"));
const Departments = React.lazy(() => import("./Pages/User/Departments/Departments"));

//->Pages/Admin
const Dashboard = React.lazy(() => import("./Pages/Admin/Dashboard/Dashboard"));
const AdminLogin = React.lazy(() => import("./Pages/Admin/Login/AdminLogin"));
const UserList = React.lazy(() => import("./Pages/Admin/userList/UserList"));
const DoctorList = React.lazy(() => import("./Pages/Admin/doctorList/DoctorList"));
const DepartmentList = React.lazy(() => import("./Pages/Admin/departmentList/DepartmentList"));
const BannerList = React.lazy(() => import("./Pages/Admin/bannerList/BannerList"));

//->Error-Page
const  PageNotFound  = React.lazy(() => import("./Pages/PageNotFound/PageNotFound")); 

//->Loader for react.lazy loading
const Loader = React.lazy(() => import("./Components/Loader/Loader"));

const App = () => {
    return (
        <> 
            <Suspense fallback={<Loader />}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Home />} />
                            <Route path="login" element={<UserLogin />} />
                            <Route path="Signup" element={<UserSignup />} />
                            <Route path="departments/:id" element={<Departments />} />
                            <Route path="bookappointment" element={<BookAppointment />} />
                        </Route>
                        <Route path="/admin">
                            <Route index element={<AdminLogin />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="userlist" element={<UserList />} />
                            <Route path="doctorlist" element={<DoctorList />} />
                            <Route path="departmentlist" element={<DepartmentList />} />
                            <Route path="bannerlist" element={<BannerList />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                    <ToastContainer />
                </BrowserRouter>
            </Suspense>
        </>
    );
};

export default App;
