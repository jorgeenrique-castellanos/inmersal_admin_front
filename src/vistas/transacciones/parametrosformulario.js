import React from "react";
import * as yup from 'yup';

export default (usuario) => {
    const parametros = {}

    parametros['grabarregistro'] = {
        method: 'post',
        url: 'http://localhost/inmersal/public/api/v1/unidades',
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
        tipodeunidad: yup.object({
            value: yup.string().required(),
            label: yup.string().required(),
        }).required(),
        tipodeunidad: yup.object({
            value: yup.string().required(),
            label: yup.string().required(),
        }).required(),
        transaccion: yup.object({
            value: yup.string().required(),
            label: yup.string().required(),
        }).required(),
        unidad: yup.string().max(45).required(),
        contacto: yup.string().max(45).required(),
        celular: yup.string().max(45).required(),
        
        transaccion: yup.object({
            value: yup.string().required(),
            label: yup.string().required(),
        }).required(),
        observaciones: yup.string().max(2000),
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

    parametros['tipodeunidad'] = {
        label: 'parent',
        server: {
            method: 'get',
            url: 'http://localhost/inmersal/public/api/v1/tiposdeunidades/select',
            headers: {
                'Authorization': '${usuario.token_type} ${usuario.access_token}',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            //data: peticionn POST
            //params: peticion GET
        }
    };

    parametros['unidad'] = {
        label: 'parent',
        server: {
            method: 'get',
            url: 'http://localhost/inmersal/public/api/v1/unidades/select',
            headers: {
                'Authorization': '${usuario.token_type} ${usuario.access_token}',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            //data: peticionn POST
            //params: peticion GET
        }
    };

    parametros['tipodetransaccion'] = {
        label: 'parent',
        server: {
            method: 'get',
            url: 'http://localhost/inmersal/public/api/v1/tiposdetransacciones/select',
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