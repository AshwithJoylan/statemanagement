import React, {PureComponent} from 'react';
import type {FC} from 'react';
import {View, Text, Button, Pressable} from 'react-native';
import {StackActions, useNavigation} from '@react-navigation/native';
import {dispatch, useSelector} from '../features';
import {
  createGetDownVotesByIdSelector,
  createGetUpVotesByIdSelector,
  createGetCommentsCountSelector,
  createGetItenVoteSelector,
} from '../features/selectors/feed.selector';
import {addDownVote, addUpVote} from '../features/feeds';

type Props = {id: string; isDetailsPage?: boolean};

export const VotesCount: FC<Props> = ({id}) => {
  const upCount = useSelector(createGetUpVotesByIdSelector(id));
  const downCount = useSelector(createGetDownVotesByIdSelector(id));

  return (
    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
      {upCount + downCount}
    </Text>
  );
};

const CommentsCount: FC<Props> = ({id, isDetailsPage}) => {
  const navigation = useNavigation();
  const count = useSelector(createGetCommentsCountSelector(id));
  return (
    <Pressable
      onPress={() => {
        if (isDetailsPage) {
          return;
        }
        // TODO: add comment
        navigation.dispatch(
          StackActions.push('PageDetails', {id, isFromComment: true}),
        );
      }}>
      <Text>Comments {count}</Text>
    </Pressable>
  );
};

const Item: FC<Props> = ({id, isDetailsPage}) => {
  const navigation = useNavigation();
  const type = useSelector(createGetItenVoteSelector(id));
  return (
    <Pressable
      disabled={isDetailsPage}
      onPress={() => {
        navigation.dispatch(StackActions.push('PageDetails', {id}));
      }}
      style={{alignSelf: 'stretch', padding: 10, paddingVertical: 18}}>
      <Text style={{fontSize: 18}}>{id}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Button
          title="UP"
          color={type === 'up' ? 'green' : 'blue'}
          onPress={() => {
            dispatch(addUpVote({id, exists: false}));
          }}
        />
        <VotesCount {...{id}} />
        <Button
          onPress={() => {
            dispatch(addDownVote({id, exists: false}));
          }}
          color={type === 'down' ? 'green' : 'blue'}
          title="DOWN"
        />
      </View>
      <CommentsCount {...{id, isDetailsPage}} />
    </Pressable>
  );
};
export default class ItemPure extends PureComponent<Props> {
  render(): React.ReactNode {
    return <Item {...this.props} />;
  }
}
