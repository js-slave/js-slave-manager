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

### Slave

Each slave has to be installed with npm.

	npm install js-slave-NAME

### Contributing

Don't hesitate to create pull request to improve the project.
You can also create "slaves" to add more events/actions to the manager.

### Bugs

This project is still in development. If you find a bug, don't hesitate to [create an issue](https://github.com/js-slave/js-slave-manager/issues).
