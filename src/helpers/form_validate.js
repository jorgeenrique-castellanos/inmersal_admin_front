import * as yup from "yup";
import _ from "lodash";

export function validateFormData(form_params, data, processValidation) {
  let schema = yup.object().shape(form_params["validation_rules"]);
  schema
    .validate(data, { abortEarly: false })
    .then(function(value) {
      processValidation({ error: false, data: data });
    })
    .catch(function(errors) {
      const errors_array = errors.inner;
      const error_list = createErrorList(errors_array, form_params);
      processValidation({ error: true, data: error_list });
    });
}

function createErrorList(errors_array, form_params) {
  let error_list = initErrorList(form_params, "is-valid");
  error_list["error_messages"] = {};
  errors_array = _.isArray(errors_array) ? errors_array : [];
  return errors_array.reduce((list, error) => {
    list[error["path"]] = "is-invalid";
    list["error_messages"][error["path"]] = error["errors"].join("\n");
    return list;
  }, error_list);
}

export function initErrorList(form_params, value = "initErrorList") {
  const input_names = Object.keys(form_params["validation_rules"]);
  return input_names.reduce((list, name) => {
    list[name] = value;
    return list;
  }, {});
}
