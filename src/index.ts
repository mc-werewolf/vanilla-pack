import { router } from "@kairo-js/router";
import { properties } from "./properties";
import "./werewolf/factions";
import "./werewolf/roles";
import "./werewolf/skills";
import { registerVanillaSkillHandlers } from "./werewolf/skillHandlers";

router.init(properties);

router.beforeEvents.startup.subscribe((_ev) => {
    // API・フック・コマンドの登録はここに追加していく
});

registerVanillaSkillHandlers();
