import { Launch16, Store16 } from "@carbon/icons-react";
import classNames from "classnames";
import { useRef } from "react";
import { utilService } from "core/services/common-services/util-service";
import "./SwitcherPanel.scss";

const SwitcherPanel = (props: any) => {
  const { handleCloseRightBar } = props;
  const ref: any = useRef();

  utilService.useClickOutside(ref, handleCloseRightBar);
  return (
    <div className="switcher-container" ref={ref}>
      <div className={classNames(`switcher-wrapper`)}>
        <div className="switcher-divider" />
        <div className="switcher-content">
          <div className="switcher-list">
            <div className="switcher-item m-t--sm m-b--2xl">
              <div className="switcher-item__header">Label</div>
              <div className="switcher-divider__header" />
              <div className="switcher-item__site  d-flex align-items-center ">
                <div className="switcher-item__site-detail">
                  <Store16 className="m-r--xxs" />
                  <span>Sale Loop</span>
                </div>
              </div>
              <div className="switcher-item__site d-flex align-items-center ">
                <div className="switcher-item__site-detail">
                  <Store16 className="m-r--xxs" />
                  <span>Sale Loop</span>
                </div>
              </div>
              <div className="switcher-item__site  d-flex align-items-center">
                <div className="switcher-item__site-detail">
                  <Store16 className="m-r--xxs" />
                  <span>Sale Loop</span>
                </div>
              </div>
            </div>
            <div className="switcher-item m-t--sm">
              <div className="switcher-item__header  d-flex align-items-center ">
                Label
              </div>
              <div className="switcher-divider__header" />
              <div className="switcher-item__site  d-flex align-items-center ">
                <div className="switcher-item__site-detail">
                  <Store16 className="m-r--xxs" />
                  <span>Sale Loop</span>
                </div>
              </div>
              <div className="switcher-item__site  d-flex align-items-center ">
                <div className="switcher-item__site-detail">
                  <span>Sale Loop</span>
                </div>
              </div>
              <div className="switcher-item__site d-flex align-items-center ">
                <div className="switcher-item__site-detail">
                  <Store16 className="m-r--xxs" />
                  <span>Sale Loop</span>
                </div>
              </div>
            </div>
            <div className="switcher-item m-t--sm">
              <div className="switcher-item__header">Label</div>
              <div className="switcher-divider__header" />
              <div className="switcher-item__site d-flex align-items-center ">
                <div className="switcher-item__site-detail">
                  <Store16 className="m-r--xxs" />
                  <span>Sale Loop</span>
                </div>
              </div>
              <div className="switcher-item__site  d-flex align-items-center">
                <div className="switcher-item__site-detail">
                  <Store16 className="m-r--xxs" />
                  <span>Sale Loop</span>
                </div>
              </div>
              <div className="switcher-item__site  d-flex align-items-center ">
                <div className="switcher-item__site-detail">
                  <Store16 className="m-r--xxs" />
                  <span>Sale Loop</span>
                </div>
              </div>
            </div>
          </div>
          <div className="switcher-footer d-flex align-items-center p--sm ">
            Tất cả
            <Launch16 className="m-l--xxxs" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitcherPanel;
