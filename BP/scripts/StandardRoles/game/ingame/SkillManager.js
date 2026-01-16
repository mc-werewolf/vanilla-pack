export class SkillManager {
    constructor(inGameManager) {
        this.inGameManager = inGameManager;
    }
    static create(inGameManager) {
        return new SkillManager(inGameManager);
    }
    async emitPlayerEvent(playerId, eventType, ctxPayload) { }
}
