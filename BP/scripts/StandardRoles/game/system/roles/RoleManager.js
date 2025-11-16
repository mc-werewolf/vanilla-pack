export class RoleManager {
    constructor(systemManager) {
        this.systemManager = systemManager;
    }
    static create(systemManager) {
        return new RoleManager(systemManager);
    }
}
