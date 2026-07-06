import { router } from "@kairo-js/router";
import type { SkillContext, SkillResult } from "@mc-werewolf/module";

export function registerVanillaSkillHandlers(): void {
    router.beforeEvents.startup.subscribe((ev) => {
        ev.addonApi.register("vanilla:resolveDivination", resolveDivination);
        ev.addonApi.register("vanilla:resolveMediumReveal", resolveMediumReveal);
        ev.addonApi.register("vanilla:resolveGuard", resolveGuard);
        ev.addonApi.register("vanilla:resolveWerewolfAttack", resolveWerewolfAttack);
    });
}

function resolveDivination(context: SkillContext): SkillResult {
    const targetId = context.targetIds[0];
    if (!targetId) {
        return { actions: [] };
    }

    const targetRoleId = context.game?.players[targetId]?.roleId;
    const targetRole = targetRoleId ? context.snapshot.roles[targetRoleId] : undefined;
    const result = targetRole?.divinationResult ?? targetRole?.faction ?? "unknown";

    return {
        actions: [
            {
                type: "reveal",
                toPlayerId: context.actorId,
                targetId,
                key: "vanilla:divinationResult",
                value: result,
            },
        ],
    };
}

function resolveMediumReveal(context: SkillContext): SkillResult {
    const targetId = context.targetIds[0];
    if (!targetId) {
        return { actions: [] };
    }

    const targetRoleId = context.game?.players[targetId]?.roleId;
    const targetRole = targetRoleId ? context.snapshot.roles[targetRoleId] : undefined;

    return {
        actions: [
            {
                type: "reveal",
                toPlayerId: context.actorId,
                targetId,
                key: "vanilla:role",
                value: targetRole?.name ?? targetRoleId ?? "unknown",
            },
        ],
    };
}

function resolveGuard(context: SkillContext): SkillResult {
    const targetId = context.targetIds[0];
    if (!targetId) {
        return { actions: [] };
    }

    return {
        actions: [
            {
                type: "protect",
                targetId,
                reason: "vanilla:guard",
            },
        ],
    };
}

function resolveWerewolfAttack(context: SkillContext): SkillResult {
    const targetId = context.targetIds[0];
    if (!targetId) {
        return { actions: [] };
    }

    return {
        actions: [
            {
                type: "kill",
                targetId,
                reason: "vanilla:werewolfAttack",
            },
        ],
    };
}
