import React, { ReactNode } from "react";
import { Breadcrumb } from "antd";
import classNames from "classnames";
import "./PageHeader.scss";

export interface PageHeaderProps {
  title?: string;
  breadcrumbItems?: string[];
  children?: ReactNode;
  className?: string;
}

const PageHeader = (props: PageHeaderProps) => {
  const { title, breadcrumbItems } = props;
  return (
    <div className={classNames("page-header", props.className)}>
      <div className="p-l--2xl p-t--sm p-b--sm">
        {breadcrumbItems && breadcrumbItems?.length > 0 && (
          <div className="page-header__breadcrumb p-b--xxs">
            <Breadcrumb>
              {breadcrumbItems.map((item, index) => (
                <Breadcrumb.Item
                  key={index}
                  className={classNames({
                    "page-header__breadcrumb-active":
                      index === breadcrumbItems.length - 1,
                  })}
                >
                  {item}
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </div>
        )}
        <div className="page-header__title">{title}</div>
      </div>
    </div>
  );
};

export default PageHeader;
