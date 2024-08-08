import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider, Calendar } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "pages/index";
import CalendarrPage from "pages/calendar";
import StatusList from "./ReportStatus/ReportStatus";
import CategoryTask from "./ReportStatus/CategoryTask";
import LichTruc from "./Home/LichTruc";
import { AuthProvider } from "context/authContext";
import LoginPage from "pages/login";

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
                    <Route path="/status" element={<StatusList />} />
                    <Route path="/categorytask" element={<CategoryTask />} />
                    <Route path="/lichtruc" element={<LichTruc />} />
                  </AnimationRoutes>
              </AuthProvider>
            </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
