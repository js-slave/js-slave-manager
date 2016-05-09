/**
 * JSBotManager manage every available bots.
 * Also, the class store runned bots.
 */
class JSBotManager {
	/**
	 * Create a new JSBotManager.
	 */
	constructor() {
		this.jsbots = [];
		this.jsbotsRunned = [];
	}

	/**
	 * Add a JSBot to the manager by require it.
	 * @param {String} name - The name of the JSBot module.
	 */
	addJSBot(name) {
		const JSBot = require(name);
		this.jsbots.push(new JSBot());
	}

	/**
	 * Return the ActionPointer associated to the categoryId and the actionId.
	 * @param {Number} categoryId - The id of the category.
	 * @param {Number} actionId - The id of the action.
	 * @return {ActionPointer} - An instance of ActionPointer or null no action has been found.
	 */
	getAction(categoryId, actionId) {
		for (let i = 0; i < this.jsbots.length; ++i) {
			if (i === categoryId) {
				const actions = this.jsbots[i].getActions();
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
		for (let i = 0; i < this.jsbots.length; ++i) {
			const actions = this.jsbots[i].getActions();
			if (actions.length > 0) {
				const category = {
					id: i,
					categoryName: this.jsbots[i].getCategoryName(),
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
		for (let i = 0; i < this.jsbots.length; ++i) {
			if (i === categoryId) {
				const events = this.jsbots[i].getEvents();
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
		for (let i = 0; i < this.jsbots.length; ++i) {
			const events = this.jsbots[i].getEvents();
			if (events.length > 0) {
				const category = {
					id: i,
					categoryName: this.jsbots[i].getCategoryName(),
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
	 * Add a new Bot.
	 * @param {EventPointer} event - The instance of the EventPointer.
	 * @param {ActionPointer} action - The instance of the ActionPointer.
	 * @param {UserParameters} eventParameters - The parameters that the user choose to send to the event.
	 * @param {UserParameters} actionParameters - The parameters that the user choose to send to the action.
	 */
	addRunnedBot(event, action, eventParameters, actionParameters) {
		this.jsbotsRunned.push({
			event:				event,
			action:				action,
			eventParameters: 	eventParameters,
			actionParameters:	actionParameters
		});
	}

	/**
	 * Return every ??THING??.
	 * @returns {Array} - An array of Object which contains the id and informations about the event and the action.
	 */
	getRunnedBots() {
		const result = [];
		for (let i = 0; i < this.jsbotsRunned.length; ++i) {
			result.push({
				id: i,
				event: {
					name: this.jsbotsRunned[i].event.getName(),
					description: this.jsbotsRunned[i].event.getDescription(),
					params: this.jsbotsRunned[i].eventParameters.toJSON()
				},
				action: {
					name: this.jsbotsRunned[i].action.getName(),
					description: this.jsbotsRunned[i].action.getDescription(),
					params: this.jsbotsRunned[i].actionParameters.toJSON()
				}
			});
		}
		return result;
	}

	/**
	 * Stop a running bot.
	 * @param {Number} id - The id of the bot.
	 * @return {Promise} A Promise.
	 */
	stopRunnedBots(id) {
		return new Promise((resolve, reject) => {
			let i = 0;
			for (const botsRunned of this.jsbotsRunned) {
				if (id === i) {
					return botsRunned.event.stop(botsRunned.eventParameters).then(() => {
						resolve();
					}).catch((error) => {
						reject(error);
					});
				}
				++i;
			}
			reject({message: 'Bot not found'});
		});
	}
}

module.exports = new JSBotManager();
