// Publishes the current version with npm (trusted publishing through OIDC),
// unless it is already on the registry. Called by the Release workflow.
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const { name, version } = JSON.parse(readFileSync('package.json', 'utf8'))

const published = (() => {
  try {
    execFileSync('npm', ['view', `${name}@${version}`, 'version'], { stdio: 'pipe' })
    return true
  } catch {
    return false
  }
})()

if (published) {
  console.log(`${name}@${version} is already published.`)
} else {
  execFileSync('npm', ['publish', '--access', 'public'], { stdio: 'inherit' })
  // `New tag:` lets changesets/action create the GitHub release.
  execFileSync('pnpm', ['changeset', 'tag'], { stdio: 'inherit' })
  console.log(`New tag: ${name}@${version}`)
}
