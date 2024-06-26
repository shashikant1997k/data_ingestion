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
  EditOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import { archaeologicalDataDelete } from "@redux/archaeologicalDataSlice";
import { useRouter } from "next/router";
import {
  addDataAllowedRole,
  displayMessage,
  updateAllowedRole,
} from "@utils/common";
import { SUCCESS_MSG_TYPE } from "@utils/hardData";
import moment from "moment";
const { Search } = Input;
export default function CreatorDashboard() {
  const { archaeologicaList } = useSelector(
    (state) => state.archaeologicalDataList
  );
  const { user } = useSelector((state) => state.userInfo);
  const [dataCon, setDataCon] = useState(archaeologicaList);
  const [dataCon1, setDataCon1] = useState(archaeologicaList);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [editData, setEditData] = useState({});

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
        String(val?.location)?.toLowerCase().includes(inptext) ||
        String(val?.excavationDetails)?.toLowerCase().includes(inptext)
    );

    setDataCon(temp);
    setIsLoading(false);
  };

  const handleDeleteData = (_id) => {
    dispatch(archaeologicalDataDelete(_id));
    displayMessage(SUCCESS_MSG_TYPE, "Deleted Successfully");
  };

  const downloadFile = (_file) => {
    console.log("_file", _file);
    var a = document.createElement("a");
    a.href = _file;
    a.download = "file";
    a.click();
  };

  const handleEditData = (_val) => {
    setEditData(_val);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Discover Date",
      dataIndex: "dateOfDiscovery",
      key: "dateOfDiscovery",
      width: 140,
    },
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
      title: "Cultural Context",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Excavation Details",
      dataIndex: "excavationDetails",
      key: "excavationDetails",
    },
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
      fixed: "right",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "document",
      fixed: "right",
      width: 170,
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    let temp = dataCon?.map((val, ind) => ({
      key: val?.id,
      dateOfDiscovery: val?.dateOfDiscovery
        ? moment(val?.dateOfDiscovery, "DD-MM-YYYY").format("ll")
        : "N/A",
      name: val?.name,
      location: val?.location,
      description: (
        <Typography.Paragraph
          ellipsis={{
            rows: 2,
          }}
        >
          {val?.description}
        </Typography.Paragraph>
      ),
      excavationDetails: (
        <Typography.Paragraph
          ellipsis={{
            rows: 2,
          }}
        >
          {val?.excavationDetails || "N/A"}
        </Typography.Paragraph>
      ),
      document: (
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={() => downloadFile(val?.file)}
        />
      ),
      action: (
        <Space>
          {updateAllowedRole.includes(user?.userRole) && (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleEditData(val)}
            />
          )}

          <Button
            type="default"
            icon={<FolderViewOutlined />}
            onClick={() => router.push(`/details/${val?.id}`)}
          />

          {updateAllowedRole.includes(user?.userRole) && (
            <Popconfirm
              title="Delete"
              description="Are you sure to delete?"
              onConfirm={() => handleDeleteData(val?.id)}
              okText="Yes"
              cancelText="No"
              key="delete"
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          )}
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
              {addDataAllowedRole.includes(user?.userRole) && (
                <div>
                  <Button
                    onClick={() => {
                      setEditData({});
                      setIsModalOpen(true);
                    }}
                    type="primary"
                  >
                    Add New Data
                  </Button>
                </div>
              )}
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

          <Table
            dataSource={tableData}
            columns={columns}
            loading={isLoading}
            scroll={{
              x: 1300,
            }}
          />
        </div>

        <DataCardCreation
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          editData={editData}
          setEditData={setEditData}
        />
      </>
    </>
  );
}

CreatorDashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
