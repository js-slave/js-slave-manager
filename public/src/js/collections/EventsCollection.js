import Backbone			from 'backbone';
import CategoryModel	from '../models/CategoryModel.js';

/**
 * Define a collection of Events (stored in CategoryModel).
 */
class EventsCollection extends Backbone.Collection {
	/**
	 * Create an instance of EventsCollection.
	 * Define the Model and the url of this collection.
	 * /events GET return every event.
	 * @param  {Object} options - The options of the collection.
	 */
	constructor (options) {
		super(options);
		this.model = CategoryModel;
		this.url = '/events';
	}
}

export default EventsCollection;
