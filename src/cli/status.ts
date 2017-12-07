import 'colors'

export function stage<T>(description: string, fn: () => T): T {
  process.stderr.write((description + '...').grey)

  try {
    const result = fn()
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
