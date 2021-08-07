import * as yup from "yup";
import _ from "lodash";

export function validateFormData(form_params, data, validationOk, validationErr) {
  let schema = yup.object().shape(form_params);
  schema
    .validate(data, { abortEarly: false })
    .then(function (value) {
      validationOk(data);
    }).catch(function (errors) {
      const error_list = createErrorList(errors.inner);
      validationErr(error_list);
    });
}

function createErrorList(errors) {
  return errors.reduce((list, error) => {
    list[error.path] = error.message;
    return list;
  }, {});
}


