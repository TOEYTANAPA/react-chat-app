import React, { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";
import styled from "styled-components";
import ChatPage from "../pages/ChatPage";
import { CHAT_ROOM, USERS } from "../global/consts";

const Layout = () => {
  const { userId, room, setSetting } = useContext(ChatContext);
  const handleOnSelectedName = (e: any) => {
    setSetting({ room, userId: e.target.value });
  };

  const handleOnSelectedRoom = (data: any) => {
    setSetting({ userId, room: data });
  };

  return (
    <Container>
      <MenuBar>
        <SubMenu>
          <Title htmlFor="select1">1. Choose your user</Title>
          <Select onChange={(e) => handleOnSelectedName(e)}>
            {USERS.map((user, index) => (
              <option value={user} selected={index === 0} key={index}>
                {user}
              </option>
            ))}
          </Select>
        </SubMenu>
        <SubMenu>
          <Title htmlFor="select1">2. Choose your Channel</Title>
          <Ulist>
            {CHAT_ROOM.map((item, index) => (
              <Items key={index}>
                <Link onClick={() => handleOnSelectedRoom(item.id)}>
                  <P>{item.title}</P>
                </Link>
              </Items>
            ))}
          </Ulist>
        </SubMenu>
      </MenuBar>
      <ChatPage />
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  background-color: #f4f5fb;
`;

const Ulist = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const P = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #000;
  width: 200px;
  cursor: pointer;
`;
const Items = styled.li`
  padding: 10px 16px;
  font-weight: 600;
  font-size: 0.85rem;

  &:hover {
    background-image: -webkit-linear-gradient(right, #e9eff5, #ffffff);
  }
`;

const MenuBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  border-right: 1px solid #e6ecf3;
`;

const Title = styled.label`
  margin-bottom: 8px;
`;

const SubMenu = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export default Layout;
