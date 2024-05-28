import PageLayout from "@components/layout/PageLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./Login.module.scss";
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
} from "antd";
import { displayMessage, handleErrorResponse } from "@utils/common";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@utils/hardData";
import { userSuccess } from "@redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
const { Title } = Typography;

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const { userList } = useSelector((state) => state.allUserList);

  console.log("userList", userList);
  const handleOnSubmit = async (values) => {
    try {
      let isUserExist = userList?.filter((val) => {
        console.log(
          String(val?.email)?.toLowerCase()?.trim(),
          String(values?.email)?.toLowerCase()?.trim()
        );
        return (
          String(val?.email)?.toLowerCase()?.trim() ==
            String(values?.email)?.toLowerCase()?.trim() &&
          val?.password == values?.password
        );
      });

      setFormLoading(true);
      if (isUserExist?.length) {
        dispatch(userSuccess(isUserExist[0]));
        displayMessage(SUCCESS_MSG_TYPE, "LoggedIn Successfully!");

        router.push("/");
        setFormLoading(false);
      } else {
        setFormLoading(false);
        displayMessage(ERROR_MSG_TYPE, "Invalid Credentials!");
      }
    } catch (error) {
      setFormLoading(false);
      handleErrorResponse(error);
      console.log(error);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <Row justify={"center"}>
        <Col span={10} md={10} sm={14} xs={24}>
          <Spin spinning={formLoading}>
            <Card>
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
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="email" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
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
                      Login
                    </Button>
                    <Divider plain>OR</Divider>
                    <Button
                      href="/signup"
                      className="font-500 color-white"
                      block
                      type="success"
                      size="large"
                    >
                      Create new account
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

Login.getLayout = function getLayout(page) {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <PageLayout>{page}</PageLayout>
    </>
  );
};
