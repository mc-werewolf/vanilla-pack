/**
 * scripts/properties から manifest.jsonを自動生成する
 * propertiesは、アドオン間通信においても、識別などに利用する
 */
/**
 * 文末に # が記述されている箇所を適宜修正して使用します。
 * Modify and use where # is written at the end of the sentence as appropriate
 */
export const properties = {
    id: "werewolf-standardroles",
    metadata: {
        /** 製作者の名前 */
        authors: ["shizuku86"],
    },
    header: {
        name: "Werewolf Standard Roles",
        description: "provides and handles the fundamental roles of the Werewolf game.",
        version: {
            major: 1,
            minor: 0,
            patch: 0,
            // prerelease: "preview.1",
            build: "dev.1",
        },
        min_engine_version: [1, 21, 100],
        uuid: "39716916-2dec-4c1f-b1e6-b9ff0496899b",
    },
    resourcepack: {
        name: "Use BP Name",
        description: "Use BP Description",
        uuid: "ae9411df-ada9-4e2e-a563-924f38978c9c",
        module_uuid: "2dd8fafe-b659-4532-ae6f-1f63bd23c727",
    },
    modules: [
        {
            type: "script",
            language: "javascript",
            entry: "scripts/index.js",
            version: "header.version",
            uuid: "452e2f4a-8a7f-44b2-967b-a604ba9e3955",
        },
    ],
    dependencies: [
        {
            module_name: "@minecraft/server",
            version: "2.1.0",
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
    tags: [
    // "stable",
    ],
};
/**
 * "official" を非公式に付与することは許可されていません。
 * 公認のアドオンには "approved" を付与します。
 * It is not allowed to assign "official" unofficially.
 * For approved addons, assign "approved".
 *
 */
export const supportedTags = ["official", "approved", "stable", "experimental"];
