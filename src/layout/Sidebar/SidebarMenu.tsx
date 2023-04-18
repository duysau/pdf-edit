import { Menu } from "config/menu";
import { NavLink } from "react-router-dom";
import "./Sidebar.scss";

interface SidebarMenuProps {
  item?: Menu;
  className?: string;
  style?: any;
  level?: any;
  listActiveMenu?: string[];
}

function SidebarMenu(props: SidebarMenuProps) {
  const { item, level, listActiveMenu } = props;

  return (
    <div
      tabIndex={0}
      className="sidebar__item"
      style={{ paddingLeft: (level - 1) * 16 }}
    >
      <NavLink
        exact
        to={item?.link}
        className="sidebar__item-link"
        style={props?.style}
        activeClassName={
          listActiveMenu?.length > 0 && item.link.includes(listActiveMenu[0])
            ? "active"
            : ""
        }
      >
        <span>{item?.name}</span>
      </NavLink>
    </div>
  );
}

export default SidebarMenu;
