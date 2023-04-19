import React from "react";
import { Button } from "react3l-ui-library";

interface Props {
  onConfirm: () => void;
  onDismiss: () => void;
  title: string;
}

export const ConfirmContent: React.FC<Props> = ({
  title,
  onConfirm,
  onDismiss,
}) => (
  <div>
    <Button onClick={onDismiss}>No</Button>
    <Button onClick={onConfirm}>Yes</Button>
  </div>
);
