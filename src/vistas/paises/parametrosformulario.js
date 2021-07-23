import React from "react";
import * as yup from 'yup';

export default (usuario) => {
    const parametros = {}

    parametros['grabarregistro'] = {
        method: 'post',
        url: 'http://localhost/inmersal/public/api/v1/paises',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        //data: peticionn POST
        //params: peticion GET
    };

    parametros['reglasdevalidacion'] = {
        pais: yup.string().max(45).required(),
        country: yup.string().max(45).required(),
        iso2: yup.string().max(2).required(),
        iso3: yup.string().max(3),
        indicativo: yup.string().max(5),
        estado: yup.boolean().required()
    };


    return parametros

}