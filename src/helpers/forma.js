import * as yup from "yup";
import _ from "lodash";

export function inicializar(parametros, valor = "init") {
  const elementos = Object.keys(parametros["reglasdevalidacion"]);
  return elementos.reduce((lista, elemento) => {
    lista[elemento] = valor;
    return lista;
  }, {});
}

export function validar(parametros, data, procesarValidacion) {
  let schema = yup.object().shape(parametros["reglasdevalidacion"]);
  schema
    .validate(data, { abortEarly: false })
    .then(function(value) {
      procesarValidacion({ error: false, data: data });
    })
    .catch(function(err) {
      console.log(err);
      const listadeerrores = crearListadeErrores(err.inner, parametros);
      procesarValidacion({ error: true, data: listadeerrores });
    });
}

function crearListadeErrores(errores, parametros) {
  console.log("Function forma crearlista de Errores");
  console.log(errores);
  errores = _.isArray(errores) ? errores : [];
  const listainicial = inicializar(parametros, "valid");
  listainicial["mensajes"] = {};
  return errores.reduce((lista, el) => {
    lista[el["path"]] = "invalid";
    lista["mensajes"][el["path"]] = el["errors"].join("\n");
    return lista;
  }, listainicial);
}
