interface WhatsAppRedirectProps {
  productName: string
  startingAmount: number
  installments: number
}

export function whatsAppRedirect({
  productName,
  installments,
  startingAmount,
}: WhatsAppRedirectProps) {
  const phoneNumber = '+351910865962'
  const message = `Olá, estou interessado em adquirir um *${productName}* dando *${startingAmount.toLocaleString(
    'pt-BR',
    {
      style: 'currency',
      currency: 'EUR',
    },
  )}* de entrada e parcelando em *${installments}* vezes.`

  const encodedMessage = encodeURIComponent(message)

  const whatsappLink =
    'https://wa.me/' + phoneNumber + '/?text=' + encodedMessage

  window.open(whatsappLink, '_blank')
}
