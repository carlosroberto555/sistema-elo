import React, { useState } from "react";

import Screen from "../components/Screen";
import ChatBoxItem from "./ChatBoxItem";
import { ChatsContainer } from "./styles";
import { useFirestore } from "../utils";

export default function Chat() {
  const [casos] = useFirestore<Caso>("casos");
  const [chats, setChats] = useState<CasoItem[]>([]);

  return (
    <Screen title="Chats">
      <ul>
        {casos.map(item => (
          <li key={item.key} onClick={() => setChats([item, ...chats])}>
            {item.nome} - {item.tipo}
          </li>
        ))}
      </ul>
      <ChatsContainer>
        {chats.map(item => (
          <ChatBoxItem
            key={item.key}
            item={item}
            onClose={chat => {
              setChats(chats.filter(item => item.key !== chat.key));
            }}
          />
        ))}
      </ChatsContainer>
    </Screen>
  );
}
