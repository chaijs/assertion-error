
TESTS = test/*.js
REPORTER = spec

#
# Tests
# 

test: test-node

test-node: 
	@printf "\n  ==> [Node.js]"
	@NODE_ENV=test node ./test/runner.js

test-cov: lib-cov
	@assertion-error_COV=1 NODE_ENV=test node ./test/runner.js

#
# Components
# 

build: components lib/*
	@./node_modules/.bin/component-build --dev

components: component.json
	@./node_modules/.bin/component-install --dev

#
# Coverage
# 

lib-cov:
	@rm -rf lib-cov
	@jscoverage lib lib-cov

#
# Clean up
# 

clean: clean-components clean-cov

clean-components:
	@rm -rf build
	@rm -rf components

clean-cov:
	@rm -rf lib-cov
	@rm -f coverage.html


.PHONY: clean clean-components clean-cov test test-cov test-node lib-cov
