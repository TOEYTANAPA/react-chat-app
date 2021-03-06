import React from "react";
import styled from "styled-components";

interface ButtonProps {
  text: string;
  type?: "submit";
  icon?: React.ReactChild;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({ text, type, icon, onClick }) => {
  return (
    <Btn type={type} onClick={onClick}>
      {text} <Icon>{icon}</Icon>
    </Btn>
  );
};

const Icon = styled.span`
  margin-left: 8px;
`;

const Btn = styled.button`
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
`;

export default Button;
