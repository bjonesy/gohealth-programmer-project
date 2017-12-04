import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Home from './pages/Home';
import FormSubmissions from './pages/FormSubmissions';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route exact path="/submissions" component={FormSubmissions}/>
			</Switch>
		</ConnectedRouter>
	</Provider>, 
	document.getElementById('root')
);
registerServiceWorker();