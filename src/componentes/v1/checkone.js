import React, { useState } from 'react';

import {
    FormCheckbox,
    FormGroup,
} from 'shards-react';

export default function CheckBoxOne({ nombre, descripcion, valores, register }) {

    const [activo, setActivo] = useState(true);
    const cambiarEstado = () => setActivo(!activo);
    const estado = activo ? valores[0] : valores[1];
    return (
        <>
            <FormGroup>
                <label htmlFor='id' className='mr-2'>{descripcion}</label>
                <FormCheckbox
                    id='id'
                    name={nombre}
                    toggle
                    small
                    checked={activo}
                    onChange={cambiarEstado}
                    innerRef={register}>
                    {estado}
                </FormCheckbox>
            </FormGroup>
        </>
    );
};





