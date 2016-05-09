const Controller		= require('./Controller.js');
const jsSlaveManager	= require('../../JSSlaveManager.js');
const restify			= require('restify');

/**
 * Define /remove.
 */
class Remove extends Controller {
	/**
	 * Create an instance of Remove and define every route.
	 * @param {Restify} server - An instance of the Restify server.
	 */
	constructor(server) {
		super(server);

		this.server.del('/remove/:id', (req, res) => { this.del(req, res); });
	}

	/**
	 * Define the route /remove/:id DEL.
	 * @param {Object} req - The request parameter.
	 * @param {Object} res - The response parameter.
	 */
	del(req, res) {
		const params = {
			id: parseInt(req.params.id)
		};

		jsSlaveManager.stopRunnedSlave(params.id).then(() => {
			res.json({});
		}).catch((error) => {
			console.log(error);
			res.json(new restify.BadRequestError(error));
		});
	}
}

module.exports = Remove;
