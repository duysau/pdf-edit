import { Row } from "antd";
import React, { ReactNode } from "react";
import { Button } from "react3l-ui-library";
import "./FilterPanel.scss";
import Left from "./Left";
import Right from "./Right";

interface FilterPanelProps {
  children?: ReactNode;
  width?: number;
  handleResetFilter?: () => void;
  handleAppplyFilter?: () => void;
  titleButtonCancel?: string;
  titleButtonApply?: string;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  visible?: boolean;
}
const FilterPanel = (props: FilterPanelProps) => {
  const {
    handleResetFilter,
    titleButtonCancel,
    handleAppplyFilter,
    titleButtonApply,
  } = props;

  const widthDefault = useWindowSize();
  function useWindowSize() {
    const [size, setSize] = React.useState<any>();
    React.useLayoutEffect(() => {
      function updateSize() {
        setSize(
          (document.querySelector(".btn-filter") as HTMLElement).offsetLeft
        );
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  return (
    <div
      className="filter-panel-container"
      style={{ width: widthDefault + 40 }}
    >
      <div className="filter-panel__wrapper" data-filter-direction="bottom">
        <Row>
          <div className="filter-panel__header">Bộ lọc</div>
        </Row>
        <Row className="p-t--lg filter-panel__content">{props.children}</Row>
        <Row className="p-t--lg filter-panel__actions d-flex align-items-center justify-content-end">
          <Button
            type="secondary"
            className="btn--xl btn-reset-filter"
            onClick={handleResetFilter}
          >
            <span>
              {titleButtonCancel ? titleButtonCancel : "Reset Filters"}
            </span>
          </Button>

          <Button
            type="primary"
            className="btn--xl btn-apply-filter"
            onClick={handleAppplyFilter}
          >
            <span>{titleButtonApply ? titleButtonApply : "Apply Filters"}</span>
          </Button>
        </Row>
      </div>
    </div>
  );
};
FilterPanel.Left = Left;
FilterPanel.Right = Right;

export default FilterPanel;
