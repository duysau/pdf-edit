interface W3Color {
  toRgb: () => { r: number; b: number; g: number; a: number };
}

export declare interface Window {
  w3color: (
    color: Record<string, unknown> | string,
    element?: HTMLElement
  ) => W3Color;
}

export type AttachmentType = "image" | "text" | "drawing";

export interface AttachmentBase {
  id: () => number;
  width: number;
  height: number;
  x: number;
  y: number;
  type: AttachmentType;
}
export interface ImageAttachment extends AttachmentBase {
  file: File;
  img: HTMLImageElement;
}

export interface DrawingAttachment extends AttachmentBase {
  path?: string;
  scale?: number;
  stroke?: string;
  strokeWidth?: number;
}

export interface TextAttachment extends AttachmentBase {
  text?: string;
  fontFamily?: string;
  size?: number;
  lineHeight?: number;
  lines?: string[];
}

export interface Dimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Attachment = ImageAttachment | DrawingAttachment | TextAttachment;

export type Attachments = Attachment[];

export type DragEventListener<T> = (e: React.MouseEvent<T>) => void;
