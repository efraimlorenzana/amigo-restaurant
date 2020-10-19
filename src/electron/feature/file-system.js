const fs = require('fs');
const path = require('path');

const getFile = (fileName, defData) => {
    let fileData;
    const filePath = path.join(__dirname, fileName);

    try {
        fileData = fs.readFileSync(filePath, { encoding: 'utf8' });
    } catch {
        fs.writeFileSync(filePath, JSON.stringify(defData), function (err) {
            if (err) throw err;
            fileData = getFile(fileName)
        });
    }

    return fileData === undefined ? defData : JSON.parse(fileData);
}

const updateFile = (fileName, data) => {
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data), function (err) {
        if (err) throw err;
    });
}

module.exports = {
    getFile,
    updateFile
}