const Controller	= require('./Controller.js');
const jsBotManager	= require('../../JSBotManager.js');

/**
 * Define /events.
 */
class Events extends Controller {
	/**
	 * Create an instance of Events and define every route.
	 * @param {Restify} server - An instance of the Restify server.
	 */
	constructor(server) {
		super(server);

		this.server.get('/events', (req, res) => { this.get(req, res); });
	}

	/**
	 * Define the route /events GET.
	 * @param {Object} req - The request parameter.
	 * @param {Object} res - The response parameter.
	 */
	get(req, res) {
		res.json(jsBotManager.getEvents());
	}
}

module.exports = Events;
