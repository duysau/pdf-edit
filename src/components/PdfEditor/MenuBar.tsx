import { Button, Col, Dropdown, MenuProps, Row } from "antd";
import React from "react";

interface Props {
  uploadNewPdf: () => void;
  addText: () => void;
  addImage: () => void;
  addDrawing: () => void;
  isPdfLoaded: boolean;
  savingPdfStatus: boolean;
  savePdf: () => void;
  coordinates: { x: number; y: number };
  isHaveAttachments: boolean;
}

export const MenuBar: React.FC<Props> = ({
  uploadNewPdf,
  addDrawing,
  addText,
  addImage,
  isPdfLoaded,
  savingPdfStatus,
  savePdf,
  coordinates,
  isHaveAttachments,
}) => {
  const items: MenuProps["items"] = [
    {
      label: <p onClick={addText}>Add text</p>,
      key: "0",
    },
    {
      label: <p onClick={addImage}>Add Image</p>,
      key: "1",
    },
    {
      label: <p onClick={addDrawing}>Add Drawing</p>,
      key: "3",
    },
  ];
  return (
    <Row justify={"center"}>
      <Col className="gutter-row" span={2}>
        <div>PDF Editor</div>
      </Col>
      {isPdfLoaded && (
        <>
          {isHaveAttachments && (
            <Col className="gutter-row" span={3}>
              X: {coordinates.x} Y {coordinates.y}
            </Col>
          )}
          <Col className="gutter-row" span={2}>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <p onClick={(e) => e.preventDefault()}>
                <Button>Action</Button>
              </p>
            </Dropdown>
          </Col>

          <Col className="gutter-row" span={2}>
            <Button disabled={savingPdfStatus} onClick={savePdf}>
              {savingPdfStatus ? "Saving..." : "Save"}
            </Button>
          </Col>
          <Col className="gutter-row" span={3}>
            <Button onClick={uploadNewPdf}>Upload New</Button>
          </Col>
          <Col className="gutter-row" span={3}>
            <Button>Image drag drop</Button>
          </Col>
        </>
      )}
    </Row>
  );
};
