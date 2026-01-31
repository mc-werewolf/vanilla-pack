import type { GameEventHandlerMap } from "../../game/ingame/game/SkillManager";
import { mediumSkillHandlers } from "./medium";
import { seerSkillHandlers } from "./seer";

export const roleSkillHandlers: Record<string, GameEventHandlerMap> = {
    seer: seerSkillHandlers,
    medium: mediumSkillHandlers,
};
