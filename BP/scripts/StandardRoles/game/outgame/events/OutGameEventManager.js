import { BaseEventManager } from "../../events/BaseEventManager";
import { OutGameScriptEventReceiveHandler } from "./SciprtEventReceive";
export class OutGameEventManager extends BaseEventManager {
    constructor(outGameManager) {
        super();
        this.outGameManager = outGameManager;
        this.scriptEventReceive = OutGameScriptEventReceiveHandler.create(this);
    }
    static create(outGameManager) {
        return new OutGameEventManager(outGameManager);
    }
    subscribeAll() {
        this.scriptEventReceive.subscribe();
    }
    unsubscribeAll() {
        this.scriptEventReceive.unsubscribe();
    }
    getOutGameManager() {
        return this.outGameManager;
    }
}
