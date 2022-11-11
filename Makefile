install:
	npm ci

build:
	npx webpack

dev:
	npx webpack serve --env develop