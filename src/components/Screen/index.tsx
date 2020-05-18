import React from "react";
import Typography from "@material-ui/core/Typography";

import { Container, HeaderContainer } from "./styles";

interface Props {
  title: string;
  children: any;
  right?: any;
}

export default function Screen({ title, children, right }: Props) {
  return (
    <Container style={{ height: "100%" }}>
      <HeaderContainer>
        <Typography variant="h3">{title}</Typography>
        {right}
      </HeaderContainer>
      <hr />
      {children}
    </Container>
  );
}
