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
export const ContainerItem = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
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
export const ColorStatus = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50px;
  background-color: #19308a;
  margin-right: 5px;
`;
export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const UpPhoto = styled.input`
  width: 15px;
  height: 15px;
  background-color: #19308a;
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
export const AddImg = styled.input`
  display: none;
`;
export const MiniFoto = styled.img`
  border-radius: 50px;
  width: 40px;
  height: 40px;
`;
