import { useEffect, useState } from 'react'

import { Product, productMap } from '@/assets/products'

export function useProduct(productName: string) {
  const [product, setProduct] = useState({
    name: '',
    img: '',
    minStartingAmount: 0,
    price: 0,
  } as Product)

  // Update Product state
  useEffect(() => {
    console.log(productName)
    console.log(productMap)
    const product = productMap[productName]
    console.log(product)
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
  console.log({ product })
  return { product }
}
