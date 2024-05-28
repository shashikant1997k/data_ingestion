import { useEffect, useState } from "react";
import { Button, Col, Empty, Input, Row, Spin } from "antd";
import DashboardLayout from "@components/layout/DashboardLayout";
import Head from "next/head";
import { useSelector } from "react-redux";
import DataCard from "@components/cards/DataCard";
import DataCardCreation from "@components/cards/DataCardCreation";
const { Search } = Input;
export default function CreatorDashboard() {
  const { archaeologicaList } = useSelector(
    (state) => state.archaeologicalDataList
  );
  const [dataCon, setDataCon] = useState(archaeologicaList);
  const [dataCon1, setDataCon1] = useState(archaeologicaList);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setDataCon(archaeologicaList);
  }, [archaeologicaList]);

  console.log("archaeologicaList", archaeologicaList);

  const searchInpChange = (e) => {
    let inptext = String(e.target.value).toLowerCase();
    let temp = dataCon1?.filter(
      (val) =>
        String(val?.name)?.toLowerCase().includes(inptext) ||
        String(val?.description)?.toLowerCase().includes(inptext) ||
        String(val?.location)?.toLowerCase().includes(inptext)
    );

    setDataCon(temp);
  };

  return (
    <>
      <Head>
        <title>DashBoard</title>
      </Head>
      <Spin spinning={isLoading}>
        <>
          <Row justify={"space-between"}>
            <div className="pageTitle">
              <Search
                placeholder="input search text"
                onChange={searchInpChange}
                style={{
                  width: 300,
                }}
              />
            </div>
            <div className="pageTitle">
              <Row justify={"end"}>
                <div>
                  <Button onClick={() => setIsModalOpen(true)} type="primary">
                    Add New Data
                  </Button>
                </div>
              </Row>
            </div>
          </Row>

          <div className="pageContentRow">
            <Row gutter={[20, 20]}>
              {dataCon?.length ? (
                dataCon?.map((item, i) => (
                  <Col className="mb-2" span={6} md={6} sm={12} xs={24} key={i}>
                    <DataCard cardItem={item} index={i} action="none" />
                  </Col>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Empty />
                </div>
              )}
            </Row>
          </div>
          <DataCardCreation
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        </>
      </Spin>
    </>
  );
}

CreatorDashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
