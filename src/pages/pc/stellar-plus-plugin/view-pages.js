const path = require("path")
const fs = require("fs")

module.exports = function viewPages() {
    const dir = path.join(process.cwd(), "src/subPackages_pages_view")
    const pages = fs.readdirSync(dir)
    pages.forEach(name => {
        const code = fs.readFileSync(path.join(dir, name, `${name}.vue`))
        fs.writeFileSync(path.join(dir, name, `page_code.json`), JSON.stringify({ code: code.toString() }))
    })
}