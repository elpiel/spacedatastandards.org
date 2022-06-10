import showdown from "showdown";
import { globby } from "globby";
import path from "path";
import { readFileSync, mkdir, copyFile, writeFileSync } from "fs";

let converter = new showdown.Converter();
converter.setOption('tables', true);

const paths = await globby([`${process.cwd()}/docs/standards/**/*.md`]);
paths.forEach(p => {

    let result = converter.makeHtml(readFileSync(p, "utf-8"));
    writeFileSync(p, result);

})

console.log(paths);