import { PrintService } from '../services/printService'

const printService = new PrintService()

export function usePrint() {
  const printScore = async () => {
    await printService.print()
  }

  return {
    printScore,
  }
}
