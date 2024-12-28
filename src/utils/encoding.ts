// Safely encode data for URL transfer
export function encodeData(data: unknown): string {
  const jsonString = JSON.stringify(data)
  // Use encodeURIComponent for URI-safe encoding
  return encodeURIComponent(jsonString)
}

// Safely decode data from URL transfer
export function decodeData<T>(encodedData: string): T {
  try {
    const jsonString = decodeURIComponent(encodedData)
    return JSON.parse(jsonString)
  } catch (error) {
    console.error('Error decoding data:', error)
    throw new Error('Invalid data format')
  }
}
