import yup from "../../../helpers/form_validate_error_list";

export default user => {
  const form_params = {};

  form_params["delete_server"] = {
    method: "DELETE",
    url: "http://127.0.0.1:8000/api/pais"
    //data: peticionn POST
    //form_params: peticion GET
  };


  return form_params;
};
