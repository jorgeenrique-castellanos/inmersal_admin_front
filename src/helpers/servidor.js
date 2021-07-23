import axios from 'axios';

//export default ({data, estado, config}) => {
export default function ServidorFormas(setDatos, config){

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


}