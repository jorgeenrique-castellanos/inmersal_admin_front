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
  const [paisseleccionado, setPaisseleccionado] = useState(0);
  const [departamentoseleccionado, setDepartamentoseleccionado] = useState(0);
  const [logo, setLogo] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [renders, setRenders] = useState([]);

  const parametros = recuperarParametros(null);

  /*****************    Begin Select  ***********************/
  React.useEffect(() => {
    register('pais');
    register('departamento');
    register('municipio');
    register('empresa');
  }, [register]);

  React.useEffect(() => {
    const valorpais = _.get(watch('pais'), 'value', false);
    let dummy = valorpais ? setPaisseleccionado(valorpais) : null;
    const valordepartamento = _.get(watch('departamento'), 'value', false);
    dummy = valordepartamento ? setDepartamentoseleccionado(valordepartamento) : null;
  }, [watch("pais"), watch('departamento')]);

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
      setValue('pais', valorInicial('pais', 'pais'));
      setValue('departamento', valorInicial('departamento', 'departamento_id'));
      setValue('municipio', valorInicial('municipio', 'municipio_id'));
      _.forEach(['id', 'nombre', 'descripcion', 'direccion', 'coordenadas'], function (key) {
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
    console.log('Datos de la forma');
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
    addFilesAForma(logo, 'logo', formData)
    addFilesAForma(fotos, 'fotos', formData)
    addFilesAForma(renders, 'renders', formData)
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

                  <Col md='4' className='form-group'>
                    <Selector inicial={valorInicial('empresa', 'empresa_id')} nombre='empresa' descripcion='Empresa' setValue={setValue} errores={errores} opciones={parametros['empresa']} />
                  </Col>
                  <Col md='8' className='form-group'>
                    <LpInput nombre='nombre' descripcion='Nombre de Proyecto' register={register} errores={errores} />
                  </Col>
                </Row>

                <Row form>
                  <Col md='12' className='form-group'>
                    <LpTextArea nombre='descripcion' descripcion='Descipcion del proyecto' register={register} errores={errores} />
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
                  <Col md='4' className='form-group'>
                    <LpInput nombre='direccion' descripcion='Direccion' register={register} errores={errores} />
                  </Col>
                  <Col md='4' className='form-group'>
                    <LpInput nombre='coordenadas' descripcion='Coordenadas' register={register} errores={errores} />
                  </Col>
                </Row>

                <Row form>
                  <Logo setArchivos={setLogo} titulo='Incluir Logo de Proyecto' totalarchivos={1} />
                </Row>
                <Row form>
                  <Logo setArchivos={setFotos} titulo='Incluir Fotos' totalarchivos={10} />
                </Row>
                <Row form>
                  <Logo setArchivos={setRenders} titulo='Incluir Renders' totalarchivos={10} />
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





