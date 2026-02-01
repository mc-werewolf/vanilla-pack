/**
 * scripts/properties から manifest.jsonを自動生成する
 * propertiesは、アドオン間通信においても、識別などに利用する
 */

export type SemVer = {
    major: number;
    minor: number;
    patch: number;
    prerelease?: string | undefined; // "preview.3" / "rc.1"
    build?: string | undefined; // "abc123" (commit)
};

/**
 * 文末に # が記述されている箇所を適宜修正して使用します。
 * Modify and use where # is written at the end of the sentence as appropriate
 */

export const properties = {
    id: "werewolf-vanillapack",
    metadata: {
        /** 製作者の名前 */
        authors: ["shizuku86"],
    },
    header: {
        name: "Werewolf-VanillaPack",
        description:
            "provides and handles the fundamental mechanics and standard gameplay of the Werewolf game.",
        version: {
            major: 1,
            minor: 0,
            patch: 0,
            // prerelease: "preview.1",
            build: "dev.2",
        },
        min_engine_version: [1, 21, 100],
        uuid: "2f1bb43f-5805-4640-80e1-e12adc9145f0",
    },
    resourcepack: {
        name: "Use BP Name",
        description: "Use BP Description",
        uuid: "2a14b77a-4a4a-4bef-9fcb-753ef553a1ad",
        module_uuid: "3dcb99ef-5673-4731-9a25-b707f8e7b507",
    },
    modules: [
        {
            type: "script",
            language: "javascript",
            entry: "scripts/index.js",
            version: "header.version",
            uuid: "82778a72-ca4b-495b-854a-be780a86c0d5",
        },
    ],
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
    /** 前提アドオン */
    requiredAddons: {
        "werewolf-gamemanager": "1.0.0-dev.1", // "kairo": "1.0.0"
    },
    tags: ["stable"],
};

/**
 * "official" を非公式に付与することは許可されていません。
 * 公認のアドオンには "approved" を付与します。
 * It is not allowed to assign "official" unofficially.
 * For approved addons, assign "approved".
 *
 */
export const supportedTags: string[] = ["official", "approved", "stable", "experimental"];
