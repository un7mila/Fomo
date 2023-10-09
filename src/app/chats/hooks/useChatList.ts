import {useEffect} from 'react';
import EventSource from 'react-native-sse';
import {Matches, MatchUsers} from 'types/match';
import {useUserStore} from 'store/user.store';
import {useQueryClient} from 'react-query';
import {useGetApi} from 'hooks/axios';
import {NativeModules} from 'react-native';
import {ChatRoom, Message} from 'types/chat';
import {UserProfile} from 'types/user';

const getDevServerAddress = () => {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const address = scriptURL.split('://')[1].split('/')[0];
  const hostname = address.split(':')[0];
  return hostname;
};

const sseUrl = `http://${getDevServerAddress()}:3000/chats/chatlist`;

export type ChatListHook = () => {
  chatRooms: ChatRoom[] | undefined;
  matches: MatchUsers[] | undefined;
};

const useChatList: ChatListHook = () => {
  const {token} = useUserStore();
  const queryClient = useQueryClient();
  const {data: chatRooms} = useGetApi<ChatRoom[]>('/chats/rooms');
  const {data: matches} = useGetApi<MatchUsers[]>('/chats/matches');

  useEffect(() => {
    let es;
    if (token && !es) {
      es = new EventSource(sseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      es.addEventListener('open', event => {
        console.log('Open SSE connection.');
      });
      es.addEventListener('message', event => {
        const data = JSON.parse(event.data) as Message;
        queryClient.setQueryData<ChatRoom[]>('/chats/rooms', chatRooms => {
          const index = chatRooms?.findIndex(r => {
            return r.matchId == data.matchId;
          });
          if (chatRooms && index !== -1 && data.content) {
            chatRooms[index].lastMessage = data.content;
            chatRooms[index].hasNewLastMessage = true;
          }
          return chatRooms;
        });
      });
    }
    return () => {
      es?.close();
    };
  }, [token]);
  return {chatRooms, matches};
};

export default useChatList;
