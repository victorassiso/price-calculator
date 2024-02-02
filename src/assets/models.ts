import iPhone13 from './iPhone13.png'
import iPhone14 from './iPhone14.png'
import iPhone14Plus from './iPhone14Plus.png'
import iPhone15 from './iPhone15.png'
import iPhone15Plus from './iPhone15Plus.png'
import iPhone15Pro from './iPhone15Pro.png'
import iPhone15ProMax from './iPhone15ProMax.png'
import iPhoneSE from './iPhoneSE.png'

export const models = [
  {
    name: 'iPhone SE',
    price: 429,
    img: iPhoneSE,
  },
  {
    name: 'iPhone 13',
    price: 599,
    img: iPhone13,
  },
  {
    name: 'iPhone 14',
    price: 699,
    img: iPhone14,
  },
  {
    name: 'iPhone 14 Plus',
    price: 699,
    img: iPhone14Plus,
  },
  {
    name: 'iPhone 15',
    price: 799,
    img: iPhone15,
  },
  {
    name: 'iPhone 15 Plus',
    price: 899,
    img: iPhone15Plus,
  },
  {
    name: 'iPhone 15 Pro',
    price: 999,
    img: iPhone15Pro,
  },
  {
    name: 'iPhone 15 Pro Max',
    price: 1199,
    img: iPhone15ProMax,
  },
] as const
