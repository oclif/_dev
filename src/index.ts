import * as readPkg from 'read-pkg-up'

import concurrently from './concurrently'

export interface Workflows {
  [k: string]: string[]
}

export async function run(argv = process.argv) {
  const pkg = await getPkg()
  const workflows = getWorkflows(pkg)
  const workflowNames = Object.keys(workflows)
  if (workflowNames.length === 0) throw new Error(`dxcli.workflows is not defined in ${pkg.path}`)
  let [, , cmd, ...extraArgs] = argv
  const workflow = workflows[cmd]
  if (!workflow) throw new Error(`USAGE: dxcli-dev (${workflowNames.join('|')}) <args>...`)

  const lastTask = workflow[workflow.length - 1]
  workflow[workflow.length - 1] = `${lastTask} ${extraArgs.join(' ')}`

  return concurrently(workflow)
}

async function getPkg(): Promise<readPkg.Package> {
  const pkg = await readPkg()
  pkg.pkg.dxcli = pkg.pkg.dxcli || {}

  return pkg
}

function getWorkflows(pkg: readPkg.Package): Workflows {
  return pkg.pkg.dxcli.workflows || {}
}
