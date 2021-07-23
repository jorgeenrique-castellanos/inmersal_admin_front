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
    view_title: yup.string().required(),
    view_subtitle: yup.string().required(),
    view_description: yup.string().required(),
    // view_: yup.string().required(),
    view_status: yup.boolean().required(),
    // view_image:yup
    // input_select: yup
    //   .object()
    //   .shape({
    //     value: yup.string().required(),
    //     label: yup.string().required()
    //   })
    //   .default(undefined)
    //   .required(),
    // input_textarea: yup.string().required()
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
