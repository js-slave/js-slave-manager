import Backbone from 'backbone';

/**
 * Define a parameter which will be used by an event or an action.
 */
class ParamModel extends Backbone.Model {
	/**
	 * @override
	 */
	defaults() {
		return {
			name: '',
			description: '',
			type: '',
			value: ''
		};
	}
}

export default ParamModel;
