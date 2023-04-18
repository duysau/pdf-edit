import { ReactNode } from "react";
import LayoutDetailFooter from "./LayoutDetailFooter";

interface LayoutDetailProps {
  children?: ReactNode;
}
const LayoutDetail = (props: LayoutDetailProps) => {
  const { children } = props;

  return (
    <div className="page page-detail p-t--lg p-l--xxl p-r--xxl p-b--lg">
      {children}
    </div>
  );
};
LayoutDetail.Footer = LayoutDetailFooter;

export default LayoutDetail;
