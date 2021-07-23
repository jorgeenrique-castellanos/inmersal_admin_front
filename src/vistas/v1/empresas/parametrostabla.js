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
            dataField: 'empresa',
            text: 'Empresa',
            filter: textFilter()
        }, {
            dataField: 'tipodepersona_id',
            text: 'Tipo de Persona id',
            hidden: true
        }, {
            dataField: 'tipodepersona',
            text: 'Tipo de Persona',
            filter: textFilter()
        }, {
            dataField: 'tipodeidentificacion_id',
            text: 'Tipo de Identificacion',
            hidden: true
        }, {
            dataField: 'tipodeidentificacion',
            text: 'Tipo de Identificacion',
            filter: textFilter()
        }, {
            dataField: 'identificacion',
            text: 'Identificacion',
            filter: textFilter()
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
        url: 'http://localhost/inmersal/public/api/v1/empresas',
        headers: {
            'Authorization': '${usuario.token_type} ${usuario.access_token}',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        //data: peticionn POST
        //params: peticion GET
    };

    parametros['reglasdevalidacion'] = {
        'empresa': yup.string().required(),
        'tipodepersona': yup.string().required(),
        'tipodepersona_id': yup.number().integer(),
        'tipodeidentificacion': yup.string().required(),
        'tipodeidentificacion_id': yup.number().integer(),
        'identificacion': yup.string().required(),
        'municipio_id': yup.number().integer(),
        'estado': yup.string().required().matches(/(1|0)/)
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