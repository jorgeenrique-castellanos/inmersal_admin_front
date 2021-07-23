import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import Servidor from '../../../src/helpers/servidor'

export default ({ nombre, descripcion, setValue, errores, opciones = null, condicional = null }) => {

    const [options, setOptions] = useState({ valores: [], filtradas: [] });

    let selectRef = useRef();

    function filtrarOpciones(nuevasopciones) {

        if (_.isNull(condicional)) {
            setOptions({ valores: nuevasopciones, filtradas: nuevasopciones });
        } else {
            const optfiltradas = (nuevasopciones.filter((opt) => condicional === opt.condicional));
            setOptions({ valores: nuevasopciones, filtradas: optfiltradas });
        }
    }

    const recuperarOpciones = (resultado) => {
        filtrarOpciones(_.get(resultado, 'data.data.data', []));
    }

    useEffect(() => {
        if (opciones && opciones.data) {
            filtrarOpciones(_.get(opciones, 'data', []));
        }
        if (opciones && opciones.server) {
            Servidor(recuperarOpciones, opciones.server);
        }
    }, []);

    useEffect(() => {
        selectRef && selectRef.select && selectRef.select.clearValue();
        filtrarOpciones(options.valores);
    }, [condicional]);

    const handleInputChange = (valor) => {
        setValue(nombre, valor);
    };

    const esValido = (el) => {
        if (_.get(errores, el, 'init') === 'init') return false;
        const value = errores[`${el}.value`] ? errores[`${el}.value`] : 'valid';
        const label = errores[`${el}.label`] ? errores[`${el}.label`] : 'valid';
        return (value === 'invalid' || label === 'invalid') ? 'red' : 'green';
    }

    const recuperaMensaje = (el) => errores && errores['mensajes'] && errores['mensajes'][`${el}.value`] ? (errores['mensajes'][`${el}.value`]).replace('.value', '') : '';

    return (
        <>
            <label htmlFor={nombre}>{descripcion}</label>
            <Select
                id={nombre}
                onChange={handleInputChange}
                options={options.filtradas}
                placeholder={'Seleccionar ' + descripcion.toLowerCase()}
                styles={esValido(nombre) && {
                    control: (base, state) => ({
                        ...base,
                        borderColor: esValido(nombre),
                    }),
                }}
                ref={ref => { selectRef = ref }}
            />
            <span>{recuperaMensaje(nombre)}</span>
        </>
    );
};





