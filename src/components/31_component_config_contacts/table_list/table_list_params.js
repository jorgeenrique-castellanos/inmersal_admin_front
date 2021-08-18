import React, { useContext } from "react";
import ReactHtmlParser from "react-html-parser";
import * as yup from "yup";
import { Context } from "../../../views/31_view_config_contacts/helpers/context";
import { Button } from "shards-react";
import Icons from "../../../assets/icons";
import { textFilter } from "react-bootstrap-table2-filter";

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
    url: "http://127.0.0.1:8000/api/v1/contact"
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
<<<<<<< HEAD
      dataField: "contact",
      text: "Nombre"
=======
      dataField: "name",
      text: "Nombre",
      sort:true,
      filter: textFilter()
>>>>>>> a907e63a4d936d310ab7af771ea2367e47837baa
    },
    {
      dataField: "country",
      text: "Pais", sort:true,
      filter: textFilter()
    },
    {
<<<<<<< HEAD
      dataField: "client",
      text: "Cliente"
    },
    {
      dataField: "primary_phone",
      text: "Telefono"
=======
      dataField: "persontype",
      text: "T. P",
      sort:true,
      filter: textFilter()
    },
    {
      dataField: "identificationtype",
      text: "T. I",
      sort:true,
      filter: textFilter()
    },
    {
      dataField: "identification",
      text: "N°. D",
      sort:true,
      filter: textFilter()
    },
    {
      dataField: "clients",
      text: "Cliente",
      sort:true,
      filter: textFilter()
    },
    {
      dataField: "phone",
      text: "Telefono",
      sort:true,
      filter: textFilter()
>>>>>>> a907e63a4d936d310ab7af771ea2367e47837baa
    },
    {
      dataField: "email",
      text: "Email",
      sort:true,
      filter: textFilter()
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
