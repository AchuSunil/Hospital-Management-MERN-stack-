import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//*/Pages/User
import Home from "./Pages/User/Home/Home";
import UserSignup from "./Pages/User/Signup/UserSignup";
import UserLogin from "./Pages/User/Login/UserLogin";
import BookAppointment from "./Pages/User/BookAppointment/BookAppointment";
import Departments from "./Pages/User/Departments/Departments";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

//*/Pages/Admin
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import AdminLogin from "./Pages/Admin/Login/AdminLogin";
import UserList from "./Pages/Admin/userList/UserList";
import DoctorList from "./Pages/Admin/doctorList/DoctorList";
import DepartmentList from "./Pages/Admin/departmentList/DepartmentList";
import BannerList from "./Pages/Admin/bannerList/BannerList";


const App = () => {
    return (
        <>
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
            </BrowserRouter>
            <ToastContainer />
        </>
    );
};

export default App;
