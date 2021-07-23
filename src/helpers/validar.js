
export function validarElementos(parametros, data, procesarValidacion) {
    let schema = yup.object().shape(parametros['reglasdevalidacion']);
    schema.validate(data, { abortEarly: false }).then(function (value) {
        procesarValidacion({ error: false, data: data })
    }).catch(function (err) {
        const listadeerrores = crearListadeErrores(err.inner, parametros);
        procesarValidacion({ error: true, data: listadeerrores })
    });
}


export function validarElemento(parametros, data, procesarValidacion) {
    const { rowId, dataField, newValue } = cellEdit;
    const regladevalidacion = data.reglasdevalidacion[dataField];
    const objetoavalidar = yup.object().shape({ dataField: regladevalidacion });
    objetoavalidar.validate({ dataField: newValue }).
        then(function (value) {
            return { 'ok': true }
        })
        .catch(function (mensajedeerror) {
            return { 'ok': false, mensaje: mensajedeerror }
        });
}
