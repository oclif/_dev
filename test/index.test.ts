import {describe, expect, output} from '@dxcli/dev-test'

import {run} from '../src'

describe.stdout('run', () => {
  it('example', async () => {
    await run(['node', 'js', 'example'])
    expect(output.stdout).to.contain('[echo] example workflow')
  })
})
