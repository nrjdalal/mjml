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

  const time = new Date(fs.statSync(src).ctime).getTime()

  if (!history.includes(src + '-' + time)) {
    fs.appendFileSync(
      './public/last-compiled.txt',
      src + '-' + time + '\n',
      function (err) {
        if (err) return console.log(err)
      }
    )

    const dist = src
      .slice(0, src.lastIndexOf('/') + 1)
      .replace('./src/', './public/')

    const filename =
      src.slice(src.lastIndexOf('/') + 1, src.lastIndexOf('.')) + '.html'

    console.log(`Compiling ${src} to ${dist}${filename}`)

    exec(
      `mkdir -p '${dist}' && mjml '${src}' -o '${dist}${filename}' -c.keepComments false`
    )
  }
}
