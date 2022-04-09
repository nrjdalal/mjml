import { globby } from 'globby'
import { exec } from 'child_process'

const paths = await globby('./src/**/*.mjml')

for (let index = 0; index < paths.length; index++) {
  const src = paths[index]
  const dist = src.slice(0, src.lastIndexOf('/') + 1).replace('./src/', './public/')

  exec(`mkdir -p '${dist}' && npx mjml '${src}' -o '${dist}'`)
}
