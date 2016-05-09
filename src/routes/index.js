const fs			= require('fs');
const serveStatic	= require('serve-static-restify');

module.exports = function(server) {
	const controllersFiles 		= fs.readdirSync(`${__dirname}/controllers`);
	const controllersObjects	= [];

	server.pre(serveStatic('./public'));

	controllersFiles.forEach( (name) => {
		if (name !== 'Controller.js') {
			const Controller = require(`./controllers/${name}`);
			controllersObjects.push(new Controller(server));
		}
	});
};
