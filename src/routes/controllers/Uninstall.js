const Controller		= require('./Controller.js');
const availableSlaves	= require('./../../AvailableSlaves.js');
const restify			= require('restify');

/**
 * Define /uninstall.
 */
class Uninstall extends Controller {
	/**
	 * Create an instance of Uninstall and define every route.
	 * @param {Restify} server - An instance of the Restify server.
	 */
	constructor(server) {
		super(server);

		this.server.post('/uninstall', (req, res) => { this.post(req, res); });
	}

	/**
	 * Define the route /uninstall POST.
	 * @param {Object} req - The request parameter.
	 * @param {Object} res - The response parameter.
	 */
	post(req, res) {
		const params = {
			name: req.params.name
		};

		if (!params.name || params.name.length === 0 || !params.name.startsWith('js-slave-')) {
			res.json(new restify.BadRequestError('Invalid name'));
			return;
		}

		availableSlaves.uninstall(params.name).then(() => {
			res.json({});
		}).catch((error) => {
			console.log(error);
			res.json(new restify.InternalServerError(error));
		});

	}
}

module.exports = Uninstall;
