import Backbone		from 'backbone';
import ActionModel	from './ActionModel.js';
import EventModel	from './EventModel.js';

/**
 * Define the model "Add" which correspond to an Object with an Event and an Action.
 */
class AddModel extends Backbone.Model {
	/**
	 * Define the url of this model.
	 * @param {Object} options - The model options.
	 */
	constructor(options) {
		super(options);
		this.url = '/add';
	}

	/**
	 * @override
	 */
	defaults() {
		return {
			action: ActionModel,
			event: EventModel
		};
	}
}

export default AddModel;
