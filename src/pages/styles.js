import styled from "styled-components";

export const Container = styled.div`
  background-color: #f4f5fb;
  display: flex;
  height: 100vh;

  flex-direction: column;
`;

export const Header = styled.div`
  padding: 0 15px;
  min-height: 64px;
  line-height: 64px;
  border-bottom: 1px solid #e6ecf3;
  border-radius: 0 3px 0 0;
`;

export const ChatConatiner = styled.div`
  padding: 1rem;
`;
export const ChatBox = styled.div``;
export const ChatTime = styled.div`
  margin-left: 10px;
  font-size: 0.8rem;
`;
export const Messages = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
export const List = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 40px;
`;

export const ChatHistory = styled.div``;
export const ChatText = styled.div`
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
export const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  resize: vertical;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;
