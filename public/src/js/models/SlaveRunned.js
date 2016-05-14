import Backbone		from 'backbone';
import ActionModel	from './ActionModel.js';
import EventModel	from './EventModel.js';

/**
 * Define a runned bot which correspond to an event/action.
 */
class BotRunned extends Backbone.Model {
	/**
	 * @override
	 */
	defaults() {
		return {
			id: 0,
			action: ActionModel,
			event: EventModel
		};
	}
}

export default BotRunned;
