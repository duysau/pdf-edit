import { Fragment } from "react";
import Body from "./Body/Body";
import Header from "./Header/Header";
import "./Layout.scss";

const Layout = (props: any) => {
  return (
    <Fragment>
      <div className="layout__container">
        <div className="layout-header">
          <Header></Header>
        </div>
        <div className="layout-body">
          <div className="layout-body__main">
            <Body>{props.children}</Body>
          </div>
        </div>
        {/* <div className="layout-footer">
          <Footer></Footer>
        </div> */}
      </div>
    </Fragment>
  );
};

export default Layout;
