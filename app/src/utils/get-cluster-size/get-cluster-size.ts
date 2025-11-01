import { CLUSTER_SIZES } from '../../constants/map.constants'

export const getClusterSize = (count: number): number => {
  const countStr = count.toString()

  if (countStr.length >= 5) return CLUSTER_SIZES.FIVE_DIGITS.size
  if (countStr.length === 4) return CLUSTER_SIZES.FOUR_DIGITS.size
  if (countStr.length === 3) return CLUSTER_SIZES.THREE_DIGITS.size
  if (countStr.length === 2) return CLUSTER_SIZES.TWO_DIGITS.size

  return CLUSTER_SIZES.ONE_DIGIT.size
}
