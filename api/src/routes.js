const fs = require("fs");

module.exports = (app, authenticate, axios) => {
  fs.readdirSync(__dirname + "/routes/").forEach(function(file) {
    const fileName = file.substr(0, file.indexOf("."));
    require("./routes/" + fileName)(app, authenticate, axios);
  });
};
