#!/bin/bash

(watchify lib/index.js -s HelloWorldComponent -o dist/js/index.bundle.js -dv)
