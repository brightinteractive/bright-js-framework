import 'colors'

export async function stage<T>(description: string, fn: () => T): Promise<T> {
  process.stderr.write((description + '...').grey)

  try {
    const result = await fn()
    process.stderr.write(' [OK]\n'.green)
    return result

  } catch (error) {
    process.stderr.write(' [FAILED]\n'.red)
    throw error
  }
}

export function note(...descriptions: string[]) {
  process.stderr.write(descriptions.join(' ') + '\n')
}
