.PHONY: help ls \
    website

NODE_MODULES     = "./node_modules"
NODE_MODULES_BIN = "${NODE_MODULES}/.bin"

MOZAIK_TARGET_BRANCH = "v2.x"

########################################################################################################################
#
# HELP
#
########################################################################################################################

# COLORS
RED    = $(shell printf "\33[31m")
GREEN  = $(shell printf "\33[32m")
WHITE  = $(shell printf "\33[37m")
YELLOW = $(shell printf "\33[33m")
RESET  = $(shell printf "\33[0m")

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
# A category can be added with @category
HELP_HELPER = \
    %help; \
    while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-\%]+)\s*:.*\#\#(?:@([0-9]+\s[a-zA-Z\-\%_]+))?\s(.*)$$/ }; \
    print "usage: make [target]\n\n"; \
    for (sort keys %help) { \
    print "${WHITE}$$_:${RESET}\n"; \
    for (@{$$help{$$_}}) { \
    $$sep = " " x (32 - length $$_->[0]); \
    print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
    }; \
    print "\n"; }

help: ##prints help
	@perl -e '$(HELP_HELPER)' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

########################################################################################################################
#
# GLOBAL
#
########################################################################################################################

bootstrap: ##@0 global lerna bootstrap
	@${NODE_MODULES_BIN}/lerna bootstrap

fmt: ##@0 global format code using prettier (js, css, md)
	@${NODE_MODULES_BIN}/prettier --color --write \
		"packages/**/*.js" \
		"packages/*/README.md" \
		"examples/**/*.js" \
		"README.md"

fmt-check: ##@0 global check if files were all formatted using prettier
	@echo "${YELLOW}Checking formatting${RESET}"
	@${NODE_MODULES_BIN}/prettier --color --list-different \
        "packages/**/*.js" \
        "packages/*/README.md" \
        "examples/**/*.js" \
        "README.md"

ls: ##@0 global list packages & extensions
	@echo "${YELLOW}Available packages & extensions:${RESET}"
	@${NODE_MODULES_BIN}/lerna ls

########################################################################################################################
#
# PACKAGES
#
########################################################################################################################

pkg-build-%: ##@1 packages build a specific package
	@echo "${YELLOW}Building: ${WHITE}@mozaik/${*}${RESET}"
	@cd "packages/${*}" && yarn run build

pkg-v-%: ##@1 packages get current local package version (eg. pkg-v-server)
	@echo "${WHITE}@mozaik/${*} ${YELLOW}local package version:${RESET}"
	@cd "packages/${*}" && npm run -s version

pkg-pub-%: ##@1 packages publish a package (eg. pkg-pub-server)
	@if [ -z "${V}" ]; then \
		echo "${RED}version 'V' is not defined${RESET}"; \
		exit 1; \
	fi;
	@echo "${YELLOW}Publishing ${WHITE}@mozaik/${*}@${V}${YELLOW} from ${WHITE}@mozaik/${*}@$$(cd "packages/${*}" && npm run -s version)${RESET}"
	@cd packages/${*} && npm version "${V}"
	@git add packages/${*}/package.json
	@git commit -m "bump(@mozaik/${*}): bump @mozaik/${*} to version ${V}"
	@cd packages/${*} && npm publish --access public
	@git tag -a "@mozaik/${*}@${V}" -m "@mozaik/${*} v${V}"
	@git push --tags -u origin "${MOZAIK_TARGET_BRANCH}"
	@echo "${GREEN}Published @mozaik/${*}@${V}${RESET}"

pkg-lint-%: ##@1 packages run eslint on a specific package
	@echo "${YELLOW}Running eslint on package ${WHITE}@nivo/${*}${RESET}"
	@${NODE_MODULES_BIN}/eslint \
	    ./packages/${*}/{src,test}
	@echo "${GREEN}✔ Well done!${RESET}"

pkgs-lint: ##@1 packages run eslint on all packages
	@echo "${YELLOW}Running eslint on all packages${RESET}"
	@${NODE_MODULES_BIN}/eslint \
        ./packages/*/{src,test}
	@echo "${GREEN}✔ Well done!${RESET}"

pkg-test-%: ##@1 packages run tests for a specific package
	@${NODE_MODULES_BIN}/jest \
	    --setupTestFrameworkScriptFile=raf/polyfill
	    ./packages/ui/test

########################################################################################################################
#
# EXAMPLES
#
########################################################################################################################

example-install-%: ##@2 examples install dependencies for a specific example
	@echo "${YELLOW}Installing ${*} example dependencies${RESET}"
	@cd "examples/${*}" && yarn install

example-start-%: ##@2 examples start a specific example
	@echo "${YELLOW}Starting ${*} example${RESET}"
	@cd "examples/${*}" && yarn start

########################################################################################################################
#
# WEBSITE
#
########################################################################################################################

website: ##@3 website start mozaik website in dev mode
	@echo "${YELLOW}Starting mozaik website in dev mode${RESET}"
	@cd website && "${NODE_MODULES_BIN}/gatsby" develop

website-build: ##@3 website build mozaik website
	@echo "${YELLOW}Building mozaik website${RESET}"
	@cd website && "${NODE_MODULES_BIN}/gatsby" build

website-serve: website-build ##@3 website build & serve mozaik website
	@echo "${YELLOW}Serving mozaik website${RESET}"
	@cd website && "${NODE_MODULES_BIN}/gatsby" serve
