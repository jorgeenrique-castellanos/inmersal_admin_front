import React from "react";
import * as yup from 'yup';

export default (usuario) => {
    const parametros = {}

    parametros['grabarregistro'] = {
        method: 'post',
        url: 'http://localhost/inmersal/public/api/v1/menus',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        //data: peticionn POST
        //params: peticion GET
    };

    parametros['reglasdevalidacion'] = {
        titulo: yup.string().required(),
        opcion: yup.string().required(),
        icono: yup.string().required(),
        parent: yup.string(),
        parent_id: yup.object({
            value: yup.number().integer(),
            label: yup.string().required(),
        }).required(),
        estado: yup.boolean().required()
    };


    parametros['parent_id'] = {
        label:'parent',
        server: {
            method: 'get',
            url: 'http://localhost/inmersal/public/api/v1/menus/select',
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