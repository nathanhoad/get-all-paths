const getAllPaths = require('..');

it('finds all paths in a directory', () => {
  const paths = getAllPaths(__dirname + '/test-paths');

  expect(paths instanceof Array).toBeTruthy();
  expect(paths.length).toBe(5);
  expect(paths[0]).toMatch(/^\//);
  expect(paths[0]).toMatch(/\.txt$/);
});
