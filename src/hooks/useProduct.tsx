import { useEffect, useState } from 'react'

import { Product, products } from '@/assets/models'

export function useProduct(productName: string) {
  const [product, setProduct] = useState({
    name: '',
    img: '',
    minStartingAmount: 0,
    price: 0,
  } as Product)

  // Update Product state
  useEffect(() => {
    const product = products[productName]

    if (product) {
      setProduct(product)
    } else {
      setProduct({
        name: '',
        img: '',
        minStartingAmount: 0,
        price: 0,
      } as Product)
    }
  }, [productName])

  return { product }
}
