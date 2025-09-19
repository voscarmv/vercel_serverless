#!/bin/bash

npm install knex -g
knex init
export NODE_ENV=production ; knex migrate:make mig1