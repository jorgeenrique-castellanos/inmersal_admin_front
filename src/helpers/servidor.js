import axios from 'axios';

//export default ({data, estado, config}) => {
export default function ServidorFormas(setDatos, config) {

  //var data = JSON.stringify({ "name": "abiledia", "email": "abiledia@hotmail.com", "password": "abiledia", "c_password": "abiledia" });



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
  axios(config)
    .then(function (response) {
      functionOk(response);

    })
    .catch(function (error) {
      functionError(error)
      console.log('error entregado desde servidor');
      console.log(error);
      return error;
    });

}
