import React from "react";
import yup from "../../../helpers/form_validate_error_list";

export default user => {
  const form_params = {};

  form_params["create_server"] = {
    method: "POST",
    url: "http://127.0.0.1:8000/api/pais"
  };
  

  form_params["validation_rules"] = {  
    id: yup.string().required(),
    country: yup.string().required(),
    country_alpha_2: yup.string().max(2, "Maximo dos caracteres").required(),
    country_alpha_3: yup.string().max(3, "Maximo tres caracteres").required(),
  };

  // form_params["parent_id"] = {
  //   label: "parent",
  //   server: {
  //     method: "get",
  //     url: "http://localhost/inmersal/public/api/v1/menus/select",
  //     headers: {
  //       Authorization: "${usuario.token_type} ${usuario.access_token}",
  //       "Content-Type": "application/json",
  //       "X-Requested-With": "XMLHttpRequest"
  //     }
  //     //data: peticionn POST
  //     //form_params: peticion GET
  //   }
  // };

  return form_params;
};
