import type {
    FactionDefinition,
    RoleDefinition,
    RoleGroupDefinition,
    SettingDefinition,
} from "../../../constants/types";
import type { GameEventContext } from "../../ingame/game/GameManager";
import type { SelfPlayerData } from "../../ingame/PlayerData";
import type { SystemManager } from "../../SystemManager";

type GameEventHandler = (ev: GameEventContext) => void;

export type UpdateHandlers = {
    readonly onTickUpdate?: GameEventHandler;
    readonly onSecondUpdate?: GameEventHandler;
};

type DefinitionRegistryState = {
    roles?: RoleDefinition[];
    factions?: FactionDefinition[];
    roleGroups?: RoleGroupDefinition[];
    settings?: SettingDefinition[];
    playerData?: SelfPlayerData;
    updateHandlers?: UpdateHandlers;
};

type DefinitionRegistration = Partial<
    Pick<DefinitionRegistryState, "roles" | "factions" | "roleGroups" | "settings">
>;

type RegistryInitPayload = {
    definitions?: DefinitionRegistration;
    playerData?: SelfPlayerData;
    updateHandlers?: UpdateHandlers;
};

export class DefinitionRegistry {
    private constructor(private readonly systemManager: SystemManager) {}

    private state: DefinitionRegistryState = {
    };

    public static create(systemManager: SystemManager): DefinitionRegistry {
        return new DefinitionRegistry(systemManager);
    }

    public init(payload: RegistryInitPayload): void {
        if (payload.definitions) {
            this.registerDefinitions(payload.definitions);
        }
        if (payload.playerData) {
            this.registerPlayerData(payload.playerData);
        }
        if (payload.updateHandlers) {
            this.registerUpdateHandlers(payload.updateHandlers);
        }
    }

    public registerDefinitions(definitions: DefinitionRegistration): void {
        if (definitions.roles) {
            this.state.roles = [...definitions.roles];
        }
        if (definitions.factions) {
            this.state.factions = [...definitions.factions];
        }
        if (definitions.roleGroups) {
            this.state.roleGroups = [...definitions.roleGroups];
        }
        if (definitions.settings) {
            this.state.settings = [...definitions.settings];
        }
    }

    public registerPlayerData(data: SelfPlayerData): void {
        this.state.playerData = data;
    }

    public registerUpdateHandlers(handlers: UpdateHandlers): void {
        this.state.updateHandlers = handlers;
    }

    public getRoles(): readonly RoleDefinition[] | undefined {
        return this.state.roles;
    }

    public getFactions(): readonly FactionDefinition[] | undefined {
        return this.state.factions;
    }

    public getRoleGroups(): readonly RoleGroupDefinition[] | undefined {
        return this.state.roleGroups;
    }

    public getSettings(): readonly SettingDefinition[] | undefined {
        return this.state.settings;
    }

    public getPlayerData(): SelfPlayerData {
        return this.state.playerData ?? { playerId: "" };
    }

    public getUpdateHandlers(): UpdateHandlers | undefined {
        return this.state.updateHandlers;
    }
}
