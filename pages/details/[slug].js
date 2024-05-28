import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Card, Col, Empty, Image, Row, Spin, Typography } from "antd";
import Head from "next/head";
import { Document, Page, pdfjs } from "react-pdf";
import DashboardLayout from "@components/layout/DashboardLayout";
import { useSelector } from "react-redux";
const { Meta } = Card;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function DetailsIndex() {
  const router = useRouter();
  const { archaeologicaList } = useSelector(
    (state) => state.archaeologicalDataList
  );
  const [isLoading, setIsLoading] = useState(false);
  const [dataCon, setDataCon] = useState({});
  const [expanded, setExpanded] = useState(false);

  const [numPages, setNumPages] = useState(null);
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  useEffect(() => {
    if (router.query.slug) {
      let item = archaeologicaList?.filter(
        (val) => val?.id == router.query.slug
      );
      setDataCon(item[0]);
    }
  }, [router.query.slug]);

  return (
    <>
      <Head>
        <title>NFT Details</title>
      </Head>
      <Spin spinning={isLoading}>
        <Row className="pt-2" justify={"center"}>
          <Col span={18} md={18} sm={24} xs={24}>
            {Object.keys(dataCon).length ? (
              <div className="pdfWrapper">
                {dataCon?.fileType.includes("image") ? (
                  <Card title={dataCon?.name}>
                    <Row justify={"center"}>
                      <Image
                        preview={false}
                        alt={dataCon?.name}
                        src={dataCon?.file}
                      />
                    </Row>

                    <div className="mt-3">
                      <Meta description={dataCon?.description} />
                    </div>
                  </Card>
                ) : dataCon?.fileType.includes("pdf") ? (
                  <Card title={dataCon?.name} style={{ width: "100%" }}>
                    <div id="PdfContainer">
                      <Document
                        className={"PDFDocument"}
                        file={dataCon?.file}
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
                    <div className="mt-3">
                      <Meta description={dataCon?.description} />
                    </div>
                  </Card>
                ) : null}
              </div>
            ) : (
              <Empty />
            )}
          </Col>
        </Row>
      </Spin>
    </>
  );
}

DetailsIndex.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
