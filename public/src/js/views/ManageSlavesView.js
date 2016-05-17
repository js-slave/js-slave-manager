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
	 * Call the API with the POST method.
	 * @param {String} url - The url of the API.
	 * @param {Object} params - Parameters to send to the API.
	 */
	postApi(url, params) {
		$('.overlay').show();
		$.post(url, params).done(() => {
			this.slavesCollection.fetch().then(() => {
				this.render();
			});
		}).fail((error) => {
			console.log(error);
			$('.overlay').hide();
		});
	}

	/**
	 * Called when the user click on the 'button-install'.
	 * It will call the API to install a new slave.
	 *  @param {Object} e - Event informations
	 */
	install(e) {
		this.postApi('/install', {name: $(e.currentTarget).data('name')});
	}

	/**
	 * Called when the user click on the 'button-uninstall'.
	 * It will call the API to uninstall a slave.
	 *  @param {Object} e - Event informations
	 */
	uninstall(e) {
		this.postApi('/uninstall', {name: $(e.currentTarget).data('name')});
	}

	/**
	 * Called when the user click on the 'button-upgrade'.
	 * It will call the API to upgrade a slave.
	 *  @param {Object} e - Event informations
	 */
	upgrade(e) {
		this.postApi('/upgrade', {name: $(e.currentTarget).data('name')});
	}

	/**
	 * Called when the page need to be rendered.
	 */
	render() {
		this.$el.html(ManageSlavesTemplate(this.slavesCollection.toJSON()));
	}
	}

export default ManageSlavesView;
