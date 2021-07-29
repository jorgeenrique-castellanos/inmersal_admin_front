import React from "react";
import ReactHtmlParser from "react-html-parser";
import * as yup from "yup";
import { Button } from "shards-react";
import Icons from "../../../assets/icons";
// import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
// import filterFactory, {
//   textFilter,
//   selectFilter
// } from "react-bootstrap-table2-filter";

// DATA
import data from "../../../data/data_01_view_commentation.json";

//prettier-ignore
export default usuario => {
  const icons = Icons();
  const params = {};
  params["key"] = "id";

  const selectOptions = {
    1: "Active",
    0: "Inactive"
  };

  params["cols"] = [
    {
      dataField: "id",
      text: "Id"
    },
    {
      dataField: "title",
      text: "Name",
      sort: true
    },
    {
      dataField: "phone",
      text:"Phone"
    },
    {
      dataField: "description",
      text: "Description"
    },
    {
      dataField: "city",
      text: "City"
    },
    {
      dataField: "scores",
      text: "Scores"
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

  params["data"] = data.commetation;

  return params;
};
