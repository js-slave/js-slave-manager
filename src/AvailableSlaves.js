const RegClient	= require('npm-registry-client');
const slaves	= require('./../slaves.json');

/**
 * AvailableSlaves manage informations about available slaves inside "slaves.json"
 */
class AvailableSlaves {
	/**
	 * Load slaves from "slaves.json"
	 */
	constructor() {
		this.regClient	= new RegClient();
		this.slaves		= [];

		for (const slave of slaves) {
			this.slaves.push({
				name:		slave,
				installed:	false
			});
		}
	}

	/**
	 * Return true if the slave is a valid slave.
	 * @param {String} slaveName - The name of the slave.
	 * @return {Boolean} True if the slave is a valid slave.
	 */
	isValidSlave(slaveName) {
		for (const slave of this.slaves) {
			if (slave.name === slaveName) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Set the local version of a slave.
	 * @param {String} slaveName - The name of the slave
	 * @param {String} version - The verison of the slave
	 */
	setSlaveVersion(slaveName, version) {
		for (const slave of this.slaves) {
			if (slave.name === slaveName) {
				slave.version = version;
				slave.installed = true;
			}
		}
	}

	/**
	 * Get the latest version of a slave.
	 * @param {String} slaveName - The name of the slave
	 * @return {Promise} - A Promise
	 */
	getLatestVersion(slaveName) {
		return new Promise((resolve, reject) => {
			const uri		= `https://registry.npmjs.org/${slaveName}/latest`;
			const params	= { timeout: 1000 };

			this.regClient.get(uri, params, (error, data) => {
				if (!error) {
					resolve(data.version);
				}
				reject(error);
			});
		});
	}

	/**
	 * Get all latest version of every loaded slaves.
	 * @return {Promise} A Promise.
	 */
	getAllLatestVersion() {
		const promises = [];
		for (const slave of this.slaves) {
			promises.push(this.getLatestVersion(slave.name).then((version) => {
				slave.latestVersion = version;
				return Promise.resolve();
			}).catch((error) => {
				console.log(error);
				slave.latestVersion = null;
				return Promise.reject();
			}));
		}
		return Promise.all(promises);
	}

	/**
	 * Return an array with every loaded slave.
	 * @return {Array} An array of slave (name, version, latestVersion and installed).
	 */
	getSlaves() {
		return this.slaves;
	}
}

module.exports = new AvailableSlaves();
