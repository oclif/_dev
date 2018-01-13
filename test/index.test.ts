import {expect} from 'chai'
import * as stripAnsi from 'strip-ansi'

import {run} from '../src'

const {env} = process

beforeEach(() => {
  process.env = {}
})

afterEach(() => {
  process.env = env
})

describe('run', () => {
  it('example', async () => {
    const {stdout} = await run(['node', 'js', 'example'])
    expect(stripAnsi(stdout)).to.contain('[echo] example workflow')
  })
})
