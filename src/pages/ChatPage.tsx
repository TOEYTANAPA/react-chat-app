import { useState, useContext, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import {
  Container,
  Header,
  ChatConatiner,
  ChatHistory,
  ChatBox,
  TextArea,
  Messages,
  Icon,
  List,
  ChatTime,
  ChatText,
} from "./styles";
import { gql, useMutation } from "@apollo/client";
import useChat from "../services/chat-hook";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import { AVATAR_MAP, ROOM_MAP } from "../global/consts";
import { ChatContext } from "../contexts/ChatContext";
import { getTimeFormat } from "../utils/formatDate";

type Message = {
  messageId?: string;
  text: string;
  datetime: string;
  userId: "Joyse" | "Sam" | "Russell";
};

interface NewType {
  postMessage: Message;
}
interface IMessages {
  messageId: string;
  text: string;
  datetime: string;
  userId: "Joyse" | "Sam" | "Russell";
}

interface ISendMessage {
  userId: "Joyse" | "Sam" | "Russell";
  text: string;
  datetime: string;
  error: boolean;
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

  const [sendMessage] = useMutation<NewType>(SEND_MESSAGES, {
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
        datetime: getTimeFormat(),
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

  const handleReadMore = async (old: boolean) => {
    if (msgs) {
      const resp = await getMoreMessages(
        room,
        old ? msgs[msgs.length - 1].messageId : msgs[0].messageId,
        old
      );
      if (resp.fetchMoreMessages.length > 0) {
        setMsgs(resp?.fetchMoreMessages);
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
                <List key={item.messageId} sender={userId === item.userId}>
                  <Avatar name={item.userId} image={AVATAR_MAP[item.userId]} />
                  <ChatText>{item.text}</ChatText>
                  {userId === item.userId && (
                    <Icon error={false}>
                      <FaCheckCircle />
                    </Icon>
                  )}
                  <ChatTime>{getTimeFormat(item.datetime)}</ChatTime>
                </List>
              ))}

            {lastMessages?.map((item, index) =>
              userId === item.userId ? (
                <List sender={userId === item.userId} key={index}>
                  <Avatar name={item.userId} image={AVATAR_MAP[item.userId]} />
                  <ChatText>{item.text}</ChatText>
                  {userId === item.userId && (
                    <Icon error={item.error ? true : false}>
                      {item.error ? <FaExclamationCircle /> : <FaCheckCircle />}
                    </Icon>
                  )}
                  <ChatTime>{item.datetime}</ChatTime>
                </List>
              ) : (
                <></>
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
            <TextArea value={text} onChange={handleOnChange} />
            <Button type="submit" text="Submit" icon={<IoIosSend />} />
          </form>
        </ChatBox>
      </ChatConatiner>
    </Container>
  );
};

export default ChatPage;
