import React,{useContext} from "react";
import ReactHtmlParser from "react-html-parser";
import * as yup from "yup";
import { Context } from "../../../views/26_view_cities/helpers/context";
import { Button } from "shards-react";
import Icons from "../../../assets/icons";
import { textFilter } from "react-bootstrap-table2-filter";

// DATA
// import data from "../../../data/data_05_view_datos.json";

//prettier-ignore
export default usuario => {
  const { view_global_state, view_global_actions } = useContext(Context);
  const icons = Icons();
  const params = {};
  params["key"] = "id";

  params["server"] = {
    method: "get",
    url: "https://inmersal-back.lopublicaste.co/public/api/v1/city",
    e:0
  }

  params["cols"] = [  
    {
      dataField: "country",
      text: "Pais",
      sort:true,
      filter: textFilter(),            
    },
    {
      dataField: "state",
      text: "Departamentos"
    },
    {
      dataField: "city",
      text: "Ciudad",
      sort:true,
      filter: textFilter(),            
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
