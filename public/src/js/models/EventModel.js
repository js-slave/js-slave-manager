import Backbone		from 'backbone';
import ParamModel	from './ParamModel.js';

/**
 * Define an Event.
 */
class EventModel extends Backbone.Model {
	/**
	 * @override
	 */
	defaults() {
		return {
			id: -1,
			categoryId: -1,
			name: '',
			description: '',
			params: ParamModel,
			returnedValues: ParamModel
		};
	}
}

export default EventModel;
