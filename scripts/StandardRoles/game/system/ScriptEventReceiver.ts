import { ConsoleManager } from "../../../Kairo/utils/ConsoleManager";
import type { KairoCommand } from "../../../Kairo/utils/KairoUtils";
import { SCRIPT_EVENT_COMMAND_IDS, SCRIPT_EVENT_MESSAGES } from "../../constants/scriptevent";
import { GameWorldState, type SystemManager } from "../SystemManager";

export class ScriptEventReceiver {
    private constructor(private readonly systemManager: SystemManager) {}
    public static create(systemManager: SystemManager): ScriptEventReceiver {
        return new ScriptEventReceiver(systemManager);
    }

    public handleScriptEvent(data: KairoCommand): void {
        switch (data.commandId) {
            case SCRIPT_EVENT_COMMAND_IDS.WORLD_STATE_CHANGE:
                this.handleWorldStateChange(data.worldState);
                break;
            case SCRIPT_EVENT_COMMAND_IDS.ROLE_REGISTRATION_REQUEST:
                this.systemManager.getRoleManager().sendRegistrationRoles();
            default:
                break;
        }
    }

    private handleWorldStateChange(args: string[]): void {
        const state = args[0];
        switch (state) {
            case SCRIPT_EVENT_MESSAGES.IN_GAME:
                this.systemManager.changeWorldState(GameWorldState.InGame);
                break;
            case SCRIPT_EVENT_MESSAGES.OUT_GAME:
                this.systemManager.changeWorldState(GameWorldState.OutGame);
                break;
        }
    }
}
