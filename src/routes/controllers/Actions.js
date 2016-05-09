const Controller		= require('./Controller.js');
const jsSlaveManager	= require('../../JSSlaveManager.js');

/**
 * Define /actions.
 */
class Actions extends Controller {
	/**
	 * Create an instance of Action and define every route.
	 * @param  {Restify} server - An instance of the Restify server.
	 */
	constructor(server) {
		super(server);

		this.server.get('/actions', (req, res) => { this.get(req, res); });
	}

	/**
	 * Define the route /actions GET.
	 * @param {Object} req - The request parameter.
	 * @param {Object} res - The response parameter.
	 */
	get(req, res) {
		res.json(jsSlaveManager.getActions());
	}
}

module.exports = Actions;
