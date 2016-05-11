import Backbone				from 'backbone';
import ListTemplate			from '../templates/list.hbs';
import BotsRunnedCollection	from '../collections/BotsRunnedCollection.js';

/**
 * Represent the page "List".
 * In this page, the user can see every created bots.
 */
class ListView extends Backbone.View {
	/**
	 * Create an instance of ListView.
	 * Call the API to get created bots.
	 */
	constructor() {
		super({});
		this.botsRunnedCollection = new BotsRunnedCollection();
		this.botsRunnedCollection.fetch().then(() => {
			this.render();
		});
	}

	/**
	 * Called when the page need to be rendered.
	 */
	render() {
		this.$el.html(ListTemplate(this.botsRunnedCollection.toJSON()));
	}
}

export default ListView;
