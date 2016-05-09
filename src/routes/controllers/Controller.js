/**
 * The abstract Controller has to be extended by every route.
 */
class Controller {
	/**
	 * Store the server parameter.
	 * @param {Restify} server - An instance of the Restify server.
	 */
	constructor(server) {
		if (new.target === Controller) {
			throw TypeError('Abstract class "Controller" can\'t be instantiated directly');
		}
		this.server = server;
	}
}

module.exports = Controller;
