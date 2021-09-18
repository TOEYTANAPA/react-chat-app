import React from "react";
import styled from "styled-components";

interface AvatarProps {
  image: string;
  name: string;
}
const Avatar: React.FC<AvatarProps> = ({ image, name }) => {
  return (
    <Conatiner>
      <Img alt="avatar" src={image} width="48px" height="48px" />
      <Name>{name}</Name>
    </Conatiner>
  );
};

const Conatiner = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  align-items: center;
`;

const Img = styled.img`
  border-radius: 30px;
`;
const Name = styled.div`
  font-size: 0.75rem;
  color: #999999;
`;
export default Avatar;
