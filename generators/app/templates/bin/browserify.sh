#!/bin/bash

(browserify lib/index.js -s HelloWorldComponent | node_modules/uglify-js/bin/uglifyjs --compress --mangle > dist/js/index.bundle.js)
