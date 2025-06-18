import { Screen } from '@/library/components/screen';
import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import debounce from 'debounce';
import HeaderSearch from './components/header-search';
import SearchEmpty from './components/search-empty';
import RecentSearches from './components/recent-searches';
import { searchProducts } from '../../../services/service-products/products.api';
import { useIsFocused } from '@react-navigation/native';

const Search = () => {
  const rootRef = useRef<View>(null);
  const { styles } = useStyles(styleSheet);

  const [valueSearch, setValueSearch] = React.useState('');
  const [debouncedValue, setDebouncedValue] = React.useState('');
  const { data, refetch, isFetching } = searchProducts(debouncedValue, false);
  const isFocused = useIsFocused();

  // Create debounced function
  const debouncedSetSearch = useCallback(
    debounce((text: string) => {
      setDebouncedValue(text);
    }, 500),
    [],
  );

  // Update the debounced value when valueSearch changes
  useEffect(() => {
    debouncedSetSearch(valueSearch);

    // Cleanup function to cancel any pending debounced calls when component unmounts
    return () => {
      debouncedSetSearch.clear();
    };
  }, [valueSearch, debouncedSetSearch]);

  // Handler for input changes
  const handleSearchChange = (text: string) => {
    setValueSearch(text);
  };

  useEffect(() => {
    if (debouncedValue) {
      refetch();
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (!isFocused) {
      setValueSearch('');
    }
  }, [isFocused]);

  const handleRender = () => {
    if (data?.hits?.length !== 0 && debouncedValue) {
      return (
        <RecentSearches
          isSearchResult
          isLoading={isFetching}
          searchResult={data?.hits ?? []}
        />
      );
    } else if (data?.hits?.length === 0 && debouncedValue) {
      return <SearchEmpty />;
    }
    return <RecentSearches isSearchResult={false} />;
  };

  return (
    <View collapsable={false} ref={rootRef} style={styles.root}>
      <Screen
        bottomInsetColor="transparent"
        statusBarStyle={'auto'}
        excludeEdges={['bottom']}
        backgroundColor={'transparent'}>
        <HeaderSearch onChangeText={handleSearchChange} />

        {handleRender()}
      </Screen>
    </View>
  );
};

const styleSheet = createStyleSheet(({ color }) => ({
  root: {
    backgroundColor: color.primaryWhite,
    flex: 1,
    paddingTop: 0,
  },
}));

export default Search;
