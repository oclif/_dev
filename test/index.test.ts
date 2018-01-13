import {run} from '../src'

import {describe, expect, output} from './helpers'

describe.env().stdout('run', () => {
  it('example', async () => {
    await run(['node', 'js', 'example'])
    expect(output.stdout).to.contain('[echo] example workflow')
  })
})
