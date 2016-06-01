#!/usr/bin/env node

module.exports = function(ctx) {
  var path = require('path');
  var glob = ctx.requireCordovaModule('glob');
  var shelljs = ctx.requireCordovaModule('shelljs');
  var elementtree = ctx.requireCordovaModule('elementtree');

  shelljs.config.silent = true;
  shelljs.config.verbose = false;

  function copy(dest, src) {
    var cpopt = typeof shelljs.set === 'function' ? '-rn' : '-r';
    glob.sync(src).forEach(function(f) {
      shelljs.cp(cpopt, f, dest);
    });
  }

  function doit(element, dest, src) {
    dest = dest || '.';
    src = src || '.';
    var children = element.findall('./resource');
    if (!children.length && dest !== src) {
      copy(dest, src);
      return;
    }
    shelljs.mkdir('-p', dest);
    children.forEach(function(child) {
      var dest2 = child.attrib.dest || '.';
      var src2 = child.attrib.src || '.';
      doit(child, path.resolve(dest, dest2), path.resolve(src, src2));
    });
  }

  var root = ctx.opts.projectRoot;
  doit(elementtree.parse(shelljs.cat('config.xml')), root, root);
};
