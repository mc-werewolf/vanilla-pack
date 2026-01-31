import { world, type EntityHurtAfterEvent } from "@minecraft/server";
import { BaseEventHandler } from "../../events/BaseEventHandler";
import type { InGameEventManager } from "./InGameEventManager";
import { GamePhase } from "../InGameManager";
import { MinecraftDimensionTypes } from "@minecraft/vanilla-data";
import { SYSTEMS } from "../../../../../StandardRoles/constants/systems";

export class InGameEntityHurtHandler extends BaseEventHandler<undefined, EntityHurtAfterEvent> {
    private constructor(private readonly inGameEventManager: InGameEventManager) {
        super(inGameEventManager);
    }
    public static create(inGameEventManager: InGameEventManager): InGameEntityHurtHandler {
        return new InGameEntityHurtHandler(inGameEventManager);
    }

    protected afterEvent = world.afterEvents.entityHurt;

    protected handleAfter(ev: EntityHurtAfterEvent): void {
        const { damage, damageSource, hurtEntity } = ev;
        const currentGamePhase = this.inGameEventManager.getInGameManager().getCurrentPhase();
        if (currentGamePhase !== GamePhase.InGame) return;

        const hurtEntityData = this.inGameEventManager
            .getInGameManager()
            .getSelfPlayerData(hurtEntity.id);
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
    }
}
