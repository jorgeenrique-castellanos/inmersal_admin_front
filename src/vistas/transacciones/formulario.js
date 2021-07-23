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
  const { acciones, estado } = React.useContext(Contexto);
  const [empresaseleccionado, setEmpresaseleccionado] = useState([]);
  const [proyectoseleccionado, setProyectoseleccionado] = useState([]);
  const [tipodeunidadseleccionado, setTipodeunidadseleccionado] = useState([]);

  const parametros = recuperarParametros(null);

  /*****************    Begin Select  ***********************/
  React.useEffect(() => {
    register('empresa');
    register('proyecto');
    register('tipodeproyecto');
    register('tipodeunidad');
    register('unidad');
    register('tipodetransaccion');
  }, [register]);

  React.useEffect(() => {
    const valorempresa = _.get(watch('empresa'), 'value', false);
    let dummy = valorempresa ? setEmpresaseleccionado(valorempresa) : null;
    const valorproyecto = _.get(watch('proyecto'), 'value', false);
    dummy = valorproyecto ? setProyectoseleccionado(valorproyecto) : null;
    const valortipodeunidad = _.get(watch('tipodeunidad'), 'value', false);
    dummy = valortipodeunidad ? setTipodeunidadseleccionado(valortipodeunidad) : null;
  }, [watch("empresa"), watch("proyecto"), watch("tipodeunidad")]);

  /*****************    End Select  ***********************/

  /*****************    Init Forma  ***********************/
  function valorInicial(idlabel, idvalor) {
    const label = _.get(estado, `registroactual.${idlabel}`, null);
    const valor = _.get(estado, `registroactual.${idvalor}`, null);
    return label && valor ? { 'label': label, 'value': valor } : null
  }

  React.useEffect(() => {
    console.log('estado.registroactual');
    console.log(estado.registroactual);
    if (!_.isEmpty(estado.registroactual)) {
      setValue('empresa', valorInicial('empresa', 'empresa_id'));
      setValue('proyecto', valorInicial('proyecto', 'proyecto_id'));
      setValue('tipodeunidad', valorInicial('tipodeunidad', 'tipodeunidad_id'));
      setValue('transaccion', valorInicial('transaccion', 'transaccion_id'));
      _.forEach(['id', 'unidad', 'precio', 'area', 'observaciones', 'estado'], function (key) {
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

  const enviarAlservidor = (data) => {
    const formData = new FormData();
    const newdata = JSON.stringify(data);
    formData.append('data', newdata);
    return (estado.accion === 'editar') ? guardarCambioEnServidor(formData) : crearEnservidor(formData);
  }

  const guardarCambioEnServidor = (formData) => {
    formData.append('_method', 'PATCH');
    const config = parametros['grabarregistro'];
    config['url'] = `${config['url']}/${estado.registroactual.id}`;
    config['data'] = formData;
    Servidor(respuestaServidor, config);
  }

  const crearEnservidor = (formData) => {
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

                  <Col md='6' className='form-group'>
                    <Selector inicial={valorInicial('empresa', 'empresa_id')} nombre='empresa' descripcion='Empresa' setValue={setValue} errores={errores} opciones={parametros['empresa']} />
                  </Col>
                  <Col md='6' className='form-group'>
                    <Selector inicial={valorInicial('proyecto', 'proyecto_id')} nombre='proyecto' descripcion='Proyecto' setValue={setValue} errores={errores} opciones={parametros['proyecto']} condicional={empresaseleccionado} />
                  </Col>
                </Row>

                <Row form>
                  <Col md='6' className='form-group'>
                    <Selector inicial={valorInicial('tipodeunidad', 'tipodeunidad_id')} nombre='tipodeunidad' descripcion='Tipo de Unidad' setValue={setValue} errores={errores} opciones={parametros['tipodeunidad']} condicional={proyectoseleccionado} />
                  </Col>
                  <Col md='6' className='form-group'>
                    <Selector inicial={valorInicial('unidad', 'unidad_id')} nombre='unidad' descripcion='Unidad' setValue={setValue} errores={errores} opciones={parametros['unidad']} condicional={tipodeunidadseleccionado} />
                  </Col>
                  <Col md='6' className='form-group'>
                    <Selector inicial={valorInicial('tipodetransaccion', 'tipodetransaccion_id')} nombre='transaccion' descripcion='Transaccion' setValue={setValue} errores={errores} opciones={parametros['tipodetransaccion']} condicional={proyectoseleccionado} />
                  </Col>
                </Row>
                <Row form>
                  <Col md='6' className='form-group'>
                    <LpInput nombre='contacto' descripcion='contacto' register={register} errores={errores} />
                  </Col>
                  <Col md='6' className='form-group'>
                    <LpInput nombre='celular' descripcion='Celular' register={register} errores={errores} />
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





