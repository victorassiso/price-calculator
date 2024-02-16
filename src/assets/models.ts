import iPhone13 from './iPhone13.png'
import iPhone14 from './iPhone14.png'
import iPhone14Plus from './iPhone14Plus.png'
import iPhone15 from './iPhone15.png'
import iPhone15Plus from './iPhone15Plus.png'
import iPhone15Pro from './iPhone15Pro.png'
import iPhone15ProMax from './iPhone15ProMax.png'
import iPhoneSE from './iPhoneSE.png'

export interface Product {
  name: string
  price: number
  img: string
  minStartingAmount: number
}

export const productArray: Product[] = [
  {
    name: 'iPhone 11',
    price: 245,
    img: iPhoneSE,
    minStartingAmount: 150,
  },
  {
    name: 'iPhone 11 Pro',
    price: 350,
    img: iPhoneSE,
    minStartingAmount: 150,
  },
  {
    name: 'iPhone 11 Pro Max',
    price: 390,
    img: iPhoneSE,
    minStartingAmount: 150,
  },
  {
    name: 'iPhone 12',
    price: 350,
    img: iPhoneSE,
    minStartingAmount: 150,
  },
  {
    name: 'iPhone 12 Pro',
    price: 480,
    img: iPhoneSE,
    minStartingAmount: 150,
  },
  {
    name: 'iPhone 12 Pro Max',
    price: 500,
    img: iPhoneSE,
    minStartingAmount: 150,
  },
  {
    name: 'iPhone 13',
    price: 550,
    img: iPhone13,
    minStartingAmount: 200,
  },
  {
    name: 'iPhone 13 Pro',
    price: 650,
    img: iPhone13,
    minStartingAmount: 200,
  },
  {
    name: 'iPhone 13 Pro Max',
    price: 700,
    img: iPhone13,
    minStartingAmount: 200,
  },
  {
    name: 'iPhone 14',
    price: 600,
    img: iPhone14,
    minStartingAmount: 250,
  },
  {
    name: 'iPhone 14 Plus',
    price: 650,
    img: iPhone14Plus,
    minStartingAmount: 250,
  },
  {
    name: 'iPhone 14 Pro',
    price: 750,
    img: iPhone14,
    minStartingAmount: 250,
  },
  {
    name: 'iPhone 15',
    price: 880,
    img: iPhone15,
    minStartingAmount: 300,
  },
  {
    name: 'iPhone 15 Plus',
    price: 1000,
    img: iPhone15Plus,
    minStartingAmount: 300,
  },
  {
    name: 'iPhone 15 Pro',
    price: 1100,
    img: iPhone15Pro,
    minStartingAmount: 300,
  },
  {
    name: 'iPhone 15 Pro Max',
    price: 1250,
    img: iPhone15ProMax,
    minStartingAmount: 300,
  },
] as const

export const products = productArray.reduce(
  (acc, model) => {
    acc[model.name] = model
    return acc
  },
  {} as Record<string, (typeof productArray)[number]>,
)
