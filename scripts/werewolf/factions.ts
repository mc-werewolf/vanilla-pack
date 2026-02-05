import type { FactionDefinition } from "../@modules/game-manager/constants/types";
import { registerFactions } from "../internal/registerBridge";
import { WEREWOLF_VANILLAPACK_TRANSLATE_IDS } from "./constants/translate";

export const factions: FactionDefinition[] = [
    {
        id: "villager",
        defaultRoleId: "villager",
        type: "standard",
        name: { translate: WEREWOLF_VANILLAPACK_TRANSLATE_IDS.FACTION_NAME_VILLAGER },
        description: {
            translate: WEREWOLF_VANILLAPACK_TRANSLATE_IDS.FACTION_DESCRIPTION_VILLAGER,
        },
        defaultColor: "§a",
        victoryCondition: {
            priority: 9000,
            condition: {
                type: "standardFactionVictory",
            },
            description: {
                translate: WEREWOLF_VANILLAPACK_TRANSLATE_IDS.FACTION_VICTORYCONDITION_VILLAGER,
            },
            presentation: {
                title: {
                    translate:
                        WEREWOLF_VANILLAPACK_TRANSLATE_IDS.WEREWOLF_GAME_RESULT_VILLAGER_FACTION_VICTORY_TITLE,
                },
                message: {
                    translate:
                        WEREWOLF_VANILLAPACK_TRANSLATE_IDS.WEREWOLF_GAME_RESULT_VILLAGER_FACTION_VICTORY_MESSAGE,
                },
            },
        },
        sortIndex: 100,
    },
    {
        id: "werewolf",
        defaultRoleId: "werewolf",
        type: "standard",
        name: { translate: WEREWOLF_VANILLAPACK_TRANSLATE_IDS.FACTION_NAME_WEREWOLF },
        description: {
            translate: WEREWOLF_VANILLAPACK_TRANSLATE_IDS.FACTION_DESCRIPTION_WEREWOLF,
        },
        defaultColor: "§4",
        victoryCondition: {
            priority: 8000,
            condition: {
                type: "standardFactionVictory",
            },
            description: {
                translate: WEREWOLF_VANILLAPACK_TRANSLATE_IDS.FACTION_VICTORYCONDITION_WEREWOLF,
            },
            presentation: {
                title: {
                    translate:
                        WEREWOLF_VANILLAPACK_TRANSLATE_IDS.WEREWOLF_GAME_RESULT_WEREWOLF_FACTION_VICTORY_TITLE,
                },
                message: {
                    translate:
                        WEREWOLF_VANILLAPACK_TRANSLATE_IDS.WEREWOLF_GAME_RESULT_WEREWOLF_FACTION_VICTORY_MESSAGE,
                },
            },
        },
        sortIndex: 200,
    },
];

registerFactions(factions);
