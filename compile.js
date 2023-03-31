import { globby } from 'globby'
import { exec } from 'child_process'
import fs from 'fs'

const files = await globby('./src/**/*.mjml')

if (!fs.existsSync('./public/last-compiled.txt')) {
  console.log('Creating history file')
  fs.writeFileSync('./public/last-compiled.txt', '', function (err) {
    if (err) return console.log(err)
  })
}

const history = fs.readFileSync(
  './public/last-compiled.txt',
  'utf8',
  function (err, data) {
    return data
  }
)

for (let index = 0; index < files.length; index++) {
  const src = files[index]

  console.log(fs.statSync(src).mtime)

  if (!history.includes(src + fs.statSync(src).mtime)) {
    fs.appendFileSync(
      './public/last-compiled.txt',
      src + fs.statSync(src).mtime + '\n',
      function (err) {
        if (err) return console.log(err)
      }
    )

    const dist = src
      .slice(0, src.lastIndexOf('/') + 1)
      .replace('./src/', './public/')

    exec(`mkdir -p '${dist}' && pnpx mjml '${src}' -o '${dist}'`)
  }
}
