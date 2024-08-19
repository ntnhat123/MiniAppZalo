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
