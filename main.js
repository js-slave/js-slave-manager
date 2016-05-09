const jsSlaveManager	= require('./src/JSSlaveManager.js');
const npm				= require('npm');
const restify			= require('restify');

const port		= 8080;
const server	= restify.createServer({
	name: 'js-slave-manager'
});

server.use(restify.queryParser());
server.use(restify.bodyParser());

require('./src/routes/index.js')(server);

console.log('Loading slaves...');
npm.load(null, () => {
	npm.commands.ls(null, true, (err, module) => {
		if (err) {
			console.log(err);
		} else {
			for (const dependency in module.dependencies) {
				if (dependency.startsWith('js-slave-')) {
					jsSlaveManager.addJSSlave(dependency);
				}
			}

			server.listen(port, () => {
				console.log(`${server.name} listening at http://127.0.0.1:${port}`);
			});
		}
	});
});
