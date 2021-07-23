import React, { useState } from 'react';
import { Contexto } from './contexto';
import { useForm } from 'react-hook-form';
import Selector from '../../componentes/select';
import LpInput from '../../componentes/input';
import CheckOne from '../../componentes/checkone';
import Servidor from '../../helpers/servidor';
import { inicializar, validar } from "../../helpers/forma";
import recuperarParametros from './parametrosformulario';
import Logo from '../../componentes/subirarchivos';

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
  const { acciones, estado } = React.useContext(Contexto);
  const [paisseleccionado, setPaisseleccionado] = useState(0);
  const [departamentoseleccionado, setDepartamentoseleccionado] = useState(0);
  const [tipodepersonaseleccionado, setTipodepersonaseleccionado] = useState(0);
  const [archivos, setArchivos] = useState([]);

  const parametros = recuperarParametros(null);

  /*****************    Begin Select  ***********************/
  React.useEffect(() => {
    register('pais');
    register('departamento');
    register('municipio');
    register('tipodepersona_id');
    register('tipodeidentificacion_id');
  }, [register]);

  React.useEffect(() => {
    const valorpais = _.get(watch('pais'), 'value', false);
    let dummy = valorpais ? setPaisseleccionado(valorpais) : null;
    const valordepartamento = _.get(watch('departamento'), 'value', false);
    dummy = valordepartamento ? setDepartamentoseleccionado(valordepartamento) : null;
    const valortipodepersona = _.get(watch('tipodepersona_id'), 'value', false);
    dummy = valortipodepersona ? setTipodepersonaseleccionado(valortipodepersona) : null
  }, [watch("pais"), watch('departamento'), watch('tipodepersona_id')]);

  /*****************    End Select  ***********************/

  /*****************    Init Forma  ***********************/
  React.useEffect(() => {
    console.log('estado.registroactual');
    console.log(estado.registroactual);
    if (!_.isEmpty(estado.registroactual)) {
      setValue('tipodepersona_id', valorInicial('tipodepersona', 'tipodepersona_id'));
      setValue('tipodeidentificacion_id', valorInicial('tipodeidentificacion', 'tipodeidentificacion_id'));
      setValue('pais', valorInicial('pais', 'pais'));
      setValue('departamento', valorInicial('departamento', 'departamento_id'));
      setValue('municipio', valorInicial('municipio', 'municipio_id'));
      _.forEach(['id', 'identificacion', 'empresa'], function (key) {
        setValue(key, _.get(estado, `registroactual.${key}`, null));
      });
    }
  }, [estado]);


  // const initForma = () => {
  //   setErrores(inicializar(parametros));
  // }
  /*****************    End Select  ***********************/

  const handleCancelar = () => {
    reset();
    acciones.cancelar();
  }

  const onSubmit = data => {
    console.log('someter data');
    console.log(data);
    validar(parametros, data, procesarValidacion);
  }

  const procesarValidacion = (resultado) => {
    console.log('resltado de validacion');
    console.log(resultado);
    resultado.error ? visualizarErrores(resultado) : enviarAlservidor(resultado.data);
  }

  function visualizarErrores(resultado) {

    const mensajes = _.join(_.values(resultado.data.mensajes), "--\n");
    acciones.notificacion('error', mensajes);
    setErrores(resultado.data)
  }

  const enviarAlservidor = (data) => {
    const newdata = JSON.stringify(data);
    if (estado.accion === 'editar')
      guardarCambioEnServidor(newdata)
    else
      crearEnservidor(newdata);
  }

  const guardarCambioEnServidor = (newdata) => {
    const formData = new FormData();
    formData.append('data', newdata);
    formData.append('archivo_0', archivos[0]);
    formData.append('_method', 'PATCH');
    const config = parametros['grabarcambios'];
    config['url'] = `${config['url']}/${estado.registroactual.id}`;
    config['data'] = formData;
    Servidor(respuestaServidor, config);
  }

  const crearEnservidor = (newdata) => {
    const formData = new FormData();
    formData.append('data', newdata);
    formData.append('archivo_0', archivos[0]);
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

  function valorInicial(idlabel, idvalor) {
    const label = _.get(estado, `registroactual.${idlabel}`, null);
    const valor = _.get(estado, `registroactual.${idvalor}`, null);
    return label && valor ? { 'label': label, 'value': valor } : null
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
                  <Col md='11' className='form-group'>
                    <LpInput nombre='empresa' descripcion='Empresa' register={register} errores={errores} />
                  </Col>
                </Row>

                <Row form>
                  <Col md='4' className='form-group'>
                    <Selector inicial={valorInicial('tipodepersona', 'tipodepersona_id')} nombre='tipodepersona_id' descripcion='Tipo de persona' setValue={setValue} errores={errores} opciones={parametros['tipodepersona']} />
                  </Col>
                  <Col md='4' className='form-group'>
                    <Selector inicial={valorInicial('tipodeidentificacion', 'tipodeidentificacion_id')} nombre='tipodeidentificacion_id' descripcion='Tipo de Id' setValue={setValue} errores={errores} opciones={parametros['tipodeidentificacion']} condicional={tipodepersonaseleccionado} />
                  </Col>
                  <Col md='4' className='form-group'>
                    <LpInput nombre='identificacion' descripcion='Identificacion' register={register} errores={errores} />
                  </Col>
                </Row>

                <Row form>
                  <Col md='4' className='form-group'>
                    <Selector inicial={valorInicial('pais', 'pais')} nombre='pais' descripcion='Pais' setValue={setValue} errores={errores} opciones={parametros['pais']} />
                  </Col>
                  <Col md='4' className='form-group'>
                    <Selector inicial={valorInicial('departamento', 'departamento_id')} nombre='departamento' descripcion='Departamento' setValue={setValue} errores={errores} opciones={parametros['departamento']} condicional={paisseleccionado} />
                  </Col>
                  <Col md='4' className='form-group'>
                    <Selector inicial={valorInicial('municipio', 'municipio_id')} nombre='municipio' descripcion='Municipio' setValue={setValue} errores={errores} opciones={parametros['municipio']} condicional={departamentoseleccionado} />
                  </Col>
                </Row>
                <Row form>
                  <Logo setArchivos={setArchivos} titulo='Logo de la Empresa' totalarchivos={1} />
                </Row>


                <Row form>
                  <Col md='4' className='form-group'>
                    <CheckOne nombre='estado' descripcion='Estado' valores={['Activo', 'Inactivo']} register={register} />
                  </Col>
                </Row>

                <Row form>
                  <Col md='6' className='form-group'>
                    <Button type='submit'>{estado.accion === 'editar' ? 'Guardar Cambios' : 'Crear'}</Button>
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





