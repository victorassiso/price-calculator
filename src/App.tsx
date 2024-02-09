import './global.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { modelArray, models } from './assets/models'
import { Button } from './components/ui/button'
import {
  Card,
  CardContent,
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
  modelName: z.string({ required_error: 'Selecione um modelo' }).min(2),
  installments: z.coerce.number(),
  startingAmount: z.coerce.number(),
})

type FormType = z.infer<typeof FormSchema>

export function App() {
  const [total, setTotal] = useState(0)
  const [modelPrice, setModelPrice] = useState(0)
  const [modelImg, setModelImg] = useState('')
  const { watch, control, setValue, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      modelName: '',
      installments: 1,
      startingAmount: 0,
    },
  })
  const watchedModelName = watch('modelName')
  const watchedInstallments = watch('installments')
  const watchedStartingAmount = watch('startingAmount')
  const watchedForm = watch()

  useEffect(() => {
    const model = models[watchedModelName]

    if (model) {
      setModelPrice(model.price)
      setModelImg(model.img)
    } else {
      setModelPrice(0)
      setModelImg('')
    }
  }, [watchedModelName, setValue])

  useEffect(() => {
    const price = modelPrice
    const startingAmount = parseFloat(String(watchedStartingAmount))
    const installments = parseFloat(String(watchedInstallments))

    const _total = (price - startingAmount) * Math.pow(1.047, installments)

    const result = _total + startingAmount

    setTotal(result)
  }, [modelPrice, watchedInstallments, watchedStartingAmount])

  function OpenWhatsAppLink() {
    const phoneNumber = '+5521995327044'
    const message = `Olá, gostaria de adquirir um ${watchedModelName} dando ${watchedStartingAmount.toLocaleString(
      'pt-BR',
      {
        style: 'currency',
        currency: 'EUR',
      },
    )} de entrada e parcelando em ${watchedInstallments} vezes.`

    const encodedMessage = encodeURIComponent(message)

    const whatsappLink =
      'https://wa.me/' + phoneNumber + '/?text=' + encodedMessage

    window.open(whatsappLink, '_blank')
  }

  return (
    <div className="flex h-screen min-w-[340px]  items-center justify-center">
      <Card className="relative w-full max-w-[700px]">
        <form onSubmit={handleSubmit(OpenWhatsAppLink)}>
          <div className="absolute right-2 top-5 hidden xs:block">
            <img src={modelImg} alt={modelImg} className="max-h-40" />
          </div>
          <CardHeader>
            <CardTitle className="text-center xs:w-80 xs:text-start">
              Simule facilmente o valor das parcelas do seu próximo produto
              Apple!
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 xs:w-[250px]">
              <Label htmlFor="modelName">Modelo:</Label>
              <Controller
                control={control}
                name="modelName"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger ref={field.ref}>
                      <SelectValue placeholder="Selecione um modelo" />
                    </SelectTrigger>
                    <SelectContent className="h-[250px]">
                      {modelArray.map((item, i) => (
                        <SelectItem key={i} value={item.name}>
                          <span>{item.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <div className="flex justify-center xs:hidden">
                <img src={modelImg} alt={modelImg} className="max-h-40" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="entryAmount">Valor de entrada:</Label>
                <span>
                  {watchedForm.startingAmount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'EUR',
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
                    max={600}
                    step={100}
                  />
                )}
              />

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Min: R$ 0,00</span>
                <span>
                  {/* Max:{' '}
                  {modelPrice.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'EUR',
                  })} */}
                  Max: R$ 600,00
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <CardTitle>
              <span className="text-muted-foreground">Total: </span>
              <span className="text-xl text-muted-foreground">
                {watchedInstallments}x de{' '}
              </span>
              <span className="mr-2 text-3xl">
                {total.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </span>
            </CardTitle>
            <Button
              variant="default"
              className="text-lg"
              size="lg"
              type="submit"
            >
              Comprar
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
