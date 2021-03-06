module.exports = function (grunt) {
    "use strict";
 
    grunt.initConfig({
        distdir: 'public/public/scripts/',
        srcdir: 'public/scripts/browser',
        ts: {
            // use to override the default options, See: http://gruntjs.com/configuring-tasks#options
            // these are the default options to the typescript compiler for grunt-ts:
            // see `tsc --help` for a list of supported options.
            options: {
                compile: true,                 // perform compilation. [true (default) | false]
                comments: false,               // same as !removeComments. [true | false (default)]
                target: 'es5',                 // target javascript language. [es3 (default) | es5]
                module: 'commonjs',                 // target javascript module style. [amd (default) | commonjs]
                sourceMap: true,               // generate a source map for every output js file. [true (default) | false]
                sourceRoot: '',                // where to locate TypeScript files. [(default) '' == source ts location]
                mapRoot: '',                   // where to locate .map.js files. [(default) '' == generated js location.]
                declaration: false,            // generate a declaration .d.ts file for every output js file. [true | false (default)]
                htmlModuleTemplate: 'My.Module.<%= filename %>',    // Template for module name for generated ts from html files [(default) '<%= filename %>']
                htmlVarTemplate: '<%= ext %>'                       // Template for variable name used in generated ts from html files [(default) '<%= ext %>]
                                                                    // Both html templates accept the ext and filename parameters.
            },
            // a particular target
            dev: {
                src: ["public/**/*.ts"],          // The source typescript files, http://gruntjs.com/configuring-tasks#files
                html: ['public/**/**.tpl.html'],  // The source html files, https://github.com/basarat/grunt-ts#html-2-typescript-support
                reference: 'public/reference.ts', // If specified, generate this file that you can use for your reference management
                out: 'public/out.js',             // If specified, generate an out.js file which is the merged js file
                // use to override the grunt-ts project options above for this target
                options: {
                    module: 'commonjs',
                },
            },
            decs: {
                src: ["public/public/scripts/browser/client-ajax.js"],
                html: ['public/**/**.tpl.html'],
                reference: 'public/reference.ts',
                out: 'public/out.js',
                options: {
                    module: 'commonjs',
                    declaration: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['public/**/*.ts'],
                tasks: ['ts:dev', 'notify:ts_ok'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            },
            bro: {
                files: ['public/scripts/browser/**/*.js'],
                tasks: ['browserify', 'notify:bro_ok'],
                options: {
                    interrupt: true,
                    atBegin: true
                }
            }
        },
        browserify: {
            app: {
                src: ['public/scripts/browser/*.js',
                'public/scripts/common/*.js'],
                dest: 'public/public/scripts/app.js'
            }   
        },
        notify: {
            ts_ok: {
              options: {
                message: 'Typescript ok!'
              }
            },
            bro_ok: {
              options: {
                message: 'Browserify ok!'
              }
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-notify');
    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("scripts", ["watch:scripts"]);
    grunt.registerTask("bro", ["watch:bro"]);
};
