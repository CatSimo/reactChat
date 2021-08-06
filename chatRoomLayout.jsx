import React, { } from 'react';

import { useSelector } from 'react-redux';

import { AuthContext } from '../auth/authContext';

import { ChatUsersList } from './chatUsersList';
import { MessageList } from './messageList';
import { MessageForm } from './messageForm';

const styles = {
  chatBlock: { border: '1px solid lightgrey', borderRadius: '25px' },
  chatUserList: { float: 'right', width: '50px', height: '50px' },
  chatMessageList: { maxHeight: '300px' }
}

const authorizationKey = 'authorization';

const ChatRoomLayoutNoMemo = ({ state }) => {  

  const { user } = React.useContext(AuthContext);

  const token = localStorage[authorizationKey]

  const [open, setOpen] = React.useState(false);
  const handleChatUsersList = (e) => {
    e.preventDefault();
    setOpen(!open);
  }
  
  const [users, setUsers] = React.useState([])
  const [messages, setMessages] = React.useState([])
  const [socket, setSocket] = React.useState(null)

  const sendMessage = ({ messageText, senderName, userId }) => {
    socket.emit('message:add', {
      chatId: state.streamId,
      userId,
      messageText,
      senderName
    });
  }

  const removeMessage = (id) => {
    socket.emit('message:remove', { chatId: state.streamId, messageId: id });
  }

  const toggleUserBan = (userId) => {
    socket.emit('user:toggleBan', { chatId: state.streamId, userId });
    setOpen(!open);
  }

  const transport = useSelector(state => state.createSocketApp);  

  React.useEffect(() => {   

    if(transport && transport.socket && transport.socket.connected) { 
      setSocket(transport.socket);
    }

    if(socket && state && state.streamId) {  
      
      socket.onAny((event, ...args) => {
        // receive everything, that emitted from server
      });  
      
      socket.emit('chat:join', ({ chatId: state.streamId, chatName: state.streamName, token }));  
      
      socket.on('users:list', (users) => {
        console.log('users:list', users);
        setUsers(users);
      });
    
      socket.on('messages:list', (messages) => {
        if (messages) {
          setMessages(messages);
        }
      });
    }

    return () => {
      (socket && state && state.streamId) && transport.socket.emit('chat:leave', ({ chatId: state.streamId, chatName: state.streamNAme, token }));
    }
    
  },[transport, state, socket])

  React.useEffect(() => { 
    setUsers(users) 
  }, [users]);

  return (
    <div style={styles.chatBlock} >
      <img onClick={handleChatUsersList} style={styles.chatUserList} src="./img/chat.svg" />
      { open && <ChatUsersList users={users} state={state} owner={user} toggleUserBan={toggleUserBan}/> }
      { !open && <>
        <MessageList messages={messages} removeMessage={removeMessage} user={user} style={styles.chatMessageList} />
        <MessageForm user={user} sendMessage={sendMessage} />
      </> }
    </div>
  )

}

export const ChatRoomLayout = React.memo(ChatRoomLayoutNoMemo);