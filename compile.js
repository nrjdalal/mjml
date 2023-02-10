import { globby } from 'globby'
import { exec } from 'child_process'

const files = await globby('./src/**/*.mjml')

for (let index = 0; index < files.length; index++) {
  const src = files[index]
  const dist = src.slice(0, src.lastIndexOf('/') + 1).replace('./src/', './public/')

  exec(`mkdir -p '${dist}' && pnpx mjml '${src}' -o '${dist}'`)
}
