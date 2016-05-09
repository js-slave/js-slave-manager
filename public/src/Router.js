import Backbone 		from 'backbone';
import AddView			from './js/views/AddView.js';
import AddActionView	from './js/views/AddActionView.js';
import AddEventView		from './js/views/AddEventView.js';
import HomeView 		from './js/views/HomeView.js';
import ListView 		from './js/views/ListView.js';

/**
 * Define the router of the website.
 */
class Router extends Backbone.Router {
	/**
	 * Create an instance of Router and define every routes.
	 */
	constructor() {
		const options = {
			routes: {
				'': 'home',
				'addEvent': 'addEvent',
				'addAction': 'addAction',
				'add': 'add',
				'list': 'list'
			}
		};
		super(options);
	}

	/**
	 * Associate "HomeView" to the route "home".
	 */
	home() {
		this._appendView(new HomeView());
	}

	/**
	 * Associate "AddActionView" to the route "addAction".
	 */
	addAction() {
		this._appendView(new AddActionView());
	}

	/**
	 * Associate "AddEventView" to the route "addEvent".
	 */
	addEvent() {
		this._appendView(new AddEventView());
	}

	/**
	 * Associate "AddView" to the route "add".
	 */
	add() {
		this._appendView(new AddView());
	}

	/**
	 * Associate "ListView" to the route "list".
	 */
	list() {
		this._appendView(new ListView());
	}

	/**
	 * Append a view to the page.
	 * @param  {Backbone.View} view - The view
	 */
	_appendView(view) {
		view.render();
		$('#view').empty().append(view.$el);
	}
}

export default Router;
