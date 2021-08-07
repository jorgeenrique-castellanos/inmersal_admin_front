import yup from "../../../helpers/form_validate_error_list";

export default user => {
  const form_params = {};

  form_params["edit_server"] = {
    method: "PUT",
    url: "http://127.0.0.1:8000/api/pais"
    //data: peticionn POST
    //form_params: peticion GET
  };


  form_params["validation_rules"] = {
    country: yup.string().required(),
    alpha2: yup.string().required(),
    alpha3: yup.string().required(),
  };

  return form_params;
};
