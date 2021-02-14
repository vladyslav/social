import { FC } from "react";

const ChatPage: FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: FC = () => {
  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};

const Messages: FC = () => {
  const messages: any[] = [1, 2, 3, 4];
  return (
    <div>
      {messages.map((m) => (
        <Message />
      ))}
    </div>
  );
};

const Message: FC = () => {
  const message = {
    url: "https://via.placeholder.com/50",
    author: "Vlad",
    text: "Hello",
  };
  return (
    <div>
      <img src={message.url} alt={message.author} /> <b>{message.author}</b>{" "}
      <p>{message.text}</p>
      <hr />
    </div>
  );
};

const AddMessageForm: FC = () => {
  return (
    <div>
      <div>
        <textarea></textarea>
      </div>
      <div>
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
