import { Asset } from 'react-native-image-picker';

export type ItemMediaProps = {
  media: Asset;
  onDelete?: () => void;
};
