import React from "react";
import docsIcon from "../../assets/docs.png";
import { MdCheckCircle, MdLink } from "react-icons/md";

import { FileInfo, Container } from "./styles";
import { Icon } from "../style";

interface docs {
  name: string;
  reacableSize: string;
  url: string;
  id: string;
}
export default function PostFiles({ file }: { file: any }) {
  return (
    <Container>
      {file.map((docs: docs) => (
        <li key={docs.id}>
          <FileInfo>
            <Icon src={docsIcon} />
            <div>
              <strong>{docs.name}</strong>
              <span>{docs.reacableSize}</span>
            </div>
          </FileInfo>
          <div>
            <a href={docs.url} target="_blank" rel="noopener noreferrer">
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
            </a>
            <MdCheckCircle size={24} color="#78e5d5" />
          </div>
        </li>
      ))}
    </Container>
  );
}
