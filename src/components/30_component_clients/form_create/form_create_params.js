import React from "react";
import yup from "../../../helpers/form_validate_error_list";

export default user => {
  const form_params = {};
  const FILE_SIZE = 160 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
  ];

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
    name: yup.string().required(),
    logo:  yup.mixed()
    .required()
    .test("FILE_SIZE", "Uploaded file is too big.", 
        value => !value || (value && value.size <= FILE_SIZE))
    .test("FILE_FORMAT", "Uploaded file has unsupported format.", 
        value => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
    identification: yup.string().required(),
    phone: yup.string().required(),
    email: yup.string().required(),
    identificacion_type: yup.string().required(),
    country_id: yup
      .object()
      .shape({
        value: yup.string().required(),
        label: yup.string().required()
      })
      .default(undefined)
      .required(),
    person_type_id: yup
      .object()
      .shape({
        value: yup.string().required(),
        label: yup.string().required()
      })
      .default(undefined)
      .required(),
    identification_type_id: yup
      .object()
      .shape({
        value: yup.string().required(),
        label: yup.string().required()
      })
      .default(undefined)
      .required(),
    status: yup
      .object()
      .shape({
        value: yup.string().required(),
        label: yup.string().required()
      })
      .default(undefined)
      .required()
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
