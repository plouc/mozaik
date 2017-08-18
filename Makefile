.DEFAULT_GOAL := help

NODE_MODULES     = "./node_modules"
NODE_MODULES_BIN = "${NODE_MODULES}/.bin"

MOZAIK_TARGET_BRANCH = "v2.x"

########################################################################################################################
#
# HELP
#
########################################################################################################################

#COLORS
RED    := $(shell tput -Txterm setaf 1)
GREEN  := $(shell tput -Txterm setaf 2)
WHITE  := $(shell tput -Txterm setaf 7)
YELLOW := $(shell tput -Txterm setaf 3)
RESET  := $(shell tput -Txterm sgr0)

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
# A category can be added with @category
HELP_HELPER = \
    %help; \
    while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-\%]+)\s*:.*\#\#(?:@([a-zA-Z\-\%]+))?\s(.*)$$/ }; \
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

########################################################################################################################
#
# GLOBAL
#
########################################################################################################################

ls: ##@global list packages & extensions
	@${NODE_MODULES_BIN}/lerna ls

########################################################################################################################
#
# PACKAGES
#
########################################################################################################################

pkg-v-%: ##@packages get current local package version (eg. pkg-v-server)
	@echo "${WHITE}@mozaik/${*} ${YELLOW}local package version:${RESET}"
	@cd "packages/${*}" && npm run -s version

pkg-pub-%: ##@packages publish a package (eg. pkg-pub-server)
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

########################################################################################################################
#
# EXTENSIONS
#
########################################################################################################################
