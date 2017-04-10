
build: node_modules
	mkdir templates/special/assets
	cp -R assets/*.* templates/special/assets

	mkdir templates/special/build
	cp -R build/*.* templates/special/build

	mkdir templates/special/customized_modules
	cp -R customized_modules/*.* templates/special/customized_modules

	mkdir templates/special/node_modules
	cp -R node_modules/*.* templates/special/node_modules
	
	cp app.js templates/special/
	cp config.js templates/special/
	cp index.html templates/special/
	cp package.json templates/special/
	cp README.md templates/special/
	cp webpack.config.js templates/special/
	cp weex.html templates/special/

node_modules: package.json
	npm install

.PHONY: build
