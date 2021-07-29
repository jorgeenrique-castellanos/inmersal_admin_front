import React from "react";
import _ from "lodash";
import { Context } from "../../views/26_view_cities/helpers/context";
import Icons from "../../assets/icons";
import ReactHtmlParser from "react-html-parser";
import { Button, ButtonGroup, ButtonToolbar } from "shards-react";

//prettier-ignore
export default () => {
  const icons = Icons();
  const { view_global_state, view_global_actions } = React.useContext(Context);

  return (
    <ButtonToolbar>
      <ButtonGroup className="mr-2">
        {view_global_state.state_action !== "crear" && (
          <Button className="btn-text-icon-right" pill onClick={view_global_actions.create}>
            Crear vista {ReactHtmlParser(icons.add.icon)}
          </Button>
        )}
        {/* {_.get(view_global_state, "rowschanged", false) && (
          <Button className="btn-text-icon-right" pill onClick={view_global_actions.cambiar}>
            Guardar cambios 
          </Button>
        )}
        {!_.isEmpty(_.get(view_global_state, "rowsmarked", "")) && (
          <Button className="btn-text-icon-right" pill onClick={view_global_actions.borrar}>
            Borrar
          </Button>
        )} */}
      </ButtonGroup>
    </ButtonToolbar>
  );
};
