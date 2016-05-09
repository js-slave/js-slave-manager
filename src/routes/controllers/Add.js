const Controller		= require('./Controller.js');
const jsBotManager		= require('../../JSBotManager.js');
const UserParameters	= require('../../UserParameters.js');
const restify			= require('restify');

/**
 * Define /add.
 */
class Add extends Controller {
	/**
	 * Create an instance of Add and define every route.
	 * @param {Restify} server - An instance of the Restify server.
	 */
	constructor(server) {
		super(server);

		this.server.post('/add', (req, res) => { this.post(req, res); });
	}

	/**
	 * Define the route /add POST.
	 * @param {Object} req - The request parameter.
	 * @param {Object} res - The response parameter.
	 * @return {Void} - Return not handled.
	 */
	post(req, res) {
		const params = {
			event: req.params.event,
			action: req.params.action
		};

		if (!params.event || typeof params.event != 'object' || !params.event.hasOwnProperty('id') || !params.event.hasOwnProperty('categoryId') || !params.event.hasOwnProperty('params')) {
			return res.json(new restify.BadRequestError('Invalid event'));
		} else if (!params.action || typeof params.action != 'object' || !params.action.hasOwnProperty('id') || !params.action.hasOwnProperty('categoryId') ) {
			return res.json(new restify.BadRequestError('Invalid action'));
		}

		const eventPointer = jsBotManager.getEvent(params.event.categoryId, params.event.id);
		const actionPointer = jsBotManager.getAction(params.action.categoryId, params.action.id);

		if (!eventPointer) {
			return res.json(new restify.BadRequestError('Event not found'));
		} else if (!actionPointer) {
			return res.json(new restify.BadRequestError('Action not found'));
		}

		try {
			const userParametersEvent = new UserParameters(params.event.params);
			const userParametersAction = new UserParameters(params.action.params);

			eventPointer.start(actionPointer, userParametersEvent, userParametersAction);
			jsBotManager.addRunnedBot(eventPointer, actionPointer, userParametersEvent, userParametersAction);

			res.json({});
		} catch(e) {
			console.log(e);
			res.json(new restify.BadRequestError(e.message));
		}
	}
}

module.exports = Add;
