import Backbone				from 'backbone';
import ManageSlavesTemplate	from '../templates/manageSlaves.hbs';
import SlavesCollection		from '../collections/SlavesCollection.js';

/**
 * Represent the page "ManageSlaves".
 * In this page, the user install/uninstall/update slaves.
 */
class ManageSlavesView extends Backbone.View {
	/**
	 * Create an instance of ManageSlavesView
	 */
	constructor() {
		super({});
		this.slavesCollection = new SlavesCollection();
		this.slavesCollection.fetch().then(() => {
			this.render();
		});
	}

	/**
	 * Called when the page need to be rendered.
	 */
	render() {
		this.$el.html(ManageSlavesTemplate(this.slavesCollection.toJSON()));
	}
}

export default ManageSlavesView;
