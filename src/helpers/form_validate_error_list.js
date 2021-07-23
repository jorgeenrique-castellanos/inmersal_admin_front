import * as yup from "yup";

yup.setLocale({
  mixed: {
    required: "Complete el campo para continuar"
  },
  string: {
    required: "Ingrese un e-mail válido",
    min: "Valor demasiado corto (mínimo ${min} caracteres)",
    max: "Valor demasiado largo (máximo ${max} caracteres)"
  },
  number: {
    min: "Valor inválido (debe ser mayor o igual a ${min})",
    max: "Valor inválido (debe ser mayor o igual a ${max})"
  },
  object: {
    required: "Complete el campo para continuar",
    default: "Por favor escoja un elemento del selector"
  }
});

export default yup;
