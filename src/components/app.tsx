import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider, Calendar } from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "pages/index";
import User from "pages/user";
import CalendarrPage from "pages/calendar";
import CalendarPage from "./Home/Calendar";
import StatusList from "./ReportStatus/ReportStatus";
import CategoryTask from "./ReportStatus/CategoryTask";

const MyApp = () => {
  return (
    <RecoilRoot>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              {/* <Route path="/" element={<HomePage/>}></Route> */}
              <Route path="/" element={<CategoryTask/>}></Route>
              <Route path="/user" element={<User></User>}></Route>
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </RecoilRoot>
  );
};
export default MyApp;
