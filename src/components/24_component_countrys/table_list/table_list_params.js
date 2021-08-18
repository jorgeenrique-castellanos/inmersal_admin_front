import React, { useContext} from "react";
import { Context } from "../../../views/24_view_countrys/helpers/context";
import ReactHtmlParser from "react-html-parser";
import { Button } from "shards-react";
import Icons from "../../../assets/icons";
import { textFilter } from "react-bootstrap-table2-filter";

//prettier-ignore
export default () => {
  const { view_global_state, view_global_actions } = useContext(Context);
  const icons = Icons();
  const params = {};
  params["key"] = "id";
  
  params["server"] = {
    method: "get",
    url: "https://inmersal-back.lopublicaste.co/public/api/pais"
  }
 
  const selectOptions = {
    1: "Activo",
    0: "Inactivo"
  };

  params["cols"] = [
    {
      dataField: "country",
      text: "Pais",
      sort:true,
      filter: textFilter(),            
    },
    {
      dataField: "alpha2",
      text: "Alpha 2",
      sort:true,
      filter: textFilter()
    },
    {
      dataField: "alpha3",
      text: "Alpha 3",
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
