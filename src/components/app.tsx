import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider, Calendar } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "pages/index";
import { AuthProvider } from "context/authContext";
import LoginPage from "pages/login";
import RolePage from "pages/role";
import UserPage from "pages/user";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ListCalendarUser from "./ListCalendarUser/ListCalendarUser";
import UpdatePasswordForm from "./Auth/UpdatePassword";
import UpdatePasswordAllForm from "./Auth/UpdatePasswordAll";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
            <ZMPRouter>
              <AuthProvider>
                  <AnimationRoutes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/profile" element={<UserPage />}  />
                    <Route path="/role" element={<RolePage />} />
                    <Route path="/listcalendar" element={<ListCalendarUser />} />
                    <Route path="/updatepassword" element={<UpdatePasswordForm />} />
                    <Route path="/updatepasswordall" element={<UpdatePasswordAllForm />} />
                  </AnimationRoutes>
                  <ToastContainer />
              </AuthProvider>
            </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
