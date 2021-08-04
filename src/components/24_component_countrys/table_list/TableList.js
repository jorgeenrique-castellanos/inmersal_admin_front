import React, { useState, useEffect, useReducer } from "react";
import { Context } from "../../../views/24_view_countrys/helpers/context";
import Table from "../../table/Table";
import recuperarParametros from "./table_list_params";
import { enviarAlServidor } from "../../../helpers/servidor"


export default function List({ title, botones }) {

  const [tabledata, setTabledata] = useState({ data: [], links: [], meta: [] });
  const { view_global_state, view_global_actions } = React.useContext(Context);
  const params = recuperarParametros(null);

  const respuestaOk = (data) => setTabledata(data.data);
  const erroServidor = (error) => console.log(error)

  useEffect(() => {
    const getData = async () => enviarAlServidor(respuestaOk, erroServidor, params['server']);
    getData();
  }, [])


  function handlePagination(page, sizePerPage, filters, sortField, sortOrder, cellEdit) {
    console.log(page, sizePerPage, filters, sortField, sortOrder, cellEdit);
    params.server.params = { page: page, sizePerPage: sizePerPage };
    console.log(params.server)
    enviarAlServidor(respuestaOk, erroServidor, params['server']);
  }

  const handleTableChange = (type, { page, sizePerPage, filters, sortField, sortOrder, cellEdit }) => {
    if (type === 'pagination')
      return handlePagination(page, sizePerPage, filters, sortField, sortOrder, cellEdit);
    // const currentIndex = (page - 1) * sizePerPage;
    // setTimeout(() => {
    //   // Handle cell editing
    //   if (type === 'cellEdit') {
    //     const { rowId, dataField, newValue } = cellEdit;
    //     products = products.map((row) => {
    //       if (row.id === rowId) {
    //         const newRow = { ...row };
    //         newRow[dataField] = newValue;
    //         return newRow;
    //       }
    //       return row;
    //     });
    //   }
    //   let result = products;

    //   // Handle column filters
    //   result = result.filter((row) => {
    //     let valid = true;
    //     for (const dataField in filters) {
    //       const { filterVal, filterType, comparator } = filters[dataField];

    //       if (filterType === 'TEXT') {
    //         if (comparator === Comparator.LIKE) {
    //           valid = row[dataField].toString().indexOf(filterVal) > -1;
    //         } else {
    //           valid = row[dataField] === filterVal;
    //         }
    //       }
    //       if (!valid) break;
    //     }
    //     return valid;
    //   });
    //   // Handle column sort
    //   if (sortOrder === 'asc') {
    //     result = result.sort((a, b) => {
    //       if (a[sortField] > b[sortField]) {
    //         return 1;
    //       } else if (b[sortField] > a[sortField]) {
    //         return -1;
    //       }
    //       return 0;
    //     });
    //   } else {
    //     result = result.sort((a, b) => {
    //       if (a[sortField] > b[sortField]) {
    //         return -1;
    //       } else if (b[sortField] > a[sortField]) {
    //         return 1;
    //       }
    //       return 0;
    //     });
    //   }
    //   this.setState(() => ({
    //     page,
    //     data: result.slice(currentIndex, currentIndex + sizePerPage),
    //     totalSize: result.length,
    //     sizePerPage
    //   }));
    // }, 2000);
  }

  params['data'] = tabledata;
  params['handleTableChange'] = handleTableChange;

  return (
    <Table
      state={view_global_state}
      actions={view_global_actions}
      params={params}

    />
  );
}
