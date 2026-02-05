import type {
    FactionDefinition,
    RoleDefinition,
    RoleGroupDefinition,
    SettingDefinition,
} from "../@modules/game-manager/constants/types";
import type { GameEventContext } from "../@modules/game-manager/game/ingame/game/GameManager";
import type { GameEventHandlerMap } from "../@modules/game-manager/game/ingame/game/SkillManager";
import { SystemManager } from "../@modules/game-manager/game/SystemManager";
import type { SelfPlayerData } from "../werewolf/player";

export const initializeRuntimeRegistry = (): void => {
    SystemManager.getInstance().getRegistry().init({});
};

export const registerRuntimeRoleDefinitions = (roles: RoleDefinition[]): void => {
    SystemManager.getInstance().getRegistry().registerDefinitions({
        roles,
    });
};

export const registerRuntimeFactionDefinitions = (factions: FactionDefinition[]): void => {
    SystemManager.getInstance().getRegistry().registerDefinitions({
        factions,
    });
};

export const registerRuntimeRoleGroupDefinitions = (roleGroups: RoleGroupDefinition[]): void => {
    SystemManager.getInstance().getRegistry().registerDefinitions({
        roleGroups,
    });
};

export const registerRuntimeSettingDefinitions = (settings: SettingDefinition[]): void => {
    SystemManager.getInstance().getRegistry().registerDefinitions({
        settings,
    });
};

export const registerRuntimePlayerDefaults = (data: SelfPlayerData): void => {
    SystemManager.getInstance().getRegistry().registerPlayerData(data);
};

export const registerRuntimeTickUpdateHandler = (handler: (ev: GameEventContext) => void): void => {
    const registry = SystemManager.getInstance().getRegistry();
    const currentHandlers = registry.getUpdateHandlers() ?? {};
    registry.registerUpdateHandlers({
        ...currentHandlers,
        onTickUpdate: handler,
    });
};

export const registerRuntimeSecondUpdateHandler = (handler: (ev: GameEventContext) => void): void => {
    const registry = SystemManager.getInstance().getRegistry();
    const currentHandlers = registry.getUpdateHandlers() ?? {};
    registry.registerUpdateHandlers({
        ...currentHandlers,
        onSecondUpdate: handler,
    });
};

export const registerRuntimeRoleSkillHandlerMap = (
    handlers: Record<string, GameEventHandlerMap>,
): void => {
    SystemManager.getInstance().getRegistry().registerRoleSkillHandlers(handlers);
};
