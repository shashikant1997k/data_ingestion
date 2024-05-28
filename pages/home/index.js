import { Col, List, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@components/layout/DashboardLayout";
import { useSelector } from "react-redux";
import DataCard from "@components/nft/DataCard";
import Head from "next/head";

export default function Home() {
  const [dataCon, setDataCon] = useState([]);
  const { user } = useSelector((state) => state.userInfo);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadMoreData();
  }, []);

  console.log(dataCon);
  return dataCon?.length ? (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div
        id="scrollableDiv"
        style={{
          overflow: "hidden",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <Row justify={"center"}>
          <Col md={16} sm={24} xs={24}>
            <List
              dataSource={dataCon}
              renderItem={(item) => (
                <List.Item>
                  <DataCard nft={item} />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </div>
    </>
  ) : (
    <Row justify={"center"} className="mt-5">
      <Spin size="large" tip="Loading" spinning={true} />
    </Row>
  );
}

Home.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
