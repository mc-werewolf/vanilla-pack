import { system } from "@minecraft/server";
import { BaseEventHandler } from "../../events/BaseEventHandler";
import { SCRIPT_EVENT_IDS, SCRIPT_EVENT_MESSAGES } from "../../../constants/scriptevent";
import { GameWorldState } from "../../SystemManager";
export class SystemScriptEventReceiveHandler extends BaseEventHandler {
    constructor(systemEventManager) {
        super(systemEventManager);
        this.systemEventManager = systemEventManager;
        this.afterEvent = system.afterEvents.scriptEventReceive;
    }
    static create(systemEventManager) {
        return new SystemScriptEventReceiveHandler(systemEventManager);
    }
    handleAfter(ev) {
        const { id, initiator, message, sourceBlock, sourceEntity, sourceType } = ev;
        switch (id) {
            case SCRIPT_EVENT_IDS.WORLD_STATE_CHANGE:
                this.handleWorldStateChange(message);
                break;
        }
    }
    handleWorldStateChange(message) {
        switch (message) {
            case SCRIPT_EVENT_MESSAGES.IN_GAME:
                this.systemEventManager.getSystemManager().changeWorldState(GameWorldState.InGame);
                break;
            case SCRIPT_EVENT_MESSAGES.OUT_GAME:
                this.systemEventManager.getSystemManager().changeWorldState(GameWorldState.OutGame);
                break;
        }
    }
}
