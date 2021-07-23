import React from "react";
import * as yup from 'yup';
import { Button } from "shards-react";
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';

export default (usuario) => {

    const parametros = {};
    parametros['columnaclave'] = 'pais';

    const selectOptions =
    {
        1: 'Activo',
        0: 'Inactivo',
    }

    parametros['columnas'] = [
        {
            dataField: 'pais',
            text: 'Pais',
            filter: textFilter()
        }, {
            dataField: 'country',
            text: 'country',
            filter: textFilter()
        }, {
            dataField: 'iso2',
            text: 'Iso2',
            filter: textFilter()
        }, {
            dataField: 'iso3',
            text: 'Iso3',
            filter: textFilter()
        }, {
            dataField: 'indicativo',
            text: 'Indicativo',
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
        url: 'http://localhost/inmersal/public/api/v1/paises',
        headers: {
            'Authorization': '${usuario.token_type} ${usuario.access_token}',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        //data: peticionn POST
        //params: peticion GET
    };

    parametros['reglasdevalidacion'] = {
        pais: yup.string().max(45).required(),
        country: yup.string().max(45).required(),
        iso2: yup.string().max(2).required(),
        iso3: yup.string().max(3),
        indicativo: yup.string().max(10),
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