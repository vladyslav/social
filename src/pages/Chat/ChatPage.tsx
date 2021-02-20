import { FC, useEffect, useState } from "react";

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

const ChatPage: FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: FC = () => {
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);
  useEffect(() => {
    let ws: WebSocket;
    const closeHandler = () => setTimeout(createChannel, 3000);
    function createChannel() {
      ws?.removeEventListener("close", closeHandler);
      ws?.close();
      ws = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
      );
      ws.addEventListener("close", () => closeHandler);
      setWsChannel(ws);
    }
    createChannel();

    return () => {
      ws.removeEventListener("close", closeHandler);
      ws.close();
    };
  }, []);

  return (
    <div>
      <Messages wsChannel={wsChannel} />
      <AddMessageForm wsChannel={wsChannel} />
    </div>
  );
};

const Messages: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  useEffect(() => {
    const messageHandler = (e: MessageEvent) =>
      setMessages((prev) => [...prev, ...JSON.parse(e.data)]);
    wsChannel?.addEventListener("message", messageHandler);

    return () => wsChannel?.removeEventListener("message", messageHandler);
  }, [wsChannel]);

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

const AddMessageForm: FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
  const [message, setMessage] = useState("");
  const [readyStatus, setReadyStatus] = useState<"pending" | "ready">(
    "pending"
  );

  useEffect(() => {
    const openHandler = () => setReadyStatus("ready");
    wsChannel?.addEventListener("open", openHandler);
    return () => {
      wsChannel?.removeEventListener("open", openHandler);
    };
  }, [wsChannel]);
  const sendMessage = () => {
    if (!message) {
      return;
    }
    wsChannel?.send(message);
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
        <button
          disabled={wsChannel === null || readyStatus !== "ready"}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
