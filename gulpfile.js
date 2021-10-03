import { task, src, dest, watch, series } from "gulp";
import sass from "gulp-sass";
import { stream, init, reload } from "browser-sync";
import { logError } from "gulp-sass";

task("sass", () => {
  return src("./scss/main.scss")
    .pipe(sass().on("Error", logError))
    .pipe(dest("css"))
    .pipe(stream());
});

task("watch", () => {
  init({
    server: {
      baseDir: "./",
    },
  });

  watch("./scss/**/*.scss", series(["scss"]));
  watch(["./*.html", "./**/*.js"]).on("change", reload);
});

//   gulp.watch(['./src/assets/css/*.scss'], ['css']); ?
//   gulp.watch(['./src/assets/css/**/*.scss'], ['css']);
// ["./scss/**/*.scss"]
