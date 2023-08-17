const db = require("../db");
const { Admin } = require("../models");

const main = async () => {

    const adminUser = new Admin({
        email: 'anighttoforgetdc@gmail.com',
        password: 'Peopleweknew'
    })
    await adminUser.save()
}

const run = async () => {
    await main();
    await db.close();
}

run()