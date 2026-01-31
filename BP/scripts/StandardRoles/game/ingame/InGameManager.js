import { KairoUtils } from "../../../Kairo/utils/KairoUtils";
import { SCRIPT_EVENT_COMMAND_IDS } from "../../constants/scriptevent";
import { KAIRO_COMMAND_TARGET_ADDON_IDS } from "../../constants/systems";
import { roles } from "../../data/roles";
import { InGameEventManager } from "./events/InGameEventManager";
import { SkillManager } from "./game/SkillManager";
export var GamePhase;
(function (GamePhase) {
    GamePhase[GamePhase["Initializing"] = 0] = "Initializing";
    GamePhase[GamePhase["Preparing"] = 1] = "Preparing";
    GamePhase[GamePhase["InGame"] = 2] = "InGame";
    GamePhase[GamePhase["Result"] = 3] = "Result";
    GamePhase[GamePhase["Waiting"] = 4] = "Waiting";
})(GamePhase || (GamePhase = {}));
export class InGameManager {
    constructor(systemManager, ingameConstants) {
        this.systemManager = systemManager;
        this.ingameConstants = ingameConstants;
        this.inGameEventManager = InGameEventManager.create(this);
        this.skillManager = SkillManager.create(this, roles);
    }
    static create(systemManager, ingameConstants) {
        return new InGameManager(systemManager, ingameConstants);
    }
    getInGameEventManager() {
        return this.inGameEventManager;
    }
    async handlePlayerSkillTrigger(playerId, eventType) {
        return this.skillManager.emitPlayerEvent(playerId, eventType);
    }
    async getWerewolfGameData() {
        const kairoResponse = await KairoUtils.sendKairoCommandAndWaitResponse(KAIRO_COMMAND_TARGET_ADDON_IDS.WEREWOLF_GAMEMANAGER, SCRIPT_EVENT_COMMAND_IDS.GET_WEREWOLF_GAME_DATA, {});
        if (!kairoResponse.success)
            return null;
        return kairoResponse.data;
    }
    getRoleDefinition(roleId) {
        return roles.find((role) => role.id === roleId);
    }
    getIngameConstants() {
        return this.ingameConstants;
    }
}
