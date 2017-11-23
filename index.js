const FS = require('fs');

/**
 * Get an array of all paths in a directory and its subdirectorys
 * @param {(string|Array<strong>)} basePath A directory to start in
 * @returns {Array<string>} The list of paths
 */
function getAllPaths() {
  const basePaths = Array.from(arguments);

  if (basePaths.length === 0) return [];

  // If given a list of paths
  if (basePaths.length > 1) {
    return basePaths
      .reduce((all, current) => {
        return all.concat(getAllPaths(current));
      }, [])
      .sort((a, b) => {
        // Remove any base paths from a and b to get a proper sort
        basePaths.forEach(p => {
          a = a.replace(p + '/', '');
          b = b.replace(p + '/', '');
        });

        return a.localeCompare(b);
      });
  }

  return FS.readdirSync(basePaths[0]).reduce((all, current) => {
    const path = basePaths[0] + '/' + current;

    if (FS.statSync(path).isDirectory()) {
      return all.concat(getAllPaths(path));
    } else {
      return all.concat(path);
    }
  }, []);
}

module.exports = getAllPaths;
