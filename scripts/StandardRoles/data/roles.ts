import type { RawMessage } from "@minecraft/server";
import { WEREWOLF_STANDARDROLES_TRANSLATE_IDS } from "../constants/translate";

export const GameEventTypeValues = [
    "AfterGameStart",
    "BeforeMeetingStart",
    "AfterMeetingStart",
    "SkillUse",
    "SkillUseInMeeting",
    "Death",
] as const;
type GameEventType = (typeof GameEventTypeValues)[number];

interface RoleKey {
    addonId: string;
    roleId: string;
}

type RoleRef = RoleKey;

export interface RoleDefinition {
    id: string;
    name: RawMessage;
    description: RawMessage;
    factionId: string;
    isExcludedFromSurvivalCheck?: boolean; // 主に狂人枠で使用
    count?: {
        max?: number;
        step?: number;
    };
    color?: string; // 指定しなければ、factionに基づいて自動で決定される
    divinationResult?: string; // 占い結果
    mediumResult?: string; // 霊視結果
    knownRoles?: string[]; // 初期に知っている役職
    handleGmaeEvents?: GameEventType[]; // 処理するゲームイベント
    appearance?: {
        toSelf?: RoleRef; // 自分目線の表示 (呪われし者とか)
        toOthers?: RoleRef; // 他人目線の表示 (テレパシストとか)
        toWerewolves?: RoleRef; // 人狼目線の表示 (スパイとか)
    };
    sortIndex: number; // ソート順
}

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
    },
    {
        id: "medium",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_NAME_MEDIUM },
        description: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_DESCRIPTION_MEDIUM },
        factionId: "villager",
        sortIndex: 2,
    },
    {
        id: "knight",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_NAME_KNIGHT },
        description: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_DESCRIPTION_KNIGHT },
        factionId: "villager",
        sortIndex: 3,
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
        sortIndex: 5,
    },
    {
        id: "madman",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_NAME_MADMAN },
        description: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_DESCRIPTION_MADMAN },
        factionId: "werewolf",
        isExcludedFromSurvivalCheck: true,
        sortIndex: 6,
    },
];
