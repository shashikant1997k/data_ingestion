import { Button, Col, Dropdown, Row, Space, Tag } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import styles from "./DashboardHeader.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@redux/loginSlice";
import { userClear } from "@redux/userSlice";

export default function DashboardHeader({ account }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.userInfo);

  const logout = () => {
    dispatch(logoutUser());
    dispatch(userClear());
    router.push("/login");
  };

  const handleMenuClick = (e) => {
    if (e?.key == 1) {
    } else if (e?.key == 2) {
      logout();
    }
  };

  const items = [
    {
      label: "",
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "Logout/Disconnect",
      key: "2",
      icon: <LogoutOutlined />,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className={styles.appHeader}>
      <Row className="w-100" align="bottom" justify={"space-between"}>
        <Col span={12} flex="auto">
          <Space>
            <Button onClick={() => router.push("/")}>Home</Button>
            <Button onClick={() => router.push("/resources")}>Resources</Button>
          </Space>
        </Col>
        <Col span={12}>
          <Space
            size="large"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div className={styles.userInfoGrid}>
              <Space>
                <Tag color="#1677ff">{user?.userRole}</Tag>
                <div className={styles.userName}>
                  <div>
                    <Dropdown.Button
                      size="large"
                      menu={menuProps}
                      placement="bottom"
                      icon={<UserOutlined />}
                    >
                      {user?.firstName}
                    </Dropdown.Button>
                  </div>
                </div>
              </Space>
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
