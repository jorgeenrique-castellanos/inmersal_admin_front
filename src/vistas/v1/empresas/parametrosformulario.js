import React from "react";
import * as yup from 'yup';

export default (usuario) => {
    const parametros = {}

    parametros['grabarregistro'] = {
        method: 'post',
        url: 'http://localhost/inmersal/public/api/v1/empresas',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        //data: peticionn POST
        //params: peticion GET
    };


    parametros['reglasdevalidacion'] = {
        empresa: yup.string(),
        tipodepersona_id: yup.object({
            value: yup.number().integer(),
            label: yup.string().required(),
        }).required(),
        tipodeidentificacion_id: yup.object({
            value: yup.number().integer(),
            label: yup.string().required(),
        }).required(),
        identificacion: yup.string(),
        municipio: yup.object({
            value: yup.number().integer(),
            label: yup.string().required(),
        }).required(),
        estado: yup.boolean().required()
    };

    parametros['tipodepersona'] = {
        label: 'parent',
        server: {
            method: 'get',
            url: 'http://localhost/inmersal/public/api/v1/tiposdepersonas/select',
            headers: {
                'Authorization': '${usuario.token_type} ${usuario.access_token}',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            //data: peticionn POST
            //params: peticion GET
        }
    };
    parametros['tipodeidentificacion'] = {
        label: 'parent',
        server: {
            method: 'get',
            url: 'http://localhost/inmersal/public/api/v1/tiposdeidentificaciones/select',
            headers: {
                'Authorization': '${usuario.token_type} ${usuario.access_token}',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            //data: peticionn POST
            //params: peticion GET
        }
    };

    parametros['pais'] = {
        label: 'parent',
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
        label: 'parent',
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
    parametros['municipio'] = {
        label: 'parent',
        server: {
            method: 'get',
            url: 'http://localhost/inmersal/public/api/v1/municipios/select',
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