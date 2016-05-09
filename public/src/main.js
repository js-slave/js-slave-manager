import Backbone	from 'backbone';
import Router	from './Router.js';

import 'purecss/build/pure-min.css';
import './css/style.css';

$(function() {
	const router = new Router();
	Backbone.history.start();
});
