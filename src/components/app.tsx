import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider, Calendar } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "pages/index";
import CalendarrPage from "pages/calendar";
import StatusList from "./ReportStatus/ReportStatus";
import CategoryTask from "./ReportStatus/CategoryTask";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<HomePage/>}></Route>
              <Route path="/calendar" element={<CalendarrPage/>}></Route>
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
