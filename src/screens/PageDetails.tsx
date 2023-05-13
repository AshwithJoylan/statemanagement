import {useRoute} from '@react-navigation/native';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ItemPure from '../components/FeedItem';
import CommentItemPure from '../components/CommentItem';
import {createGetCommentsIdsSelector} from '../features/selectors/feed.selector';
import {dispatch} from '../features';
import {addComment} from '../features/feeds';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const CommentInput: FC<{
  id: string;
  isReply: string | undefined;
  setIsReply: React.Dispatch<React.SetStateAction<string | undefined>>;
}> = ({id, isReply, setIsReply}) => {
  const {bottom} = useSafeAreaInsets();
  const [comment, setComment] = useState('');

  return (
    <View
      style={{
        alignSelf: 'stretch',
      }}>
      {!!isReply && <Text>Replying to: {isReply}</Text>}
      <View
        style={{
          alignSelf: 'stretch',
          flexDirection: 'row',
          height: 50 + bottom,
          padding: 10,
          paddingBottom: bottom || 10,
        }}>
        <TextInput
          value={comment}
          style={{flex: 1, paddingHorizontal: 10, backgroundColor: '#ccc'}}
          onChangeText={setComment}
        />
        <Button
          title="Send"
          onPress={() => {
            dispatch(addComment({id, comment, isReply}));
            setComment('');
            if (isReply) {
              setIsReply(undefined);
            }
          }}
        />
      </View>
    </View>
  );
};

export default () => {
  const {id} = useRoute().params as {id: string};
  const data = useSelector(createGetCommentsIdsSelector(id));
  const header = useCallback(() => <ItemPure isDetailsPage {...{id}} />, [id]);
  const [isReply, setIsReply] = useState<string>();
  console.log('data', data);
  const keyExtractor = useCallback((item: string) => `comment-${item}`, []);

  const renderItem = useCallback<ListRenderItem<string>>(
    ({item}) => (
      <CommentItemPure id={item} postId={id} setIsReply={setIsReply} />
    ),
    [],
  );
  return (
    <View style={styles.container}>
      {useMemo(
        () => (
          <FlatList
            {...{data, keyExtractor, renderItem}}
            ListHeaderComponent={header}
          />
        ),
        [data, keyExtractor, renderItem, header],
      )}
      <CommentInput {...{id, isReply, setIsReply}} />
    </View>
  );
};
