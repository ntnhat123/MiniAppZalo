import React, { Suspense } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import CalendarPage from "components/Home/Calendar";
import Login from "components/Auth/Login";

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <Page className="page">
      <div>
        <Login />
      </div>
    </Page>
  );
};

export default HomePage;
