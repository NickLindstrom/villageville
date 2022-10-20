import fs from 'fs';

const DATAFILEPATH = './server/data/village.json';
const CABINNAMESFILEPATH = './server/data/cabinNames.json';

export const readFile = () => {
    try {
        return fs.readFileSync(DATAFILEPATH).toString();
    } catch (error) {
        console.log(`Could not read file${DATAFILEPATH}: ${JSON.stringify(error.message)}`);
    }
}

export const writeFile = (content) => {
    try {
        fs.writeFileSync(DATAFILEPATH, JSON.stringify(content));
    } catch (error) {
        console.log(`Could not write file: ${JSON.stringify(error)}`);
    }
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const getNewCabinName = (data) => {
    const prevNames = data.map((house) => house.name);
    try {
        const cabinNamesFile = JSON.parse(fs.readFileSync(CABINNAMESFILEPATH).toString());
        const suggestions = cabinNamesFile.map((suggestion) => suggestion.name);
        let count = 0;
        let newName = suggestions[191];
        while(prevNames.includes(`${newName} stugan`) && count < suggestions.length) {
            newName = suggestions[getRandomNumber(0, suggestions.length)];
            count++;
            console.log(count);
        }
        return `${newName} stugan`;
    } catch (error) {
        console.log(`Could not read file ${CABINNAMESFILEPATH}: ${JSON.stringify(error.message)}`);
    }
}