import { OverflowMenuVertical20 } from "@carbon/icons-react";
import { AppStateContext } from "app/AppContext";
import { Menu } from "config/menu";
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Collapse } from "reactstrap";
import type { AppState } from "core/services/common-services/authorization-service";
import "./Navbar.scss";
import NavbarItem from "./NavbarItem/NavbarItem";

interface NabarProps {
  isOpen?: boolean;
}

const isDescendant = (parent: HTMLElement, child: HTMLElement) => {
  var node = child.parentNode;
  while (node != null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

const Navbar = (props: NabarProps) => {
  const { isOpen } = props;
  const appState = useContext<AppState>(AppStateContext);
  const [menuDropdown, setMenuDropdown] = React.useState<any>([]);
  const [activeCurrent, setActiveCurrent] = React.useState<any>();
  const history = useHistory();

  const menu = React.useMemo(() => {
    return appState &&
      appState.authorizedMenus &&
      appState.authorizedMenus.length > 0
      ? appState.authorizedMenus
      : [];
  }, [appState]);

  const activateParentDropdown = React.useCallback(
    (item: any, rootNode: HTMLElement) => {
      item.classList.add("active");
      const parent = item.parentElement;
      if (parent && isDescendant(rootNode, parent)) {
        activateParentDropdown(parent, rootNode);
      } else return false;
    },
    []
  );

  const unActivateParentDropdown = React.useCallback(
    (item: any, rootNode: HTMLElement) => {
      item.classList.remove("active");
      const parent = item.parentElement;
      if (parent && isDescendant(rootNode, parent)) {
        unActivateParentDropdown(parent, rootNode);
      } else return false;
    },
    []
  );

  const handleActiveMenu = React.useCallback(
    (path: string) => {
      var matchingMenuItem = null;
      var ul = document.getElementById("navigation") as HTMLElement;
      var items = ul.getElementsByTagName("a");
      for (var i = 0; i < items.length; ++i) {
        var regex = new RegExp("^" + items[i].pathname);
        if (regex.test(path)) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (activeCurrent) {
        unActivateParentDropdown(activeCurrent, ul);
      }
      if (matchingMenuItem) {
        setActiveCurrent(matchingMenuItem);
        activateParentDropdown(matchingMenuItem, ul);
      }
    },
    [activateParentDropdown, activeCurrent, unActivateParentDropdown]
  );

  useEffect(() => {
    return history.listen((location: any) => {
      handleActiveMenu(location.pathname);
    });
  }, [handleActiveMenu, history]);

  useEffect(() => {
    if (menu && menu.length) {
      handleActiveMenu(window.location.pathname);
    }
  }, [handleActiveMenu, menu]);

  React.useEffect(() => {
    if (window.screen.width < 1920) {
      const maxContainer = 720;
      const maxItem = 180;
      const index = Math.floor(maxContainer / maxItem);
      const menuDropDown = index > 0 ? menu.slice(index, menu?.length) : [];
      setMenuDropdown(menuDropDown);
    } else {
      var items: any = document.getElementsByClassName("nav-item");
      let sum: number = 0;
      let maxContainerr = 1080;
      setTimeout(() => {
        for (let i = 0; i < items.length; i++) {
          let element = items[i];
          sum += element.offsetWidth;
          if (sum > 1080) {
            const maxContainer = sum - items[i].offsetWidth;
            maxContainerr = maxContainer;
            document.getElementById(
              "navigation"
            ).style.maxWidth = `${maxContainer}px`;
            break;
          }
        }
      }, 500);

      const maxItem = 180;
      const index = Math.floor(maxContainerr / maxItem);
      const menuDropDown = index > 0 ? menu.slice(index, menu?.length) : [];
      setMenuDropdown(menuDropDown);
    }
  }, [menu]);

  return (
    <React.Fragment>
      <div className={`navbar-wrapper d-flex align-items-center`}>
        <nav className="navbar-container" id="navigation">
          <Collapse
            isOpen={isOpen}
            className="navbar-collapse"
            id="topnav-menu-content"
          >
            <ul className="navbar-nav">
              {menu.map((item: Menu, index: number) => (
                <React.Fragment key={index}>
                  <NavbarItem index={index} item={item} />
                </React.Fragment>
              ))}
            </ul>
          </Collapse>
        </nav>
        <div>
          {menuDropdown && menuDropdown?.length > 0 && (
            <button className="navbar__dropdown-more">
              <OverflowMenuVertical20 />
            </button>
          )}

          <ul className="navbar-nav__dropdown">
            {menuDropdown &&
              menuDropdown?.length > 0 &&
              menuDropdown.map((item: Menu, index: number) => (
                <React.Fragment key={index}>
                  <NavbarItem item={item} index={index} />
                </React.Fragment>
              ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
