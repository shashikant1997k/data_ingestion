import { useEffect, useState } from "react";
import DashboardLayout from "@components/layout/DashboardLayout";
import Head from "next/head";
import { Avatar, List, Row, Card, Typography } from "antd";
const { Title } = Typography;
import resourceJson from "@utils/resources.json";

export default function Resources() {
  return (
    <>
      <Head>
        <title>Resources</title>
      </Head>
      <div className="pageTitle">
        <Title level={4}>Resources</Title>
      </div>

      <div className="pageContentRow">
        <Card>
          <List
            itemLayout="horizontal"
            dataSource={resourceJson}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <a href={item?.link} target="_blank" rel="noreferrer">
                      {item.title}
                    </a>
                  }
                  description={item?.description}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </>
  );
}

Resources.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
