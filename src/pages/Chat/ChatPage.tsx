import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageType } from "../../api/chat.api";
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from "../../redux/chat-reducer";
import { AppStateType } from "../../redux/redux-store";

const ChatPage: FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

const Messages: FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  console.log(messages)

  return (
    <div style={{ height: "400px", overflowY: "auto" }}>
      {messages.map((m, index) => (
        <Message key={index} message={m} />
      ))}
    </div>
  );
};

const Message: FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img
        src={message.photo}
        style={{ width: "50px" }}
        alt={message.userName}
      />{" "}
      <b>{message.userName}</b> <br />
      <p>{message.message}</p>
      <hr />
    </div>
  );
};

const AddMessageForm: FC = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage("");
  };
  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessage(e.currentTarget.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        <button disabled={false} onClick={sendMessageHandler}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
