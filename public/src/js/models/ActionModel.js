import Backbone from 'backbone';
import ParamModel	from './ParamModel.js';

/**
 * Define an Action.
 */
class ActionModel extends Backbone.Model {
	/**
	 * @override
	 */
	defaults() {
		return {
			id: -1,
			categoryId: -1,
			name: '',
			description: '',
			params: ParamModel
		};
	}
}

export default ActionModel;
