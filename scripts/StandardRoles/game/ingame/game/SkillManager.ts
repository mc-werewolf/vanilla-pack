import { KairoUtils, type KairoResponse } from "../../../../Kairo/utils/KairoUtils";
import type { GameEventType, RoleDefinition } from "../../../data/roles";
import { roleSkillHandlers } from "../../../data/skills/skillHandlers";
import type { IngameConstants, InGameManager } from "../InGameManager";
import type { WerewolfGameData } from "./WerewolfGameData";

export type RoleSkillHandler = (
    playerId: string,
    werewolfGameData: WerewolfGameData,
    ingameConstants: IngameConstants,
) => Promise<boolean> | boolean;

export type GameEventHandlerMap = Partial<Record<string, RoleSkillHandler>>;

export class SkillManager {
    private readonly handlersByRoleId = new Map<string, Map<string, RoleSkillHandler>>();

    private constructor(
        private readonly inGameManager: InGameManager,
        roles: readonly RoleDefinition[],
    ) {
        for (const role of roles) {
            const skillHandlers = roleSkillHandlers[role.id];
            if (!skillHandlers) continue;

            const map = new Map<string, RoleSkillHandler>();

            for (const [skillId, handler] of Object.entries(skillHandlers)) {
                if (!handler) continue;
                map.set(skillId, handler);
            }

            this.handlersByRoleId.set(role.id, map);
        }
    }

    public static create(
        inGameManager: InGameManager,
        roles: readonly RoleDefinition[],
    ): SkillManager {
        return new SkillManager(inGameManager, roles);
    }

    public async emitPlayerEvent(
        playerId: string,
        eventType: GameEventType,
    ): Promise<KairoResponse> {
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
            return KairoUtils.buildKairoResponse(
                { success: false },
                false,
                "No skill bound to this event",
            );
        }

        const handlerMap = this.handlersByRoleId.get(playerData.role.id);
        if (!handlerMap) {
            return KairoUtils.buildKairoResponse(
                { success: false },
                false,
                "No handlers for this role",
            );
        }

        const handler = handlerMap.get(binding.skillId);
        if (!handler) {
            return KairoUtils.buildKairoResponse(
                { success: false },
                false,
                `No handler for skill: ${binding.skillId}`,
            );
        }

        const success = await handler(
            playerId,
            werewolfGameData,
            this.inGameManager.getIngameConstants(),
        );

        return KairoUtils.buildKairoResponse({ success });
    }
}
