import Backbone		from 'backbone';
import BotRunned	from '../models/BotRunned.js';

/**
 * Define a collection of runned bots.
 */
class BotsRunnedCollection extends Backbone.Collection {
	/**
	 * Create an instance of BotsRunnedCollection.
	 * Define the Model and the url of this collection.
	 * /list GET return every runned bots.
	 * @param  {Object} options - The options of the collection.
	 */
	constructor (options) {
		super(options);
		this.model = BotRunned;
		this.url = '/list';
	}
}

export default BotsRunnedCollection;
