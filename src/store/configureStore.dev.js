import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import rootReducer from '../reducers';

const configureStore = preloadedState => {
	const history = createBrowserHistory();
	const store = createStore(
		connectRouter(history)(rootReducer),
		compose(
			applyMiddleware(
				routerMiddleware(history),
				promise(),
				thunk,
				createLogger()
			)
		)
	);

	return store;
}

export default configureStore;