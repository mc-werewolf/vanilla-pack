import { werewolf } from "@mc-werewolf/module";

werewolf.defineFactions([
    {
        id: "village",
        name: "werewolf-vanillapack.faction.name.villager",
        color: "§a",
        winCondition: {
            expr: "alive.village > 0 && alive.werewolf == 0",
            priority: 10,
        },
    },
    {
        id: "werewolf",
        name: "werewolf-vanillapack.faction.name.werewolf",
        color: "§4",
        winCondition: {
            expr: "alive.werewolf >= alive.village",
            priority: 10,
        },
    },
]);
