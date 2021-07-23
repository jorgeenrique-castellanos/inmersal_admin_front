import React, { useEffect, useState } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import Modal from '../../../src/componentes/v1/modal';
import Servidor from '../../helpers/servidor';
import * as yup from 'yup';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import _ from 'lodash';
import {
    Button,
    ButtonGroup,
} from "shards-react";


export default function Tabla({ estado, acciones, parametros }) {


    useEffect(() => {
        const params = { ...parametros.config };
        params.url += `?page=1`;
        params.method = 'get';
        Servidor(actualizarInformacion, params);
    }, [estado.accion]);


    const keyField = parametros['columnaclave'];
    const [rows, setRows] = useState([]);
    const [confirmacion, setConfirmacion] = useState({ switche: false, estado: false });

    const customTotal = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total">
            Mostrar { from} hasta { to} de { size} registros
        </span>
    );
    const [opciones, setOpciones] = useState({
        showTotal: true,
        paginationTotalRenderer: customTotal,
        sizePerPageList: [
            { text: '2', value: 2 },
            { text: '5', value: 5 },
            { text: '10', value: 10 },
            { text: 'Todos', value: rows.length }
        ]
    });

    //********************Begin Manejar Cambio en Tabla ***********************************/
    // Si la operacion esta en el objeto metodos se ejecuta el metodo que dice el objeto
    // de lo contrario se modifica la variable de estado peticion que envia la peticion 
    // al servidor mediante el use effect para actualizar los valore de la tabla

    const [peticion, setPeticion] = useState({});

    useEffect(() => {
        const params = { ...parametros.config };
        const pagina = peticion.page ? peticion.page : 1;
        params.url += `?page=${pagina}`;
        params.method = 'get';
        params.params = peticion;
        Servidor(actualizarInformacion, params);
    }, [peticion]);

    const actualizarInformacion = (respuesta) => {
        const meta = { ...respuesta.data.data };
        setOpciones({
            ...opciones,
            'page': meta.current_page ? meta.current_page : 1,
            'sizePerPage': meta.per_page ? meta.per_page : 4,
            'totalSize': meta.total ? meta.total : 0
        });
        setRows(respuesta.data.data.data);
    }

    const onTableChange = (tipodeoperacion, { page, sizePerPage, filters, sortField, sortOrder, cellEdit }) => {
        const metodos = { cellEdit: editarCelda };
        tipodeoperacion in metodos ? metodos[tipodeoperacion](cellEdit) : setPeticion({ tipodeoperacion, page, sizePerPage, filters, sortField, sortOrder, cellEdit });
    }

    //********************END  Cambio en Tabla ***********************************/

    //********************Begin Editar Celda ***********************************/
    // Se valida el valor que entre el usuario, si es valido se modifica 
    // la variable de estado rows que es donde estan los registros de tabla

    const editarCelda = (cellEdit) => {
        const valores = arguments[0];
        const registroactualizado = asignarValores(cellEdit, valores);
        const objetoavalidar = yup.object().shape(parametros.reglasdevalidacion);
        objetoavalidar.validate(registroactualizado).
            then(function (value) {
                const newdata = rows.map((row) => {
                    return row[keyField] === cellEdit.rowId ? registroactualizado : row;
                });
                actualizarEstado('rowschanged')
                setRows(newdata);
            })
            .catch(function (errores) {
                acciones.notificacion('error', errores.errors.join("\n"));
            });
    }

    function asignarValores(cellEdit, valores) {
        const { rowId, dataField, newValue } = cellEdit;
        let registroactual = _.find(rows, [keyField, rowId]);
        const columnas = _.get(valores, 'parametros.columnas', {});
        const columnaactual = _.find(columnas, ['dataField', dataField]);
        const tipo = _.get(columnaactual, 'editor.type', 'Dummy');
        let registroactualizado = {};
        if (tipo === 'select') {
            registroactualizado = setValoresDeSelect(columnaactual, registroactual, newValue);
        } else {
            registroactualizado = setValoresDeInput(columnaactual, registroactual, newValue);
        }
        return registroactualizado;
    }

    function setValoresDeSelect(columnaactual, registroactual, newValue) {
        const opciones = _.get(columnaactual, 'editor.options', {});
        const opcionseleccionada = _.find(opciones, function (o) { return o.value == newValue; });
        if (!opcionseleccionada)
            return registroactual;
        const registroactualizado = { ...registroactual };
        registroactualizado[columnaactual.valor] = newValue;
        registroactualizado[columnaactual.dataField] = opcionseleccionada.label;
        return registroactualizado;
    }

    function setValoresDeInput(columnaactual, registroactual, newValue) {
        const registroactualizado = { ...registroactual };
        registroactualizado[columnaactual.dataField] = newValue;
        return registroactualizado;
    }

    //********************END Editar Celda ***********************************/


    //********************Begin Manage CheckBox ***********************************/
    // Administra los checkbox, se usa la variable de estado rowsmarked
    // en esta se tiene los keyField de los registros seleccionados 

    const handleOnSelect = (row, isSelect) => {
        const rowsmarked = estado.rowsmarked;
        const filas = isSelect ? rowsmarked.concat(row[keyField]) : rowsmarked.filter((key) => key != row[keyField]);
        actualizarEstado('rowsmarked', filas);
    }

    const recuperarClaves = (rows) => {
        return rows.reduce((keys, row) => {
            keys.push(row[keyField]);
            return keys;
        }, []);;
    }

    const handleOnSelectAll = (isSelect, rows) => {
        const filas = isSelect ? recuperarClaves(rows) : [];
        actualizarEstado('rowsmarked', filas);
    }

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: false,
        onSelect: handleOnSelect,
        onSelectAll: handleOnSelectAll
    };

    //********************END Manage CheckBox ***********************************/

    //********************Begin Borrar ******************************************/
    useEffect(() => {
        estado.borrar && borrarRegistros();
    }, [estado.borrar]);

    const borrarRegistros = () => {
        const mensaje = 'No hay registros para borrar';
        _.isEmpty(estado.rowsmarked) ? acciones.notificacion('error', mensaje) : mostrarModalConfirmacion(true);
        acciones.borradoreset();
    }

    function mostrarModalConfirmacion(estado) {
        const param = {};
        param.encabezado = <p>Esta seguro de Borrar?</p>
        param.cuerpo = <>
            <ButtonGroup size="sm">
                <Button onClick={borradoRegistros} >Borrar</Button>
                <Button onClick={cancelarConfirmacion}>Cancelar</Button>
            </ButtonGroup>
        </>;
        param.estado = estado;
        param.switche = Math.random();
        setConfirmacion({ ...param });
    }

    function borradoRegistros() {
        mostrarModalConfirmacion(false);
        const params = { ...parametros.config };
        params.url += '/1';
        params.method = 'DELETE';
        params.data = { 'registros': estado.rowsmarked };
        Servidor(resultadoDeBorrado, params);
    }

    function cancelarConfirmacion() {
        mostrarModalConfirmacion(false);
    }

    function resultadoDeBorrado(respuesta) {
        return respuesta.data.status === 'Success' ? borradoExitoso(respuesta) : acciones.notificacion('error', respuesta.data.message);
    }

    function borradoExitoso(respuesta) {
        actualizarEstado('borradook', respuesta.data.message)
        setPeticion({ ...peticion });
    }

    //********************End Borrar ******************************************/

    //********************Begin Guaradar Cambios ******************************/
    useEffect(() => {
        estado.cambiar && guardarCambios();
    }, [estado.cambiar]);

    const guardarCambios = () => {
        const mensaje = 'No hay registros cambiados';
        estado.rowschanged ? mostrarModalConfirmacionChange(true) : acciones.notificacion('error', mensaje);
        acciones.cambiareset();
    }

    function mostrarModalConfirmacionChange(estado) {
        const param = {};
        param.encabezado = <p>Esta seguro de Guardar?</p>
        param.cuerpo = <>
            <ButtonGroup size="sm">
                <Button onClick={enviarAlServidor} >Guardar Cambios</Button>
                <Button onClick={cancelarConfirmacion}>Cancelar</Button>
            </ButtonGroup>
        </>;
        param.estado = estado;
        param.switche = Math.random();
        setConfirmacion({ ...param });
    }

    function enviarAlServidor() {
        mostrarModalConfirmacionChange(false)
        const params = { ...parametros.config };
        params.url += '/1';
        params.method = 'PUT';
        params.data = { 'registros': rows };
        Servidor(resultadoDeCambio, params);
    }

    function resultadoDeCambio(respuesta) {
        return respuesta.data.status === 'Success' ? cambioExitoso(respuesta) : acciones.notificacion('error', respuesta.data.message);
    }

    function cambioExitoso(respuesta) {
        actualizarEstado('cambiarok', respuesta.data.message)
        setPeticion({ ...peticion });
    }

    //************************* End Guaradar Cambios ******************************/



    //     const params = { ...parametros.config };
    //     params.url += '/1';
    //     params.method = 'PUT';
    //     params.data = { 'registros': rows };
    //     console.log(params);
    //     Servidor(resultadoDeCambio, params);
    // }







    // const parametrosdetabla = {
    //     bootstrap4: true,
    //     remote: true,
    //     pagination: paginationFactory({ page, sizePerPage, totalSize }),
    //     onTableChange: handleTableChange,
    //     keyField: columnaclave,
    //     filter: filterFactory(),
    //     data: data['data'],
    //     columns: columnas,

    // }

    // if (data['selectRow'])
    //     parametrosdetabla['selectRow'] = selectRow;
    // if (data['editable'])
    //     parametrosdetabla['cellEdit'] = cellEditFactory({ mode: 'click', blurToSave: true });

    function actualizarEstado(type, data) {
        acciones[type](data);
    }

    return (
        <>
            <Modal {...confirmacion} />
            <BootstrapTable
                bootstrap4
                keyField={keyField}
                data={rows}
                columns={parametros['columnas']}
                selectRow={selectRow}
                pagination={paginationFactory(opciones)}
                remote
                onTableChange={onTableChange}
                filter={filterFactory()}
                cellEdit={cellEditFactory({
                    mode: 'click',
                    blurToSave: true
                })}
            />
        </>
    )
}

