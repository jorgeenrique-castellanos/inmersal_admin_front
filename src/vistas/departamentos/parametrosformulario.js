import React from "react";
import * as yup from 'yup';

export default (usuario) => {
    const parametros = {}

    parametros['grabarregistro'] = {
        method: 'post',
        url: 'http://localhost/inmersal/public/api/v1/departamentos',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        //data: peticionn POST
        //params: peticion GET
    };

    
    parametros['reglasdevalidacion'] = {
        codigo: yup.number().integer().required(),
        departamento: yup.string().max(45).required(),
        pais: yup.object({
            value: yup.string().required(),
            label: yup.string().required(),
        }).required(),
        estado: yup.boolean().required()
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

    return parametros

}