import { postAPI } from "@utils/apiRequest";
import { Button, Col, Form, Input, QRCode, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { userSuccess } from "@redux/userSlice";
import { GET_USER_PROFILE, PROFILE_UPDATE } from "@pages/api";
import { displayMessage } from "@utils/common";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@utils/hardData";
import { BASE_URL } from "@pages/api/env";
function ProfileComp() {
  const { user } = useSelector(state => state.userInfo);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFormLoading(true);
        let res = await postAPI(GET_USER_PROFILE, { account: user?.accountAddress });
        setFormLoading(false);
        if (res?.status == 1) {
          form?.setFieldsValue({ ...res?.data });
        }
      } catch (error) {
        setFormLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleProfileSubmit = async values => {
    try {
      setFormLoading(true);
      let res = await postAPI(PROFILE_UPDATE, values);
      setFormLoading(false);
      if (res?.status == 1) {
        let uData = jwt.decode(res?.data);
        dispatch(userSuccess(uData));
        displayMessage(SUCCESS_MSG_TYPE, res.message);
      } else {
        displayMessage(ERROR_MSG_TYPE, res.message);
      }
    } catch (error) {
      setFormLoading(false);
      console.log(error);
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.download = "QRCode.png";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Spin spinning={formLoading}>
      <Row>
        <Col md={{ span: 16, order: 1 }} xs={{ span: 24, order: 2 }}>
          <Form
            name="basic"
            form={form}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
              accountAddress: user?.accountAddress,
            }}
            onFinish={handleProfileSubmit}
            autoComplete="off"
          >
            <Form.Item label="Account Address" name="accountAddress">
              <Input type="text" disabled />
            </Form.Item>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please input your First Name!",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please input your Last Name!",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Username"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Mobile"
              name="mobile"
              rules={[
                {
                  required: true,
                  message: "Please input your Mobile!",
                },
              ]}
            >
              <Input type="text" />
            </Form.Item>

            <Form.Item>
              <Row justify={"center"}>
                <Button loading={formLoading} type="primary" htmlType="submit">
                  Submit
                </Button>
              </Row>
            </Form.Item>
          </Form>
        </Col>
        <Col md={{ span: 8, order: 2 }} xs={{ span: 24, order: 1 }}>
          <div className="mb-2" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <QRCode value={`${BASE_URL}/verify/${user?.userName}`} size={200} />{" "}
            <div style={{ display: "flex", justifyContent: "center" }} className="mt-2">
              <Button type="primary" onClick={downloadQRCode}>
                Download
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Spin>
  );
}

export default ProfileComp;
