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
            dataField: 'id',
            text: 'id',
            hidden: true
        }, {
            dataField: 'empresa',
            text: 'Empresa',
            filter: textFilter()
        }, {
            dataField: 'proyecto',
            text: 'Proyecto',
            filter: textFilter()
        }, {
            dataField: 'tipodeunidad',
            text: 'Tipo de Unidad',
            filter: textFilter()
        }, {
            dataField: 'unidad',
            text: 'Unidad',
            filter: textFilter()
        }, {
            dataField: 'estado',
            text: 'Estado',
            filter: textFilter()
        }
    ]


    parametros['config'] = {
        method: 'get',
        url: 'http://localhost/inmersal/public/api/v1/unidades',
        headers: {
            'Authorization': '${usuario.token_type} ${usuario.access_token}',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        //data: peticionn POST
        //params: peticion GET
    };


    parametros['reglasdevalidacion'] = {
        pais: yup.string().required(),
        country: yup.string().required(),
        iso2: yup.string().required(),
        iso3: yup.string().required(),
        indicativo: yup.string().required(),
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