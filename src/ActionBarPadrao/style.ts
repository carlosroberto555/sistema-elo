import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  padding: 10px;
`;
export const Photo = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 50px;
`;
export const NomeUser = styled.div`
  margin-left: 10px;
  color: #000000;
`;
export const Matricula = styled.p`
  margin: 0px;
  color: #878787;
  font-size: 13px;
`;
export const RouterLink = styled(Link)`
  text-decoration: none;
`;
