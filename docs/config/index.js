var path = require('canonical-path');
var Package = require('dgeni').Package;

var paths = {
  src: path.resolve(__dirname, '../../src'),
  docs: path.resolve(__dirname, '..'),
};

var files = {
  scripts: path.join(paths.src, '**', '*.js'),
  exclude_scripts: '',
};

module.exports = new Package('angular-bootstrap-select', [
  require('dgeni-packages/ngdoc'),
  require('dgeni-packages/nunjucks'),
])

.factory(function gitData() {
  return {
    version: {
      isSnapshot: true,
      branch: 'master',
      raw: 'v0.1.0',
    },
    versions: ['v0.0.2', 'v0.0.3', 'v0.0.4', 'v0.0.5','v0.1.0'],
    info: {
      owner: 'quentinlampin',
      repo: 'angular-bootstrap-select-updated',
    }
  };
})
.config(function (templateFinder, renderDocsProcessor, gitData) {
  renderDocsProcessor.extraData.git = gitData;
})

.config(function (templateFinder, readFilesProcessor, writeFilesProcessor) {
  readFilesProcessor.basePath = path.resolve(__dirname, '../..');
  readFilesProcessor.sourceFiles = [{
    include: files.scripts,
    basePath: paths.src
  }];
  templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));
  writeFilesProcessor.outputFolder = paths.docs;
});
