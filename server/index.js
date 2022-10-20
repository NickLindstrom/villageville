import express from 'express';

import { readFile, writeFile, getNewCabinName } from './utils/fileHandler.js';
import { validateBookingDate } from './utils/validate.js';

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json())

app.get('/getData', async (req, res) => {
    res.send({ data: await JSON.parse(readFile()) });
});

app.post('/addNewBooking', async (req, res) => {
    const { name, pos, allDates } = req.body;
    const data = await JSON.parse(readFile());
    const house = data.find((tile) => tile.pos.x == pos.x && tile.pos.y == pos.y);
    if(validateBookingDate(house, allDates)) {
        house.occupied.push({
            by: name,
            dates: allDates
        });
        writeFile(data);
        res.send({ sucess: true, data: data });
    } else 
        res.send({sucess: false, message: 'Inte ett tillgängligt datum'});
})

// Bonus-funktion som gjordes utöver estimerad tid
app.post('/draw', async (req, res) => {
    const { id, type } = req.body;
    let data = await JSON.parse(readFile());
    const occupiedTile = data.find((tile) => tile.pos.x == id.split('-')[0] && tile.pos.y == id.split('-')[1]);
    if (!type) return
    if (occupiedTile) {
        if (type === 'remove') {
            data = data.filter((tile) => tile.pos.x != id.split('-')[0] || tile.pos.y != id.split('-')[1]);
        } else {
            data = data.map((tile) => {
                if (tile.pos.x == id.split('-')[0] && tile.pos.y == id.split('-')[1]) tile.type = type;
                return tile;
            });
        }
    } else if(type !== 'remove') {
        data.push({
            "type": type,
            "name": type === 'house' ? getNewCabinName(data) : '',
            "pos": {
                "x": parseInt(id.split('-')[0]),
                "y": parseInt(id.split('-')[1])
            },
            "occupied": []
        })
    }
    writeFile(data);
    res.send({ data: data });
});


