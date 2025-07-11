import { TOKEN, TokenType } from '@/library/auth/utils';
import { getItem } from '@/library/storage';
import { createContext, useCallback, useContext, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const API_URL = 'https://pet-api-dev.vfmtech.vn/chat';
export const useSocket = () => {
  // state
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  // function
  const socketDisconnect = useCallback(() => {
    if (socket) {
      socket.offAny();
      socket.disconnect();
      setSocket(undefined);
    }
  }, [socket]);

  const socketInit = useCallback(() => {
    const accessToken: TokenType | null = getItem(TOKEN);

    const client = io(API_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: 9999999,
      forceNew: true,
      auth: {
        token: accessToken?.access,
      },
    });
    client.on('connection-success', () => {
      console.log('Connected', client.connected);
    });
    console.log({ client }, 'client');

    setSocket(client);
  }, []);

  const socketOff = useCallback(
    (event?: string, listener?: any) => {
      if (socket) {
        socket.off(event, listener);
      }
    },
    [socket],
  );

  const socketListen = useCallback(
    (event: string, listener: (...args: any[]) => void) => {
      if (socket) {
        socket.on(event, listener);
      }
    },
    [socket],
  );

  // result
  return { socket, socketInit, socketOff, socketListen, socketDisconnect };
};

type SocketContext = {
  socket: Socket | undefined;
  socketOff: (event?: string, listener?: any) => void;
  socketListen: (event: string, listener: (...args: any[]) => void) => void;
  socketInit: () => void;
  socketDisconnect: () => void;
};

export const SocketIoContext = createContext<SocketContext>(
  {} as SocketContext,
);
export const SocketProvider = SocketIoContext.Provider;
export const useSocketContext = () => useContext(SocketIoContext);
