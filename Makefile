.PHONY: install, analyse, fix, tests

install:
	yarn install
	cp .env .env.local

eslint:
	npx eslint assets/

stylelint:
	npx stylelint "assets/styles/**/*.scss"

analyse:
	make eslint
	make stylelint

fix:
	npx eslint assets/ --fix
	npx stylelint "assets/styles/**/*.scss" --fix

tests:
	yarn run jest
