import axios from 'axios';
import _ from 'lodash';
//export default ({data, estado, config}) => {
export default function ServidorFormas(setDatos, config) {

  axios(config)
    .then(function (response) {
      setDatos(response);

    })
    .catch(function (error) {
      console.log('error entregado desde servidor');
      console.log(error);
      return error;
    });




  // form_params["record_config"] = {
  //   method: "post",
  //   url: "http://localhost/inmersal/public/api/v1/menus",
  //   headers: {
  //     "Content-Type": "multipart/form-data"
  //   }
  //   //data: peticionn POST
  //   //form_params: peticion GET
  // };
}

export const enviarAlServidor = (functionOk, functionError, config) => {
  console.log('enviar al servidor comp');
  axios(config)
    .then(function (response) {
      _.has(response.data, 'data') ? functionOk(response) : functionError(response);
    })
    .catch(function (error) {
      console.log('1 error entregado desde servidor');
      console.log(error);
      console.log('2 error entregado desde servidor');
      return error;
    });

}

