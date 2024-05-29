import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Empty,
  Input,
  Popconfirm,
  Row,
  Space,
  Spin,
  Table,
  Typography,
} from "antd";
import DashboardLayout from "@components/layout/DashboardLayout";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import DataCard from "@components/cards/DataCard";
import DataCardCreation from "@components/cards/DataCardCreation";
import {
  DeleteOutlined,
  DownloadOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import { archaeologicalDataDelete } from "@redux/archaeologicalDataSlice";
import { useRouter } from "next/router";
import { displayMessage } from "@utils/common";
import { SUCCESS_MSG_TYPE } from "@utils/hardData";
const { Search } = Input;
export default function CreatorDashboard() {
  const { archaeologicaList } = useSelector(
    (state) => state.archaeologicalDataList
  );
  const [dataCon, setDataCon] = useState(archaeologicaList);
  const [dataCon1, setDataCon1] = useState(archaeologicaList);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setDataCon(archaeologicaList);
  }, [archaeologicaList]);

  const searchInpChange = (e) => {
    let inptext = String(e.target.value).toLowerCase();
    setIsLoading(true);
    let temp = dataCon1?.filter(
      (val) =>
        String(val?.name)?.toLowerCase().includes(inptext) ||
        String(val?.description)?.toLowerCase().includes(inptext) ||
        String(val?.location)?.toLowerCase().includes(inptext)
    );

    setDataCon(temp);
    setIsLoading(false);
  };

  const deleteData = (_id) => {
    dispatch(archaeologicalDataDelete(_id));
    displayMessage(SUCCESS_MSG_TYPE, "Deleted Successfully");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "document",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    let temp = dataCon?.map((val, ind) => ({
      key: val?.id,
      name: val?.name,
      location: val?.location,
      description: (
        <Typography.Paragraph
          ellipsis={{
            rows: 2,
            expandable: "collapsible",
            expanded,
            onExpand: (_, info) => setExpanded(info.expanded),
          }}
        >
          {val?.description}
        </Typography.Paragraph>
      ),
      document: (
        <Button type="primary" shape="round" icon={<DownloadOutlined />}>
          Download
        </Button>
      ),
      action: (
        <Space>
          <Button
            type="primary"
            icon={<FolderViewOutlined />}
            onClick={() => router.push(`/details/${val?.id}`)}
          />
          <Popconfirm
            title="Delete"
            description="Are you sure to delete?"
            onConfirm={() => deleteData(val?.id)}
            okText="Yes"
            cancelText="No"
            key="delete"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    }));

    setTableData(temp);
    setIsLoading(false);
  }, [dataCon]);

  return (
    <>
      <Head>
        <title>DashBoard</title>
      </Head>
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
          {/* <Row gutter={[20, 20]}>
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
            </Row> */}

          <Table dataSource={tableData} columns={columns} loading={isLoading} />
        </div>
        <DataCardCreation
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
        />
      </>
    </>
  );
}

CreatorDashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
