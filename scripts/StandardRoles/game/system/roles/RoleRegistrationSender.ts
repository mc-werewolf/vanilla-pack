import { roles } from "../../../data/roles";
import type { RoleManager } from "./RoleManager";
import { SCRIPT_EVENT_COMMAND_IDS, SCRIPT_EVENT_ID_SUFFIX } from "../../../constants/scriptevent";
import { properties } from "../../../../properties";
import { KairoUtils, type KairoCommand } from "../../../../Kairo/utils/KairoUtils";

export class RoleRegistrationSender {
    private constructor(private readonly roleManager: RoleManager) {}
    public static create(roleManager: RoleManager): RoleRegistrationSender {
        return new RoleRegistrationSender(roleManager);
    }

    public send(): void {
        const data: KairoCommand = {
            commandId: SCRIPT_EVENT_COMMAND_IDS.ROLE_REGISTRATION_RESPONSE,
            addonId: properties.id,
            roles: roles,
        };

        KairoUtils.sendKairoCommand(SCRIPT_EVENT_ID_SUFFIX.WEREWOLF_GAMEMANAGER, data);
    }
}
