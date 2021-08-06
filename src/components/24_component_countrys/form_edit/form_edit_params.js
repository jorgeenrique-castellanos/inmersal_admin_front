import yup from "../../../helpers/form_validate_error_list";

export default user => {
  const form_params = {};

  form_params["record_config"] = {
    method: "put",
    url: "http://localhost/inmersal/public/api/v1/menus",
    headers: {
      "Content-Type": "multipart/form-data"
    }
    //data: peticionn POST
    //form_params: peticion GET
  };

  form_params["validation_rules"] = {  
    country: yup.string().required(),
    country_alpha_2: yup.string().required(),
    country_alpha_3: yup.string().required(),
  };

  return form_params;
};
