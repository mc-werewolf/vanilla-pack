import type { SystemManager } from "../../SystemManager";
import { FactionRegistrationRequester } from "./factions/FactionRegistrationRequester";
import { RoleGroupRegistrationRequester } from "./rolegroup/RoleGroupRegistrationRequester";
import { RoleRegistrationRequester } from "./roles/RoleRegistrationRequester";
import { SettingRegistrationRequester } from "./settings/SettingRegistrationRequester";

export const definitionTypeValues = ["role", "faction", "roleGroup", "setting"] as const;
export type DefinitionType = (typeof definitionTypeValues)[number];
export class DefinitionManager {
    private readonly roleRegistrationRequester = RoleRegistrationRequester.create(this);
    private readonly factionRegistrationRequester = FactionRegistrationRequester.create(this);
    private readonly roleGroupRegistrationRequester = RoleGroupRegistrationRequester.create(this);
    private readonly settingRegistrationRequester = SettingRegistrationRequester.create(this);
    private constructor(private readonly systemManager: SystemManager) {}
    public static create(systemManager: SystemManager) {
        return new DefinitionManager(systemManager);
    }

    public requestDefinitionsRegistration(): void {
        const registry = this.systemManager.getRegistry();
        const roles = registry.getRoles();
        if (roles) {
            this.roleRegistrationRequester.request(roles);
        }
        const factions = registry.getFactions();
        if (factions) {
            this.factionRegistrationRequester.request(factions);
        }
        const roleGroups = registry.getRoleGroups();
        if (roleGroups) {
            this.roleGroupRegistrationRequester.request(roleGroups);
        }
        const settings = registry.getSettings();
        if (settings) {
            this.settingRegistrationRequester.request(settings);
        }
    }
}
