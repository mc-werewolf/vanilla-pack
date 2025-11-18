import type { RawMessage } from "@minecraft/server";

export interface FactionDefinition {
    id: string;
    name: RawMessage;
    description: RawMessage;
    defaultColor: string;
    victoryCondition: {
        description: RawMessage;
    }; // あとで勝利条件をカスタム定義できるようにする
}

export const factions: FactionDefinition[] = [
    {
        id: "villager",
        name: {},
        description: {},
        defaultColor: "§a",
        victoryCondition: {
            description: {},
        },
    },
    {
        id: "werewolf",
        name: {},
        description: {},
        defaultColor: "§4",
        victoryCondition: {
            description: {},
        },
    },
];
