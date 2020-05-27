import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Inicio from "../Inicio";
import Clientes from "../Clientes";
import Perfil from "../Perfil";
import CasoDetalhes from "../CasoDetalhes";
import Chat from "../Chat";
import Page404 from "../Page404";
import Usuarios from "../Usuarios";
import UsersDetalhes from "../UsersDetalhes";

export default () => (
  <Switch>
    <Redirect exact from="/" to="/inicio" />
    <Route path="/inicio" component={Inicio} />
    <Route exact path="/clientes" component={Clientes} />
    <Route path="/clientes/:id" component={CasoDetalhes} />
    <Route path="/perfil" component={Perfil} />
    <Route path="/usuarios/:id" component={UsersDetalhes} />
    <Route path="/usuarios" component={Usuarios} />
    <Route path="/404" component={Page404} />
    <Route path="/chats" component={Chat} />
    <Redirect from="*" to="/404" />
  </Switch>
);
