import { useSelector } from 'react-redux';
import useGetMessage from '../hooks/useGetMessage';
import MessagesChat from './MessagesChat';
import "./chatcontainer.css";
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const ChatContainer = () => {
  useGetMessage();
  useGetRealTimeMessage();
  
  const messages = useSelector((store) => store.message.messages);

  return (
    <div className="message-area" >
      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <div ><MessagesChat key={message._id} message={message} /></div>
        ))
      ) : (
        <div className="no-messages">
          <p>No messages yet. Start the conversation!</p>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
