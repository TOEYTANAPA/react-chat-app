import "./App.css";
import ChatContextProvider from "./contexts/ChatContext";
import { ApolloProvider } from "@apollo/client";
import Layout from "./components/Layout";
import client from "./services/apollo";

function App() {
  return (
    <ApolloProvider client={client}>
      <ChatContextProvider>
        <Layout />
      </ChatContextProvider>
    </ApolloProvider>
  );
}

export default App;
