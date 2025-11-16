import { OutGameEventManager } from "./events/OutGameEventManager";
export class OutGameManager {
    constructor(systemManager) {
        this.systemManager = systemManager;
        this.outGameEventManager = OutGameEventManager.create(this);
    }
    static create(systemManager) {
        return new OutGameManager(systemManager);
    }
    getOutGameEventManager() {
        return this.outGameEventManager;
    }
}
