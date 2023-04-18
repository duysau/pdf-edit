import { Button, Card, Col, Row } from "antd";
import { Attachments } from "components/PdfEditor/Attractment";
import { DrawingModal } from "components/PdfEditor/DrawingModal";
import { EmptyComponent } from "components/PdfEditor/Empty";
import { MenuBar } from "components/PdfEditor/MenuBar";
import { Page } from "components/PdfEditor/Page";
import { AttachmentTypes } from "entities";
import { useAttachments } from "hooks/useAttractments";
import { Pdf, usePdf } from "hooks/usePdf";
import { UploadTypes, useUploader } from "hooks/useUploader";
import { useLayoutEffect, useState } from "react";
import { Container } from "reactstrap";
import { ggID } from "ultis/helper";

const PdfPage = () => {
  const [drawingModalOpen, setDrawingModalOpen] = useState(false);
  const {
    file,
    initialize,
    pageIndex,
    isMultiPage,
    isFirstPage,
    isLastPage,
    currentPage,
    isSaving,
    savePdf,
    previousPage,
    nextPage,
    setDimensions,
    name,
    dimensions,
  } = usePdf();
  const {
    add: addAttachment,
    allPageAttachments,
    pageAttachments,
    reset: resetAttachments,
    update,
    remove,
    setPageIndex,
  } = useAttachments();

  const initializePageAndAttachments = (pdfDetails: Pdf) => {
    initialize(pdfDetails);
    const numberOfPages = pdfDetails.pages.length;
    resetAttachments(numberOfPages);
  };

  const {
    inputRef: pdfInput,
    handleClick: handlePdfClick,
    isUploading,
    onClick,
    upload: uploadPdf,
  } = useUploader({
    use: UploadTypes.PDF,
    afterUploadPdf: initializePageAndAttachments,
  });
  const {
    inputRef: imageInput,
    handleClick: handleImageClick,
    onClick: onImageClick,
    upload: uploadImage,
  } = useUploader({
    use: UploadTypes.IMAGE,
    afterUploadAttachment: addAttachment,
  });

  const addText = () => {
    const newTextAttachment: TextAttachment = {
      id: ggID(),
      type: AttachmentTypes.TEXT,
      x: 0,
      y: 0,
      width: 120,
      height: 25,
      size: 16,
      lineHeight: 1.4,
      fontFamily: "Times-Roman",
      text: "Enter Text Here",
    };
    addAttachment(newTextAttachment);
  };

  const addDrawing = (drawing?: {
    width: number;
    height: number;
    path: string;
  }) => {
    if (!drawing) return;

    const newDrawingAttachment: DrawingAttachment = {
      id: ggID(),
      type: AttachmentTypes.DRAWING,
      ...drawing,
      x: 0,
      y: 0,
      scale: 1,
    };
    addAttachment(newDrawingAttachment);
  };

  useLayoutEffect(() => setPageIndex(pageIndex), [pageIndex, setPageIndex]);

  const hiddenInputs = (
    <>
      <input
        data-testid="pdf-input"
        ref={pdfInput}
        type="file"
        name="pdf"
        id="pdf"
        accept="application/pdf"
        onChange={uploadPdf}
        onClick={onClick}
        style={{ display: "none" }}
      />
      <input
        ref={imageInput}
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onClick={onImageClick}
        style={{ display: "none" }}
        onChange={uploadImage}
      />
    </>
  );

  const handleSavePdf = () => savePdf(allPageAttachments);

  return (
    <Container style={{ margin: 30 }}>
      {hiddenInputs}
      <MenuBar
        openHelp={() => setHelpModalOpen(true)}
        savePdf={handleSavePdf}
        addText={addText}
        addImage={handleImageClick}
        addDrawing={() => setDrawingModalOpen(true)}
        savingPdfStatus={isSaving}
        uploadNewPdf={handlePdfClick}
        isPdfLoaded={!!file}
      />

      {!file ? (
        <EmptyComponent loading={isUploading} uploadPdf={handlePdfClick} />
      ) : (
        <Row>
          <Col span={3}>
            {isMultiPage && !isFirstPage && (
              <Button icon="angle left" onClick={previousPage} />
            )}
          </Col>
          <Col span={10}>
            {currentPage && (
              <Card>
                <div style={{ position: "relative" }}>
                  <Page
                    dimensions={dimensions}
                    updateDimensions={setDimensions}
                    page={currentPage}
                  />
                  {dimensions && (
                    <Attachments
                      pdfName={name}
                      removeAttachment={remove}
                      updateAttachment={update}
                      pageDimensions={dimensions}
                      attachments={pageAttachments}
                    />
                  )}
                </div>
              </Card>
            )}
          </Col>
          <Col span={3}>
            {isMultiPage && !isLastPage && (
              <Button icon="angle right" onClick={nextPage} />
            )}
          </Col>
        </Row>
      )}
      <DrawingModal
        open={drawingModalOpen}
        dismiss={() => setDrawingModalOpen(false)}
        confirm={addDrawing}
      />
    </Container>
  );
};

export default PdfPage;
