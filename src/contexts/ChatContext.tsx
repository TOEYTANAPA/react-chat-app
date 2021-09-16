import { useState, createContext } from "react";

type Setting = {
  name: string;
  room: string;
};

const defaultSetting = {
  name: "Joyse",
  room: "General",
};
type ChatSettingType = {
  name: string;
  room: string;
  setSetting: (newSetting: Setting) => void;
};

const defaultChatSetting: ChatSettingType = {
  name: "Joyse",
  room: "General",
  setSetting: (newSetting: Setting) => {},
};

export const ChatContext = createContext<ChatSettingType>(defaultChatSetting);

interface Props {
  children: React.ReactChild;
}

const ChatContextProvider: React.FC<Props> = ({ children }) => {
  const [chat, setChat] = useState(defaultSetting);

  const setSetting = (newSetting: Setting) => setChat(newSetting);

  return (
    <ChatContext.Provider
      value={{ name: chat.name, room: chat.room, setSetting }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
