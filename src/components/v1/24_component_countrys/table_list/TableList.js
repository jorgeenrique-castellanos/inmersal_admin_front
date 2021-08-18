import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../views/24_view_countrys/helpers/context";
import Table from "../../table/Table";
import recuperarParametros from "./table_list_params";
import _ from "lodash";

export default function List({ title, botones }) {
  const { view_global_state, view_global_actions } = useContext(Context);
  const params = recuperarParametros(null);

  return (
    <Table
      state={view_global_state}
      actions={view_global_actions}
      params={params}
    />
  );
}
