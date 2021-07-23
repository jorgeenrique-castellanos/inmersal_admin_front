import React, { useState, useEffect, useReducer } from "react";
import { Contexto } from './contexto';
import Tabla from '../../componentes/tabla';
import recuperarParametros from './parametrostabla'



export default function listar({botones}) {

    const parametros = recuperarParametros(null);
    const [data, setData] = useState({});
    const {estado, acciones} = React.useContext(Contexto);

    return (
        <Tabla estado={estado} acciones={acciones} parametros={parametros} />
    )
}

