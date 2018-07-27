install: install-deps install-flow-typed

start:
	npm run babel-node -- server/bin/app.js

install-deps:
	npm install

install-flow-typed:
	npm run flow-typed install

build:
	rm -rf dist
	npm run build
	npm run webpack -- -p --env production && babel frontend --out-dir dist --source-maps inline

test:
	npm test

check-types:
	npm run flow

lint:
	npm run eslint

publish:
	npm publish

.PHONY: test
