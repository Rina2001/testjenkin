"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_controller_1 = require("./base.controller");
const groupPermission_repository_1 = require("../orm/repository/groupPermission.repository");
const typeorm_1 = require("typeorm");
const passport = require("passport");
class GroupPermissionController extends base_controller_1.baseController {
    constructor() {
        super();
        this.controllerName = "/GroupPermission/";
    }
    /**
     * @method getPermissionByGroupID
     * @param app
     *
     */
    getPermissionByGroupID(app) {
        app
            .post(this.controllerName + "getPermissionByGroupID", 
        //  passport.authenticate('bearer', { session: false }),
        (req, res) => {
            let groupID = req.body.groupID;
            typeorm_1.getCustomRepository(groupPermission_repository_1.GroupPermissionRepository).getPermissionByGroupID(groupID).then(qb => { res.send(qb); });
        });
    }
    /**
     * @method addNewGroupPermission
     * @param app
     *
     */
    addNewGroupPermission(app) {
        app
            .post(this.controllerName + "addNewGroupPermission", 
        // passport.authenticate('bearer', { session: false }),
        (req, res) => {
            let groupPersmissions = req.body;
            typeorm_1.getCustomRepository(groupPermission_repository_1.GroupPermissionRepository).addNewGroupPermission(groupPersmissions).then(qb => { res.send(qb); });
        });
    }
    /**
     * @method addNewGroupPermission
     * @param app
     *
     */
    updateGroupPermission(app) {
        app
            .post(this.controllerName + "updateGroupPermission", passport.authenticate('bearer', { session: false }), (req, res) => {
            let groupPersmissions = req.body;
            typeorm_1.getCustomRepository(groupPermission_repository_1.GroupPermissionRepository).updateGroupPermission(groupPersmissions).then(qb => { res.send(qb); });
        });
    }
}
exports.GroupPermissionController = GroupPermissionController;
//# sourceMappingURL=group.permission.controller.js.map