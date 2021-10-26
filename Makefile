.PHONY: install, analyse, fix

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

