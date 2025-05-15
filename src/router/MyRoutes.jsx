import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { TakeExam } from "../pages/UserPages/dashboard/TakeExam";
import { Login } from "../pages/UserPages/auth/Login";
import { CreateAccount } from "../pages/UserPages/auth/CreateAccount";
import { Dashboard } from "../pages/UserPages/dashboard/Dashboard";
import { DashboardPage } from "../pages/UserPages/dashboard/DashboardPage";
import { Materials } from "../pages/UserPages/dashboard/Materials";
import { UserProfile } from "../pages/UserPages/dashboard/UserProfile";
import { Home } from "../pages/WebsitePages/Home";
import { AdminDashboard } from "../pages/AdminPages/dashboard/AdminDashboard";
import { AdminLogin } from "../pages/AdminPages/auth/AdminLogin";
import { Checkin } from "../pages/AdminPages/dashboard/Checkin";
import { User } from "../pages/AdminPages/dashboard/User";
import { UploadMaterials } from "../pages/AdminPages/dashboard/UploadMaterials";
import { Payment } from "../pages/AdminPages/dashboard/Payment";
import { Result } from "../pages/AdminPages/dashboard/Result";
import { AdminOverview } from "../pages/AdminPages/dashboard/AdminOverview";
import { Exam } from "../pages/AdminPages/dashboard/Exam";
import { UploadQuestions } from "../pages/AdminPages/dashboard/UploadQuestions";
import { ViewQuestion } from "../pages/AdminPages/dashboard/ViewQuestions";
import axios from "axios";
import { Practice } from "../pages/UserPages/dashboard/Practice";
import { ExamPage } from "../pages/UserPages/dashboard/Exam";
import { ForgotPassword } from "../pages/UserPages/auth/ForgotPassword";
import { Page404 } from "../pages/404";
import { AdminProfile } from "../pages/AdminPages/dashboard/AdminProfile";
import { ResetPassword } from "../pages/UserPages/auth/RestPassword";

export const MyRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/take-exam" element={<TakeExam />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="overview" element={<DashboardPage />} />
        <Route path="material" element={<Materials />} />
        <Route path="practice" element={<Practice />} />
        <Route path="exam" element={<ExamPage />} />
        <Route path="user-profile" element={<UserProfile />} />
      </Route>
      <Route path="/admin-dashboard" element={<AdminDashboard />}>
        <Route path="overview" element={<AdminOverview />} />
        <Route path="checkin" element={<Checkin />} />
        <Route path="user" element={<User />} />
        <Route path="materials" element={<UploadMaterials />} />
        <Route path="result" element={<Result />} />
        <Route path="exam" element={<Exam />} />
        <Route path="admin-profile" element={<AdminProfile />} />
        <Route path="payment-history" element={<Payment />} />
        <Route path="upload-question" element={<UploadQuestions />} />
        <Route path="view-question" element={<ViewQuestion />} />
      </Route>
      <Route path="*" element={<Page404 />}/>
    </Routes>
  );
};
