/* Sass */

module.exports = function (gulp, plugin, config) {
    return function (source) {

        return gulp.src(typeof(source) === 'string' ? source : config.javascript.globs)
            .pipe( plugin.sourcemaps.init() )
            .pipe(plugin.plumber( {errorHandler: config.error.handler}) )
            .pipe(plugin.babel({
            	presets: "latest"
            }))
            .pipe(plugin.concat('script.min.js'))
            .pipe(plugin.uglify())
            // do not write source maps if production is set to true
            .pipe( plugin.sourcemaps.write(config.production ? '.' : null) )
            .pipe( 
                gulp.dest(config.javascript.outputDir) 
            )
        ;
    };
};