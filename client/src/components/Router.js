import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import BookTable from './BookTable/BookTable';
import BookForm from './BookForm/BookForm';

const Router = () => {
    return (
        <Switch>
            <Route exact path='/' component={BookTable}/>
            <Route path='/new' component={BookForm}/>
        </Switch>
    )
}

export default withRouter(Router);