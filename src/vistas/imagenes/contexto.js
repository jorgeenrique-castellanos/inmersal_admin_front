import React, { createContext, useReducer } from 'react';
import estadoReducer, { estadoinicial } from './reducer';

const Contexto = createContext();

const Proveedor = (props) => {
    const [estado, dispatch] = useReducer(estadoReducer, estadoinicial);

    const acciones = {
        rowsmarked: (data) => dispatch({ type: "ROWSMARKED", rowsmarked: data }),
        rowschanged: () => dispatch({ type: "ROWSCHANGED" }),

        borrar: () => dispatch({ type: "BORRAR" }),
        borradoreset: () => dispatch({ type: "BORRADORESET"}),
        borradook: (mensaje) => dispatch({ type: "BORRADOOK",  mensaje:mensaje }),
      
        notificacion: (tipo, mensaje) => dispatch({ type: "NOTIFICACION",  tipo: tipo, mensaje: mensaje }),
        notificacionreset: () => dispatch({ type: "NOTIFICACIONRESET"}),
        
        cambiar: () => dispatch({ type: "CAMBIAR" }),
        cambiareset: () => dispatch({ type: "CAMBIARESET" }),
        cambiarok: (mensaje) => dispatch({ type: "CAMBIAROK",  mensaje:mensaje }),
  



        listar: () => dispatch({ type: "LISTAR" }),
        crear: () => dispatch({ type: "CREAR" }),
        cancelar: () => dispatch({ type: "CANCELAR" }),
        ok: () => dispatch({ type: "OK" }),


        
    };

    return (
        <Contexto.Provider
            value={{
                estado: estado,
                acciones: acciones,
            }}
        >
            {props.children}
        </Contexto.Provider>
    );
};

export { Proveedor, Contexto };