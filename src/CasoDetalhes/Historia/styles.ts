import styled from "styled-components";

export const Container = styled.ul`
  padding: 0px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #444;

    & + li {
      margin-top: 15px;
    }
  }
`;
export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  word-wrap: break-word;
  max-width: 50%;

  div {
    display: flex;
    flex-direction: column;
    max-width: 95%;

    span {
      font-size: 12px;
      color: #999;
      margin-top: 0px;

      button {
        border: 0;
        background: transparent;
        color: #e57878;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;
