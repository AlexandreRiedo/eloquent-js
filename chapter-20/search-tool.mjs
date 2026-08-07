import { readdirSync, readFileSync, statSync } from "node:fs";
import { argv } from "node:process";

const pattern = new RegExp(argv[2]);
for (let fileName of argv.slice(3)) {
    searchFile(fileName, pattern);
}

function searchFile(fileName, pattern) {
    const fileStat = statSync(fileName);

    if (fileStat.isFile() && pattern.test(readFileSync(fileName, "utf8"))) {
        console.log(fileName);
    } else if (fileStat.isDirectory()) {
        readdirSync(fileName).forEach((f) =>
            searchFile(fileName + "/" + f, pattern),
        );
    }
}

/*
Compare-Object (node .\coding\eloquent-js\chapter-20\search-tool.mjs const coding) (node .\coding\eloquent-js\chapter-20\search-tool-correction.mjs const coding)
*/
