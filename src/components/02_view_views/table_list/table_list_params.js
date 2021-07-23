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
import data from "../../../data/data_01_view_views.json";

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
      text: "Title",
      sort: true
    },
    {
      dataField: "subtitle",
      text: "Subtitle"
    },
    {
      dataField: "description",
      text: "Description"
    },
    {
      dataField: "image",
      text: "Image"
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

  // params["validation_rules"] = {
  //   title: yup.string().required(),
  //   subtitle: yup.string().required(),
  //   description: yup.string().required(),
  //   image: yup.string().required(),
  //   status: yup
  //     .string()
  //     .required()
  //     .matches(/(1|0)/)
  // };

  // params["no_editable_cols"] = {
  //   cols: [5]
  // };

  params["data"] = data.views;

  /* OLD */

  //   const parametros = {};
  //   parametros["columnaclave"] = "pais";

  //   const selectOptions = {
  //     1: "Activo",
  //     0: "Inactivo"
  //   };

  //   parametros["columnas"] = [
  //     {
  //       dataField: "pais",
  //       text: "Pais",
  //       filter: textFilter()
  //     },
  //     {
  //       dataField: "country",
  //       text: "country",
  //       filter: textFilter()
  //     },
  //     {
  //       dataField: "iso2",
  //       text: "Iso2",
  //       filter: textFilter()
  //     },
  //     {
  //       dataField: "iso3",
  //       text: "Iso3",
  //       filter: textFilter()
  //     },
  //     {
  //       dataField: "indicativo",
  //       text: "Indicativo",
  //       filter: textFilter()
  //     },
  //     {
  //       dataField: "estado",
  //       text: "Activo",
  //       editor: {
  //         type: Type.CHECKBOX,
  //         value: "1:0"
  //       },
  //       formatter: cell => selectOptions[cell],
  //       filter: selectFilter({
  //         options: selectOptions
  //       })
  //     }
  //   ];

  //   parametros["config"] = {
  //     method: "get",
  //     url: "http://localhost/inmersal/public/api/v1/paises",
  //     headers: {
  //       Authorization: "${usuario.token_type} ${usuario.access_token}",
  //       "Content-Type": "application/json",
  //       "X-Requested-With": "XMLHttpRequest"
  //     }
  //     //data: peticionn POST
  //     //params: peticion GET
  //   };

  //   parametros["reglasdevalidacion"] = {
  //     pais: yup.string().required(),
  //     country: yup.string().required(),
  //     iso2: yup.string().required(),
  //     iso3: yup.string().required(),
  //     indicativo: yup.string().required(),
  //     estado: yup
  //       .string()
  //       .required()
  //       .matches(/(1|0)/)
  //   };

  // parametros['filasSeleccionadas'] = [];
  // parametros['selectRow'] = true;
  // parametros['editable'] = true;

  //   function botonFormateado(cell, row) {
  //     return <Button theme="danger">Danger</Button>;
  //   }

  return params;
};
