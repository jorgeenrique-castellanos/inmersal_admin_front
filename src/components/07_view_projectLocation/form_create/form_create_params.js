import React from "react";
import yup from "../../../helpers/form_validate_error_list";

export default user => {
  const form_params = {};

  form_params["record_config"] = {
    method: "post",
    url: "http://localhost/inmersal/public/api/v1/menus",
    headers: {
      "Content-Type": "multipart/form-data"
    }
    //data: peticionn POST
    //form_params: peticion GET
  };

  form_params["validation_rules"] = {
    project_country: yup
      .object()
      .shape({
        value: yup.string().required(),
        label: yup.string().required()
      })
      .default(undefined)
      .required(),
    project_state: yup
      .object()
      .shape({
        value: yup.string().required(),
        label: yup.string().required()
      })
      .default(undefined)
      .required(),
    project_city: yup.string().required(),
    project_address: yup.string().required(),
    project_lat: yup.string().required(),
    project_lng: yup.string().required(),
    project_key_google_map: yup.string().required(),
    // project_pin
    project_waether: yup
    .object()
    .shape({
      value: yup.string().required(),
      label: yup.string().required()
    })
    .default(undefined)
    .required(),
    // project_location_video


    
    // project_available: yup.boolean().required(),
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
