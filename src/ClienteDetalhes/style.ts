import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  padding: 10px;
`;
export const Search = styled.input`
  padding: 5px 10px;
  border: solid 1px #a1a1a1;
  border-radius: 50px;
`;
export const Containerperfil = styled.div`
  padding: 20px 15px;
  background-color: #ededed;
  border-radius: 10px;
`;
export const Title = styled.p`
  font-size: 19px;
  font-weight: 600;
`;
export const FotoPerfil = styled.img`
  border-radius: 50px;
  width: 100px;
  height: 100px;
`;
export const Name = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #000000;
  text-align: center;
  margin-bottom: 0;
`;
export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Campoinfo = styled.input`
  padding: 5px 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  background-color: #f5f5f5;
`;
export const SubTitle = styled.p`
  color: #a1a1a1;
  margin: 0;
`;
export const Foto = styled.div`
  border-radius: 50px;
  width: 100px;
  height: 100px;
  background-color: #0c6eb8;
`;
export const NomeUser = styled.div`
  color: #000000;
  margin-left: 15px;
  font-size: 20px;
`;
export const DisplayName = styled.p`
  font-size: 15px;
  color: #575757;
`;
export const ContainerItem = styled.div`
  padding: 10px;
  background-color: #ededed;
  border-radius: 5px;
  margin-bottom: 5px;
`;
export const TitleList = styled.div`
  padding: 10px;
`;
export const RouterLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`;
