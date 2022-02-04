test-all:
	@$(MAKE) -s clear
	yarn
	yarn ci-test
	yarn build
	yarn --cwd tests/distributables
	yarn --cwd tests/distributables test


.PHONY: clear
clear:
	rm -rf node_modules
	rm -rf tests/distributables/node_modules
