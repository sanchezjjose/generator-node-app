#!/bin/bash

(watchify lib/index.js -s HelloWorldComponent -o public/javascripts/index.bundle.js -dv)
