import React, { Suspense } from "react";
import { List, Page, Icon, useNavigate } from "zmp-ui";
import UserCard from "components/user-card";
import AddRessPage from "./address";
import CalendarPage from "components/Home/Calendar";

const HomePage: React.FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <Page className="page">
      <div>
        <CalendarPage />
        {/* <AddRessPage /> */}
      </div>
    </Page>
  );
};

export default HomePage;
