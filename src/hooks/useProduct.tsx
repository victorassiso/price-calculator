import { useEffect, useState } from 'react'

import { productMap } from '@/assets/products'

export const initialProduct = productMap['iPhone 15 Pro Max - 256GB']

export function useProduct(productName: string) {
  const [product, setProduct] = useState(initialProduct)

  // Update Product state
  useEffect(() => {
    const product = productMap[productName]
    if (product) {
      setProduct(product)
    } else {
      setProduct(initialProduct)
    }
  }, [productName])

  return { product }
}
