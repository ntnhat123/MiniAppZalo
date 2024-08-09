import React, { Suspense } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import CalendarPage from "components/Home/Calendar";
import Login from "components/Auth/Login";

const CalendarrPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <Page >
        <CalendarPage />
    </Page>
  );
};

export default CalendarrPage;
