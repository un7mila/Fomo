import {useEffect} from 'react';
import io from 'socket.io-client';
import {useGetApi} from 'hooks/axios';
import {UserProfile} from 'types/user';
import {Message} from 'types/chat';
import axios from 'axios';
import {useUserStore} from 'store/user.store';
import {NativeModules} from 'react-native';
import {useQueryClient} from 'react-query';

const getDevServerAddress = () => {
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const address = scriptURL.split('://')[1].split('/')[0];
  const hostname = address.split(':')[0];
  return hostname;
};

export type ChatUserHook = (matchId: number) => {
  sendMessage: (content: string) => void;
  opponentProfile: UserProfile | undefined;
  chatMessages: Message[] | undefined;
};

const useChatUser: ChatUserHook = (matchId: number) => {
  const queryClient = useQueryClient();
  const {profile} = useUserStore();
  const {data: opponentProfile} = useGetApi<UserProfile>(
    `/chats/opponent/profile/${matchId}`,
  );
  const {data: chatMessages} = useGetApi<Message[]>(
    `/chats/histories/${matchId}`,
  );

  // websocket
  useEffect(() => {
    const socket = io(`http://${getDevServerAddress()}:3000/chat`);
    if (profile.id && socket.disconnected) {
      socket.connect();

      socket.on('connect', () => {
        socket.emit('join', profile.id);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      socket.on('message', newMessage => {
        addMessage(newMessage);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [profile]);

  const sendMessage = async (content: string) => {
    if (opponentProfile?.id) {
      const {data: newMessage} = await axios.post<Message>('/chats/message', {
        opponentId: opponentProfile.id,
        matchId,
        content,
      });
      addMessage(newMessage);
    }
  };

  const addMessage = (newMessage: Message) => {
    queryClient.setQueryData<Message[]>(
      `/chats/histories/${matchId}`,
      messages => {
        if (messages) {
          messages.push(newMessage);
        }
        return messages;
      },
    );
  };

  return {
    sendMessage,
    opponentProfile,
    chatMessages,
  };
};

export default useChatUser;
