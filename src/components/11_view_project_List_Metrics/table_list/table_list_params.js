import React from "react";
import ReactHtmlParser from "react-html-parser";
import * as yup from "yup";
import { Button } from "shards-react";
import Icons from "../../../assets/icons";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";

// DATA
import data from "../../../data/data_05_view_datos.json";

//prettier-ignore
export default usuario => {
  const icons = Icons();
  const params = {};
  params["key"] = "id";

  const selectOptions = {
    1: "Activo",
    0: "Inactivo"
  };

  params["cols"] = [
    // {
    //   dataField: "id",
    //   text: "Id"
    // },
    {
      dataField: "categoria",
      text: "Categoria"
    },
    // {
    //   dataField: "logo",
    //   text: "Logo"
    // },
    {
      dataField: "nombre",
      text: "Nombre"
    },
    {
      dataField: "direction",
      text: "Dirección"
    },
    {
      dataField: "latitud",
      text: "Latitud"
    },
    {
      dataField: "longitud",
      text: "Longitud"
    },
    {
      dataField: "fotografia",
      text: "Fotografia"
    },
    {
      dataField: "ruta", 
      text: "Ruta"
    },
    {
      dataField: "tiempoestimado", 
      text: "Tiempo estimado"
    },      
    {
      dataField: "distanciaestimada", 
      text: "Distancia estimada"
    },      
    {
      dataField: 'state',
      text: 'Activo',
      // editor: {
      //     type: Type.SELECT,
      //     value: '1:0'
      // },
      // formatter: cell => selectOptions[cell],
      // filter: selectFilter({
      //     options: selectOptions
      // })
    },
    {
      dataField: "actions",
      text: "Actions",
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
            onClick={() => {editDataRow(cell, row, rowIndex)}}
          >
            {ReactHtmlParser(icons.edit.icon)}
          </Button>
        </li>
        <li>
          <Button
            className="btn-icon-small"
            theme={"danger"}
            onClick={() => {deleteDataRow(cell, row, rowIndex)}}
          >
            {ReactHtmlParser(icons.trash.icon)}
          </Button>
        </li>
      </ul>
    );
  };

  const editDataRow = (cell, row, rowIndex) => {
    alert(`EDITAR: los datos de la fila con el ID = ${row.id}`);
  };

  const deleteDataRow = (cell, row, rowIndex) => {
    alert(`BORRAR: los datos de la fila con el ID = ${row.id}`);
  };

  params["data"] = data.salesroom;

  return params;
};
