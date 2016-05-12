/**
 * JSSlaveManager manage every available slaves.
 * Also, the class store runned slaves.
 */
class JSSlaveManager {
	/**
	 * Create a new JSSlaveManager.
	 */
	constructor() {
		this.jsSlaves = [];
		this.jsSlavesRunned = [];
	}

	/**
	 * Add a JSSlave to the manager by require it.
	 * @param {String} name - The name of the JSSlave module.
	 */
	addJSSlave(name) {
		const JSSlave = require(name);
		this.jsSlaves.push(new JSSlave());
	}

	/**
	 * Return the ActionPointer associated to the categoryId and the actionId.
	 * @param {Number} categoryId - The id of the category.
	 * @param {Number} actionId - The id of the action.
	 * @return {ActionPointer} - An instance of ActionPointer or null no action has been found.
	 */
	getAction(categoryId, actionId) {
		for (let i = 0; i < this.jsSlaves.length; ++i) {
			if (i === categoryId) {
				const actions = this.jsSlaves[i].getActions();
				for (let j = 0; j < actions.length; ++j) {
					if (j === actionId) {
						return actions[j];
					}
				}
			}
		}
		return null;
	}

	/**
	 * Return every action avaible.
	 * @returns {Array} - An array of object which contains every action.
	 */
	getActions() {
		const result = [];
		for (let i = 0; i < this.jsSlaves.length; ++i) {
			const actions = this.jsSlaves[i].getActions();
			if (actions.length > 0) {
				const category = {
					id: i,
					categoryName: this.jsSlaves[i].getCategoryName(),
					actions: []
				};

				for (let j = 0; j < actions.length; ++j) {
					category.actions.push({
						id: j,
						name: actions[j].getName(),
						description: actions[j].getDescription(),
						params: actions[j].getParamsToJSON()
					});
				}

				result.push(category);
			}
		}
		return result;
	}

	/**
	 * Return the EventPointer associated to the categoryId and the eventId.
	 * @param {Number} categoryId - The id of the category.
	 * @param {Number} eventId - The id of the event.
	 * @return {EventPointer} - An instance of EventPointer or null no event has been found.
	 */
	getEvent(categoryId, eventId) {
		for (let i = 0; i < this.jsSlaves.length; ++i) {
			if (i === categoryId) {
				const events = this.jsSlaves[i].getEvents();
				for (let j = 0; j < events.length; ++j) {
					if (j === eventId) {
						return events[j];
					}
				}
			}
		}
		return null;
	}

	/**
	 * Return every event avaible.
	 * @returns {Array} - An array of object which contains every event.
	 */
	getEvents() {
		const result = [];
		for (let i = 0; i < this.jsSlaves.length; ++i) {
			const events = this.jsSlaves[i].getEvents();
			if (events.length > 0) {
				const category = {
					id: i,
					categoryName: this.jsSlaves[i].getCategoryName(),
					events: []
				};

				for (let j = 0; j < events.length; ++j) {
					category.events.push({
						id: j,
						name: events[j].getName(),
						description: events[j].getDescription(),
						params: events[j].getParamsToJSON(),
						returnedValues: events[j].getReturnedValuesToJSON()
					});
				}

				result.push(category);
			}
		}
		return result;
	}

	/**
	 * Add a new Slave.
	 * @param {EventPointer} event - The instance of the EventPointer.
	 * @param {ActionPointer} action - The instance of the ActionPointer.
	 * @param {UserParameters} eventParameters - The parameters that the user choose to send to the event.
	 * @param {UserParameters} actionParameters - The parameters that the user choose to send to the action.
	 */
	addRunnedSlave(event, action, eventParameters, actionParameters) {
		this.jsSlavesRunned.push({
			event:				event,
			action:				action,
			eventParameters: 	eventParameters,
			actionParameters:	actionParameters
		});
	}

	/**
	 * Return every runned slaves.
	 * @returns {Array} - An array of Object which contains the id and informations about the event and the action.
	 */
	getRunnedSlaves() {
		const result = [];
		for (let i = 0; i < this.jsSlavesRunned.length; ++i) {
			result.push({
				id: i,
				event: {
					name: this.jsSlavesRunned[i].event.getName(),
					description: this.jsSlavesRunned[i].event.getDescription(),
					params: this.jsSlavesRunned[i].eventParameters.toJSON()
				},
				action: {
					name: this.jsSlavesRunned[i].action.getName(),
					description: this.jsSlavesRunned[i].action.getDescription(),
					params: this.jsSlavesRunned[i].actionParameters.toJSON()
				}
			});
		}
		return result;
	}

	/**
	 * Stop a running slave.
	 * @param {Number} id - The id of the slave.
	 * @return {Promise} A Promise.
	 */
	stopRunnedSlave(id) {
		let i = 0;
		for (const slaveRunned of this.jsSlavesRunned) {
			if (id === i) {
				return slaveRunned.event.stop(slaveRunned.eventParameters).then(() => {
					this.jsSlavesRunned.splice(i, 1);
					return Promise.resolve();
				});
			}
			++i;
		}
		return Promise.reject({message: 'Slave not found'});
	}
}

module.exports = new JSSlaveManager();
