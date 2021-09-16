import React from "react";
import styled from "styled-components";

interface ChatTextProps {
  text: string;
}

const ChatText: React.FC<ChatTextProps> = ({ text }) => {
  return <Container>{text}</Container>;
};

const Container = styled.div`
  padding: 0.4rem 1rem;
  border-radius: 4px;
  background: #ffffff;
  font-weight: 300;
  line-height: 150%;
  position: relative;
  height: 53px;

  &:before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 10px;
    left: -20px;
    border: 10px solid;
    border-color: transparent #ffffff transparent transparent;
  }
`;
export default ChatText;
