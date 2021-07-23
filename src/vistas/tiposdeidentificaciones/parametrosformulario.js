import React from "react";
import * as yup from 'yup';

export default (usuario) => {
    const parametros = {}

    parametros['grabarregistro'] = {
        method: 'post',
        url: 'http://localhost/inmersal/public/api/v1/tiposdeidentificaciones',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        //data: peticionn POST
        //params: peticion GET
    };

    parametros['reglasdevalidacion'] = {
        tipodepersona_id: yup.object({
            value: yup.number().integer(),
            label: yup.string().required(),
        }).required(),
        tipodeidentificacion:yup.string().required(),
        estado: yup.boolean().required()
    };


    parametros['tipodepersona_id'] = {
        label:'Tipo de Persona',
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

    return parametros

}