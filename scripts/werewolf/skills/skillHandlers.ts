import type { GameEventHandlerMap } from "../../@modules/game-manager/game/ingame/game/SkillManager";
import { knightSkillHandlers } from "./knight";
import { mediumSkillHandlers } from "./medium";
import { seerSkillHandlers } from "./seer";
import { registerRoleSkillHandlerMap } from "../../internal/definitionRegistryBridge";

export const roleSkillHandlers: Record<string, GameEventHandlerMap> = {
    seer: seerSkillHandlers,
    medium: mediumSkillHandlers,
    knight: knightSkillHandlers,
};

registerRoleSkillHandlerMap(roleSkillHandlers);
