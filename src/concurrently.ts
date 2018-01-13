import cli from 'cli-ux'
import * as _ from 'lodash'

import spawn from './spawn'

export default async function concurrently(tasks: string[]) {
  const supportsColor = require('supports-color')
  cli.log(tasks.map(t => `$ ${t}`).join('\n'))
  const names = tasks.map(t => t.split(' ')[0])
  const level = supportsColor.stdout.level && supportsColor.stderr.level

  tasks = _([names, tasks]).unzip().map(([name, task]) => {
    const opts = process.env[`DXCLI_${name.toUpperCase()}_OPTS`]
    return opts ? `${task} ${opts}` : task
  }).value()

  return spawn('concurrently', [level ? '--color' : '--no-color', '-n', names.join(','), '-s', 'all', ...tasks], {
    env: {
      FORCE_COLOR: process.env.FORCE_COLOR || (level ? level.toString() : '0')
    }
  })
}
