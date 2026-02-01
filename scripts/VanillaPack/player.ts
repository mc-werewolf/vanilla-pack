export type SelfPlayerData = {
    playerId: string;
    isProtected: boolean;
} & Record<string, any>;

// 任意にプロパティを追加可能。
// ここで定義したものがデフォルト値となります。
export const playerData: SelfPlayerData = {
    playerId: "", // playerId は各プレイヤーのIdが自動で割り振られます。(このままにしておいてください)
    isProtected: false, // 騎士の守護
};
