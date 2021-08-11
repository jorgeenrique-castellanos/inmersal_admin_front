import yup from "../../../helpers/form_validate_error_list";

export default user => {
  const form_params = {};

  form_params["edit_server"] = {
    method: "PUT",
    url: "https://inmersal-back.lopublicaste.co/public/api/pais"
    //data: peticionn POST
    //form_params: peticion GET
  };


  form_params["validation_rules"] = {
    country: yup
    .object()
    .shape({
      value: yup.string().required(),
      label: yup.string().required()
    })
    .default(undefined)
    .required(),
    state: yup.string().required(),
    status_id: yup.string().required(),
  };

  return form_params;
};
