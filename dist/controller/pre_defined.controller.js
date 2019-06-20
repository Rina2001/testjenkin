"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("./base.controller");
const preDefined_repository_1 = require("../orm/repository/preDefined.repository");
const typeorm_1 = require("typeorm");
const passport = require("passport");
/**
 * @Controller
 */
class PreDefinedFieldController extends base_controller_1.baseController {
    constructor() {
        super();
        this.controllerName = "/PreDefinedField/";
    }
    /**
   * @method getListPreDefinedsByCriterial
   * @param app
   */
    getPreDefinedsByCriterial(app) {
        app
            .post(this.controllerName + "getPreDefinedsByCriterial", passport.authenticate('bearer', { session: false }), (req, res) => {
            let criterial = req.body.criterial;
            typeorm_1.getCustomRepository(preDefined_repository_1.PreDefinedFieldRepository).getPreDefinedsByCriterial(criterial).then(qb => { res.send(qb); });
        });
    }
    /**
       * @method addPreData
       * @param app
       */
    addPreData(app) {
        app
            .post(this.controllerName + "addPreData", 
        // passport.authenticate('bearer', { session: false }),
        (req, res) => {
            let criterial = req.body;
            typeorm_1.getCustomRepository(preDefined_repository_1.PreDefinedFieldRepository).addPreData(criterial).then(qb => { res.send(qb); });
        });
    }
}
exports.PreDefinedFieldController = PreDefinedFieldController;
//# sourceMappingURL=pre_defined.controller.js.map