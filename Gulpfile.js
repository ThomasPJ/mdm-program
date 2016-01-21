var gulp = require("gulp")
  , jade = require("gulp-jade")
  , stylus = require("gulp-stylus")
  , cssmin = require("gulp-cssmin")
  , ghPages = require('gulp-gh-pages')
  , autoprefixer = require("gulp-autoprefixer")

  , i18n = require("./i18n")
  , projects = require("./projects")

  , markupOptions = {
      locals : {
        i18n : i18n,
        projects : projects
      }
    }

gulp.task("assets", function() {
  return gulp.src("assets/**/*")
    .pipe(gulp.dest("dist/assets"))
})

gulp.task("markup", function(){
  return gulp.src("pages/**.jade")
    .pipe(jade(markupOptions))
    .pipe(gulp.dest("dist"))
})

gulp.task("styles", function(){
  return gulp.src("styles/index.styl")
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest("dist/styles"))
})

gulp.task("images", function(){
  return gulp.src("images/**.*")
    .pipe(gulp.dest("dist/images"))
})

gulp.task("icons", function(){
  return gulp.src("icons/**.svg")
    .pipe(gulp.dest("dist/images/icons"))
})

gulp.task("watch", function(){
  gulp.watch("styles/**.styl", ["styles"])
  gulp.watch("images/**.*", ["images"])
  gulp.watch(["pages/**.jade", "layouts/**.jade"], ["markup"])
})

gulp.task("default", ["assets", "markup", "styles", "icons", "images"])

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});
