require('dotenv').config()

const neo4j = require('neo4j-driver');

export function getSession() {
    const driver = neo4j.driver(
        process.env.URI,
        neo4j.auth.basic(
            process.env.USER_NAME,
            process.env.PASSWORD
        )
    );
    return driver.session({database: process.env.DATABASE})
}
