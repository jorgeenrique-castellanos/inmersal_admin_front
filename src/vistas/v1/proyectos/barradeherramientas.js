import React from "react";
import { Contexto } from './contexto';
import _ from 'lodash';


import {
    Button,
    ButtonGroup,
    ButtonToolbar,
    FormInput,
    InputGroup
} from "shards-react";
import { set } from "react-ga";

export default ({ usuario }) => {

    const { estado, acciones } = React.useContext(Contexto);


    return (
        <ButtonToolbar>
            <ButtonGroup size="sm">
                {estado.accion !== 'crear' && <Button onClick={acciones.crear} >Crear</Button>}
                {_.get(estado, 'rowschanged', false) && <Button onClick={acciones.cambiar} >Guardar cambios</Button>}
                {!_.isEmpty(_.get(estado, 'rowsmarked', '')) && <Button onClick={acciones.borrar} >Borrar</Button>}
           
            </ButtonGroup>
            <InputGroup size="sm" className="ml-auto">
                <FormInput placeholder="Search..." />
            </InputGroup>
        </ButtonToolbar>
    )
}
