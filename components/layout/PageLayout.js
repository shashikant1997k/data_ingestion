import React from "react";
import { Layout } from "antd";
import { useRouter } from "next/router";
const { Content } = Layout;

export default function PageLayout({ children }) {
  const router = useRouter();

  return (
    <>
      <Layout className="site-layout">
        {/* <PageHeader /> */}
        <Content>{children}</Content>
      </Layout>
    </>
  );
}
