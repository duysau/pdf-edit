/*eslint-disable @typescript-eslint/no-unused-vars*/
import React, { useState, createRef, useEffect } from "react";
import { Color } from "../../entities";
import { Badge, Modal, Select } from "antd";

interface Props {
  open: boolean;
  dismiss: () => void;
  confirm: (drawing?: {
    width: number;
    height: number;
    path: string;
    strokeWidth: number;
    stroke: string;
  }) => void;
  drawing?: DrawingAttachment;
}

const strokeSizes = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];

const strokeColors = [
  {
    value: "black",
    label: <Badge style={{ width: "30px" }} color={"black"} />,
  },
  { value: "red", label: <Badge color={"red"} /> },
  { value: "green", label: <Badge color={"green"} /> },
  { value: "yellow", label: <Badge color={"yellow"} /> },
  { value: "blue", label: <Badge color={"blue"} /> },
  { value: "purple", label: <Badge color={"purple"} /> },
  { value: "cyan", label: <Badge color={"cyan"} /> },
  { value: "white", label: <Badge color={"white"} /> },
];

export const DrawingModal = ({ open, dismiss, confirm, drawing }: Props) => {
  const svgRef = createRef<SVGSVGElement>();
  const [paths, setPaths] = useState<Array<[string, number, number]>>([]);
  const [path, setPath] = useState((drawing && drawing.path) || "");
  const [svgX, setSvgX] = useState(0);
  const [svgY, setSvgY] = useState(0);
  const [minX, setMinX] = useState(Infinity);
  const [maxX, setMaxX] = useState(0);
  const [minY, setMinY] = useState(Infinity);
  const [maxY, setMaxY] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [stroke, setStroke] = useState(Color.BLACK);
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const { x, y } = svg.getBoundingClientRect();
    setSvgX(x);
    setSvgY(y);
  }, [svgRef]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMouseDown(true);

    const x = event.clientX - svgX;
    const y = event.clientY - svgY;
    setMinX(Math.min(minX, x));
    setMaxX(Math.max(maxX, x));
    setMinY(Math.min(minY, y));
    setMaxY(Math.max(maxY, y));
    setPath(path + `M${x},${y}`);
    setPaths([...paths, ["M", x, y]]);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!mouseDown) return;

    const x = event.clientX - svgX;
    const y = event.clientY - svgY;
    setMinX(Math.min(minX, x));
    setMaxX(Math.max(maxX, x));
    setMinY(Math.min(minY, y));
    setMaxY(Math.max(maxY, y));
    setPath(path + `L${x},${y}`);
    setPaths([...paths, ["L", x, y]]);
  };

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setMouseDown(false);
  };

  const resetDrawingBoard = () => {
    setPaths([]);
    setPath("");
    setMinX(Infinity);
    setMaxX(0);
    setMinY(Infinity);
    setMaxY(0);
    setStrokeWidth(5);
    setStroke(Color.BLACK);
    console.log("cac cccc");
  };

  const handleDone = () => {
    if (!paths.length) {
      confirm();
      return;
    }

    const boundingWidth = maxX - minX;
    const boundingHeight = maxY - minY;

    const dx = -(minX - 10);
    const dy = -(minY - 10);

    confirm({
      stroke,
      strokeWidth,
      width: boundingWidth + 20,
      height: boundingHeight + 20,
      path: paths.reduce(
        (fullPath, lineItem) =>
          `${fullPath}${lineItem[0]}${lineItem[1] + dx}, ${lineItem[2] + dy}`,
        ""
      ),
    });

    closeModal();
  };

  const closeModal = () => {
    resetDrawingBoard();
    dismiss();
  };

  const handleStrokeSelect = (color: Color) => () => {
    setStroke(color);
  };

  return (
    <Modal
      title="Add your Drawing"
      open={open}
      onCancel={closeModal}
      onOk={handleDone}
    >
      <Select
        defaultValue={strokeWidth}
        style={{ width: 120 }}
        onChange={(value) => setStrokeWidth(Number(value))}
        options={strokeSizes}
      />
      <Select defaultValue={stroke}>
        {Object.values(Color).map((color, index) => (
          <Select.Option value={color} key={color}>
            <div onClick={handleStrokeSelect(color)}>
              <Badge color={color} />
            </div>
          </Select.Option>
        ))}
      </Select>
      {/* <Select
        defaultValue={stroke}
        style={{ width: 120 }}
        onChange={(value) => setStroke(value)}
        options={strokeColors}
      /> */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <svg
          ref={svgRef}
          style={{
            width: "100%",
            height: "50vh",
          }}
        >
          <path
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke={stroke}
            fill="none"
            d={path}
          />
        </svg>
      </div>
    </Modal>
  );
};
