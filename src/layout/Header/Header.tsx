import {
  Close20,
  Loop24,
  Menu20,
  Notification20,
  Settings20,
  Switcher20,
  UserAvatar20,
} from "@carbon/icons-react";
import { Dropdown } from "antd";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import SwitcherPanel from "../SwitcherPanel/SwitcherPanel";
import "./Header.scss";
import InputSearchHeader from "./InputSearchHeader/InputSearchHeader";
import Navbar from "./Navbar/Navbar";
import NotificationDropdown from "./Notification/NotificationDropdown";
import Profile from "./Profile/Profile";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("currentUserInfo"));

  const [toggleNavbar, setToggleNavbar] = React.useState(true);
  const [show, setShow] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<boolean>(false);
  const [activeProfile, setActiveProfile] = React.useState<boolean>(false);

  const handleClickFocusNoti = React.useCallback(() => {
    setActive(!active);
    if (activeProfile) setActiveProfile(false);
  }, [active, activeProfile]);

  const handleClickFocusProfile = React.useCallback(() => {
    setActiveProfile(!activeProfile);
    if (active) setActive(false);
  }, [active, activeProfile]);

  const handleShowRightBar = React.useCallback(() => {
    setShow(true);
    if (activeProfile) setActiveProfile(false);
    if (active) setActive(false);
  }, [active, activeProfile]);

  const handleCloseRightBar = React.useCallback(() => {
    setShow(false);
  }, []);

  return (
    <header className="header-wrapper">
      <div className="header-box">
        <div className="header-box__logo">
          <button
            className="header-box__btn header-box__btn-toggle"
            data-toggle="collapse"
            data-target="#topnav-menu-content"
            onClick={() => setToggleNavbar(!toggleNavbar)}
          >
            <Menu20 />
          </button>
          <div className="header-logo">
            <Link to="/" className="header-logo__link">
              <span className="header-logo__icon">
                <Loop24 />
              </span>
              <span className="header-logo__title">Logo</span>
            </Link>
          </div>
        </div>
        <div className="header-navbar d-flex align-items-center">
          <Navbar isOpen={toggleNavbar} />
        </div>
      </div>

      <div className="header-action">
        <InputSearchHeader />
        <button className="header-box__btn">
          <Settings20 />
        </button>

        <Dropdown
          dropdownRender={() => <NotificationDropdown setActive={setActive} />}
          trigger={["click"]}
          placement="bottom"
          open={active}
        >
          <button
            className={classNames("switcher-box__btn", {
              "header-box__btn-noti": active,
              "": !active,
            })}
            onClick={handleClickFocusNoti}
          >
            <Notification20 />
          </button>
        </Dropdown>

        <Dropdown
          dropdownRender={() => (
            <Profile user={user} setActiveProfile={setActiveProfile} />
          )}
          trigger={["click"]}
          placement="bottom"
          open={activeProfile}
        >
          <button
            className={classNames("switcher-box__btn", {
              "header-box__btn-profile": activeProfile,
              "": !activeProfile,
            })}
            onClick={handleClickFocusProfile}
          >
            <UserAvatar20 />
          </button>
        </Dropdown>

        <Dropdown
          dropdownRender={() => (
            <SwitcherPanel handleCloseRightBar={handleCloseRightBar} />
          )}
          trigger={["click"]}
          placement="bottom"
          open={show}
        >
          {!show ? (
            <button className="switcher-box__btn" onClick={handleShowRightBar}>
              <Switcher20 />
            </button>
          ) : (
            <button
              className="switcher-box__btn switcher-box__btn-close"
              onClick={handleCloseRightBar}
            >
              <Close20 />
            </button>
          )}
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
