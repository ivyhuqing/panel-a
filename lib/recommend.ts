// /lib/recommend.ts

/**
 * 计算推荐值分数
 * @param asset 上传内容对象
 * @returns 推荐分数，数值越大越靠前
 */
export function calculateRecommendationScore(asset: any): number {
  const baseScore = typeof asset.score === 'number' ? asset.score : 3.0;
  const priority = typeof asset.priority_score === 'number' ? asset.priority_score / 100 : 0;
  const featuredBonus = asset.is_featured ? 1 : 0;
  const views = typeof asset.views === 'number' ? asset.views : 0;
  const viewScore = Math.log(views + 1);
  const decay = timeDecay(asset.created_at);

  const score =
    baseScore * 0.4 +
    priority * 0.3 +
    featuredBonus * 0.2 +
    viewScore * 0.1 -
    decay;

  return parseFloat(score.toFixed(4));
}

/**
 * 时间衰减函数，每 7 天减少 0.1 分
 * @param createdAt 时间戳字符串
 * @returns 衰减值
 */
function timeDecay(createdAt: string): number {
  if (!createdAt) return 0;
  const created = new Date(createdAt);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
  return Math.min(diffDays / 7 * 0.1, 3); // 最多减 3 分
}
