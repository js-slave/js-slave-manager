const Controller		= require('./Controller.js');
const jsSlaveManager	= require('../../JSSlaveManager.js');

/**
 * Define /list.
 */
class List extends Controller {
	/**
	 * Create an instance of List and define every route.
	 * @param {Restify} server - An instance of the Restify server.
	 */
	constructor(server) {
		super(server);

		this.server.get('/list', (req, res) => { this.get(req, res); });
	}

	/**
	 * Define the route /list GET.
	 * @param {Object} req - The request parameter.
	 * @param {Object} res - The response parameter.
	 */
	get(req, res) {
		res.json(jsSlaveManager.getRunnedSlaves());
	}
}

module.exports = List;
