import { describe, expect, it, vi } from 'vitest'
import { usePrint } from '../usePrint'
import { PrintService } from '@/services/printService.ts'

describe('usePrint', () => {
  let mockPrintService: PrintService

  beforeEach(() => {
    // Create a mock PrintService
    mockPrintService = {
      print: vi.fn(),
    } as never

    // Replace the PrintService instantiation with our mock
    vi.spyOn(PrintService.prototype, 'print').mockImplementation(mockPrintService.print)
  })

  it('should call print method of PrintService', async () => {
    const { printScore } = usePrint()

    await printScore()

    expect(mockPrintService.print).toHaveBeenCalled()
  })

  it.skip('should handle print errors gracefully', async () => {
    // Mock print method to throw an error
    vi.spyOn(PrintService.prototype, 'print').mockRejectedValue(new Error('Print failed'))

    const { printScore } = usePrint()

    // Expect the error to be caught without throwing
    await expect(printScore()).resolves.not.toThrow()
  })
})
