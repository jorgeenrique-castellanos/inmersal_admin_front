import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash';
import Crear from './formulario';
import Listar from './listar';
import Modal from './modal';
import BarraDeHerramientas from './barradeherramientas';
import Mensajes from './mensajes';
import { Proveedor } from './contexto';
import {
    Card,
    CardHeader,
    CardBody,

} from "shards-react";

import { set } from "react-ga";

export default ({ usuario }) => {


    return (
        < Proveedor>
            <Mensajes />
            <Card >
                <CardHeader>
                    <BarraDeHerramientas />
                </CardHeader>
                <CardBody>
                    <ToastContainer />
                    <Modal encabezado='Crear Opciones' cuerpo={<Crear />} tamano='lg' />
                    <Listar />
                </CardBody>
            </Card>
        </Proveedor>
    )
}
