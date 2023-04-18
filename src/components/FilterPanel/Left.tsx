import { Col } from "antd";

const Left = (props: any) => {
  return (
    <Col lg={4} className="filter-panel__left p-l--sm">
      {props?.children}
    </Col>
  );
};

export default Left;
