
build: node_modules
	node ./bin/init.js

node_modules: package.json
	npm install

.PHONY: build
