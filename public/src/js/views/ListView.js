import Backbone					from 'backbone';
import ListTemplate				from '../templates/list.hbs';
import SlavesRunnedCollection	from '../collections/SlavesRunnedCollection.js';

/**
 * Represent the page "List".
 * In this page, the user can see every created slaves.
 */
class ListView extends Backbone.View {
	/**
	 * Create an instance of ListView.
	 * Call the API to get created slaves.
	 */
	constructor() {
		super({});
		this.slavesRunnedCollection = new SlavesRunnedCollection();
		this.slavesRunnedCollection.fetch().then(() => {
			this.render();
		});
	}

	/**
	 * Called when the page need to be rendered.
	 */
	render() {
		this.$el.html(ListTemplate(this.slavesRunnedCollection.toJSON()));
	}
}

export default ListView;
