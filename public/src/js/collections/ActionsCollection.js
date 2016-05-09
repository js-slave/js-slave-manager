import Backbone			from 'backbone';
import CategoryModel	from '../models/CategoryModel.js';

/**
 * Define a collection of Actions (stored in CategoryModel).
 */
class ActionsCollection extends Backbone.Collection {
	/**
	 * Create an instance of ActionsCollection.
	 * Define the Model and the url of this collection.
	 * /actions GET return every action.
	 * @param  {Object} options - The options of the collection.
	 */
	constructor (options) {
		super(options);
		this.model = CategoryModel;
		this.url = '/actions';
	}
}

export default ActionsCollection;
