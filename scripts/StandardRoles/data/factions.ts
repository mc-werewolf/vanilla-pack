import type { RawMessage } from "@minecraft/server";
import { WEREWOLF_STANDARDROLES_TRANSLATE_IDS } from "../constants/translate";

export const factions: FactionDefinition[] = [
    {
        id: "villager",
        defaultRoleId: "villager",
        type: "standard",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.FACTION_NAME_VILLAGER },
        description: {
            translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.FACTION_DESCRIPTION_VILLAGER,
        },
        defaultColor: "§a",
        victoryCondition: {
            priority: 9000,
            condition: {
                type: "standardFactionVictory",
            },
            description: {
                translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.FACTION_VICTORYCONDITION_VILLAGER,
            },
            presentation: {
                title: {
                    translate:
                        WEREWOLF_STANDARDROLES_TRANSLATE_IDS.WEREWOLF_GAME_RESULT_VILLAGER_FACTION_VICTORY_TITLE,
                },
                message: {
                    translate:
                        WEREWOLF_STANDARDROLES_TRANSLATE_IDS.WEREWOLF_GAME_RESULT_VILLAGER_FACTION_VICTORY_MESSAGE,
                },
            },
        },
        sortIndex: 100,
    },
    {
        id: "werewolf",
        defaultRoleId: "werewolf",
        type: "standard",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.FACTION_NAME_WEREWOLF },
        description: {
            translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.FACTION_DESCRIPTION_WEREWOLF,
        },
        defaultColor: "§4",
        victoryCondition: {
            priority: 8000,
            condition: {
                type: "standardFactionVictory",
            },
            description: {
                translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.FACTION_VICTORYCONDITION_WEREWOLF,
            },
            presentation: {
                title: {
                    translate:
                        WEREWOLF_STANDARDROLES_TRANSLATE_IDS.WEREWOLF_GAME_RESULT_WEREWOLF_FACTION_VICTORY_TITLE,
                },
                message: {
                    translate:
                        WEREWOLF_STANDARDROLES_TRANSLATE_IDS.WEREWOLF_GAME_RESULT_WEREWOLF_FACTION_VICTORY_MESSAGE,
                },
            },
        },
        sortIndex: 200,
    },
];

export interface FactionDefinition {
    id: string;
    defaultRoleId: string;
    type: FactionCategory;
    name: RawMessage;
    description: RawMessage;
    defaultColor: string;
    victoryCondition: VictoryCondition;
    sortIndex: number;
}

export type FactionCategory = "standard" | "independent" | "neutral";

interface VictoryCondition {
    priority: number;
    condition: Condition;
    description: RawMessage;
    presentation: {
        title: RawMessage;
        message: RawMessage;
    };
}

interface GameOutcomeRule {
    id: string;
    priority: number;
    condition: Condition;
    outcome: GameOutcome;
    presentation: {
        title: RawMessage;
        message: RawMessage;
    };
}

type GameVariableKey = "remainingTime" | "alivePlayerCount";

type NumericValue = number | GameVariableKey | { factionAliveCount: string };

type Condition =
    | StandardFactionVictoryCondition
    | ComparisonCondition
    | FactionAliveCountComparison
    | PlayerAliveCountComparison
    | RemainingTimeComparison
    | AndCondition
    | OrCondition
    | NotCondition;

export interface StandardFactionVictoryCondition {
    type: "standardFactionVictory";
}

interface ComparisonCondition {
    type: "comparison";
    operator: "==" | "!=" | "<" | "<=" | ">" | ">=";
    left: NumericValue;
    right: NumericValue;
}

interface FactionAliveCountComparison {
    type: "factionAliveCount";
    factionId: string;
    operator: "==" | "!=" | "<" | "<=" | ">" | ">=";
    value: NumericValue;
}

interface PlayerAliveCountComparison {
    type: "playerAliveCount";
    operator: "==" | "!=" | "<" | "<=" | ">" | ">=";
    value: NumericValue;
}

interface RemainingTimeComparison {
    type: "remainingTime";
    operator: "==" | "!=" | "<" | "<=" | ">" | ">=";
    value: NumericValue;
}

interface AndCondition {
    type: "and";
    conditions: Condition[];
}

interface OrCondition {
    type: "or";
    conditions: Condition[];
}

interface NotCondition {
    type: "not";
    condition: Condition;
}

type GameOutcome =
    | { type: "victory"; factionId: string }
    | { type: "draw"; reason: string }
    | { type: "end"; reason: string };
