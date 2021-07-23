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

    const recuperarOpciones = () => [
        {
            value: 1,
            label: 'Natural'
        }, {
            value: 2,
            label: 'Juridica'
        }, {
            value: 3,
            label: 'Semi Juridica'
        }
    ];

    parametros['columnas'] = [
        {
            dataField: 'id',
            text: 'id',
            hidden: true
        }, {
            dataField: 'titulo',
            text: 'Titulo',
            filter: textFilter(),
            sort:true
        }, {
            dataField: 'opcion',
            text: 'Opcion',
            filter: textFilter(),
            sort:true
        }, {
            dataField: 'icono',
            text: 'Icono',
            filter: textFilter()
        }, {
            dataField: 'parent',
            text: 'Parent',
            tipo: 'select',
            valor: 'parent_id',
            editor: {
                type: Type.SELECT,
                options: recuperarOpciones()
            }
        }, {
            dataField: 'estado',
            text: 'Activo',
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
        url: 'http://localhost/inmersal/public/api/v1/menus',
        headers: {
            'Authorization': '${usuario.token_type} ${usuario.access_token}',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        //data: peticionn POST
        //params: peticion GET
    };

    parametros['reglasdevalidacion'] = {
        titulo: yup.string().required(),
        opcion: yup.string().required(),
        icono: yup.string().required(),
        parent: yup.string(),
        parent_id: yup.number().integer(),
        estado: yup.string().required().matches(/(1|0)/)
    };

    // parametros['filasSeleccionadas'] = [];
    // parametros['selectRow'] = true;
    // parametros['editable'] = true;



    function botonFormateado(cell, row) {
        return (
            <Button theme="danger">Danger</Button>
        )
    }

    return parametros

}