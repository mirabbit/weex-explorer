#!/usr/bin/env node
 // 获取参数
const path = require('path');
const fs = require('fs');
require('shelljs/global');
const shell = require('shelljs');
const ROOT = path.dirname(__dirname);
const DESTROOT = 'templates/special';
console.log(ROOT)

const copyDirArr = [
  'assets',
  'build',
  'customized_modules',
  // 'node_modules',
];

const copyFileArr = [
  'app.js',
  'index.html',
  'package.json',
  'README.md',
  'webpack.config.js',
  'weex.html'
];

/*
 * 复制目录、子目录，及其中的文件
 * @param src {String} 要复制的目录
 * @param dist {String} 复制到目标目录
 */
const copyDir = (src, dist, callback) => {
  fs.access(dist, (err) => {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  const _copy = (err, src, dist) => {
    if (err) {
      callback(err);
    } else {
      fs.readdir(src, (err, paths) => {
        if (err) {
          callback(err)
        } else {
          paths.forEach((path) => {
            const _src = src + '/' + path;
            const _dist = dist + '/' + path;
            fs.stat(_src, (err, stat) => {
              if (err) {
                callback(err);
              } else {
                // 判断是文件还是目录
                if (stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if (stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}

copyDirArr.forEach((item, index) => {
  copyDir(ROOT + '/' + item, DESTROOT + '/' + item, (err) => {
    if (err) {
        console.log(err);
      }
  })
});

copyFileArr.forEach((item, index) => {
  fs.stat(item, (err, stat) => {
    if (err) {
      callback(err);
    } else {
        // 判断是文件还是目录
        if (stat.isFile()) {
          shell.exec('cp ' + item + ' ' + DESTROOT + '/' + item, {silent: true}, (code, stdout, stderr) => {
            if(code != 0) {
              console.log(stderr);
            }
          });
        }
    }
  })
})


