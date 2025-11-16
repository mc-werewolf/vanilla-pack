import { system } from "@minecraft/server";
import { BaseEventHandler } from "../../events/BaseEventHandler";
export class OutGameScriptEventReceiveHandler extends BaseEventHandler {
    constructor(outGameEventManager) {
        super(outGameEventManager);
        this.outGameEventManager = outGameEventManager;
        this.afterEvent = system.afterEvents.scriptEventReceive;
    }
    static create(outGameEventManager) {
        return new OutGameScriptEventReceiveHandler(outGameEventManager);
    }
    handleAfter(ev) {
        const { id, initiator, message, sourceBlock, sourceEntity, sourceType } = ev;
    }
}
