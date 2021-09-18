/** @format */

import { useCallback, useContext } from "react";
import client from "./apollo";
import { gql } from "@apollo/client";
import { ChatContext } from "../contexts/ChatContext";

interface IUseUser {
  sendMessage: (msg: string) => Promise<void>;
  getMessages: () => Promise<any>;
  getMoreMessages: (
    channelId: string,
    messageId: string,
    old: boolean
  ) => Promise<any>;
}

function useChat(): IUseUser {
  const { room } = useContext(ChatContext);

  const getMessages = async () => {
    try {
      const GET_MESSAGES = gql`
        query {
            fetchLatestMessages(channelId: "${room}") {
              messageId
              text
              datetime
              userId
            }
          }
    `;
      const resp = await client.query({
        query: GET_MESSAGES,
        fetchPolicy: "no-cache",
      });

      return resp.data;
    } catch (e) {
      console.log(e);
    }
  };
  const sendMessage = useCallback(async () => {}, []);

  const getMoreMessages = useCallback(
    async (channelId: string, messageId: string, old: boolean) => {
      try {
        const GET_MESSAGES = gql`
        query FetchMoreMessage {
        fetchMoreMessages(channelId: "${channelId}", messageId: "${messageId}", old: ${old}){
          messageId
          text
          datetime
          userId
        }
      }
    `;
        const resp = await client.query({
          query: GET_MESSAGES,
          fetchPolicy: "no-cache",
        });

        return resp.data;
      } catch (e) {
        console.log(e);
      }
    },
    []
  );

  return {
    getMessages,
    sendMessage,
    getMoreMessages,
  };
}

export default useChat;
