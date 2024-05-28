import { Col, Row, Space } from "antd";
import styles from "./PageHeader.module.scss";

export default function PageHeader() {
  return (
    <div className={styles.appHeader}>
      <Row align="bottom">
        <Col flex="auto"></Col>
        <Col>
          <Space size="large">
            <div className={styles.userInfoGrid}></div>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
