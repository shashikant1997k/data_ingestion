import React, { useEffect } from "react";
import { Layout } from "antd";
import DashboardHeader from "./DashboardHeader";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@redux/loginSlice";
import { userClear } from "@redux/userSlice";
const { Content } = Layout;

export default function DashboardLayout({ children }) {
  const { user } = useSelector((state) => state.userInfo);
  const router = useRouter();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(logoutUser());
  //   dispatch(userClear());
  //   router.push("/login");
  // }, []);

  return (
    <Layout className="site-layout dashboardLayout">
      <DashboardHeader />
      <Content>{children}</Content>
    </Layout>
  );
}
