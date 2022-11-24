#!/usr/bin/env bash

yarn install --frozen-lockfile
yarn link
cd playground
yarn install --frozen-lockfile
yarn link '@aacn_org/use-friendly-captcha'
cd node_modules/react
yarn link
cd ../react-dom
yarn link
cd ..
cd ..
cd ..
yarn link 'react'
yarn link 'react-dom'
