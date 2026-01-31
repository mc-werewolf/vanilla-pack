import type { RawMessage } from "@minecraft/server";
import { WEREWOLF_STANDARDROLES_TRANSLATE_IDS } from "../constants/translate";

export const GameEventTypeValues = [
    "AfterGameStart",
    "BeforeMeetingStart",
    "AfterMeetingStart",
    "SkillUse",
    "SkillUseInMeeting",
    "SkillUseOutMeeting",
    "Death",
] as const;
export type GameEventType = (typeof GameEventTypeValues)[number];

interface RoleKey {
    readonly addonId: string;
    readonly roleId: string;
}

type RoleRef = RoleKey;

export interface RoleDefinition {
    readonly id: string;
    readonly name: RawMessage;
    readonly description: RawMessage;
    readonly factionId: string;
    readonly isExcludedFromSurvivalCheck?: boolean; // 主に狂人枠で使用
    readonly count?: {
        max?: number;
        step?: number;
    };
    readonly color?: string; // 指定しなければ、factionに基づいて自動で決定される
    readonly divinationResult?: string; // 占い結果 roleId (別アドオンでも可)
    readonly clairvoyanceResult?: string; // 霊視結果 roleId (別アドオンでも可)
    readonly knownRoles?: string[]; // 初期に知っている役職
    readonly skills?: SkillDefinition[]; // 役職に紐づくスキル定義
    readonly handleGameEvents?: RoleSkillEvents; // スキルのトリガーとなるイベント
    readonly appearance?: {
        readonly toSelf?: RoleRef; // 自分目線の表示 (呪われし者とか)
        readonly toOthers?: RoleRef; // 他人目線の表示 (テレパシストとか)
        readonly toWerewolves?: RoleRef; // 人狼目線の表示 (スパイとか)
    };
    readonly sortIndex: number; // ソート順
}

export type SkillValue = number | string;
export interface SkillDefinition {
    id: string;
    name: RawMessage;
    cooldown?: SkillValue; // seconds
    maxUses?: SkillValue;
}
export interface SkillEventBinding {
    skillId: string;
}
export type RoleSkillEvents = Partial<Record<GameEventType, SkillEventBinding>>;

export const roles: RoleDefinition[] = [
    {
        id: "villager",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_NAME_VILLAGER },
        description: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_DESCRIPTION_VILLAGER },
        factionId: "villager",
        count: { max: 40 },
        sortIndex: 0,
    },
    {
        id: "seer",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_NAME_SEER },
        description: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_DESCRIPTION_SEER },
        factionId: "villager",
        sortIndex: 1,
        skills: [
            {
                id: "seer-divination",
                name: {
                    translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.SKILL_NAME_SEER_DIVINATION,
                },
                cooldown: 120,
                maxUses: 3,
            },
        ],
        handleGameEvents: {
            SkillUse: { skillId: "seer-divination" },
        },
    },
    {
        id: "medium",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_NAME_MEDIUM },
        description: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_DESCRIPTION_MEDIUM },
        factionId: "villager",
        sortIndex: 2,
        skills: [
            {
                id: "medium-clairvoyance",
                name: {
                    translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.SKILL_NAME_MEDIUM_CLAIRVOYANCE,
                },
                cooldown: 120,
                maxUses: 3,
            },
        ],
        handleGameEvents: {
            SkillUse: { skillId: "medium-clairvoyance" },
        },
    },
    {
        id: "knight",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_NAME_KNIGHT },
        description: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_DESCRIPTION_KNIGHT },
        factionId: "villager",
        sortIndex: 3,
        skills: [
            {
                id: "knight-protect",
                name: {
                    translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.SKILL_NAME_KNIGHT_PROTECT,
                },
                cooldown: 120,
                maxUses: 3,
            },
        ],
        handleGameEvents: {
            SkillUse: { skillId: "knight-protect" },
        },
    },
    {
        id: "werewolf",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_NAME_WEREWOLF },
        description: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_DESCRIPTION_WEREWOLF },
        factionId: "werewolf",
        count: { max: 10 },
        sortIndex: 4,
    },
    {
        id: "great-wolf",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_NAME_GREATWOLF },
        description: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_DESCRIPTION_GREATWOLF },
        factionId: "werewolf",
        divinationResult: "villager",
        clairvoyanceResult: "great-wolf",
        sortIndex: 5,
    },
    {
        id: "madman",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_NAME_MADMAN },
        description: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_DESCRIPTION_MADMAN },
        factionId: "werewolf",
        isExcludedFromSurvivalCheck: true,
        divinationResult: "villager",
        clairvoyanceResult: "villager",
        sortIndex: 6,
    },
];
