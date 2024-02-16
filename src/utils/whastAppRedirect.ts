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
  const phoneNumber = '+5521995327044'
  const message = `Olá, gostaria de adquirir um ${productName} dando ${startingAmount.toLocaleString(
    'pt-BR',
    {
      style: 'currency',
      currency: 'EUR',
    },
  )} de entrada e parcelando em ${installments} vezes.`

  const encodedMessage = encodeURIComponent(message)

  const whatsappLink =
    'https://wa.me/' + phoneNumber + '/?text=' + encodedMessage

  window.open(whatsappLink, '_blank')
}
