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
    property_title: yup.string().required(),
    property_description: yup.string().required(),
    // property_image:
    property_financing_type: yup
      .object()
      .shape({
        value: yup.string().required(),
        label: yup.string().required()
      })
      .default(undefined)
      .required(),
    property_type: yup
      .object()
      .shape({
        value: yup.string().required(),
        label: yup.string().required()
      })
      .default(undefined)
      .required(),
    property_sfqt: yup.string().required(),
    property_lot_sfqt: yup.string().required(),
    property_baths: yup.string().required(),
    property_beds: yup.string().required(),
    property_garage: yup
      .object()
      .shape({
        value: yup.string().required(),
        label: yup.string().required()
      })
      .default(undefined)
      .required(),
    property_list_amenities: yup
      .object()
      .shape({
        value: yup.string().required(),
        label: yup.string().required()
      })
      .default(undefined)
      .required(),
    property_tour360_url: yup.string().required(),
    property_blueprints: yup
      .object()
      .shape({
        value: yup.string().required(),
        label: yup.string().required()
      })
      .default(undefined)
      .required(),
      // property_
      // property_
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
