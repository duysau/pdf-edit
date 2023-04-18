import { ReactNode } from "react";

interface LayoutMasterContentProps {
  children?: ReactNode;
}
const LayoutMasterContent = (props: LayoutMasterContentProps) => {
  const { children } = props;

  return <div className="page-master__content-table">{children}</div>;
};

export default LayoutMasterContent;
