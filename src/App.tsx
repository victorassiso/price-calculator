import './global.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card'
import { Label } from './components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
import { Slider } from './components/ui/slider'

const FormSchema = z.object({
  modelName: z.string({ required_error: 'Selecione um modelo' }),
  modelPrice: z.coerce.number(),
  installments: z.coerce.number(),
  startingAmount: z.coerce.number(),
})

type FormType = z.infer<typeof FormSchema>

const models = [
  {
    name: 'iPhone 6',
    price: 1000,
  },
  {
    name: 'iPhone 6 plus',
    price: 1200,
  },
  {
    name: 'iPhone 7',
    price: 1400,
  },
  {
    name: 'iPhone 8',
    price: 1600,
  },
  {
    name: 'iPhone SE',
    price: 1800,
  },
  {
    name: 'iPhone XR',
    price: 2200,
  },
  {
    name: 'iPhone 12 Pro',
    price: 2600,
  },
  {
    name: 'iPhone 12 Pro Max',
    price: 2900,
  },
  {
    name: 'iPhone 13',
    price: 3200,
  },
  {
    name: 'iPhone 14',
    price: 3500,
  },
  {
    name: 'iPhone 14 Pro',
    price: 3800,
  },
  {
    name: 'iPhone 14 Pro Max',
    price: 4500,
  },
] as const

export function App() {
  const [total, setTotal] = useState(0)
  const { watch, control, setValue } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      modelName: '',
      modelPrice: 0,
      installments: 1,
      startingAmount: 0,
    },
  })
  const watchedModelName = watch('modelName')
  const watchedForm = watch()

  useEffect(() => {
    const model = models.find((item) => item.name === watchedModelName)

    if (model) {
      setValue('modelPrice', model?.price)
    } else {
      setValue('modelPrice', 0)
    }
  }, [watchedModelName, setValue])

  useEffect(() => {
    const price = parseFloat(String(watchedForm.modelPrice))
    const startingAmount = parseFloat(String(watchedForm.startingAmount))
    const installments = parseFloat(String(watchedForm.installments))

    const _total = (price - startingAmount) * Math.pow(1.047, installments)

    const result = _total + startingAmount

    setTotal(result)
  }, [watchedForm])

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-screen-sm">
        <CardHeader>
          <CardTitle>Calculadora de preços</CardTitle>
          <CardDescription>Simule a compra do seu jeito!</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex w-[250px] flex-col gap-2">
              <Label htmlFor="modelName">Modelo:</Label>
              <Controller
                control={control}
                name="modelName"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um modelo" />
                    </SelectTrigger>
                    <SelectContent className="h-[250px]">
                      {models.map((item, i) => (
                        <SelectItem key={i} value={item.name}>
                          <span>{item.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="entryAmount">Valor de entrada:</Label>
                <span>
                  {watchedForm.startingAmount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
              <Controller
                name="startingAmount"
                control={control}
                render={({ field }) => (
                  <Slider
                    onValueChange={field.onChange}
                    defaultValue={[field.value]}
                    id="startingAmount"
                    max={watchedForm.modelPrice}
                    step={100}
                  />
                )}
              />

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Min: R$ 0,00</span>
                <span>
                  Max:{' '}
                  {watchedForm.modelPrice.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="installments">Número de parcelas:</Label>
                <span>{watchedForm.installments}</span>
              </div>
              <Controller
                name="installments"
                control={control}
                render={({ field }) => (
                  <Slider
                    onValueChange={field.onChange}
                    defaultValue={[field.value]}
                    id="startingAmount"
                    max={24}
                    min={1}
                    step={1}
                  />
                )}
              />

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Min: 1</span>
                <span>Max: 24</span>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <CardTitle>
            <span className="">Total: </span>
            {total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </CardTitle>
        </CardFooter>
      </Card>
    </div>
  )
}
