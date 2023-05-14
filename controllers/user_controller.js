const User = require("../models/user");
const { randomBytes, scrypt } = require("crypto");
const { promisify } = require("util");

const _scrypt = promisify(scrypt);

exports.createUser = async (req, res) => {
    let user = req.body;
    // Hash the users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');
    // Hash the salt and the password together
    const hash = await _scrypt(user.password, salt, 32);

    // Join the hashed result and the salt together
    const hashedPassword = salt + '.' + hash.toString('hex');

    user.password = hashedPassword;

    User.create(user)
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send({ errors: err })
        })
}

exports.allUsers = async (req, res) => {
    let { page, limit } = req.query;
    limit = limit ?? 10;
    page = (page ?? 1) - 1;
    let users = await User.find().skip(page * limit).limit(limit);
    let usersCount = (await User.find()).length;
    res.setHeader("users_count", usersCount);
    res.send(users);
}

exports.allUsers = async (req, res) => {
    let { page, limit } = req.query;
    limit = limit ?? 10;
    page = (page ?? 1) - 1;
    let users = await User.find().skip(page * limit).limit(limit);
    let usersCount = (await User.find()).length;
    res.setHeader("users_count", usersCount);
    res.send(users);
}

exports.getUserById = async (req, res) => {
    try {
        let { id } = req.params;
        let users = await User.find({ "_id": id });
        if (users && users.length > 0) return res.send(users[0]);
        res.send({ 'message': "invalid user id" });
    } catch (_) {
        res.send({ 'message': "invalid user id" });

    }
}


exports.blocUserById = async (req, res) => {
    try {
        let { id } = req.params;
        let users = await User.find({ "_id": id });
        if (users && users.length > 0) {
            let user = users[0];
            user.block = true;
            user.save();
            return res.send({ "success": true, "user": user });
        }
        res.send({ 'message': "invalid user id" });
    } catch (_) {
        res.send({ 'message': "invalid user id" });

    }
}

exports.unBlocUserById = async (req, res) => {
    try {
        let { id } = req.params;
        let users = await User.find({ "_id": id });
        if (users && users.length > 0) {
            let user = users[0];
            user.block = false;
            user.save();
            return res.send({ "success": true, "user": user });
        }
        res.send({ 'message': "invalid user id" });
    } catch (_) {
        res.send({ 'message': "invalid user id" });

    }
}

exports.deleteUserById = async (req, res) => {
    try {
        let { id } = req.params;
        let users = await User.deleteOne({ "_id": id });
        if (users && users.deletedCount > 0) return res.send({ "success": true });

        res.send({ 'message': "invalid user id" });
    } catch (e) {
        console.log(e);
        res.send({ 'message': "invalid user id" });

    }
}


exports.updateUserById = async (req, res) => {
    try {
        let { id } = req.params;
        let userToUpdate = req.body;
        console.log(userToUpdate);
        let users = await User.find({ "_id": id });
        if (users && users.length > 0) {
            let user = users[0];
            if (userToUpdate.password) {
                // Generate a salt
                const salt = randomBytes(8).toString('hex');
                // Hash the salt and the password together
                const hash = await _scrypt(userToUpdate.password, salt, 32);
                // Join the hashed result and the salt together
                const hashedPassword = salt + '.' + hash.toString('hex');
                userToUpdate.password = hashedPassword;
            }

            Object.assign(user, userToUpdate);
            user.save().then(function (user) {
                res.send({ "success": true, user });
            })
                .catch(function (err) {

                    res.status(400).send(err.keyPattern.email == 1 ? {
                        "errors": [
                            {
                                "type": "field",
                                "value": err.keyValue.email,
                                "msg": `User validation failed: email: ${err.keyValue.email} is taken by another user `,
                                "path": "email",
                                "location": "body"
                            }
                        ]
                    } : err);
                });

        }
    } catch (e) {
        res.send({ 'message': "invalid user id" });
    }
}