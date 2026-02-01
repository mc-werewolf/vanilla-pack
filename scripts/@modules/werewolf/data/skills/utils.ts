import type { IngameConstants } from "../../game/ingame/InGameManager";
import type { RoleDefinition } from "../../../../VanillaPack/roles/roles";
import type { FactionDefinition } from "../../../../VanillaPack/factions/factions";

export function findRoleDefinition(
    RolesByAddon: Record<string, RoleDefinition[]>,
    RoleId: string,
): RoleDefinition | undefined {
    for (const roles of Object.values(RolesByAddon)) {
        const found = roles.find((r) => r.id === RoleId);
        if (found) return found;
    }
    return undefined;
}

export function findFactionDefinition(
    factionsByAddon: Record<string, FactionDefinition[]>,
    factionId: string,
): FactionDefinition | undefined {
    for (const factions of Object.values(factionsByAddon)) {
        const found = factions.find((f) => f.id === factionId);
        if (found) return found;
    }
    return undefined;
}

export function getRoleDefaultColor(c: IngameConstants, role: RoleDefinition): string {
    const faction = findFactionDefinition(c.factionDefinitions, role.factionId);
    return faction?.defaultColor ?? "§f";
}
