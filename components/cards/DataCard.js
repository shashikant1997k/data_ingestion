import { DeleteOutlined, FolderViewOutlined } from "@ant-design/icons";
import {
  archaeologicalDataClear,
  archaeologicalDataDelete,
} from "@redux/archaeologicalDataSlice";
import { Card, Image, Popconfirm, Row, Spin, Typography } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useDispatch } from "react-redux";
const { Meta } = Card;

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function DataCard({ cardItem }) {
  const router = useRouter();
  const { name, description, fileType, location, file, id } = cardItem;
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const deleteData = (_id) => {
    console.log("_id", _id);
    dispatch(archaeologicalDataDelete(_id));
  };

  return (
    <Card
      // title={
      //   <div style={{ display: "flex", justifyContent: "space-between" }}>
      //     <div>{name}</div>
      //     <div style={{ fontSize: "12px" }}>{location}</div>
      //   </div>
      // }
      className="w-100"
      actions={[
        <FolderViewOutlined
          key="view"
          onClick={() => router.push(`/details/${id}`)}
        />,
        <Popconfirm
          title="Delete"
          description="Are you sure to delete?"
          onConfirm={() => deleteData(id)}
          okText="Yes"
          cancelText="No"
          key="delete"
        >
          <DeleteOutlined />
        </Popconfirm>,
      ]}
      key={id}
    >
      <div className="pdfWrapper pt-2 w-100">
        <Row justify={"center"}>
          {fileType.includes("image") ? (
            <Spin spinning={isLoading}>
              <Image className="antImg" preview={false} alt={name} src={file} />
            </Spin>
          ) : fileType.includes("pdf") ? (
            <div id="PdfContainer">
              <Document
                className={"PDFDocument"}
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.from({ length: numPages }, (_, index) => (
                  <Page
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    className={`PDFPage PDFPageOne`}
                    renderInteractiveForms={false}
                  />
                ))}
              </Document>
            </div>
          ) : null}
        </Row>
      </div>
      <div className="mt-3">
        <Meta
          title={name}
          description={
            <Typography.Paragraph
              ellipsis={{
                rows: 2,
                expandable: "collapsible",
                expanded,
                onExpand: (_, info) => setExpanded(info.expanded),
              }}
            >
              {description}
            </Typography.Paragraph>
          }
        />
      </div>
    </Card>
  );
}
