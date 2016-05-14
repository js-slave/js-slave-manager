import Backbone		from 'backbone';
import SlaveRunned	from '../models/SlaveRunned.js';

/**
 * Define a collection of runned bots.
 */
class SlavesRunnedCollection extends Backbone.Collection {
	/**
	 * Create an instance of SlavesRunnedCollection.
	 * Define the Model and the url of this collection.
	 * /list GET return every runned slaves.
	 * @param  {Object} options - The options of the collection.
	 */
	constructor (options) {
		super(options);
		this.model = SlaveRunned;
		this.url = '/list';
	}
}

export default SlavesRunnedCollection;
