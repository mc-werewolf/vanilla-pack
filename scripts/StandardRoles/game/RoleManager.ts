export class RoleManager {
    private constructor() {}

    private static instance: RoleManager | null = null;
    public static getInstance(): RoleManager {
        if (this.instance === null) {
            this.instance = new RoleManager();
        }
        return this.instance;
    }
}
