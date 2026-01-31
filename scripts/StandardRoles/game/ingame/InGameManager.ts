import { KairoUtils, type KairoResponse } from "../../../Kairo/utils/KairoUtils";
import { SCRIPT_EVENT_COMMAND_IDS } from "../../constants/scriptevent";
import { KAIRO_COMMAND_TARGET_ADDON_IDS } from "../../constants/systems";
import { roles, type GameEventType, type RoleDefinition } from "../../data/roles";
import type { SystemManager } from "../SystemManager";
import { InGameEventManager } from "./events/InGameEventManager";
import type { WerewolfGameData } from "./game/WerewolfGameData";
import { SkillManager } from "./game/SkillManager";
import type { FactionDefinition } from "../../data/factions";

export enum GamePhase {
    Initializing,
    Preparing,
    InGame,
    Result,
    Waiting,
}

export interface PlayerDataDTO {
    playerId: string;
    name: string;
    isAlive: boolean;
    isVictory: boolean;
    role: RoleDefinition | null;
}

export type IngameConstants = {
    roleDefinitions: Record<string, RoleDefinition[]>;
    factionDefinitions: Record<string, FactionDefinition[]>;
};

export class InGameManager {
    private readonly inGameEventManager: InGameEventManager;
    private readonly skillManager: SkillManager;

    private constructor(
        private readonly systemManager: SystemManager,
        private readonly ingameConstants: IngameConstants,
    ) {
        this.inGameEventManager = InGameEventManager.create(this);
        this.skillManager = SkillManager.create(this, roles);
    }

    public static create(
        systemManager: SystemManager,
        ingameConstants: IngameConstants,
    ): InGameManager {
        return new InGameManager(systemManager, ingameConstants);
    }

    public getInGameEventManager(): InGameEventManager {
        return this.inGameEventManager;
    }

    public async handlePlayerSkillTrigger(
        playerId: string,
        eventType: GameEventType,
    ): Promise<KairoResponse> {
        return this.skillManager.emitPlayerEvent(playerId, eventType);
    }

    public async getWerewolfGameData(): Promise<WerewolfGameData | null> {
        const kairoResponse = await KairoUtils.sendKairoCommandAndWaitResponse(
            KAIRO_COMMAND_TARGET_ADDON_IDS.WEREWOLF_GAMEMANAGER,
            SCRIPT_EVENT_COMMAND_IDS.GET_WEREWOLF_GAME_DATA,
            {},
        );

        if (!kairoResponse.success) return null;
        return kairoResponse.data as WerewolfGameData;
    }

    public getRoleDefinition(roleId: string): RoleDefinition | undefined {
        return roles.find((role) => role.id === roleId);
    }

    public getIngameConstants(): IngameConstants {
        return this.ingameConstants;
    }
}
