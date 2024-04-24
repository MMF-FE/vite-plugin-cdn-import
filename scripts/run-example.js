import path from 'node:path'
import { execa } from 'execa'
import chalk from 'chalk'

const examplesDir = path.resolve('examples')
const example = process.argv[2]
const command = process.argv[3] || 'dev'

const runExample = async () => {
    const exampleDir = path.join(examplesDir, example)
    console.log(chalk.green(`example ${command}:`), example)
    await execa('pnpm', ['install'], { cwd: exampleDir, stdio: 'inherit' })
    execa('pnpm', ['run', command], { cwd: exampleDir, stdio: 'inherit' })
}

runExample()
