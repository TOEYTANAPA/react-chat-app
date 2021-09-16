import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";

import {
  Container,
  Header,
  ChatConatiner,
  ChatHistory,
  ChatBox,
  TextArea,
  Messages,
  List,
  ChatTime,
  ChatText,
} from "./styles";
import Avatar from "../components/Avatar";
import Button from "../components/Button";

const ChatPage = () => {
  const [text, setText] = useState("");
  const handleSubmit = () => {};

  const handleOnChange = (e: any) => {
    console.log(e.target.value);
    setText(e.target.value);
  };
  return (
    <Container>
      <Header>ROOM</Header>
      <ChatConatiner>
        <ChatHistory>
          <Messages>
            <List>
              <Avatar name="test" image="test" />
              <ChatText>test</ChatText>
              <ChatTime>18:40</ChatTime>
            </List>
            <List>
              <Avatar name="test" image="test" />
              <ChatText>test</ChatText>
              <ChatTime>18:40</ChatTime>
            </List>
          </Messages>
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
