#!/bin/bash

(watchify lib/index.js -s HeaderComponent -o dist/js/index.bundle.js -dv)
(watchify lib/components/main.js -s MainComponent -o dist/js/main.bundle.js -dv)
