import { Product } from '@/assets/models'

interface useStartingAmountProps {
  product: Product
  startingAmount: number
}

interface useStartingAmountReturn {
  minStartingAmount: number
  maxStartingAmount: number
  startingAmountStep: number
  startingAmount: number
}
export function useStartingAmount({
  product,
  startingAmount,
}: useStartingAmountProps): useStartingAmountReturn {
  const minStartingAmount = product.minStartingAmount
  const maxStartingAmount = product.price * 0.8
  const startingAmountStep = 10

  const newStartingAmount =
    startingAmount < product.minStartingAmount
      ? product.minStartingAmount
      : startingAmount > maxStartingAmount
        ? maxStartingAmount
        : startingAmount

  return {
    minStartingAmount,
    maxStartingAmount,
    startingAmount: newStartingAmount,
    startingAmountStep,
  }
}
