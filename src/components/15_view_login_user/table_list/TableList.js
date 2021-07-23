import React, { useState, useEffect, useReducer } from "react";
import { Context } from "../../../views/15_view_login_user/helpers/context";
// import Tabla from "../../componentes/tabla";
import Table from "../../table/Table";
import recuperarParametros from "./table_list_params";

export default function List({ title, botones }) {
  const [data, setData] = useState({});
  const { view_global_state, view_global_actions } = React.useContext(Context);
  const params = recuperarParametros(null);

  return (
    <Table
      state={view_global_state}
      actions={view_global_actions}
      params={params}
    />
  );
}
