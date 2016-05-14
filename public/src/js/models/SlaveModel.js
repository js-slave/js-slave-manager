import Backbone from 'backbone';

/**
 * Define a Slave.
 */
class SlaveModel extends Backbone.Model {
	/**
	 * @override
	 */
	defaults() {
		return {
			name: '',
			installed: false,
			version: '',
			latestVersion: '',
			newVersion: false
		};
	}
}

export default SlaveModel;
