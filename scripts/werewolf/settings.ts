import type { SettingDefinition } from "../@modules/game-manager/constants/types";
import { registerSettingDefinitions } from "../internal/definitionRegistryBridge";

export const settings: SettingDefinition[] = [];

registerSettingDefinitions(settings);
