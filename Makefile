
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
# Clean up
#

clean:
	@rm -rf build

.PHONY: test test-node test-browser
.PHONY: clean
