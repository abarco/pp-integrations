"use strict";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // used to clear self signed cert problems.
const express = require('express');
const server = require('./server');

const PORT = 8000;

express().use('/', server()).listen(PORT, function () {
    console.log(`server started at http://localhost:${PORT}`);
});