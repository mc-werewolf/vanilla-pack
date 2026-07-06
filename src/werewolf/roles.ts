import { werewolf } from "@mc-werewolf/module";

werewolf.defineRoles([
    { id: "villager",   name: "werewolf-vanillapack.role.name.villager",   faction: "village",  index: 0, max: 40 },
    { id: "seer",       name: "werewolf-vanillapack.role.name.seer",       faction: "village",  index: 1 },
    { id: "medium",     name: "werewolf-vanillapack.role.name.medium",     faction: "village",  index: 2 },
    { id: "knight",     name: "werewolf-vanillapack.role.name.knight",     faction: "village",  index: 3 },
    { id: "werewolf",   name: "werewolf-vanillapack.role.name.werewolf",   faction: "werewolf", index: 4, max: 10 },
    { id: "great-wolf", name: "werewolf-vanillapack.role.name.greatwolf",  faction: "werewolf", index: 5, divinationResult: "village" },
    { id: "madman",     name: "werewolf-vanillapack.role.name.madman",     faction: "werewolf", index: 6, divinationResult: "village" },
]);
