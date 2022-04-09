import { globby } from 'globby'
import { exec } from 'child_process'

const dirs = []

const compile = async () => {
  const paths = await globby('./src/**/*.mjml')

  for (let index = 0; index < paths.length; index++) {
    const src = paths[index].slice(0, paths[index].lastIndexOf('/') + 1)

    if (!dirs.includes(src)) {
      const dist = src.slice(0, src.lastIndexOf('/') + 1).replace('./src/', './public/')
      exec(`mkdir -p '${dist}' && npx mjml -w '${src}/*.mjml' -o '${dist}'`)
      dirs.push(src)
    }
  }
}

compile()

setInterval(() => {
  compile()
}, 1000)
