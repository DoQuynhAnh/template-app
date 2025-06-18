import { useRef, useState } from 'react';

import { useMounted } from '@hooks';

import { ReloadByStateProps } from './type';
import { Loading } from '../post-delay/loading';

export const ReloadByState = ({
  children,
  reloadState,
  delayMs = 150,
}: ReloadByStateProps) => {
  // state
  const [loading, setLoading] = useState<boolean>(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  // effect
  useMounted(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current as NodeJS.Timeout);
    }
    setLoading(true);
    timeoutId.current = setTimeout(() => {
      setLoading(false);
    }, delayMs);
  }, [reloadState]);

  // render
  // eslint-disable-next-line react/react-in-jsx-scope
  return loading ? <Loading /> : children;
};
