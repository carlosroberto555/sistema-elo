import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-gifted-chat";
import { IconButton } from "@material-ui/core";
import { firestore } from "firebase/app";

import CloseIcon from "@material-ui/icons/Close";
import RemoveIcon from "@material-ui/icons/Remove";

import {
  ChatBoxContainer,
  ChatBoxHeader,
  ChatBoxHeaderTitle,
  ChatBoxHeaderContent,
  ChatBoxHeaderSubTitle,
  ChatBoxHeaderAvatar
} from "./styles";

interface Props {
  item: CasoItem;
  onClose: (x: CasoItem) => void;
}

export default function ChatBoxItem({ item, onClose }: Props) {
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    return firestore()
      .collection("chats")
      .doc(item.key)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot(data => {
        const msgs = data.docs.map(item => {
          const data = item.data();
          return {
            ...data,
            id: data._id,
            createdAt: data && data.createdAt.toDate()
          };
        });
        setMessages(msgs);
      });
  }, [item.key]);

  function addMessage([message]: any) {
    message._id = message.id;
    delete message.id;

    firestore()
      .collection("chats")
      .doc(item.key)
      .collection("messages")
      .add({
        ...message,
        createdAt: firestore.Timestamp.now()
      });
  }

  return (
    <ChatBoxContainer minimized={minimized}>
      <ChatBoxHeader>
        {minimized || (
          <ChatBoxHeaderAvatar src="https://via.placeholder.com/30" />
        )}
        <ChatBoxHeaderContent>
          <ChatBoxHeaderTitle>{item.nome}</ChatBoxHeaderTitle>
          {minimized || (
            <ChatBoxHeaderSubTitle>{item.tipo}</ChatBoxHeaderSubTitle>
          )}
        </ChatBoxHeaderContent>
        <IconButton size="small" onClick={() => setMinimized(!minimized)}>
          <RemoveIcon fontSize="small" htmlColor="#fff" />
        </IconButton>
        <IconButton size="small" onClick={() => onClose(item)}>
          <CloseIcon fontSize="small" htmlColor="#fff" />
        </IconButton>
      </ChatBoxHeader>
      {minimized || (
        <GiftedChat
          showUserAvatar
          messages={messages}
          onSend={addMessage}
          user={{
            _id: 2,
            name: "Luiz Arnoni"
          }}
        />
      )}
    </ChatBoxContainer>
  );
}
