const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        //console.log(req.params.devId);
        //console.log(req.headers.user);

        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);

        try {
            const targetDev = await Dev.findById(devId);

            if (!targetDev) {
                return res.status(400).json({ error: 'Dev not exists' });
            }

            if (loggedDev.dislikes.includes(targetDev._id) == false) {
                loggedDev.dislikes.push(targetDev._id);

                await loggedDev.save();
            }
        }
        catch
        {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        //httpCode: 400 - usuário informou alguma coisa errada (badRequest)
        //push - serve para adicionar informação nova dentro do array

        return res.json(loggedDev);
    }
}
