import { EntityHurtAfterEvent, world } from "@minecraft/server";
import { MinecraftDimensionTypes } from "@minecraft/vanilla-data";
import { SYSTEMS } from "../constants/systems";
import { InGameEntityHurt } from "@mc-werewolf/game-module";

InGameEntityHurt.afterEvent<EntityHurtAfterEvent>((ev, ctx) => {
    const { damage, damageSource, hurtEntity } = ev;

    const hurtEntityData = ctx.playersData.find(
        (playerData) => playerData.playerId === hurtEntity.id,
    );
    if (!hurtEntityData) return;

    if (hurtEntityData.isProtected) {
        hurtEntityData.isProtected = false;
        for (let i = 0; i < 5; i++) {
            world
                .getDimension(MinecraftDimensionTypes.Overworld)
                .spawnParticle("minecraft:totem_particle", {
                    x: hurtEntity.location.x,
                    y: hurtEntity.location.y + 0.75,
                    z: hurtEntity.location.z,
                });
        }
        const players = world.getPlayers();
        players.forEach((player) => {
            player.playSound(SYSTEMS.PROTECT.SOUND_ID, {
                pitch: SYSTEMS.PROTECT.SOUND_PITCH,
                volume: SYSTEMS.PROTECT.SOUND_VOLUME,
                location: hurtEntity.location,
            });
        });
    }
});
