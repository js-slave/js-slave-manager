/**
 * Class representing every parameter the user want to send to the event.
 */
class UserParameter {
	/**
	 * Create an UserParameter.
	 * @param {Object} paramsObject - An object which contains every parameters.
	 */
	constructor(paramsObject) {
		this.params = {};

		for (const param of paramsObject) {
			this.params[param.name] = param.value;
		}
	}

	/**
	 * Return the value of a parameter.
	 * @param {String} name - The name of the parameter
	 * @return {Object} - The value of the parameter
	 */
	get(name) {
		return this.params[name];
	}

	/**
	 * Math a parameter with its value.
	 * @param {String} prop - The property in the params Object.
	 * @param {String} name - The name of the parameter.
	 * @param {String} value - The value of the parameter.
	 */
	matchParameter(prop, name, value) {
		this.params[prop] = this.params[prop].replace(`{${name}}`, value);
	}

	/**
	 * Math every parameter (which are inside "parameters") with the Object "params".
	 * @param  {Array} parameters - An array of {name: value}
	 */
	matchParameters(parameters) { // array of {name: , value}
		for (const prop in this.params) {
			for (const parameter of parameters) {
				this.matchParameter(prop, parameter.name, parameter.value);
			}
		}
	}

	/**
	 * Return every parameters formatted for JSON output.
	 * @return {Array} - An array which contains every parameters with its value and its type.
	 */
	toJSON() {
		const result = [];
		for (const key in this.params) {
			result.push({
				name: key,
				value: this.params[key],
				type: typeof this.params[key]
			});
		}
		return result;
	}
}

module.exports = UserParameter;
