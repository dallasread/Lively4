#!/usr/bin/env ruby

ARGV[0] ||= 'production'

`ember build --environment="#{ARGV[0]}"`
`cat dist/assets/lcs.js >> dist/assets/vendor.js`
`mv dist/assets/vendor.js dist/assets/lcs.js`
`rm dist/assets/vendor.css`
# `cp -rf dist/assets assets`
# `rm -rf dist`
# `mv assets dist`
