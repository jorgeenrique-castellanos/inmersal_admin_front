import React, { useEffect, useState } from "react";
import _ from "lodash";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { enviarAlServidor } from "../../helpers/servidor";
import showMessage from "../../helpers/messages";

export default function Table({ state, actions, params }) {
  const [tabledata, setTableData] = useState({ data: [], links: [], meta: [] });
  const [parametrosdeserver, setParametrosDeServer] = useState(
    params["server"]
  );

  const keyField = params.key;
  const cols = params.cols;
  const data = tabledata.data;
  const page = tabledata.meta.current_page;
  const sizePerPage = tabledata.meta.per_page;
  const totalSize = tabledata.meta.total;

  useEffect(() => {
    const getData = async () =>
      enviarAlServidor(
        respuestaPaginationOk,
        respuestaPaginationErr,
        parametrosdeserver
      );
    getData();
  }, [parametrosdeserver]);

  /*
   Cada cambio de estado que sea editado o creado refresca la tabla
   Si es creado se debe ordenar por fecha de cambio descendenta para mostra el registo creado
*/
  useEffect(() => {
    if (_.indexOf(["edited", "created", "deleted"], state.state_action) >= 0) {
      const parametros =
        state.state_action === "created" ? stateCreated() : parametrosdeserver;
      const getData = async () =>
        enviarAlServidor(
          respuestaPaginationOk,
          respuestaPaginationErr,
          parametros
        );
      getData();
    }
  }, [state.state_action]);

  function stateCreated() {
    let parametros = _.get(parametrosdeserver, "params", {});
    parametros = {
      ...parametros,
      type: "sort",
      sortField: "created_at",
      sortOrder: "DESC"
    };
    const parametrosnuevos = {
      ...parametrosdeserver,
      params: { ...parametros }
    };
    setParametrosDeServer(parametrosnuevos);
  }

  const respuestaPaginationOk = data => setTableData(data.data);

  const respuestaPaginationErr = error => showMessage(error.message);

  function handleTableChange(
    type,
    { page, sizePerPage, filters, sortField, sortOrder, cellEdit }
  ) {
    let parametros = _.get(parametrosdeserver, "params", {});
    parametros =
      type === "pagination"
        ? { ...parametros, type: type, page: page, sizePerPage: sizePerPage }
        : parametros;
    parametros =
      type === "sort"
        ? {
            ...parametros,
            type: type,
            page: 1,
            sortField: sortField,
            sortOrder: sortOrder
          }
        : parametros;
    const newparametros = { ...parametrosdeserver, params: { ...parametros } };
    setParametrosDeServer(newparametros);
  }

  function respuestaEdicionOk(done) {
    return data => {
      showMessage("Registro Modificado", false);
      setParametrosDeServer({ ...params.server, tag: Math.random() });
      done(false);
    };
  }

  function respuestaEdicionErr(done) {
    return error => {
      showMessage(error.data.message);
      done(true);
    };
  }

  function beforeSaveCell(oldValue, newValue, row, column, done) {
    let newrow = { ...row };
    newrow[column.dataField] = newValue;
    const parametros = {
      method: "PUT",
      url: `${params.server.url}/${row.id}`,
      data: newrow
    };
    enviarAlServidor(
      respuestaEdicionOk(done),
      respuestaEdicionErr(done),
      parametros
    );
  }

  return (
    <>
      <BootstrapTable
        bootstrap4
        keyField={keyField}
        data={data}
        columns={cols}
        bordered={false}
        filter={filterFactory()}
        pagination={paginationFactory({ page, sizePerPage, totalSize })}
        onTableChange={handleTableChange}
        striped
        remote
        cellEdit={cellEditFactory({
          mode: "click",
          beforeSaveCell
        })}
        defaultSorted={""}
      />
    </>
  );
}
