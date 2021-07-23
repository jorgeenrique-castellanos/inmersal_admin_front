import React, { useEffect, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash'


export default function ({contexto}) {

    const { estado, acciones } = useContext(contexto);
 
    const mostrarmensaje = (tipo, mensaje) => {
        toast[tipo](mensaje, {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        acciones.notificacionreset();
    }


    useEffect(() => {
        const mensaje = _.get(estado, 'mensaje', '');
        if (estado.notificacion && !_.isEmpty(mensaje)) {
            const tipo = _.get(estado, 'tipo', 'error');
            mostrarmensaje(tipo, mensaje);
        }
    }, [estado.notificacion, estado.mensaje]);


    return (
        <ToastContainer />
    );
};





