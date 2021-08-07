import React from "react";
import _ from "lodash";
import { Context } from "../../views/23_view_logout_user/helpers/context";
import Icons from "../../assets/icons";
import ReactHtmlParser from "react-html-parser";
import { Button, ButtonGroup, ButtonToolbar } from "shards-react";

//prettier-ignore
export default () => {
  const icons = Icons();
  const { view_global_state, view_global_actions } = React.useContext(Context);

  return (
    // <ButtonToolbar>
    //   <ButtonGroup className="mr-2">
      <div className="d-flex align-items-center flex-column">
        {view_global_state.state_action !== "crear" && (
          <Button className="btn-text-icon-right mb-3" pill onClick={view_global_actions.exit}>
            Esta seguro de salir
          </Button>
        )}     
        {view_global_state.state_action && (
          <Button className="btn-text-icon-right" theme="danger" pill onClick={view_global_actions.cancel}>
            Cancelar
          </Button>
        )}  
      </div>
    //   </ButtonGroup>
    // </ButtonToolbar>
  );
};
