const templates = 'src/site/templates';
const assets    = `${templates}/assets`;

let config = {
  ssh: {
    port: 22
  },

  rsync: {
    up: {
      dest: '/var/www/public_html/',
      src: './public/dist/',
      exclude: [
        "bs-config.json",
        "node_modules",
        "*.ts",
        "*.js.map",
        "typings",
      ]
    },
    server: {
      dest: '/var/www/server/',
      src: './',
      exclude: [
        ".gitignore",
        ".gitmodules",
        "node_modules",
        "gulpfile.babel.js",
        "public",
        "gulp",
        ".git*",
      ],

    }
  }
};
module.exports = config;
