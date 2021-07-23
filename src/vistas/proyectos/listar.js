import React, { useState, useEffect, useReducer } from "react";
import { Contexto } from './contexto';
import Tabla from '../../componentes/tabla';
import recuperarParametros from './parametrostabla'



export default function listar({ botones }) {

    const { estado, acciones } = React.useContext(Contexto);
    const parametros = recuperarParametros(acciones);

    return (
        <Tabla estado={estado} acciones={acciones} parametros={parametros} />
    )
}

