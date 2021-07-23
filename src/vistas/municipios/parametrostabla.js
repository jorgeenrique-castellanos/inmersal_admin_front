import React, { useEffect, useState } from "react";
import * as yup from 'yup';
import _ from 'lodash';
import { Button } from "shards-react";
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import Servidor from '../../helpers/servidor';

export default (usuario) => {

    const parametros = {};
    parametros['columnaclave'] = 'id';

    const paises = {
        method: 'get',
        url: 'http://localhost/inmersal/public/api/v1/paises/select',
        headers: {
            'Authorization': '${usuario.token_type} ${usuario.access_token}',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        //data: peticionn POST
        //params: peticion GET
    };

    const departamentos = {
        method: 'get',
        url: 'http://localhost/inmersal/public/api/v1/departamentos/select',
        headers: {
            'Authorization': '${usuario.token_type} ${usuario.access_token}',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        //data: peticionn POST
        //params: peticion GET
    };

    const [opcpaises, setOpcpaises] = useState({ opciones: [], opcionesfiltradas: [] });
    const [opcdepartamentos, setOpcdepartamentos] = useState({ opciones: [], opcionesfiltradas: [] });


    useEffect(() => {
        Servidor(setOpciones(setOpcpaises), paises)
        Servidor(setOpciones(setOpcdepartamentos), departamentos);
    }, []);

    function setOpciones(elemento) {
        return (data) => {
            const opc = _.get(data, 'data.data.data', []);
            elemento({ opciones: opc, opcionesfiltradas: opc });
        };
    }

    parametros['beforeSaveCell'] = (oldValue, newValue, row, column, done) => {
        const campo = _.get(column, 'dataField', 'dummy');
        if (campo == 'pais') {
           
            const valores = opcdepartamentos.opciones;
            const filtradas = _.filter(valores, { condicional: newValue });
            setOpcdepartamentos({ ...opcdepartamentos, opcionesfiltradas:filtradas })
            row['departamento'] = _.get(filtradas[0], 'label', ' ');
            row['departamento_id'] = _.get(filtradas[0], 'value', 0);
        }
    }


    const selectOptions =
    {
        1: 'Activo',
        0: 'Inactivo',
    }

    parametros['columnas'] = [
        {
            dataField: 'codigo',
            text: 'Codigo',
            filter: textFilter()
        }, {
            dataField: 'pais',
            text: 'Pais',
            valor: 'pais_id',
            editor: {
                type: Type.SELECT,
                options: opcpaises.opcionesfiltradas
            }
        }, {
            dataField: 'departamento',
            text: 'Departamento',
            valor: 'departamento_id',
            editor: {
                type: Type.SELECT,
                options: opcdepartamentos.opcionesfiltradas
            }
        }, {
            dataField: 'municipio',
            text: 'Municipio',
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
        url: 'http://localhost/inmersal/public/api/v1/municipios',
        headers: {
            'Authorization': '${usuario.token_type} ${usuario.access_token}',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        //data: peticionn POST
        //params: peticion GET
    };

    parametros['reglasdevalidacion'] = {
        'codigo': yup.number().integer(),
        'departamento_id': yup.string().required(),
        'municipio': yup.string().required(),
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