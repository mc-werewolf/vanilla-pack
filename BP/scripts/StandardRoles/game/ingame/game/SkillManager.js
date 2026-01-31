import { KairoUtils } from "../../../../Kairo/utils/KairoUtils";
import { roleSkillHandlers } from "../../../data/skills/skillHandlers";
export class SkillManager {
    constructor(inGameManager, roles) {
        this.inGameManager = inGameManager;
        this.handlersByRoleId = new Map();
        for (const role of roles) {
            const skillHandlers = roleSkillHandlers[role.id];
            if (!skillHandlers)
                continue;
            const map = new Map();
            for (const [skillId, handler] of Object.entries(skillHandlers)) {
                if (!handler)
                    continue;
                map.set(skillId, handler);
            }
            this.handlersByRoleId.set(role.id, map);
        }
    }
    static create(inGameManager, roles) {
        return new SkillManager(inGameManager, roles);
    }
    async emitPlayerEvent(playerId, eventType) {
        const werewolfGameData = await this.inGameManager.getWerewolfGameData();
        if (!werewolfGameData) {
            return KairoUtils.buildKairoResponse({}, false, "No game data");
        }
        const playerData = werewolfGameData.playersData.find((pd) => pd.player.id === playerId);
        if (!playerData?.role) {
            return KairoUtils.buildKairoResponse({}, false, "Player has no role");
        }
        const binding = playerData.role.handleGameEvents?.[eventType];
        if (!binding) {
            return KairoUtils.buildKairoResponse({ success: false }, false, "No skill bound to this event");
        }
        const handlerMap = this.handlersByRoleId.get(playerData.role.id);
        if (!handlerMap) {
            return KairoUtils.buildKairoResponse({ success: false }, false, "No handlers for this role");
        }
        const handler = handlerMap.get(binding.skillId);
        if (!handler) {
            return KairoUtils.buildKairoResponse({ success: false }, false, `No handler for skill: ${binding.skillId}`);
        }
        const success = await handler(playerId, werewolfGameData, this.inGameManager.getIngameConstants());
        return KairoUtils.buildKairoResponse({ success });
    }
}
