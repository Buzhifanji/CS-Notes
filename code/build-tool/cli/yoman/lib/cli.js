#!/usr/bin/env node
'use strict';
const meow = require('meow');
const yoman = require('./');

const cli = meow(`
Usage
  $ yoman [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ yoman
  unicorns
  $ yoman rainbows
  unicorns & rainbows
`);
