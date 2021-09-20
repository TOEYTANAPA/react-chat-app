import { useState, useContext, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { gql, useMutation } from "@apollo/client";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
  Container,
  Header,
  ChatConatiner,
  ChatHistory,
  ChatBox,
  TextArea,
  Messages,
} from "./styles";
import useChat from "../services/chat-hook";
import Button from "../components/Button";
import { ROOM_MAP } from "../global/consts";
import { ChatContext } from "../contexts/ChatContext";
import { getTimeFormat } from "../utils/formatDate";
import { handleNewMsg } from "./utils";
import ChatComponent from "./ChatBox";

type Message = {
  messageId?: string;
  text: string;
  datetime: string;
  userId: "Joyse" | "Sam" | "Russell";
};

interface IPostMessage {
  postMessage: Message;
}
export interface IMessages {
  messageId: string;
  text: string;
  datetime: string;
  userId: "Joyse" | "Sam" | "Russell";
}

export interface ISendMessage {
  userId: "Joyse" | "Sam" | "Russell";
  text: string;
  datetime: string;
  error?: boolean;
}

const ChatPage = () => {
  const [text, setText] = useState(localStorage.getItem("text") || "");
  const { getMessages, getMoreMessages } = useChat();
  const [lastMessages, setLastMessages] = useState<ISendMessage[]>([]);
  const [msgs, setMsgs] = useState<IMessages[]>([]);
  const { userId, room } = useContext(ChatContext);

  const fetchLatestMessages = async () => {
    const resp = await getMessages();
    setMsgs(resp.fetchLatestMessages);
  };

  useEffect(() => {
    fetchLatestMessages();
  }, [room]);

  const SEND_MESSAGES = gql`
      mutation {
      postMessage(channelId: "${room}",text: "${text}", userId: "${userId}"){
        messageId
        text
        datetime
        userId
      }
    }
    `;

  const [sendMessage] = useMutation<IPostMessage>(SEND_MESSAGES, {
    onError: (err) => {
      setMessagesError(true);
    },
    onCompleted: async () => {
      fetchLatestMessages();
      setText("");
      localStorage.clear();
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (text) {
      sendMessage();
    }
  };

  const setMessagesError = (error: boolean, data?: IMessages) => {
    setLastMessages([
      ...lastMessages,
      {
        userId,
        text: text,
        datetime: `${new Date()}`,
        error,
      },
    ]);
    setText("");
    localStorage.clear();
  };

  const handleOnChange = (e: any) => {
    setText(e.target.value);
    localStorage.setItem("text", e.target.value);
  };

  //Prevent pressing enter avoiding white screen bug
  const onKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 13) {
      e.preventDefault();
    }
  };

  const handleReadMore = async (old: boolean) => {
    if (msgs) {
      const resp = await getMoreMessages(
        room,
        old ? msgs[msgs.length - 1].messageId : msgs[0].messageId,
        old
      );
      if (resp?.fetchMoreMessages?.length > 0) {
        setMsgs(handleNewMsg(msgs, resp.fetchMoreMessages, old));
      }
    }
  };

  return (
    <Container>
      <Header>{ROOM_MAP[room]}</Header>
      <ChatConatiner>
        <ChatHistory>
          <Button
            text="Read More"
            icon={<FaArrowUp />}
            onClick={() => handleReadMore(true)}
          />
          <Messages>
            {msgs
              ?.slice(0)
              .reverse()
              .map((item: IMessages) => (
                <ChatComponent
                  key={item.messageId}
                  item={item}
                  userId={userId}
                />
              ))}

            {lastMessages?.map(
              (item, index) =>
                userId === item.userId && (
                  <ChatComponent key={index} item={item} userId={userId} />
                )
            )}
          </Messages>
          <Button
            text="Read More"
            icon={<FaArrowDown />}
            onClick={() => handleReadMore(false)}
          />
        </ChatHistory>
        <ChatBox>
          <form onSubmit={handleSubmit}>
            <TextArea
              value={text}
              name="chat"
              placeholder="Type your message here..."
              onChange={handleOnChange}
              onKeyDown={onKeyDown}
            />

            <Button type="submit" text="Submit" icon={<IoIosSend />} />
          </form>
        </ChatBox>
      </ChatConatiner>
    </Container>
  );
};

export default ChatPage;
