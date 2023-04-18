import React from "react";
import { Button, Empty } from "antd";
interface Props {
  loading: boolean;
  uploadPdf: () => void;
}
export const EmptyComponent: React.FC<Props> = ({ loading, uploadPdf }) => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{ height: 60 }}
    description={
      <span>
        Customize <a href="#API">Description</a>
      </span>
    }
  >
    <Button type="primary" onClick={uploadPdf}>
      Create Now
    </Button>
  </Empty>
);
