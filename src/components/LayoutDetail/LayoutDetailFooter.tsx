import { ReactNode } from "react";

interface LayoutDetailFooterProps {
  children?: ReactNode;
}
const LayoutDetailFooter = (props: LayoutDetailFooterProps) => {
  const { children } = props;

  return (
    <footer className="app-footer">
      <div className="app-footer__full d-flex justify-content-end align-items-center">
        {children}
      </div>
    </footer>
  );
};

export default LayoutDetailFooter;
