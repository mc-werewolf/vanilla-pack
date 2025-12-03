import type { RawMessage } from "@minecraft/server";
import { WEREWOLF_STANDARDROLES_TRANSLATE_IDS } from "../constants/translate";

export interface FactionDefinition {
    id: string;
    name: RawMessage;
    description: RawMessage;
    defaultColor: string;
    victoryCondition: {
        description: RawMessage;
    }; // あとで勝利条件をカスタム定義できるようにする
    sortIndex: number;
}

export const factions: FactionDefinition[] = [
    {
        id: "villager",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.FACTION_NAME_VILLAGER },
        description: {
            translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.FACTION_DESCRIPTION_VILLAGER,
        },
        defaultColor: "§a",
        victoryCondition: {
            description: {},
        },
        sortIndex: 100,
    },
    {
        id: "werewolf",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.FACTION_NAME_WEREWOLF },
        description: {
            translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.FACTION_DESCRIPTION_WEREWOLF,
        },
        defaultColor: "§4",
        victoryCondition: {
            description: {},
        },
        sortIndex: 200,
    },
];
