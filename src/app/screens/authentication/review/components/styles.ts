/* eslint-disable sortKeysFix/sort-keys-fix */
import { createStyleSheet } from 'react-native-unistyles';

export const styleSheet = createStyleSheet(({ color }) => ({
  activeFilterButton: {
    backgroundColor: color.primaryBase,
  },
  activeFilterText: {
    color: color.primaryWhite,
    fontSize: 14,
    fontWeight: '600',
  },
  averageContainer: {
    alignItems: 'center',
    borderRightColor: '#E6E8EC',
    borderRightWidth: 2,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  averageText: {
    color: color.Neutrals07,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  bar: {
    backgroundColor: color.dark150,
    borderRadius: 4,
    height: 8,
    zIndex: 1,
  },
  barBackground: {
    backgroundColor: color.bgLight01,
    borderRadius: 4,
    height: 8,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    height: 16,
    position: 'relative',
    justifyContent: 'space-between'
  },
  barCount: {
    color: color.Neutrals09,
    fontSize: 12,
    paddingLeft: 3,
    flex: 1,
    textAlign: 'right'
  },
  distributionContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  distributionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 4,
  },
  filterButton: {
    alignItems: 'center',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 12,
    paddingHorizontal: 15,
  },
  filterText: {
    fontSize: 16,
  },
  inactiveFilterButton: {
    backgroundColor: color.dark200,
  },
  inactiveFilterText: {
    color: color.Neutrals07,
    fontSize: 14,
    fontWeight: '600',
  },
  starFilterButton: {
    alignItems: 'center',
    backgroundColor: color.dark200,
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  starFilterContainer: {
    flexDirection: 'row',
    gap: 8,
    // justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 15,
    // width: Dimensions.get('window').width - 30,
    borderBottomColor: '#F4F5F6',
    borderBottomWidth: 8,
    paddingBottom: 15
  },
  starFilterText: {
    fontSize: 16,
    marginRight: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: 'auto',
  },
  topSection: {
    borderBottomColor: '#F4F5F6',
    borderBottomWidth: 8,
    flexDirection: 'row',
    padding: 15,
  },
  totalReviews: {
    color: color.Neutrals09,
    fontSize: 12,
  },
}));
