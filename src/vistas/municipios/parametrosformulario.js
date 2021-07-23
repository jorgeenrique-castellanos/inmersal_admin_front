import React from "react";
import * as yup from 'yup';

export default (usuario) => {
    const parametros = {}

    parametros['grabarregistro'] = {
        method: 'post',
        url: 'http://localhost/inmersal/public/api/v1/municipios',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        //data: peticionn POST
        //params: peticion GET
    };

    parametros['reglasdevalidacion'] = {
        pais: yup.object({
            value: yup.string().required(),
            label: yup.string().required(),
        }).required(),
        departamento: yup.object({
            value: yup.number().integer(),
            label: yup.string().required(),
        }).required(),
        municipio: yup.string().required(),
        codigo: yup.string(),
        estado: yup.boolean().required()
    };


    parametros['pais'] = {
        label:'parent',
        server: {
            method: 'get',
            url: 'http://localhost/inmersal/public/api/v1/paises/select',
            headers: {
                'Authorization': '${usuario.token_type} ${usuario.access_token}',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            //data: peticionn POST
            //params: peticion GET
        }
    };

    parametros['departamento'] = {
        label:'pais',
        server: {
            method: 'get',
            url: 'http://localhost/inmersal/public/api/v1/departamentos/select',
            headers: {
                'Authorization': '${usuario.token_type} ${usuario.access_token}',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            //data: peticionn POST
            //params: peticion GET
        }
    };

    return parametros

}