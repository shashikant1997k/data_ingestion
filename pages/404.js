import DashboardLayout from "@components/layout/DashboardLayout";
import { Button, Result } from "antd";
import React from "react";

export default function PageNotfound() {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button href="/" type="primary">
            Back Home
          </Button>
        }
      />
    </div>
  );
}

PageNotfound.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
