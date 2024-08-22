import React, { Suspense } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import CalendarPage from "components/Home/Calendar";
import Login from "components/Auth/Login";
import UpdatePasswordForm from "components/Auth/UpdatePassword";

const UpdatePassword: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <Page >
        <UpdatePasswordForm />
    </Page>
  );
};

export default UpdatePassword;
