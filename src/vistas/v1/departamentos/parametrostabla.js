import React from "react";
import * as yup from 'yup';
import { Button } from "shards-react";
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';

export default (usuario) => {

    const parametros = {};
    parametros['columnaclave'] = 'id';

    const selectOptions =
    {
        1: 'Activo',
        0: 'Inactivo',
    }

    parametros['columnas'] = [
        {
            dataField: 'id',
            text: 'id',
            hidden: true
        },
        {
            dataField: 'codigo',
            text: 'Codigo',
            filter: textFilter()
        },
        {
            dataField: 'pais',
            text: 'Pais',
            filter: textFilter()
        }, {
            dataField: 'departamento',
            text: 'Departamento',
            filter: textFilter()
        }, {
            dataField: 'estado',
            text: 'Estado',
            editor: {
                type: Type.CHECKBOX,
                value: '1:0'
            },
            formatter: cell => selectOptions[cell],
            filter: selectFilter({
                options: selectOptions
            })
        }
    ]


    parametros['config'] = {
        method: 'get',
        url: 'http://localhost/inmersal/public/api/v1/departamentos',
        headers: {
            'Authorization': '${usuario.token_type} ${usuario.access_token}',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        //data: peticionn POST
        //params: peticion GET
    };

    parametros['reglasdevalidacion'] = {
        codigo: yup.number().integer(),
        pais: yup.string().required(),
        departamento: yup.string().required(),
        estado: yup.string().required().matches(/(1|0)/)
    };

    function botonFormateado(cell, row) {
        return (
            <Button theme="danger">Danger</Button>
        )
    }

    return parametros

}