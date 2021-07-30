const execa = require('execa')
const inc = require('semver/functions/inc')
const inquirer = require('inquirer')

const curVersion = require('../package.json').version

const release = async () => {
  console.log(`Current version: ${curVersion}`)

  const bumps = ['patch', 'minor', 'major', 'alpha', 'beta']
  const versions = bumps.reduce((obj, b) => {
    obj[b] = ['alpha', 'beta'].includes(b)
      ? inc(curVersion, 'prerelease', b)
      : inc(curVersion, b)
    return obj
  }, {})
  const bumpChoices = bumps.map(b => ({
    name: `${b} (${versions[b]})`,
    value: b
  }))

  const { bump } = await inquirer.prompt([
    {
      name: 'bump',
      message: 'Select release type:',
      type: 'list',
      choices: bumpChoices
    }
  ])

  const version = versions[bump]
  process.env.VERSION = version

  const { genDocs } = await inquirer.prompt([
    {
      name: 'genDocs',
      message: `Generate ${version} docs?`,
      type: 'confirm'
    }
  ])

  const { yes } = await inquirer.prompt([
    {
      name: 'yes',
      message: `Confirm releasing ${version}?`,
      type: 'confirm'
    }
  ])

  if (yes) {
    await execa('npm', ['run', 'build'], { stdio: 'inherit' })
    await execa('git', ['add', 'dist'], { stdio: 'inherit' })
    await execa('git', ['commit', '-m', `build: build ${version}`], {
      stdio: 'inherit'
    })
    if (genDocs) {
      await execa('npm', ['run', 'docs:build'], { stdio: 'inherit' })
      await execa('git', ['add', 'docs/.vuepress/dist'], { stdio: 'inherit' })
      await execa('git', ['commit', '-m', `build: docs ${version}`], {
        stdio: 'inherit'
      })
    }
    await execa(
      'npm',
      ['version', version, '-m', `build: release ${version}`],
      { stdio: 'inherit' }
    )
  }
}

release().catch(err => {
  console.error(err)
  process.exit(1)
})
