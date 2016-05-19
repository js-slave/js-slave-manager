import Backbone					from 'backbone';
import ListTemplate				from '../templates/list.hbs';
import SlavesRunnedCollection	from '../collections/SlavesRunnedCollection.js';

/**
 * Represent the page "List".
 * In this page, the user can see every created slaves.
 */
class ListView extends Backbone.View {
	/**
	 * Create an instance of ListView.
	 * Call the API to get created slaves.
	 */
	constructor() {
		super({
			events: {
				'click #button-delete': 'delete'
			}
		});
		this.slavesRunnedCollection = new SlavesRunnedCollection();
		this.slavesRunnedCollection.fetch().then(() => {
			this.render();
		});
	}

	/**
	 * Call when the user click on delete button. The runned slave will be deleted in the server.
	 * @param {Object} e - Event informations
	 */
	delete(e) {
		const id = $(e.target).data('id');
		$('.overlay').show();
		$.ajax({
			url: `/remove/${id}`, type: 'DELETE'
		}).done(() => {
			this.slavesRunnedCollection.fetch().then(() => {
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
		this.$el.html(ListTemplate(this.slavesRunnedCollection.toJSON()));
	}
}

export default ListView;
