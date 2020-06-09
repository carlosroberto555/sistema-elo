import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const Main = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 15px;
`;
export const Logar = styled.input`
  font-size: 15px;
  border: 1px #000000;
  border-radius: 5px;
  padding: 5px 10px;
`;
export const Center = styled.div`
  margin: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ErrorCode = styled.p`
  font-size: 15px;
  color: #c97188;
  font-style: italic;
`;
export const Logo = styled.img`
  width: 8em;
`;
