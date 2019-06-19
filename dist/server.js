"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./app");
const PORT = 8081;
app_1.default.listen(PORT, () => {
    console.log('Server start listening on port ' + PORT);
});
//# sourceMappingURL=server.js.map