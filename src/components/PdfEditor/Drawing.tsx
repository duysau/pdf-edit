import { DeleteOutlined } from "@ant-design/icons";
import React, { RefObject } from "react";

interface Props {
  path?: string;
  stroke?: string;
  width: number;
  height: number;
  strokeWidth?: number;
  positionTop: number;
  positionLeft: number;
  dimmerActive: boolean;
  cancelDelete: () => void;
  deleteDrawing: () => void;
  onClick: () => void;
  svgRef: RefObject<SVGSVGElement>;
  handleMouseDown: DragEventListener<HTMLDivElement>;
  handleMouseUp: DragEventListener<HTMLDivElement>;
  handleMouseMove: DragEventListener<HTMLDivElement>;
  handleMouseOut: DragEventListener<HTMLDivElement>;
}
export const Drawing: React.FC<Props> = ({
  dimmerActive,
  cancelDelete,
  deleteDrawing,
  positionTop,
  positionLeft,
  width,
  height,
  svgRef,
  path,
  stroke,
  strokeWidth,
  handleMouseDown,
  handleMouseMove,
  handleMouseOut,
  handleMouseUp,
  onClick,
}) => {
  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
      onDoubleClick={onClick}
      style={{
        position: "absolute",
        top: positionTop,
        left: positionLeft,
        width,
        height,
      }}
    >
      <svg ref={svgRef} cursor={"move"}>
        <path
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke={stroke}
          fill="none"
          d={path}
        />
      </svg>
      <DeleteOutlined
        style={{ position: "absolute", cursor: "pointer" }}
        onClick={deleteDrawing}
      />
    </div>
  );
};
