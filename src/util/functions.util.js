const fs = require('fs');

function appendingData(position, file_path, new_text) {
    fs.readFile(file_path, (err, data) => {
    if (err) {
        throw err;
    }
    var file_content = data.toString();
    file_content = file_content.substring(position);
    var file = fs.openSync(file_path,'r+');
    var bufferedText = new Buffer(new_text+file_content);
    fs.writeSync(file, bufferedText, 0, bufferedText.length, position);
    fs.close(file, (err) => {
        if (err) {
            throw err;
        }
    });
});
}

const functionsUtil = {
    appendingData: appendingData
}

module.exports = functionsUtil;