import './global.css'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { products } from './assets/products'
import { Button } from './components/ui/button'
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
import { useInstallments } from './hooks/useInstallments'
import { initialProduct, useProduct } from './hooks/useProduct'
import { useStartingAmount } from './hooks/useStartingAmount'
import { whatsAppRedirect } from './utils/whastAppRedirect'
const FormSchema = z.object({
  modelName: z.string({ required_error: 'Selecione um produto' }).min(2),
  installments: z.coerce.number(),
  startingAmount: z.coerce.number(),
})

type FormType = z.infer<typeof FormSchema>

export function App() {
  const { watch, control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      modelName: initialProduct.name,
      installments: 6,
      startingAmount: 0,
    },
  })
  const watchedModelName = watch('modelName')
  const watchedInstallments = parseFloat(String(watch('installments')))
  const watchedStartingAmount = parseFloat(String(watch('startingAmount')))
  const { product } = useProduct(watchedModelName)
  const {
    startingAmount,
    minStartingAmount,
    maxStartingAmount,
    startingAmountStep,
  } = useStartingAmount({ product, startingAmount: watchedStartingAmount })
  const { installments, maxInstallments, minInstallments, installmentsStep } =
    useInstallments({
      installments: watchedInstallments,
      startingAmount,
    })

  const total = (product.price - startingAmount) * 2

  const totalPerInstallment =
    total === 0 || !watchedModelName ? 0 : total / installments

  const roundedTotalPerInstallment =
    Math.ceil(totalPerInstallment) - totalPerInstallment > 0.5
      ? Math.floor(totalPerInstallment) + 0.5
      : Math.ceil(totalPerInstallment)

  function handleWhatsAppRedirect() {
    whatsAppRedirect({
      productName: watchedModelName,
      installments,
      startingAmount,
    })
  }

  return (
    <div className="flex h-screen min-w-[340px]  items-center justify-center">
      <Card className="relative mx-2 w-full max-w-[700px]">
        <form onSubmit={handleSubmit(handleWhatsAppRedirect)}>
          <div className="absolute right-2 top-5 hidden xs:block">
            <img src={product.img} alt={product.img} className="max-h-40" />
          </div>
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-center xs:w-80 xs:text-start">
              {/* Simule facilmente o valor das parcelas do seu próximo produto
              Apple! */}
              Simulador de preços
            </CardTitle>
            <CardDescription className="text-center xs:w-80 xs:text-start">
              Escolha a que melhor se encaixa entre parcelas mensais (até 6x),
              quinzenais (até 12x) ou semanais (até 24x).
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 xs:w-[250px]">
              <Label htmlFor="modelName">Produto:</Label>
              <Controller
                control={control}
                name="modelName"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger ref={field.ref} className="border-primary">
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent className="h-[250px]">
                      {products.map((item, i) => (
                        <SelectItem key={i} value={item.name}>
                          <span>{item.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <div className="flex justify-center xs:hidden">
                <img src={product.img} alt={product.img} className="max-h-40" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="entryAmount">Valor de entrada:</Label>
                <span>
                  {startingAmount.toLocaleString('pt', {
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
                    defaultValue={[product.minStartingAmount]}
                    id="startingAmount"
                    min={minStartingAmount}
                    max={maxStartingAmount}
                    step={startingAmountStep}
                  />
                )}
              />

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>
                  Min:{' '}
                  {minStartingAmount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </span>
                <span>
                  Max:{' '}
                  {maxStartingAmount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'EUR',
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="installments">
                  Número de parcelas{' '}
                  {installments <= 6
                    ? 'mensais'
                    : installments <= 12
                      ? 'quinzenais'
                      : 'semanais'}
                  :
                </Label>
                <span>{installments}</span>
              </div>
              <Controller
                name="installments"
                control={control}
                render={({ field }) => (
                  <Slider
                    onValueChange={field.onChange}
                    defaultValue={[field.value]}
                    id="installments"
                    max={maxInstallments}
                    min={minInstallments}
                    step={installmentsStep}
                  />
                )}
              />

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Min: {minInstallments}</span>
                <span>Max: {maxInstallments}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <CardTitle>
              <span className="text-muted-foreground">Total: </span>
              <span className="text-xl text-muted-foreground">
                {installments}x de{' '}
              </span>
              <span className="mr-2 text-3xl">
                {roundedTotalPerInstallment.toLocaleString('pt-BR', {
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
