import { copyFileSync, ensureDirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs-extra';
import path from 'path';
function copyJsFiles(srcDir: string, destDir: string) {
    let files = readdirSync(srcDir);
    files.forEach(file => {
        let srcFilePath = path.join(srcDir, file);
        let destFilePath = path.join(destDir, file);
        let stat = statSync(srcFilePath);
        ensureDirSync(destDir);
        if (stat.isDirectory()) {
            copyJsFiles(srcFilePath, destFilePath);
        } else if (path.extname(file) === '.js' || path.extname(file) === '.styl' || path.extname(file) === '.css') {
            copyFileSync(srcFilePath, destFilePath);
        }
    });
}

copyJsFiles(path.join(__dirname, '../packages/ui-default'), path.join(__dirname, '../.cache/ts-out/ui/packages/ui-default'));

function transFuncs(dir: string, dep: number) {
    let files = readdirSync(dir);
    files.forEach(file => {
        let filePath = path.join(dir, file);
        let stat = statSync(filePath);
        if (stat.isDirectory()) {
            transFuncs(filePath, dep + 1);
        } else {
            let content = readFileSync(filePath, 'utf-8');
            if (/from 'vj\/(\S*)*'/g.test(content)) {
                console.log(filePath);
                content = content.replace(/from 'vj\/(\S*)*'/g, (match, p1) => {
                    let xx = `from '${(()=>{
                        let s = ``;
                        for(let now = 1;now <= dep;now++)
                        {
                            s += `../`;
                        }
                        if(s === '')
                        {
                            return './';
                        }
                        return s;
                    })()}${p1}'`;
                    console.log(xx);
                    return xx;
                });
                writeFileSync(filePath, content);
            }
            else if(/from '\/(\S*)*'/g.test(content))
            {
                console.log(filePath);
                content = content.replace(/from '\/(\S*)*'/g, (match, p1) => {
                    let xx = `from '${(() => {
                        let s = ``;
                        for (let now = 1; now <= dep; now++) {
                            s += `../`;
                        }
                        if (s === '') {
                            return './';
                        }
                        return s;
                    })()}${p1}'`;
                    console.log(xx);
                    return xx;});
                writeFileSync(filePath, content);
            }
        }
    });
}

transFuncs(path.join(__dirname, `../.cache/ts-out/ui/packages/ui-default`), 0);

