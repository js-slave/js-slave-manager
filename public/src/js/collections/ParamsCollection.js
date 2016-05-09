import Backbone		from 'backbone';
import ParamModel	from '../models/ParamModel.js';

/**
 * Define a collection of ParamModel.
 */
class ParamsCollection extends Backbone.Collection {
	/**
	 * Create an instance of ParamsCollection.
	 * Define the Model of this colleciton.
	 * @param  {Object} options - The options of the collection.
	 */
	constructor (options) {
		super(options);
		this.model = ParamModel;
	}
}

export default ParamsCollection;
