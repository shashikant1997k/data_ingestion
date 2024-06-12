import { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Card,
  Modal,
  Spin,
  Input,
  Upload,
  DatePicker,
} from "antd";
import { displayMessage } from "@utils/common";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@utils/hardData";
import { useDispatch, useSelector } from "react-redux";
import {
  archaeologicalDataAdd,
  archaeologicalDataEdit,
} from "@redux/archaeologicalDataSlice";
const { TextArea } = Input;
import { uid } from "uid";
import moment from "moment";
import dayjs from "dayjs";

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
  const [dateDiscv, setDateDiscv] = useState("");

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
      console.log(
        'moment(values?.dateOfDiscovery).format("DD-MM-YYYY")',
        moment(values?.dateOfDiscovery).format("DD-MM-YYYY")
      );
      let metadata = {
        id: Object.keys(editData).length ? editData?.id : uid(10),
        name: values?.name || editData?.name,
        description: values?.description || editData?.description,
        excavationDetails:
          values?.excavationDetails || editData?.excavationDetails,
        location:
          values?.location || editData?.location || "22.417803,78.516747",
        file: values?.file,
        fileType: values?.file?.type,
        createdBy: user?.email,
        dateOfDiscovery: dateDiscv ? dateDiscv : editData?.dateOfDiscovery,
      };

      if (Object.keys(editData).length) {
        if (values?.file) {
          const reader = new FileReader();
          reader.readAsDataURL(values?.file);

          reader.onload = () => {
            metadata = { ...metadata, file: reader.result };
            dispatch(archaeologicalDataEdit(metadata));
          };
        } else {
          metadata = {
            ...metadata,
            file: editData?.file,
            fileType: editData?.fileType,
          };
          dispatch(archaeologicalDataEdit(metadata));
        }
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(values?.file);

        reader.onload = () => {
          metadata = { ...metadata, file: reader.result };
          dispatch(archaeologicalDataAdd(metadata));
        };
      }

      setIsModalOpen(false);
      form.resetFields();
      displayMessage(
        SUCCESS_MSG_TYPE,
        Object.keys(editData).length
          ? "Data updated successfully"
          : "Data added successfully"
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (Object.keys(editData).length) {
      form.setFieldValue("name", editData?.name);
      form.setFieldValue("description", editData?.description);
      form.setFieldValue("location", editData?.location);
      form.setFieldValue("excavationDetails", editData?.excavationDetails);
      form.setFieldValue(
        "dateOfDiscovery",
        editData?.dateOfDiscovery
          ? dayjs(editData?.dateOfDiscovery, "DD-MM-YYYY")
          : dayjs()
      );
    }
  }, [editData]);

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setDateDiscv(dateString);
  };

  return (
    <Modal
      maskClosable={false}
      title="Add New data"
      open={isModalOpen}
      footer={false}
      onCancel={() => {
        if (isLoading) return;
        setIsModalOpen(false);
        form.resetFields();
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
                rules={[
                  {
                    required: true,
                    message:
                      "Please upload Photographs / Scanned documents / Research paper!",
                  },
                ]}
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
                    <br />
                    Photographs / Scanned documents / Research paper
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
                  message: "Please input your cultural context!",
                },
              ]}
            >
              <TextArea placeholder="Cultural Context" rows={4} />
            </Form.Item>
            <Form.Item
              name="excavationDetails"
              rules={[
                {
                  required: true,
                  message: "Please input your excavation details!",
                },
              ]}
            >
              <TextArea placeholder="Excavation details" rows={2} />
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
              <Input placeholder=" eg. 28.551555 , 77.239154 (Comma seperated Latitude and Longitude )" />
            </Form.Item>

            <Form.Item
              name="dateOfDiscovery"
              rules={[
                {
                  required: true,
                  message: "Please input Date of discovery!",
                },
              ]}
            >
              <DatePicker
                className="w-100"
                onChange={onDateChange}
                format={"DD-MM-YYYY"}
              />
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
