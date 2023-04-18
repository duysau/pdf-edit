import { ReactNode } from "react";
import LayoutMasterActions from "./LayoutMasterActions";
import LayoutMasterContent from "./LayoutMasterContent";
import LayoutMasterTitle from "./LayoutMasterTitle";

interface LayoutMasterProps {
  children?: ReactNode;
}
const LayoutMaster = (props: LayoutMasterProps) => {
  const { children } = props;

  return (
    <div className="page page-master m-l--sm m-r--2xl m-b--sm">{children}</div>
  );
};
LayoutMaster.Title = LayoutMasterTitle;
LayoutMaster.Actions = LayoutMasterActions;
LayoutMaster.Content = LayoutMasterContent;

export default LayoutMaster;
