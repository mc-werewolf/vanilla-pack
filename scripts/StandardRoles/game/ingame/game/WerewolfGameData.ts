import type { RoleDefinition } from "../../../data/roles";

export type WerewolfGameData = {
    remainingTicks: number;
    playersData: PlayerData[];
};

export type PlayerData = {
    player: {
        id: string;
        name: string;
    };
    role: RoleDefinition | null;
    isAlive: boolean;
    isVictory: boolean;
};
