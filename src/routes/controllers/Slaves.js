const Controller		= require('./Controller.js');
const jsSlaveManager	= require('./../../AvailableSlaves.js');

/**
 * Define /slaves.
 */
class Slaves extends Controller {
	/**
	 * Create an instance of Slaves and define every route.
	 * @param {Restify} server - An instance of the Restify server.
	 */
	constructor(server) {
		super(server);

		this.server.get('/slaves', (req, res) => { this.get(req, res); });
	}

	/**
	 * Define the route /slaves GET.
	 * @param {Object} req - The request parameter.
	 * @param {Object} res - The response parameter.
	 */
	get(req, res) {
		res.json(jsSlaveManager.getSlaves());
	}
}

module.exports = Slaves;
