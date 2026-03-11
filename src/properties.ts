import type { KairoAddonProperties } from "@kairo-js/router";

export const properties: KairoAddonProperties = {
    id: "werewolf-vanillapack", //# // a-z & 0-9 - _
    metadata: {
        authors: ["shizuku86"],
    },
    header: {
        name: "Werewolf VanillaPack",
        description:
            "provides and handles the fundamental mechanics and standard gameplay of the Werewolf game.",
        version: {
            major: 1,
            minor: 1,
            patch: 0,
            prerelease: "dev.2",
            // build: "abc123",
        },
        min_engine_version: [1, 21, 132],
    },
    dependencies: [
        {
            module_name: "@minecraft/server",
            version: "2.4.0",
        },
        {
            module_name: "@minecraft/server-ui",
            version: "2.0.0",
        },
    ],
    requiredAddons: {
        "werewolf-gamemanager": "1.0.0-dev.1",
    },
    tags: ["official", "stable"],
};
