import { InGameEventManager } from "./events/InGameEventManager";
export var GamePhase;
(function (GamePhase) {
    GamePhase[GamePhase["Initializing"] = 0] = "Initializing";
    GamePhase[GamePhase["Preparing"] = 1] = "Preparing";
    GamePhase[GamePhase["InGame"] = 2] = "InGame";
    GamePhase[GamePhase["Result"] = 3] = "Result";
    GamePhase[GamePhase["Waiting"] = 4] = "Waiting";
})(GamePhase || (GamePhase = {}));
export class InGameManager {
    constructor(systemManager) {
        this.systemManager = systemManager;
        this.inGameEventManager = InGameEventManager.create(this);
    }
    static create(systemManager) {
        return new InGameManager(systemManager);
    }
    getInGameEventManager() {
        return this.inGameEventManager;
    }
}
