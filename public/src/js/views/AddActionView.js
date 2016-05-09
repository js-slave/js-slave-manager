import Backbone				from 'backbone';
import ActionModel			from '../models/ActionModel.js';
import ActionsCollection	from '../collections/ActionsCollection.js';
import AddEventTemplate		from '../templates/addAction.hbs';
import store				from 'store';
import EventModel			from '../models/EventModel.js';

/**
 * Represent the page "AddAction".
 * In this page, the user can choose an action which will be associated to an event.
 */
class AddActionView extends Backbone.View {
	/**
	 * Create an instance of AddActionView.
	 * Define page events, set default varaibles and call the API to get every action.
	 */
	constructor() {
		super({
			events: {
				'change select': 'clickOnSelect',
				'submit .action-form': 'submit'
			}
		});

		this.event = new EventModel(store.get('event'));

		this.actions = new ActionsCollection();
		this.actions.fetch().then(() => {
			this.render();
		});
	}

	/**
	 * Called when the user try to change an action parameter.
	 * @param  {Object} e - Event informations
	 */
	clickOnSelect(e) {
		const currentTarget = $(e.currentTarget);
		if (currentTarget.val() === 'custom') {
			currentTarget.after($('<input>', {
				class: 'pure-input',
				name: 'custom',
				placeholder: 'Your custom value',
				required: true,
				type: 'text'
			}).data('paramName', currentTarget.attr('name')));
		} else if (currentTarget.next().is('input')) {
			currentTarget.next().remove();
		}
	}

	/**
	 * Called when the user submit the form.
	 * @param  {Object} e - Event informations
	 */
	submit(e) {
		e.preventDefault();

		let categoryId = -1;
		let actionId = -1;
		let actionModel = null;

		const customValues = [];
		const inputs = $(e.currentTarget).find('input');

		for (const input of inputs) {
			const inputSelected = $(input);
			if (inputSelected.attr('name') === 'categoryId') {
				categoryId = parseInt(inputSelected.val());
			} else if (inputSelected.attr('name') === 'actionId') {
				actionId = parseInt(inputSelected.val());
			} else if (inputSelected.attr('name') === 'custom') {
				customValues.push({
					name: inputSelected.data('paramName'),
					value: inputSelected.val()
				});
			}
		}

		const selects = $(e.currentTarget).find('select');
		for (let select of selects) {
			select = $(select);
			if (select.val() !== 'custom') {
				customValues.push({
					name: select.attr('name'),
					value: `{${select.val()}}`
				});
			}
		}

		const categoryModel = this.actions.get(categoryId);

		if (actionModel === null) {
			actionModel = new ActionModel(categoryModel.get('actions')[actionId]);
			actionModel.set('categoryId', categoryId);

			for (const param of actionModel.get('params')) {
				for (const customValue of customValues) {
					if (customValue.name === param.name) {
						param.value = customValue.value;
					}
				}
			}
		}

		store.set('action', actionModel);
		Backbone.history.navigate('add', true);
	}

	/**
	 * Called when the page need to be rendered.
	 */
	render() {
		if (this.actions.length === 0) {
			this.$el.html(AddEventTemplate());
		} else {
			this.$el.html(AddEventTemplate({
				actions: this.actions.toJSON(),
				returnedValues: this.event.get('returnedValues')
			}));
		}
	}
}

export default AddActionView;
