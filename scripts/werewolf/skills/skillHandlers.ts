import { knightSkillHandlers } from "./knight";
import { mediumSkillHandlers } from "./medium";
import { seerSkillHandlers } from "./seer";
import { DefinitionRegistry, type GameEventHandlerMap } from "@mc-werewolf/game-module";

export const roleSkillHandlers: Record<string, GameEventHandlerMap> = {
    seer: seerSkillHandlers,
    medium: mediumSkillHandlers,
    knight: knightSkillHandlers,
};

DefinitionRegistry.roleSkillHandlers.register(roleSkillHandlers);
