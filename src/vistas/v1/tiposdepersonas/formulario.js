import React, { useState } from 'react';
import { Contexto } from './contexto';
import { useForm } from 'react-hook-form';
import Selector from '../../../componentes/v1/select';
import LpInput from '../../../componentes/v1/input';
import CheckOne from '../../../componentes/v1/checkone';
import Servidor from '../../../helpers/servidor';
import { ToastContainer, toast } from 'react-toastify';
import { inicializar, validar } from "../../../helpers/forma";
import recuperarParametros from './parametrosformulario';
import _ from 'lodash';


import {
  Form,
  Button,
  Row,
  Col,
  ListGroupItem,
  ListGroup
} from 'shards-react';


export default function Formulario() {

  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [errores, setErrores] = useState({});
  const { acciones } = React.useContext(Contexto);

  const parametros = recuperarParametros(null);

  const handleCancelar = () => {
    reset();
    acciones.cancelar();
  }

  // const initForma = () => {
  //   setErrores(inicializar(parametros));
  // }

  const onSubmit = data => {
    validar(parametros, data, procesarValidacion);
  }

  const procesarValidacion = (resultado) => {
    resultado.error ? visualizarErrores(resultado) : enviarAlservidor(resultado.data);
  }

  function visualizarErrores(resultado) {
    const mensajes = _.join(_.values(resultado.data.mensajes), "--\n");
    acciones.notificacion('error', mensajes);
    setErrores(resultado.data)
  }

  const enviarAlservidor = (data) => {
    const formData = new FormData();
    const newdata = JSON.stringify(data);
    formData.append('data', newdata);
    const config = parametros['grabarregistro'];
    config['data'] = formData;
    Servidor(respuestaServidor, config);
  }

  const registroCreado = () => {
    acciones.ok();
    acciones.notificacion('success', 'Registro creado!');
  }

  const registroErrado = (data) => {
    const mensaje = _.get(data, 'message', 'Error:consulte administrador');
    acciones.notificacion('error', mensaje);
  }

  function respuestaServidor(respuesta) {
    const status = _.get(respuesta, 'data.status', 'Error');
    return status === 'Success' ? registroCreado() : registroErrado(respuesta.data);
  }

  return (
    <>
      {/* <ToastContainer /> */}
      <ListGroup flush>
        <ListGroupItem className='p-3'>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit(onSubmit)} >
                <Row form>
                  <Col md='12' className='form-group'>
                    <LpInput nombre='tipodepersona' descripcion='Tipo de Persona' register={register} errores={errores} />
                  </Col>
                </Row>
                <Row form>
                  <Col md='4' className='form-group'>
                    <CheckOne nombre='estado' descripcion='Estado' valores={['Activo', 'Inactivo']} register={register} />
                  </Col>
                </Row>
                <Row form>
                  <Col md='6' className='form-group'>
                    <Button type='submit'>Crear</Button>
                    <Button theme='danger' onClick={handleCancelar}>Cancelar</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </>
  );
};





