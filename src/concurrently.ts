import cli from 'cli-ux'
import * as execa from 'execa'

export default function concurrently(tasks: string[]) {
  cli.log(tasks.map(t => `$ ${t}`).join('\n'))
  const names = tasks.map(t => t.split(' ')[0]).join()

  return execa('concurrently', ['-n', names, '-s', 'all', ...tasks], {
    stdio: cli.config.mock ? [] : 'inherit',
  })
}
