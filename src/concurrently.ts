import cli from 'cli-ux'

import spawn from './spawn'

export default async function concurrently(tasks: string[]) {
  const supportsColor = require('supports-color')
  cli.log(tasks.map(t => `$ ${t}`).join('\n'))
  const names = tasks.map(t => t.split(' ')[0]).join()
  const level = supportsColor.stdout.level && supportsColor.stderr.level

  return spawn('concurrently', [level ? '--color' : '--no-color', '-n', names, '-s', 'all', ...tasks], {
    env: {
      FORCE_COLOR: process.env.FORCE_COLOR || (level ? level.toString() : '0')
    }
  })
}
