#!/bin/bash

(watchify lib/components/dashboard/overview.js -o public/javascripts/overview.bundle.js -dv) &
(watchify lib/securityGroups.js -s SecurityGroupsComponent -o public/javascripts/securityGroups.bundle.js -dv) &
(watchify lib/tags.js -s TagsComponent -o public/javascripts/tags.bundle.js -dv)
