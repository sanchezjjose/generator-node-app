#!/bin/bash

(browserify lib/index.js -s HeaderComponent | node_modules/uglify-js/bin/uglifyjs --compress --mangle > dist/js/index.bundle.js)
(browserify lib/components/main.js -s MainComponent | node_modules/uglify-js/bin/uglifyjs --compress --mangle > dist/js/main.bundle.js)
