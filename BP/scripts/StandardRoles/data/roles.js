import { WEREWOLF_STANDARDROLES_TRANSLATE_IDS } from "../constants/translate";
export const GameEventTypeValues = [
    "AfterGameStart",
    "BeforeMeetingStart",
    "AfterMeetingStart",
    "SkillUse",
    "SkillUseInMeeting",
    "SkillUseOutMeeting",
    "Death",
];
export const roles = [
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
                id: "medium-spiritualism",
                name: {
                    translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.SKILL_NAME_MEDIUM_SPIRITUALISM,
                },
                cooldown: 120,
                maxUses: 3,
            },
        ],
        handleGameEvents: {
            SkillUse: { skillId: "medium-spiritualism" },
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
        mediumResult: "great-wolf",
        sortIndex: 5,
    },
    {
        id: "madman",
        name: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_NAME_MADMAN },
        description: { translate: WEREWOLF_STANDARDROLES_TRANSLATE_IDS.ROLE_DESCRIPTION_MADMAN },
        factionId: "werewolf",
        isExcludedFromSurvivalCheck: true,
        divinationResult: "villager",
        mediumResult: "villager",
        sortIndex: 6,
    },
];
