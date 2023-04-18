import { ChevronUp16 } from "@carbon/icons-react";
import React, { Fragment } from "react";
import { NavLink, useLocation } from "react-router-dom";

const SidebarItem = (props: any) => {
  const { item, listActiveMenu } = props;

  const location = useLocation();

  const [expanded, setExpand] = React.useState(
    location.pathname.includes(item?.link)
  );

  const handleExpand = React.useCallback((e) => {
    e.preventDefault();
    setExpand((expanded) => !expanded);
  }, []);

  return (
    <div className="sidebar__item">
      <div
        className="sidebar__sub-item"
        onClick={handleExpand}
        tabIndex={0}
        style={{ paddingLeft: props.level * 16 }}
        aria-expanded={expanded}
      >
        <span className="sidebar-item__parent-title">{item?.name}</span>
        <div className="sidebar__item-icon">
          <ChevronUp16 />
        </div>
      </div>
      {expanded && (
        <div className="sidebar__menu">
          {item?.children.map((menu: any, index: any) => {
            const key = `${item.label}-${index}`;

            if (menu?.children) {
              return (
                <Fragment key={key}>
                  <SidebarItem
                    item={{
                      ...menu,
                    }}
                    level={props.level + 1}
                  />
                </Fragment>
              );
            }

            return (
              <Fragment key={index}>
                {item.show && (
                  <div className={"sidebar__item"}>
                    <NavLink
                      exact
                      to={menu.link}
                      className="sidebar__item-link"
                      style={{ paddingLeft: (props.level + 1) * 16 }}
                      activeClassName={
                        listActiveMenu?.length > 0 &&
                        menu.link.includes(listActiveMenu[0])
                          ? "active"
                          : ""
                      }
                    >
                      <span>{menu?.name}</span>
                    </NavLink>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
