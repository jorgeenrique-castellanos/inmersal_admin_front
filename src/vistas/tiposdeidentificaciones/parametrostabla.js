import React, { useEffect, useState } from "react";
import * as yup from 'yup';
import _ from 'lodash';
import { Button } from "shards-react";
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import Servidor from '../../helpers/servidor';

export default (usuario) => {

    const tipodepersona_id = {
        method: 'get',
        url: 'http://localhost/inmersal/public/api/v1/tiposdepersonas/select',
        headers: {
            'Authorization': '${usuario.token_type} ${usuario.access_token}',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        //data: peticionn POST
        //params: peticion GET
    };

    const [opctipodepersona, setOpctipodepersona] = useState([])
    useEffect(() => {
        Servidor(setOpciones(tipodepersona_id), tipodepersona_id)
    }, []);

    function setOpciones(elemento) {
        return (data) => {
            const opc = _.get(data, 'data.data.data', []);
            setOpctipodepersona(opc);
        };
    }

    const parametros = {};
    parametros['columnaclave'] = 'id';

    const selectOptions =
    {
        1: 'Activo',
        0: 'Inactivo',
    }

    const recuperarOpciones = () => opctipodepersona;

    parametros['columnas'] = [
        {
            dataField: 'id',
            text: 'id',
            hidden: true
        }, {
            dataField: 'tipodepersona',
            text: 'Tipo de Persona',
            valor: 'tipodepersona_id',
            editor: {
                type: Type.SELECT,
                options: recuperarOpciones()
            }
        }, {
            dataField: 'tipodeidentificacion',
            text: 'Tipo de identificacion',
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
        url: 'http://localhost/inmersal/public/api/v1/tiposdeidentificaciones',
        headers: {
            'Authorization': '${usuario.token_type} ${usuario.access_token}',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        //data: peticionn POST
        //params: peticion GET
    };



    // parametros['filasSeleccionadas'] = [];
    // parametros['selectRow'] = true;
    // parametros['editable'] = true;



    function botonFormateado(cell, row) {
        return (
            <Button theme="danger">Danger</Button>
        )
    }

    parametros['reglasdevalidacion'] = {
        tipodepersona_id: yup.number().integer(),
        tipodepersona: yup.string().required(),
        tipodeidentificacion: yup.string().required(),
        estado: yup.boolean().required()
    };

    return parametros

}