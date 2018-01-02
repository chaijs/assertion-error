
#
# Tests
# 

test: test-node test-typescript

test-node: 
	@printf "\n  ==> [Node.js]\n"
	@NODE_ENV=test node ./test/index.js

test-browser:
	@printf "\n  ==> [Browser]\n"
	@make build
	@printf "\n\n  Open 'test/index.html' in your browser to test.\n\n"

test-typescript:
	@./node_modules/.bin/tsc test/typings.ts index.d.ts --noEmit

#
# Components
# 

build: components
	@./node_modules/.bin/component-build --dev

components: component.json
	@./node_modules/.bin/component-install --dev

#
# Clean up
# 

clean: clean-components 

clean-components:
	@rm -rf build
	@rm -rf components

.PHONY: test test-node test-browser
.PHONY: clean clean-components
