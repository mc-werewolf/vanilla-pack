import { werewolf } from "@mc-werewolf/module";

werewolf.defineSkills([
    {
        id: "vanilla:divination",
        name: "werewolf-vanillapack.skill.name.seer.divination",
        description: "werewolf-vanillapack.skill.seer.form.description",
        roleId: "seer",
        target: {
            type: "player",
            count: 1,
            aliveOnly: true,
            excludeSelf: true,
        },
        handler: {
            apiName: "vanilla:resolveDivination",
        },
        uses: 1,
        priority: 0,
        tags: ["divination"],
    },
    {
        id: "vanilla:mediumReveal",
        name: "werewolf-vanillapack.skill.name.medium.clairvoyance",
        description: "werewolf-vanillapack.skill.medium.form.description",
        roleId: "medium",
        target: {
            type: "player",
            count: 1,
            deadOnly: true,
            excludeSelf: true,
        },
        handler: {
            apiName: "vanilla:resolveMediumReveal",
        },
        uses: 1,
        priority: 0,
        tags: ["reveal"],
    },
    {
        id: "vanilla:guard",
        name: "werewolf-vanillapack.skill.name.knight.protect",
        description: "werewolf-vanillapack.skill.knight.form.description",
        roleId: "knight",
        target: {
            type: "player",
            count: 1,
            aliveOnly: true,
        },
        handler: {
            apiName: "vanilla:resolveGuard",
        },
        uses: 1,
        priority: 0,
        tags: ["protect"],
    },
    {
        id: "vanilla:werewolfAttack",
        name: "werewolf-vanillapack.skill.name.werewolf.attack",
        description: "werewolf-vanillapack.skill.werewolf.attack.description",
        roleId: "werewolf",
        target: {
            type: "player",
            count: 1,
            aliveOnly: true,
            excludeSelf: true,
        },
        handler: {
            apiName: "vanilla:resolveWerewolfAttack",
        },
        uses: 1,
        priority: 0,
        tags: ["kill"],
    },
    {
        id: "vanilla:greatWolfAttack",
        name: "werewolf-vanillapack.skill.name.werewolf.attack",
        description: "werewolf-vanillapack.skill.werewolf.attack.description",
        roleId: "great-wolf",
        target: {
            type: "player",
            count: 1,
            aliveOnly: true,
            excludeSelf: true,
        },
        handler: {
            apiName: "vanilla:resolveWerewolfAttack",
        },
        uses: 1,
        priority: 0,
        tags: ["kill"],
    },
]);
