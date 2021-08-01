import React, { useEffect, useState } from "react";
import _ from "lodash";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import Modal from "../modal_OLD/Modal";
//import Servidor from "../helpers/servidor";
import * as yup from "yup";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Button, ButtonGroup } from "shards-react";

export default function Table({ state, actions, params }) {
  const keyField = params.key;
  const rows = params.data;
  const cols = params.cols;

  return (
    <>
      <BootstrapTable
        bootstrap4
        keyField={keyField}
        data={rows}
        columns={cols}
        bordered={false}
        striped
        //selectRow={selectRow}
        // pagination={paginationFactory(opciones)}
        remote
        //onTableChange={onTableChange}
        // filter={filterFactory()}
        cellEdit={cellEditFactory({
          mode: "click",
          blurToSave: true
        })}
      />
    </>
  );
}
