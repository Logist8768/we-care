const Bus = require("../models/bus");


exports.createBus = async (req, res) => {
    let bus = req.body;


    Bus.create(bus)
        .then((bus) => {
            res.send(bus)
        })
        .catch((err) => {
            res.send({ errors: err })
        })
}

exports.allBuss = async (req, res) => {
    let { page, limit } = req.query;
    limit = limit ?? 10;
    page = (page ?? 1) - 1;
    let buses = await Bus.find().skip(page * limit).limit(limit).populate({ path: "users", select: { "password": 0 } });
    let busesCount = (await Bus.find()).length;
    res.setHeader("buses_count", busesCount);
    res.send(buses);
}


exports.getBusById = async (req, res) => {
    try {
        let { id } = req.params;
        let bus = await Bus.findOne({ "_id": id }).populate({ path: "users", select: { "password": 0 } });
        if (bus) return res.send(bus);
        res.send({ 'message': "invalid bus id" });
    } catch (_) {
        res.send({ 'message': "invalid bus id" });

    }
}


exports.deleteBusById = async (req, res) => {
    try {
        let { id } = req.params;
        let buses = await Bus.deleteOne({ "_id": id });
        if (buses && buses.deletedCount > 0) return res.send({ "success": true });

        res.send({ 'message': "invalid bus id" });
    } catch (e) {
        res.send({ 'message': "invalid bus id" });

    }
}


exports.updateBusById = async (req, res) => {
    try {
        let { id } = req.params;
        let busToUpdate = req.body;
        let buses = await Bus.find({ "_id": id });
        if (buses && buses.length > 0) {
            let bus = buses[0];
            Object.assign(bus, busToUpdate);
            bus.save().then(function (bus) {
                res.send({ "success": true, bus });
            })
                .catch(function (err) {

                    res.status(400).send(err.keyPattern.bus_number == 1 ? {
                        "errors": [
                            {
                                "type": "field",
                                "value": err.keyValue.bus_number,
                                "msg": `Bus validation failed: bus_number: ${err.keyValue.bus_number} is taken by another bus `,
                                "path": "bus_number",
                                "location": "body"
                            }
                        ]
                    } : err);
                });
        }
    } catch (e) {
        res.send({ 'message': "invalid bus id" });
    }
}