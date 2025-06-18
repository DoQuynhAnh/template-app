export type Route = {
  key: string;
  titleT18n: I18nKeys;
};
export type ItemTabProps = {
  item: Route;
  onPress?: () => void;
  selected?: boolean;
};
