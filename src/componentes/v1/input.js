import React from 'react';

import {
    FormInput,
    FormFeedback,
    FormGroup
} from 'shards-react';

export default function Input({ nombre, descripcion, register, errores }) {

    const esValido = (el) => {
        if (!errores[el] || errores[el] === 'init')
            return { valid: false }
        else
            return errores[el] === 'valid' ? { valid: true } : { invalid: true };
    }
    const recuperaMensaje = (el) => errores[el] && errores[el]['mensaje'] ? errores[el]['mensaje'] : '';

    return (
        <>
            <FormGroup>
                <label htmlFor={nombre}>{descripcion}</label>
                <FormInput innerRef={register}
                    id={nombre}
                    name={nombre}
                    placeholder={'Ingrese ' + nombre.toLowerCase()}
                    {...esValido(nombre)}
                />
                <FormFeedback >{recuperaMensaje(nombre)}</FormFeedback>
            </FormGroup>
        </>
    );
};





