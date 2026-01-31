export function findRoleDefinition(RolesByAddon, RoleId) {
    for (const roles of Object.values(RolesByAddon)) {
        const found = roles.find((r) => r.id === RoleId);
        if (found)
            return found;
    }
    return undefined;
}
export function findFactionDefinition(factionsByAddon, factionId) {
    for (const factions of Object.values(factionsByAddon)) {
        const found = factions.find((f) => f.id === factionId);
        if (found)
            return found;
    }
    return undefined;
}
export function getRoleDefaultColor(c, role) {
    const faction = findFactionDefinition(c.factionDefinitions, role.factionId);
    return faction?.defaultColor ?? "§f";
}
