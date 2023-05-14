const { promisify } = require("util");
const User = require("../models/user");

const { scrypt } = require("crypto");
const apiError = require("../utils/apiError");
const { createToken } = require("../utils/generateToken");

const _scrypt = promisify(scrypt);



// @desc Login
exports.login = async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ 'message': "invalid Email" });
    if (user.block) return res.status(403).send({ 'message': "Your Account has been disabled" });

    const [salt, storedHash] = user.password.split('.');
    const hash = await _scrypt(req.body.password, salt, 32);

    if (storedHash !== hash.toString('hex')) return res.status(400).send({ 'message': "invalid password" });

    // const jwt = await this.jwtService.signAsync({ userId: existingUser._id });
    // user.jwt = jwt;
    //  Create Token
    const token = createToken(user._id);

    //  Delete password from response
    delete user._doc.password;
    //  Send response to client side
    res.status(200).json({ user, token });
}
