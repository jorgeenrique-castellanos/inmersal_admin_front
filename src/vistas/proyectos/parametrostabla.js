import React from "react";
import * as yup from 'yup';
import { Button } from "shards-react";
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';

export default (acciones) => {

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
        }, {
            dataField: 'empresa',
            text: 'Empresa',
            filter: textFilter()
        }, {
            dataField: 'nombre',
            text: 'Proyecto',
            filter: textFilter()
        }, {
            dataField: 'descripcion',
            text: 'Descripcion',
            filter: textFilter()
        }, {
            dataField: 'direccion',
            text: 'Direccion',
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
        }, {
            dataField: 'accion',
            text: 'Editar',
            isDummyField: true,
            editable: false,
            formatter: botonFormateado
        }
    ]


    parametros['config'] = {
        method: 'get',
        url: 'http://localhost/inmersal/public/api/v1/proyectos',
        headers: {
            'Authorization': '${usuario.token_type} ${usuario.access_token}',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        //data: peticionn POST
        //params: peticion GET
    };

    parametros['reglasdevalidacion'] = {
        empresa_id: yup.string().max(36).required(),
        nombre: yup.string().max(100).required(),
        descripcion: yup.string().max(2000).required(),
        municipio: yup.string().required(),
        direccion: yup.string().required(),
        lat: yup.string().required(),
        lon: yup.string().required(),
        logo: yup.string().required(),
        estado: yup.string().required().matches(/(1|0)/)
    };

    // parametros['filasSeleccionadas'] = [];
    // parametros['selectRow'] = true;
    // parametros['editable'] = true;



    function editarRegistro(cell, row) {

        return () => {
            acciones.editar(row);
        }
    }


    function botonFormateado(cell, row) {
        return (
            <Button theme="danger" onClick={editarRegistro(cell, row)}>Editar</Button>
            /*             <Button theme="danger" onClick={ acciones.editar}>Editar</Button> */
        )
    }


    return parametros

}