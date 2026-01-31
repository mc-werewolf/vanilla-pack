import { world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { WEREWOLF_STANDARDROLES_TRANSLATE_IDS } from "../../constants/translate";
import { findFactionDefinition, findRoleDefinition, getRoleDefaultColor } from "./utils";
export const seerSkillHandlers = {
    "seer-divination": async (playerId, ev, c) => {
        const player = world.getPlayers().find((p) => p.id === playerId);
        if (!player)
            return false;
        const targetPlayersData = ev.playersData.filter((p) => p.isAlive && p.player.id !== playerId);
        const form = new ModalFormData()
            .title({
            translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.SEER_SKILL_FORM_TITLE,
        })
            .label({ translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.SEER_SKILL_FORM_DESCRIPTION })
            .dropdown({
            translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.SEER_SKILL_FORM_TARGET_DROPDOWN_LABEL,
        }, targetPlayersData.map((p) => p.player.name), { defaultValueIndex: 0 });
        const res = await form.show(player);
        if (res.canceled || !res.formValues)
            return false;
        const targetPlayerData = targetPlayersData[res.formValues[1]];
        if (!targetPlayerData || !targetPlayerData.role)
            return false;
        const targetPlayerFaction = findFactionDefinition(c.factionDefinitions, targetPlayerData.role.factionId);
        if (!targetPlayerFaction)
            return false;
        const divinationResultRoleId = targetPlayerData.role.divinationResult ?? targetPlayerFaction.defaultRoleId;
        const divinationResultRoleDifinition = findRoleDefinition(c.roleDefinitions, divinationResultRoleId);
        if (!divinationResultRoleDifinition)
            return false;
        player.sendMessage({
            translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.SEER_SKILL_DIVINATION_RESULT,
            with: {
                rawtext: [
                    { text: targetPlayerData.player.name },
                    {
                        text: divinationResultRoleDifinition.color ??
                            getRoleDefaultColor(c, divinationResultRoleDifinition),
                    },
                    divinationResultRoleDifinition.name,
                ],
            },
        });
        return true;
    },
};
