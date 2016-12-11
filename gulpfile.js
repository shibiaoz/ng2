var rollup = require('rollup');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');
var uglify = require('rollup-plugin-uglify');
var exec = require('child_process').exec;
var gulp = require('gulp');

gulp.task('server', [], function (cb) {
  var exec = require('child_process').exec;
  exec('npm run lite', function(err) {
    if (err) return cb(err); // 返回 error
    cb(); // 完成 task
    console.log("---------server--------------");
  });
})

gulp.task('dev', ['ngc'], function () {
  rollupFun();
});

gulp.task('ngc', [], function (cb) {
    console.log("---------ngc entry--------------");
    var exec = require('child_process').exec;
    exec('npm run ngc', function(err) {
        if (err) return cb(err); // 返回 error
        cb(); // 完成 task
        console.log("---------ngc--------------");
    });
});

function rollupFun () {
    console.log("---------rollupFun entry--------------");
    rollup.rollup({
    entry: 'tsOut/app/main.js',
    plugins: [
      nodeResolve({
        jsnext: true,
        module: true
      }),
      commonjs({
        include: 'node_modules/rxjs/**',
      }),
      uglify()
    ]
  }).then(function (bundle) {
    bundle.write({
      format: 'iife',
      moduleName: 'main', //umd或iife模式下，若入口文件含 export，必须加上该属性
      dest: 'dist/build.js',
      sourceMap: true //加上这里即可
    });
  });
}


gulp.task('watch', ['server', 'dev'], function () {
  gulp.watch('app/*.ts', ['dev'], function () {
      console.log("---------change --------------");
  });
});


gulp.task('test1', function () {
    console.log('test1....');
});

gulp.task('test', function () {
    gulp.watch('app/*.ts', ['dev'], function () {
        console.log('change...');
    });
});


// gulp.task('test', function () {
//     roolup.rollup(roolupConfig).
//     pipe(gulp.dest('dista'))
// })
