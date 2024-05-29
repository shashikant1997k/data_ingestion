import { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Card, Modal, Spin, Input, Upload } from "antd";
import { displayMessage } from "@utils/common";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@utils/hardData";
import { useDispatch, useSelector } from "react-redux";
import { archaeologicalDataAdd } from "@redux/archaeologicalDataSlice";
const { TextArea } = Input;
import { uid } from "uid";

export default function DataCardCreation({
  setIsModalOpen,
  isModalOpen,
  editData,
  setEditData,
}) {
  const { user } = useSelector((state) => state.userInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.file?.originFileObj;
  };

  async function handleSubmit(values) {
    try {
      if (isLoading) return;
      setIsLoading(true);
      let metadata = {
        id: uid(10),
        name: values?.name,
        description: values?.description,
        location: values?.location,
        file: values?.file,
        fileType: values?.file?.type,
      };

      const reader = new FileReader();
      reader.readAsDataURL(values?.file);

      reader.onload = () => {
        console.log(reader.result);
        metadata = { ...metadata, file: reader.result };
        dispatch(archaeologicalDataAdd(metadata));
      };

      setIsModalOpen(false);
      form.resetFields();
      displayMessage(SUCCESS_MSG_TYPE, "Data added successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("editData", editData);
    if (Object.keys(editData).length) {
      form.setFieldsValue({ ...editData });
    }
  }, [editData]);

  return (
    <Modal
      maskClosable={false}
      title="Add New data"
      open={isModalOpen}
      footer={false}
      onCancel={() => {
        if (isLoading) return;
        setIsModalOpen(false);
      }}
      className="AddnewDataModal"
      width={800}
    >
      <Spin spinning={isLoading}>
        <Card>
          <Form
            name="basic"
            form={form}
            style={{
              width: "100%",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item>
              <Form.Item
                name="file"
                valuePropName="originFileObj"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger
                  multiple={false}
                  maxCount={1}
                  name="files"
                  action={"/api/file"}
                  accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps"
                  beforeUpload={(file) => {
                    if (file?.size > 1048576) {
                      message.error(
                        `${file.name} maximum file size should be 1MB.`
                      );
                      return Upload.LIST_IGNORE;
                    } else {
                      return file;
                    }
                  }}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your Description!",
                },
              ]}
            >
              <TextArea placeholder="Description" rows={4} />
            </Form.Item>

            <Form.Item
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please input your location!",
                },
              ]}
            >
              <Input placeholder="Latitude,Longitude" />
              <span>
                eg. 28.551555 , 77.239154 (Comma seperated Latitude and
                Longitude )
              </span>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={isLoading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </Modal>
  );
}
