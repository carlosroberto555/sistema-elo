import React from "react";

import { Container, Center, Title404, Num } from "./style";

export default function Page404() {
  return (
    <Container>
      <div>
        <Center>
          <Num>404</Num>
        </Center>
        <Center>
          <Title404>Pagina não encontrada</Title404>
        </Center>
        <Center>
          <p>Verifique se digitou a url corretamente</p>
        </Center>
      </div>
    </Container>
  );
}
