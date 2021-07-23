import React from "react";
import * as yup from 'yup';

export default (usuario) => {
    const parametros = {}

    parametros['grabarregistro'] = {
        method: 'post',
        url: 'http://localhost/inmersal/public/api/v1/tiposdeunidades',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        //data: peticionn POST
        //params: peticion GET
    };

    parametros['reglasdevalidacion'] = {
        empresa: yup.object({
            value: yup.string().required(),
            label: yup.string().required(),
        }).required(),
        proyecto: yup.object({
            value: yup.string().required(),
            label: yup.string().required(),
        }).required(),
        nombre: yup.string().required(),
        descripcion: yup.string().required(),
        area: yup.string(),
        precio: yup.string(),
        estado: yup.boolean().required()
    };


    parametros['empresa'] = {
        label: 'parent',
        server: {
            method: 'get',
            url: 'http://localhost/inmersal/public/api/v1/empresas/select',
            headers: {
                'Authorization': '${usuario.token_type} ${usuario.access_token}',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            //data: peticionn POST
            //params: peticion GET
        }
    };

    parametros['proyecto'] = {
        label: 'parent',
        server: {
            method: 'get',
            url: 'http://localhost/inmersal/public/api/v1/proyectos/select',
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