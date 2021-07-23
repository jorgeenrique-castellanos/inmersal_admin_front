import React, { useState } from 'react';
import { Contexto } from './contexto';
import { useForm } from 'react-hook-form';
import Selector from '../../componentes/select';
import LpInput from '../../componentes/input';
import LpTextArea from '../../componentes/textarea';
import CheckOne from '../../componentes/checkone';
import Servidor from '../../helpers/servidor';
import { inicializar, validar } from "../../helpers/forma";
import recuperarParametros from './parametrosformulario';
import Logo from '../../componentes/subirarchivos';

import _ from 'lodash';


import {
  FormTextarea,
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
  const [empresaseleccionado, setEmpresaseleccionado] = useState([]);
  const [proyectoseleccionado, setProyectoseleccionado] = useState([]);


  const parametros = recuperarParametros(null);

  /*****************    Begin Select  ***********************/
  React.useEffect(() => {
    register('empresa');
    register('proyecto');
    register('tipodeunidad');
  }, [register]);

  React.useEffect(() => {
    const valorempresa = _.get(watch('empresa'), 'value', false);
    let dummy = valorempresa ? setEmpresaseleccionado(valorempresa) : null;
    const valorproyecto = _.get(watch('proyecto'), 'value', false);
    dummy = valorproyecto ? setProyectoseleccionado(valorproyecto) : null;
  }, [watch("empresa"), watch("proyecto")]);

  /*****************    End Select  ***********************/

  const handleCancelar = () => {
    reset();
    acciones.cancelar();
  }

  // const initForma = () => {
  //   setErrores(inicializar(parametros));
  // }

  const onSubmit = data => {
    console.log('resultado forma');
    console.log(data);
    validar(parametros, data, procesarValidacion);
  }

  const procesarValidacion = (resultado) => {
    resultado.error ? visualizarErrores(resultado) : enviarAlservidor(resultado.data);
  }

  function visualizarErrores(resultado) {
    console.log('resultado validacion');
    console.log(resultado);

    const mensajes = _.join(_.values(resultado.data.mensajes), "--\n");
    acciones.notificacion('error', mensajes);
    setErrores(resultado.data)
  }

  const addFilesAForma = (archivos, tag, formData) => {
    let i = 0;
    archivos.forEach(archivo => {
      console.log(`${tag}_${i}`);
      formData.append(`${tag}_${i}`, archivo);
      i++;
    });
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
      {/*       <ToastContainer /> */}
      <ListGroup flush>
        <ListGroupItem className='p-3'>
          <Row>
            <Col>
              <Form onSubmit={handleSubmit(onSubmit)} >
                <Row form>

                  <Col md='4' className='form-group'>
                    <Selector nombre='empresa' descripcion='Empresa' setValue={setValue} errores={errores} opciones={parametros['empresa']} />
                  </Col>
                  <Col md='4' className='form-group'>
                    <Selector nombre='proyecto' descripcion='Proyecto' setValue={setValue} errores={errores} opciones={parametros['proyecto']} condicional={empresaseleccionado} />
                  </Col>
                  <Col md='4' className='form-group'>
                    <Selector nombre='tipodeunidad' descripcion='Tipo de unidad' setValue={setValue} errores={errores} opciones={parametros['tipodeunidad']} condicional={proyectoseleccionado} />
                  </Col>
                </Row>

                <Row form>
                  <Col md='4' className='form-group'>
                    <LpInput nombre='unidad' descripcion='Nombre del tipo de unidad' register={register} errores={errores} />
                  </Col>
                  <Col md='4' className='form-group'>
                    <LpInput nombre='area' descripcion='Area' register={register} errores={errores} />
                  </Col>
                  <Col md='4' className='form-group'>
                    <LpInput nombre='precio' descripcion='precio' register={register} errores={errores} />
                  </Col>
                </Row>

                <Row form>
                  <Col md='12' className='form-group'>
                    <LpTextArea nombre='observaciones' descripcion='Observaciones' register={register} errores={errores} />
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





