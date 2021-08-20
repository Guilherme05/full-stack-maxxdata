import React from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import FrmProfessional from "./components/FrmProfessional";
import Professional from './components/Professional'
import TypeProfessional from "./components/TypeProfessional";
import FrmTypeProfessional from "./components/FrmTypeProfessional";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Professional} />
      <Route exact path="/professional/:id?" component={FrmProfessional} />
      <Route exact path="/type/professional" component={TypeProfessional}/>
      <Route exact path="/frm/type/professional/:id?" component={FrmTypeProfessional} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;