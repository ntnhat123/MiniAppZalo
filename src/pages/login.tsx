import React, { Suspense } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import CalendarPage from "components/Home/Calendar";
import Login from "components/Auth/Login";
import LoginForm from "components/Auth/Login";

const LoginPage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <Page className="page">
      <div>
        <Login/>
      </div>
    </Page>
  );
};

export default LoginPage;
