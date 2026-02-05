import type {
    FactionDefinition,
    RoleDefinition,
    RoleGroupDefinition,
    SettingDefinition,
} from "../@modules/game-manager/constants/types";
import type { GameEventContext } from "../@modules/game-manager/game/ingame/game/GameManager";
import type { GameEventHandlerMap } from "../@modules/game-manager/game/ingame/game/SkillManager";
import {
    registerDefinitions,
    registerPlayerData as registerPlayerDataInRegistry,
    registerRoleSkillHandlers as registerRoleSkillHandlersInRegistry,
    registerUpdateHandlers,
} from "../@modules/game-manager/game/registry";
import type { SelfPlayerData } from "../werewolf/player";

export const registerWerewolfModules = async (): Promise<void> => {
    await Promise.all([
        import("../werewolf/roles").catch(() => undefined),
        import("../werewolf/factions").catch(() => undefined),
        import("../werewolf/settings").catch(() => undefined),
        import("../werewolf/update").catch(() => undefined),
        import("../werewolf/player").catch(() => undefined),
        import("../werewolf/skills/skillHandlers").catch(() => undefined),
    ]);
    registerUpdateHandlers({});
};

export const registerRoles = (roles: RoleDefinition[]): void => {
    registerDefinitions({
        roles,
    });
};

export const registerFactions = (factions: FactionDefinition[]): void => {
    registerDefinitions({
        factions,
    });
};

export const registerRoleGroups = (roleGroups: RoleGroupDefinition[]): void => {
    registerDefinitions({
        roleGroups,
    });
};

export const registerSettings = (settings: SettingDefinition[]): void => {
    registerDefinitions({
        settings,
    });
};

export const registerPlayerData = (data: SelfPlayerData): void => {
    registerPlayerDataInRegistry(data);
};

export const registerOnTickUpdate = (handler: (ev: GameEventContext) => void): void => {
    registerUpdateHandlers({
        onTickUpdate: handler,
    });
};

export const registerOnSecondUpdate = (handler: (ev: GameEventContext) => void): void => {
    registerUpdateHandlers({
        onSecondUpdate: handler,
    });
};

export const registerRoleSkillHandlers = (handlers: Record<string, GameEventHandlerMap>): void => {
    registerRoleSkillHandlersInRegistry(handlers);
};
