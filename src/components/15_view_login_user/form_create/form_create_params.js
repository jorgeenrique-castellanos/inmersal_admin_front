import yup from "../../../helpers/form_validate_error_list";

export default user => {
  const form_params = {};

  form_params["server_config"] = {
    method: "post",
    url: "http://127.0.0.1:8000/api/auth/login",
    headers: {
      "Content-Type": "application/json"
    }
  };

  form_params["validation_rules"] = {
    email: yup.string().required(),
    password: yup.string().required(),
  };


  return form_params;
};
