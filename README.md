# js-slave-manager

[![dependency status](https://david-dm.org/js-slave/js-slave-manager.svg)](https://david-dm.org/js-slave/js-slave-manager)
[![dev-dependencies status](https://david-dm.org/js-slave/js-slave-manager/dev-status.svg)](https://david-dm.org/js-slave/js-slave-manager#info=devDependencies)

This application can manage and run different slaves.
A slave contains "events" and "actions". With a web interface, you will be able to choose what action will be executed when an event is triggered.

### Requirements

All of the project is written in JavaScript ES6. For the back-end (API and Manager), I don't use BabelJS to convert the code to ES5 so you need the futur LTS version of node.js:

* [node.js](https://nodejs.org) >= 6.0.0

### Installation

	git clone https://github.com/js-slave/js-slave-manager.git
	cd js-slave-manager
	npm install
	npm start

## Options

The default port is 8080 but you can change it by 2 ways.

1) By sending arguments to npm start:

	npm start -- --port 8080

2) By creating the file "config.json":

 ```json
{
	"port": 8080
}
```

### Slave

You can install new slaves directly from the web interface.

### Contributing

Don't hesitate to create pull request to improve the project.
You can also create "slaves" to add more events/actions to the manager.

### Bugs

This project is still in development. If you find a bug, don't hesitate to [create an issue](https://github.com/js-slave/js-slave-manager/issues).
