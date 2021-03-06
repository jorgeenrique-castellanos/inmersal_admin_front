import yup from "../../../helpers/form_validate_error_list";

export default user => {
  const form_params = {};

  form_params["edit_server"] = {
    method: "PUT",
    url: "http://127.0.0.1:8000/api/v1/status"
  };

  form_params["validation_rules"] = {
    status: yup.string().required(),
  };

  return form_params;
};
