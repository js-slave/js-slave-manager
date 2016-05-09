import Backbone		from 'backbone';
import ActionModel	from './ActionModel.js';
import EventModel	from './EventModel.js';

/**
 * Define a category with events and actions.
 */
class CategoryModel extends Backbone.Model {
	/**
	 * @override
	 */
	defaults() {
		return {
			id: -1,
			categoryName: '',
			events: EventModel,
			actions: ActionModel
		};
	}
}

export default CategoryModel;
