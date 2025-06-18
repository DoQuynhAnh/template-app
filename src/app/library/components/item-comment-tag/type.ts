import { TagComment } from '@/model/app';

export type ItemTagProps = {
  tag: TagComment;
  selected?: boolean;
  onPress?: () => void;
};
