import React, { useState, useEffect, useReducer } from "react";
import { Contexto } from './contexto';
import Tabla from '../../componentes/v1/tabla';
import recuperarParametros from './parametrostabla'



export default function listar() {

    const parametros = recuperarParametros(null);
    const {estado, acciones} = React.useContext(Contexto);

    return (
        <Tabla estado={estado} acciones={acciones} parametros={parametros} />
    )
}

