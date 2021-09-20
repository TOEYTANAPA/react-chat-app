import React from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Avatar from "../components/Avatar";
import { Icon, List, ChatTime, ChatText } from "./styles";
import { ISendMessage } from "./ChatPage";
import { AVATAR_MAP } from "../global/consts";
import { getTimeFormat } from "../utils/formatDate";

interface IChat {
  item: ISendMessage;
  userId: string;
}
const Chat: React.FC<IChat> = ({ item, userId }) => {
  return (
    <List sender={userId === item.userId}>
      <Avatar name={item.userId} image={AVATAR_MAP[item.userId]} />
      <ChatText>{item.text}</ChatText>
      {userId === item.userId && (
        <Icon error={item.error ? true : false}>
          {item.error ? <FaExclamationCircle /> : <FaCheckCircle />}
        </Icon>
      )}
      <ChatTime>{getTimeFormat(item.datetime)}</ChatTime>
    </List>
  );
};

export default Chat;
