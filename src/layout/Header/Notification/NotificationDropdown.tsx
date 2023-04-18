import { Email24, EmailNew16, Launch16 } from "@carbon/icons-react";
import { Switch } from "antd";
import classNames from "classnames";
import { formatDateTimeFromNow } from "core/helpers/date-time";
import "moment/min/locales";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { utilService } from "core/services/common-services/util-service";
import { data } from "./Data";
import "./NotificationDropdown.scss";

const NotificationDropdown = (props: any) => {
  const [translate] = useTranslation();
  const ref: any = useRef();
  const { setActive } = props;
  utilService.useClickOutside(ref, () => setActive(false));

  return (
    <div className="notification-container" ref={ref}>
      <div className="notification-menu-wrapper">
        <div className="notification-menu__header">
          <div className="notification-menu__header-title">
            {translate("general.notification.title")}
          </div>
          <div>
            <span className="m-r--xxs">
              {translate("general.notification.unread")}
            </span>
            <Switch className="notification-menu__switch" size="small" />
          </div>
        </div>
        <div className="notification-content">
          <div className="notification-list__wrapper">
            {data && data?.length > 0 ? (
              data?.map((notification: any, index: number) => (
                <div key={index}>
                  <div
                    className={classNames("notification-item", {
                      "notification-item__unread": notification.unread === true,
                    })}
                  >
                    <div className="notification-item__info">
                      <div className="notification-item__title">
                        <span className="notification-item__title-web">
                          {notification?.titleWeb}{" "}
                        </span>

                        <span className="notification-item__time">
                          {formatDateTimeFromNow(notification?.time, "vi")}
                        </span>
                      </div>

                      <div className="notification-item__content">
                        {notification?.contentWeb}
                      </div>
                      <div className="notification-item__site">Tên phân hệ</div>
                    </div>

                    {!(notification.unread === true) && (
                      <div className="notification-item__icon">
                        <EmailNew16 />
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ height: "inherit" }}
                >
                  {translate("general.notification.noData")}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="notification-menu__footer d-flex align-items-center justify-content-between">
          <div className="notification-menu__footer-view d-flex">
            {translate("general.notification.viewAll")}
            <Launch16 className="m-l--xxxs" />
          </div>

          <div className="notification-menu__footer-icon d-flex">
            <Email24 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDropdown;
