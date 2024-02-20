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

  const installmentType =
    installments <= 6 ? 'mensal' : installments <= 12 ? 'quinzenal' : 'semanal'

  const message = `Olá, tenho interesse na aquisição de um _${productName}_, optanto por realizar um pagamento inicial de _${startingAmount.toLocaleString(
    'pt-BR',
    {
      style: 'currency',
      currency: 'EUR',
    },
  )}_ e parcelando o restante em _${installments}_ ${installments > 1 ? 'vezes' : 'vez'}, com vencimento ${installmentType}.`

  const encodedMessage = encodeURIComponent(message)

  const whatsappLink =
    'https://wa.me/' + phoneNumber + '/?text=' + encodedMessage

  window.open(whatsappLink, '_blank')
}
