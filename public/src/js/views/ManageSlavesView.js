import 'css-loading';

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
		super({
			events: {
				'click .button-install': 'install',
				'click .button-uninstall': 'uninstall',
				'click .button-upgrade': 'upgrade'
			}
		});
		this.slavesCollection = new SlavesCollection();
		this.slavesCollection.fetch().then(() => {
			this.render();
		});
	}

	/**
	 * Called when the user click on the 'button-install'.
	 * It will call the API to instal a new slave.
	 *  @param {Object} e - Event informations
	 */
	install(e) {
		const name = $(e.currentTarget).data('name');
		$('.overlay').show();
		$.post('/install', {name: name}).done(() => {
			this.slavesCollection.fetch().then(() => {
				this.render();
			});
		}).fail((error) => {
			console.log(error);
			$('.overlay').hide();
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
