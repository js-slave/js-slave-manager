import Backbone		from 'backbone';
import SlaveModel	from '../models/SlaveModel.js';

/**
 * Define a collection of Slaves.
 */
class SlavesCollection extends Backbone.Collection {
	/**
	 * Create an instance of SlavesCollection.
	 * Define the Model and the url of this collection.
	 * /slaves GET return every slave.
	 * @param  {Object} options - The options of the collection.
	 */
	constructor (options) {
		super(options);
		this.model = SlaveModel;
		this.url = '/slaves';
	}
}

export default SlavesCollection;
