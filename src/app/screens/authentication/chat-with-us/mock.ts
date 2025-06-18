import { Message } from '@model/chat';

const data: Array<Message> = [
  {
    type: 'TEXT',
    text: 'Chào shop, tôi muốn mua hàng',
    mine: true,
  },
  {
    type: 'TEXT',
    text: 'Chào bạn',
    mine: false,
  },
  {
    type: 'TEXT',
    text: 'Bạn muốn mua sản phẩm gì bên mình?',
    mine: false,
  },
  {
    type: 'TEXT',
    text: 'Mình cần trao đổi thêm về đơn hàng đã đặt. Và mua thêm một vài sản phẩm khuyến mại, deal giá',
    mine: true,
  },
  {
    type: 'IMAGE',
    image:
      'https://images.unsplash.com/photo-1666845524565-11c4f0f99f22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    mine: false,
  },
  {
    type: 'IMAGE',
    image:
      'https://images.unsplash.com/photo-1666845524565-11c4f0f99f22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    mine: true,
  },
];

export const messages = data.reverse();
