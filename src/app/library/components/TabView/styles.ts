import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  activeItem: {
    borderBottomWidth: 2,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: '100%',
  },
  label: {
    marginBottom: 1.5,
    marginTop: 3,
  },
  scene: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  tab: {
    alignItems: 'center',
    flex: 1,
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
