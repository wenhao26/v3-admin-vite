export interface CoinMarketRow {
  id: string
  rank: number
  name: string
  symbol: string
  icon: string
  price: number
  change1h: number
  change24h: number
  change7d: number
  volume24h: number
  marketCap: number
  sparkline7d: number[]
}

/**
 * 按给定起点、终点和起伏幅度生成 7 天降采样序列（默认 168 个小时点）
 */
function buildSparklineSeries(
  startPrice: number,
  endPrice: number,
  volatilityRatio: number,
  points = 168,
  seed = 1
): number[] {
  if (points <= 1) return [endPrice]

  // 确定性伪随机，保证每次刷新页面线条稳定
  let state = seed * 9301 + 49297
  const nextRand = () => {
    state = (state * 9301 + 49297) % 233280
    return state / 233280
  }

  const result: number[] = []
  for (let i = 0; i < points; i++) {
    const progress = i / (points - 1)
    const trendValue = startPrice + (endPrice - startPrice) * progress
    const wave
      = Math.sin(progress * Math.PI * 5 + seed) * 0.6
        + (nextRand() - 0.5) * 1.4
    const noise = trendValue * volatilityRatio * wave
    result.push(Number((trendValue + noise).toFixed(6)))
  }

  // 保证首尾贴近起止价格，与涨跌幅视觉一致
  result[0] = startPrice
  result[result.length - 1] = endPrice
  return result
}

export const MOCK_MARKET_COINS: CoinMarketRow[] = [
  {
    id: "bitcoin",
    rank: 1,
    name: "比特币",
    symbol: "BTC",
    icon: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    price: 59134.07,
    change1h: 0.2,
    change24h: -2.3,
    change7d: -8.4,
    volume24h: 28174727442,
    marketCap: 1189604234523,
    sparkline7d: buildSparklineSeries(64556.84, 59134.07, 0.022, 168, 11)
  },
  {
    id: "ethereum",
    rank: 2,
    name: "以太坊",
    symbol: "ETH",
    icon: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    price: 1657.05,
    change1h: 0.2,
    change24h: -2.7,
    change7d: -8.4,
    volume24h: 9778807962,
    marketCap: 202575612868,
    sparkline7d: buildSparklineSeries(1809.01, 1657.05, 0.025, 168, 22)
  },
  {
    id: "tether",
    rank: 3,
    name: "泰达币",
    symbol: "USDT",
    icon: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
    price: 0.9989,
    change1h: 0.0,
    change24h: 0.0,
    change7d: 0.0,
    volume24h: 43628228331,
    marketCap: 174643217103,
    sparkline7d: buildSparklineSeries(0.9989, 0.9989, 0.0004, 168, 33)
  },
  {
    id: "binancecoin",
    rank: 4,
    name: "币安币",
    symbol: "BNB",
    icon: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png",
    price: 542.54,
    change1h: 0.2,
    change24h: -2.1,
    change7d: -8.3,
    volume24h: 437269655,
    marketCap: 71348806483,
    sparkline7d: buildSparklineSeries(591.65, 542.54, 0.02, 168, 44)
  },
  {
    id: "usd-coin",
    rank: 5,
    name: "USDC",
    symbol: "USDC",
    icon: "https://assets.coingecko.com/coins/images/6319/small/usdc.png",
    price: 0.9995,
    change1h: 0.0,
    change24h: 0.0,
    change7d: 0.0,
    volume24h: 12813271160,
    marketCap: 69111873101,
    sparkline7d: buildSparklineSeries(0.9995, 0.9995, 0.0003, 168, 55)
  },
  {
    id: "ripple",
    rank: 6,
    name: "XRP (瑞波币)",
    symbol: "XRP",
    icon: "https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png",
    price: 0.9189,
    change1h: 0.4,
    change24h: -3.9,
    change7d: -6.7,
    volume24h: 1347541567,
    marketCap: 58366273774,
    sparkline7d: buildSparklineSeries(0.9849, 0.9189, 0.026, 168, 66)
  },
  {
    id: "solana",
    rank: 7,
    name: "Solana",
    symbol: "SOL",
    icon: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    price: 68.71,
    change1h: 0.2,
    change24h: -4.2,
    change7d: -8.4,
    volume24h: 2564216195,
    marketCap: 40683319914,
    sparkline7d: buildSparklineSeries(75.01, 68.71, 0.03, 168, 77)
  },
  {
    id: "tron",
    rank: 8,
    name: "波场",
    symbol: "TRX",
    icon: "https://assets.coingecko.com/coins/images/1094/small/tron-logo.png",
    price: 0.3084,
    change1h: 0.0,
    change24h: -0.1,
    change7d: 0.2,
    volume24h: 274816479,
    marketCap: 29318107129,
    sparkline7d: buildSparklineSeries(0.3078, 0.3084, 0.014, 168, 88)
  }
]
