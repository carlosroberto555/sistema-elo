import styled from "styled-components";

export const ChatBoxContainer = styled.div<{ minimized: boolean }>`
  width: ${({ minimized }) => (minimized ? 250 : 350)}px;
  height: ${({ minimized }) => (minimized ? 10 : 100)}%;
  border: thin solid #ddd;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.12);
  margin-right: 12px;
  position: relative;
`;

export const ChatBoxHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fff;
  padding: 8px;
  background-color: rgba(56, 95, 121);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 999;
`;

export const ChatBoxHeaderContent = styled.div`
  flex: 1;
  overflow: hidden !important;
`;

export const ChatBoxHeaderAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-right: 8px;
`;

export const ChatBoxHeaderTitle = styled.p`
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
`;

export const ChatBoxHeaderSubTitle = styled.p`
  margin-bottom: 0;
  font-size: 8pt;
`;
