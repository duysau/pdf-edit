import React, { ReactNode } from "react";

interface LayoutMasterTitleProps {
  children?: ReactNode;
  title?: string;
  description?: string;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  visible?: boolean;
}
const LayoutMasterTitle = (props: LayoutMasterTitleProps) => {
  const { title, description } = props;

  return (
    <div className="page-master__info">
      <div className="page-master__title">{title}</div>
      <div className="page-master__des m-t--xxs">{description}</div>
    </div>
  );
};

export default LayoutMasterTitle;
