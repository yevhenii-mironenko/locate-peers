import { CLUSTER_SIZES, COLORS } from '../../constants/map.constants'

export const createClusterIconHtml = (count: number): string => {
  const countStr = count.toString()
  let size: number
  let fontSize: number

  if (countStr.length >= 5) {
    size = CLUSTER_SIZES.FIVE_DIGITS.size
    fontSize = CLUSTER_SIZES.FIVE_DIGITS.fontSize
  } else if (countStr.length === 4) {
    size = CLUSTER_SIZES.FOUR_DIGITS.size
    fontSize = CLUSTER_SIZES.FOUR_DIGITS.fontSize
  } else if (countStr.length === 3) {
    size = CLUSTER_SIZES.THREE_DIGITS.size
    fontSize = CLUSTER_SIZES.THREE_DIGITS.fontSize
  } else if (countStr.length === 2) {
    size = CLUSTER_SIZES.TWO_DIGITS.size
    fontSize = CLUSTER_SIZES.TWO_DIGITS.fontSize
  } else {
    size = CLUSTER_SIZES.ONE_DIGIT.size
    fontSize = CLUSTER_SIZES.ONE_DIGIT.fontSize
  }

  return `
    <div class="custom-cluster-icon" style="width: ${size}px; height: ${size}px;">
      <svg width="${size}" height="${size}" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="clusterGradient-${count}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${COLORS.PRIMARY};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${COLORS.SECONDARY};stop-opacity:1" />
          </linearGradient>
          <filter id="clusterShadow-${count}">
            <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.25"/>
          </filter>
        </defs>
        <circle cx="25" cy="25" r="20" fill="url(#clusterGradient-${count})" opacity="0.9" filter="url(#clusterShadow-${count})"/>
        <circle cx="25" cy="25" r="16" fill="white"/>
        <text x="25" y="25" text-anchor="middle" dominant-baseline="central" 
              font-size="${fontSize}" font-weight="bold" fill="${COLORS.PRIMARY}">
          ${count}
        </text>
      </svg>
    </div>
  `
}
