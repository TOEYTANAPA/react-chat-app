import { useState, createContext } from "react";

type Setting = {
  userId: "Joyse" | "Sam" | "Russell";
  room: "1" | "2" | "3";
};

type ChatSettingType = {
  userId: "Joyse" | "Sam" | "Russell";
  room: "1" | "2" | "3";
  setSetting: (newSetting: Setting) => void;
};

const defaultChatSetting: ChatSettingType = {
  userId: "Joyse",
  room: "1",
  setSetting: (newSetting: Setting) => {},
};

export const ChatContext = createContext<ChatSettingType>(defaultChatSetting);

interface Props {
  children: React.ReactChild;
}

const ChatContextProvider: React.FC<Props> = ({ children }) => {
  const [chat, setChat] = useState<Setting>({ userId: "Joyse", room: "1" });

  const setSetting = (newSetting: Setting) => setChat(newSetting);

  return (
    <ChatContext.Provider
      value={{ userId: chat.userId, room: chat.room, setSetting }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
