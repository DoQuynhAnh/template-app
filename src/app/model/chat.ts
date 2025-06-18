export enum MessageType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}
export type Message = {
  type: keyof typeof MessageType;
  text?: string;
  image?: string;
  mine?: boolean;
};
