import { world } from "@minecraft/server";
import type { GameEventContext } from "../game/ingame/game/GameManager";
import { MinecraftEffectTypes } from "@minecraft/vanilla-data";

export const onTickUpdate = (ev: GameEventContext): void => {
    const { playerData, playersData, ingameConstants } = ev;

    const players = world.getPlayers();
    players.forEach((player) => {
        const playerData = playersData.find((pd) => pd.playerId === player.id);
        if (!playerData) return;

        if (playerData.isProtected) {
            player.addEffect(MinecraftEffectTypes.Resistance, 2, {
                amplifier: 255,
                showParticles: false,
            });
        }
    });
};

export const onSecondUpdate = (ev: GameEventContext): void => {
    const { playerData, playersData, ingameConstants } = ev;
};
