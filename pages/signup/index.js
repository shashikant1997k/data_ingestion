import PageLayout from "@components/layout/PageLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../login/Login.module.scss";
import {
  Button,
  Card,
  Col,
  Form,
  Typography,
  Input,
  Row,
  Spin,
  Divider,
  Select,
} from "antd";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@utils/hardData";
import { displayMessage, handleErrorResponse } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";
import { userAdd } from "@redux/userListSlice";
const { Title } = Typography;

export default function SignUp() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.allUserList);
  const [formLoading, setFormLoading] = useState(false);

  const handleOnSubmit = async (values) => {
    try {
      let isUserExist = userList?.filter(
        (val) =>
          String(val?.email)?.toLowerCase()?.trim() ==
          String(values?.email)?.toLowerCase()?.trim()
      );
      if (isUserExist?.length) {
        displayMessage(ERROR_MSG_TYPE, "User already exist!");
        return false;
      }
      if (values) {
        console.log("values", values);
        dispatch(userAdd(values));
        displayMessage(SUCCESS_MSG_TYPE, "Registered Successfully!");

        router.push("/");
        setFormLoading(false);
      } else {
        setFormLoading(false);
        displayMessage(ERROR_MSG_TYPE, "Something went wrong");
      }
    } catch (error) {
      setFormLoading(false);
      handleErrorResponse(error);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <Row justify={"center"}>
        <Col span={10} md={10} sm={14} xs={24}>
          <Spin spinning={formLoading}>
            <Card>
              <Title level={3}>Sign Up</Title>
              <Form
                name="basic"
                layout={"vertical"}
                autoComplete="off"
                size="large"
                initialValues={{
                  remember: true,
                }}
                onFinish={handleOnSubmit}
              >
                <Col span={24}>
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your First Name!",
                      },
                    ]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </Col>
                <Form.Item
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your last Name!",
                    },
                  ]}
                >
                  <Input placeholder="last Name" />
                </Form.Item>
                <Form.Item
                  name="userRole"
                  rules={[
                    {
                      required: true,
                      message: "Please input your userRole!",
                    },
                  ]}
                >
                  <Select autoComplete={false} name="userRole" showSearch>
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="researcher">Researcher</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Email!",
                    },
                    {
                      validator: (_, value) =>
                        !value.includes(" ")
                          ? Promise.resolve()
                          : Promise.reject(new Error("No spaces allowed")),
                    },
                  ]}
                >
                  <Input type="email" placeholder="Email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      // message:
                      //   "Password must be between 8 to 100 characters, Atleast one uppercase letter,Atleast one lowercase letter, Atleast one number and Atleast one special character!",
                      // pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/),
                    },
                  ]}
                >
                  <Input.Password type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                  <Row justify={"center"}>
                    <Button
                      className="font-500 color-white"
                      block
                      htmlType="submit"
                      type="primary"
                      size="large"
                    >
                      Sign Up
                    </Button>
                    <Divider plain>Already have an acoount?</Divider>
                    <Button
                      className="font-500 color-white"
                      href="/login"
                      block
                      type="success"
                      size="large"
                    >
                      Login
                    </Button>
                  </Row>
                </Form.Item>
              </Form>
            </Card>
          </Spin>
        </Col>
      </Row>
    </div>
  );
}

SignUp.getLayout = function getLayout(page) {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <PageLayout>{page}</PageLayout>
    </>
  );
};
