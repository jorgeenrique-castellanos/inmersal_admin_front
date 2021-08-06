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
  const [parametrosdeserver, setParametrosDeServer] = useState(params['server']);

  const keyField = params.key;
  const cols = params.cols;
  const data = tabledata.data
  const page = tabledata.meta.current_page;
  const sizePerPage = tabledata.meta.per_page;
  const totalSize = tabledata.meta.total;


  useEffect(() => {
    const getData = async () => enviarAlServidor(respuestaPaginationOk, respuestaPaginationErr, parametrosdeserver);
    getData();
  }, [parametrosdeserver])

  const respuestaPaginationOk = (data) => setTableData(data.data);

  const respuestaPaginationErr = (error) => showMessage(error.message)

  function handlePagination(type, page, sizePerPage, filters, sortField, sortOrder, cellEdit) {
    const parametros = { ...params.server, params: { type: type, page: page, sizePerPage: sizePerPage, filters: filters, sortField: sortField, sortOrder: sortOrder, cellEdit: cellEdit } };
    setParametrosDeServer(parametros);
  }

  function handleTableChange(type, { page, sizePerPage, filters, sortField, sortOrder, cellEdit }) {
    if (type === 'pagination')
      return handlePagination(type, page, sizePerPage, filters, sortField, sortOrder, cellEdit);
  }

  function respuestaEdicionOk(done) {
    return (data) => {
      showMessage('Registro Modificado', false);
      setParametrosDeServer({ ...params.server, tag: Math.random() });
      done(false);
    }
  }

  function respuestaEdicionErr(done) {
    return (error) => {
      console.log(error);
      showMessage(error.data.message);
      done(true);
    }
  }

  function beforeSaveCell(oldValue, newValue, row, column, done) {
    let newrow = { ...row };
    newrow[column.dataField] = newValue;
    const parametros = { method: 'PUT', url: `${params.server.url}/${row.id}`, data: newrow };
    enviarAlServidor(respuestaEdicionOk(done), respuestaEdicionErr(done), parametros);
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
          mode: 'click',
          beforeSaveCell
        })}
      />
    </>
  );
}
