import { world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import type { GameEventHandlerMap } from "../../../@modules/werewolf/game/ingame/game/SkillManager";
import { WEREWOLF_STANDARDROLES_TRANSLATE_IDS } from "../../constants/translate";
import { SYSTEMS } from "../../constants/systems";

export const knightSkillHandlers: GameEventHandlerMap = {
    "knight-protect": async (ev) => {
        const { playerData: pd, playersData: psd, werewolfGameData: we } = ev;
        const player = world.getPlayers().find((p) => p.id === pd.playerId);
        if (!player) return false;
        const targetPlayersData = we.playersData.filter(
            (p) => p.isAlive && p.player.id !== pd.playerId,
        );
        if (targetPlayersData.length === 0) {
            player.playSound(SYSTEMS.ERROR.SOUND_ID, {
                pitch: SYSTEMS.ERROR.SOUND_PITCH,
                volume: SYSTEMS.ERROR.SOUND_VOLUME,
                location: player.location,
            });
            player.sendMessage({
                translate:
                    WEREWOLF_STANDARDROLES_TRANSLATE_IDS.KNIGHT_SKILL_NO_AVAILABLE_TARGETS_ERROR,
            });
            return false;
        }

        const form = new ModalFormData()
            .title({
                translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.KNIGHT_SKILL_FORM_TITLE,
            })
            .label({
                translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.KNIGHT_SKILL_FORM_DESCRIPTION,
            })
            .dropdown(
                {
                    translate:
                        WEREWOLF_STANDARDROLES_TRANSLATE_IDS.KNIGHT_SKILL_FORM_TARGET_DROPDOWN_LABEL,
                },
                targetPlayersData.map((p) => p.player.name),
                { defaultValueIndex: 0 },
            );

        const res = await form.show(player);
        if (res.canceled || !res.formValues) return false;

        const targetPlayerData = targetPlayersData[res.formValues[1] as number];
        if (!targetPlayerData || !targetPlayerData.role) return false;

        const targetSelfPlayerData = psd.find((p) => p.playerId === targetPlayerData.player.id);
        if (!targetSelfPlayerData) return false;

        targetSelfPlayerData.isProtected = true;
        player.playSound(SYSTEMS.SUCCESS.SOUND_ID, {
            pitch: SYSTEMS.SUCCESS.SOUND_PITCH,
            volume: SYSTEMS.SUCCESS.SOUND_VOLUME,
            location: player.location,
        });
        player.sendMessage({
            translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.KNIGHT_SKILL_PROTECT_RESULT,
            with: {
                rawtext: [{ text: targetPlayerData.player.name }],
            },
        });

        return true;
    },
};
