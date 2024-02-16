interface useInstallmentsProps {
  startingAmount: number
  installments: number
}

interface useInstallmentsReturn {
  minInstallments: number
  maxInstallments: number
  installmentsStep: number
  installments: number
}
export function useInstallments({
  installments,
}: useInstallmentsProps): useInstallmentsReturn {
  const minInstallments = 1
  const maxInstallments = 24
  const installmentsStep = 1

  const newInstallments =
    installments > maxInstallments ? maxInstallments : installments

  return {
    minInstallments,
    maxInstallments,
    installmentsStep,
    installments: newInstallments,
  }
}
