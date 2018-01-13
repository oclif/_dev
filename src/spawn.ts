import * as execa from 'execa'
import * as getStream from 'get-stream'

const debug = require('debug')('@dxcli/dev')

export default async function spawn(command: string, args: string[] = [], opts: execa.Options = {}) {
  debug('spawn', command, args, opts)

  const p = execa(command, args, opts)
  p.stdout.pipe(process.stdout)
  p.stderr.pipe(process.stderr)

  const [cmd, stdout, stderr] = await Promise.all([
    p,
    getStream(p.stdout),
    getStream(p.stderr),
  ])

  return {
    ...cmd,
    stdout,
    stderr,
  }
}
