import "./App.css";
import ChatContextProvider from "./contexts/ChatContext";
import Layout from "./components/Layout";

function App() {
  return (
    <ChatContextProvider>
      <Layout />
    </ChatContextProvider>
  );
}

export default App;
