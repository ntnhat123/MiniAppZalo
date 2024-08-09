import React, { Suspense } from "react";
import { Page } from "zmp-ui";
import Role from "components/Role/Role";

const RolePage: React.FunctionComponent = () => {
  return (
    <Page className="page">
      <div>
        <Role/>
      </div>
    </Page>
  );
};

export default RolePage;
