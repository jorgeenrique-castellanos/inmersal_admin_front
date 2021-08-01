import React from "react";
import ReactHtmlParser from "react-html-parser";
import * as yup from "yup";
import { Button } from "shards-react";
import Icons from "../../../assets/icons";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";

// DATA
// import data from "../../../data/data_05_view_datos.json";

//prettier-ignore
export default usuario => {
  const icons = Icons();
  const params = {};
  params["key"] = "id";

  const datos = 
  {
    salesroom: [
      {
        id: 0,        
        title: "",
        subtitle:"",
        status: "activo",
        url: "",
        description: "",
        country: "",
        departament: "",
        city: "berlin",
        alpha2: "",
        alpha3: "",
        typeperson: "",
        identificationtype: ""
      },
    ]
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

  params["data"] = datos.salesroom;
  // console.log(onSubmit)
  return params;
};
