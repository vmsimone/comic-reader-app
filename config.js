'use strict';

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-comic-reader-app';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/comic-reader-app';
exports.PORT = process.env.PORT || 8080;
