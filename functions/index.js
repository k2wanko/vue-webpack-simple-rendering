const functions = require('firebase-functions')

const fs = require('fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const LRU = require('lru-cache')
const resolve = file => path.resolve(__dirname, file)
const template = fs.readFileSync(resolve('./public/dist/index.html'), 'utf-8')


const bundle = require('./public/dist/vue-ssr-server-bundle.json')
const clientManifest = require('./public/dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(bundle, {
    clientManifest,
    template,
    cache: LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15
    }),
    basedir: resolve('./public/dist'),
    runInNewContext: false
})


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.index = functions.https.onRequest((req, res) => {
    res.setHeader("Content-Type", "text/html")

    const context = {
        url: req.url
    }

    renderer.renderToString(context, (err, html) => {
        const handleError = err => {
            res.status(500).end('500 | Internal Server Error')
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
        if (err) {
            return handleError(err)
        }
        res.end(html)
    })
})
