import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { auth } from "firebase/app";

import Logo from "../assets/logo/logo.svg";
import { Containermenu, Logoimg, Title } from "./style";

const Menu = () => {
  return (
    <Containermenu className="sidebar-sticky">
      <Logoimg src={Logo} />
      <Title>Clinica Elo</Title>
      <Nav vertical>
        <NavItem>
          <NavLink style={{ color: "#fff" }} to="/inicio" tag={Link}>
            Inicio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={{ color: "#fff" }} to="/clientes" tag={Link}>
            Clientes
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={{ color: "#fff" }} to="/usuarios" tag={Link}>
            Usuários
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink style={{ color: "#fff" }} to="/perfil" tag={Link}>
            Perfil
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink style={{ color: "#fff" }} to="/clientes2" tag={Link}>
            Clientes2
          </NavLink>
        </NavItem> */}
        <NavItem>
          <NavLink
            href="#"
            children="Sair"
            style={{ color: "#fff" }}
            onClick={() => auth().signOut()}
          />
        </NavItem>
      </Nav>
    </Containermenu>
  );
};

export default Menu;
