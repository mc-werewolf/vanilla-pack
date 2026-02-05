import { SystemManager } from "../@modules/game-manager/game/SystemManager";
import { factions } from "./factions";
import { playerData } from "./player";
import { roleGroups, roles } from "./roles";
import { settings } from "./settings";
import { onSecondUpdate, onTickUpdate } from "./update";

export const registerWerewolfModules = (): void => {
    SystemManager.getInstance().getRegistry().init({
        definitions: {
            roles,
            factions,
            roleGroups,
            settings,
        },
        playerData,
        updateHandlers: {
            onTickUpdate,
            onSecondUpdate,
        },
    });
};
