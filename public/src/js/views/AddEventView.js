import Backbone			from 'backbone';
import AddEventTemplate	from '../templates/addEvent.hbs';
import EventsCollection	from '../collections/EventsCollection.js';
import EventModel		from '../models/EventModel.js';
import store			from 'store';

/**
 * Represent the page "AddEvent".
 * In this page, the user can choose an event.
 */
class AddEventView extends Backbone.View {
	/**
	 * Create an instance of AddEventView.
	 * Define page events, set default varaibles and call the API to get every event.
	 */
	constructor() {
		super({
			events: {
				'submit .event-form': 'submit',
				'click #button-back': 'back'
			}
		});
		this.events = new EventsCollection();
		this.events.fetch().then(() => {
			this.render();
		});
	}

	/**
	 * Called when the user submit the form.
	 * @param  {Object} e - Event informations
	 */
	submit(e) {
		e.preventDefault();

		let categoryId = -1;
		let eventId = -1;
		let eventModel = null;

		const inputs = $(e.currentTarget).find('input');
		for (const input of inputs) {
			const inputSelected = $(input);

			if (inputSelected.attr('name') === 'categoryId') {
				categoryId = parseInt(inputSelected.val());
			} else if (inputSelected.attr('name') === 'eventId') {
				eventId = parseInt(inputSelected.val());
			} else if (eventId !== -1 && categoryId !== -1){
				const name = inputSelected.attr('name');
				const value = inputSelected.val();
				const categoryModel = this.events.get(categoryId);

				if (eventModel === null) {
					eventModel = new EventModel(categoryModel.get('events')[eventId]);
					eventModel.set('categoryId', categoryId);
				}
				for (const param of eventModel.get('params')) {
					if (param.name === name) {
						param.value = value;
					}
				}
			}
		}
		store.set('event', eventModel);
		Backbone.history.navigate('addAction', true);
	}

	/**
	 * Remove the event from the local storage before redirecting the user to the home page.
	 */
	back() {
		store.remove('event');
	}

	/**
	 * Called when the page need to be rendered.
	 */
	render() {
		this.$el.html(AddEventTemplate(this.events.length === 0 ? null : this.events.toJSON()));
	}
}

export default AddEventView;
