import { z } from 'zod'

import csv from './produtos_credphone.csv'

const productSchema = z.object({
  name: z.string(),
  price: z.coerce.number(),
  minStartingAmount: z.coerce.number(),
  maxStartingAmount: z.coerce.number(),
  img: z.string().optional(),
})

export type Product = z.infer<typeof productSchema>

export const products: Product[] = []

// eslint-disable-next-line @typescript-eslint/no-explicit-any
csv.forEach((row: any) => {
  if (row['Preço'] && row.Imagem) {
    const price = z.coerce.number().parse(
      z
        .string()
        .transform((val) => (val ? val.split('€')[1] : '0'))
        .transform((val) => val.replace('.', ''))
        .transform((val) => val.replace(',', '.'))
        .parse(row['Preço']),
    )

    const minStartingAmount = z.coerce.number().parse(
      z
        .string()
        .transform((val) => (val ? val.split('€')[1] : '0'))
        .transform((val) => val.replace('.', ''))
        .transform((val) => val.replace(',', '.'))
        .parse(row['Entrada Mínima']),
    )

    const maxStartingAmount = z.coerce.number().parse(
      z
        .string()
        .transform((val) => (val ? val.split('€')[1] : '0'))
        .transform((val) => val.replace('.', ''))
        .transform((val) => val.replace(',', '.'))
        .parse(row['Entrada Máxima']),
    )

    const img = new URL(`./${row.Imagem}`, import.meta.url).href

    products.push({
      name: row.Produto,
      price,
      minStartingAmount,
      img,
      maxStartingAmount,
    })
  }
})

export const productMap: Record<string, Product> = products.reduce(
  (acc, product) => {
    acc[product.name] = product
    return acc
  },
  {} as Record<string, Product>,
)
