import React, { useEffect, useState } from "react";
import _ from "lodash";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Button, ButtonGroup } from "shards-react";

export default function Table({ state, actions, params, onTableChange = null }) {
  const keyField = params.key;
  const data = params.data.data 
  const cols = params.cols;
  const page = params.data.meta.current_page;
  const sizePerPage = params.data.meta.per_page;
  const totalSize = params.data.meta.total;
  const handleTableChange = params.handleTableChange
 

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
          blurToSave: true
        })}
      />
    </>
  );
}
