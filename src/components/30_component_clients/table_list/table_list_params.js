import React, { useContext } from "react";
import ReactHtmlParser from "react-html-parser";
import * as yup from "yup";
import { Context } from "../../../views/30_view_clients/helpers/context";
import { Button } from "shards-react";
import Icons from "../../../assets/icons";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";


// DATA
import data from "../../../data/data_05_view_datos.json";

//prettier-ignore
export default usuario => {
  const { view_global_state, view_global_actions } = useContext(Context);
  const icons = Icons();
  const params = {};
  params["key"] = "id";

  params["server"] = {
    method: "get",
    url: "http://127.0.0.1:8000/api/v1/client"
  }

  const selectOptions = {
    1: "Activo",
    0: "Inactivo"
  };
  params["cols"] = [
    {
      dataField: "status",
      text: "Estado"
    },
    {
      dataField: "client",
      text: "Nombre"
    },
    {
      dataField: "country",
      text: "Pais"
    },
    {
      dataField: "person_type",
      text: "T. P"
    },
    {
      dataField: "identification_type",
      text: "T. I"
    },
    {
      dataField: "identification",
      text: "Identificación"
    },{
      dataField: "phone",
      text: "Telefono"
    },{
      dataField: "email",
      text: "Email"
    },
    {
      dataField: "acciones",
      text: "Acciones",
      formatter: (cell, row, rowIndex) => {
        return setColumnActions(cell, row, rowIndex);
      },
      editable: (cell, row, rowIndex, colIndex) => {
        return false;
      }
    }
  ];

  const setColumnActions = (cell, row, rowIndex) => {
    return (
      <ul className="table-list-actions">
      <li>
        <Button
          className="btn-icon-small"
          onClick={() => { editDataRow(cell, row, rowIndex) }}
        >
          {ReactHtmlParser(icons.edit.icon)}
        </Button>
      </li>
      <li>
        <Button
          className="btn-icon-small"
          theme={"danger"}
          onClick={() => { deleteDataRow(cell, row, rowIndex) }}
        >
          {ReactHtmlParser(icons.trash.icon)}
        </Button>
      </li>
    </ul>
    );
  };

  const editDataRow = (cell, row, rowIndex) => {
    view_global_actions.edit(row)
  };

  const deleteDataRow = (cell, row, rowIndex) => {
    view_global_actions.delete(row)
  };

  return params;
};
