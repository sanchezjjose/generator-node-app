#!/bin/bash

(browserify lib/components/dashboard/overview.js | node_modules/uglify-js/bin/uglifyjs --compress --mangle --screw-ie8 > public/javascripts/overview.bundle.js)
(browserify lib/securityGroups.js -s SecurityGroupsComponent | node_modules/uglify-js/bin/uglifyjs --compress --mangle > public/javascripts/securityGroups.bundle.js)
(browserify lib/tags.js -s TagsComponent | node_modules/uglify-js/bin/uglifyjs --compress --mangle > public/javascripts/tags.bundle.js)
