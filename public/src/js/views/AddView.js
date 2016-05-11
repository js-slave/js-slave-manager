import Backbone		from 'backbone';
import AddTemplate	from '../templates/add.hbs';
import ActionModel	from '../models/ActionModel.js';
import AddModel		from '../models/AddModel.js';
import EventModel	from '../models/EventModel.js';
import store		from 'store';

/**
 * Represent the page "Add".
 * In this page, the user must verify the event and the action are OK.
 */
class AddView extends Backbone.View {
	/**
	 * Create an instance of AddView.
	 * Define page events, get event/action by reading the local storage.
	 */
	constructor() {
		super({
			events: {
				'submit #add-form': 'submit',
				'click #button-back': 'back'
			}
		});
		this.action = new ActionModel(store.get('action'));
		this.event = new EventModel(store.get('event'));
	}

	/**
	 * Called when the user submit the form.
	 * @param {Object} e - Event informations
	 */
	submit(e) {
		e.preventDefault();
		const addModel = new AddModel({
			action: this.action,
			event: this.event
		});
		addModel.save().success((success) => {
			console.log(success);
		}).error((error) => {
			console.log(error);
		});
	}

	/**
	 * Remove the action from the local storage before redirecting the user to the addAction page.
	 */
	back() {
		store.remove('action');
	}

	/**
	 * Called when the page need to be rendered.
	 */
	render() {
		this.$el.html(AddTemplate({
			action: this.action.toJSON(),
			event: this.event.toJSON()
		}));
	}
}

export default AddView;
