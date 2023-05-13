import React, {PureComponent} from 'react';
import type {FC} from 'react';
import {View, Text, Button, Pressable} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {dispatch, useSelector} from '../features';
import {createGetCommentByIdSelector} from '../features/selectors/feed.selector';
import {VotesCount} from './FeedItem';
import {addDownVote, addUpVote} from '../features/feeds';

type Props = {
  id: string;
  postId: string;
  setIsReply: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const CommentItem: FC<Props> = ({id, postId, setIsReply}) => {
  const comment = useSelector(createGetCommentByIdSelector(id));
  return (
    <View
      style={[
        {alignSelf: 'stretch', padding: 10, paddingVertical: 4},
        !!comment.parentId && {
          paddingLeft: 50,
        },
      ]}>
      <Text>{comment.text}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 4,
        }}>
        <Button
          title="UP"
          onPress={() => {
            dispatch(addUpVote({id: postId, exists: false, commentId: id}));
          }}
        />
        <VotesCount {...{id}} />
        <Button
          onPress={() => {
            dispatch(addDownVote({id: postId, exists: false, commentId: id}));
          }}
          title="DOWN"
        />
        {!comment.parentId && (
          <Button
            title="Reply"
            onPress={() => {
              setIsReply(id);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default class CommentItemPure extends PureComponent<Props> {
  render(): React.ReactNode {
    return <CommentItem {...this.props} />;
  }
}
