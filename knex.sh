#!/bin/bash

npm install knex -g
cd api
knex init
export NODE_ENV=production ; knex migrate:make mig1