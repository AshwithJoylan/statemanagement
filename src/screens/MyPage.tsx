import React, {useCallback, useEffect} from 'react';
import {Button, FlatList, StyleSheet, View} from 'react-native';
import type {ListRenderItem} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {dispatch} from '../features';
import {setMyFeeds} from '../features/feeds';
import {userFeedIdSelector} from '../features/selectors/feed.selector';
import ItemPure from '../components/FeedItem';
import {myFeeds} from '../data';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => {
  const navigation = useNavigation();
  const data = useSelector(userFeedIdSelector);
  const {bottom} = useSafeAreaInsets();

  useEffect(() => {
    if (data.length === 0) return;
    dispatch(setMyFeeds(myFeeds));
  }, []);

  const keyExtractor = useCallback((item: string) => `my-page-${item}`, []);

  const renderItem = useCallback<ListRenderItem<string>>(
    ({item: id}) => <ItemPure {...{id}} />,
    [],
  );

  const itemSeperator = useCallback(
    () => (
      <View
        style={{alignSelf: 'stretch', height: 1, backgroundColor: '#ccc'}}
      />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <Button
        title="Open Page"
        onPress={() => {
          navigation.dispatch(StackActions.push('Page'));
        }}
      />
      <FlatList
        ItemSeparatorComponent={itemSeperator}
        contentContainerStyle={{paddingBottom: bottom || 10}}
        {...{keyExtractor, data, renderItem}}
      />
    </View>
  );
};
