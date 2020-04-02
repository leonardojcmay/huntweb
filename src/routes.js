import React from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

//Importando a pagina Main
import Main from "./pages/main";
import Product from "./pages/product";

//O swicth permite que apenas uma rota seja chamada no momento
//BrowserRouter: Browser do navegador
const Routes = () => (
    <BrowserRouter>    
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/products/:id" component={Product} />
        </Switch>
    </BrowserRouter>
);

export default Routes;