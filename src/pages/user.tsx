import React from "react";
import {
  Avatar,
  List,
  Text,
  Box,
  Page,
  Button,
  Icon,
  useNavigate,
} from "zmp-ui";
import { useRecoilValue } from "recoil";
import { displayNameState, userState } from "state";
import Profile from "components/Auth/Profile";

const UserPage = () => {
  return (
    <Page className="page">
      <Profile />
    </Page>
  );
};

export default UserPage;
