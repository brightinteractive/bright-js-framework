import 'colors'

export function stage(description: string, fn?: () => void) {
  process.stderr.write((description + '...').grey)

  if (fn) {
    try {
      fn()

    } catch (error) {
      process.stderr.write(' [FAILED]\n'.red)
      throw error
    }

    process.stderr.write(' [OK]\n'.green)

  } else {
    process.stderr.write('\n')
  }
}

export function note(...descriptions: string[]) {
  process.stderr.write(descriptions.join(' ') + '\n')
}
