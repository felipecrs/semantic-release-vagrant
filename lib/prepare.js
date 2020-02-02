const execa = require('execa');

module.exports = async (pluginConfig, {
  cwd,
  env,
  stdout,
  stderr,
  nextRelease: {
    version
  },
  logger
}) => {
  logger.log(`Write version ${version} to package.json`);

  const versionResult = execa('npm', ['version', version, '--no-git-tag-version'], {
    cwd,
    env
  });
  versionResult.stdout.pipe(stdout, {
    end: false
  });
  versionResult.stderr.pipe(stderr, {
    end: false
  });

  await versionResult;

  logger.log(`Package box to package.box`);

  const packageResult = execa('vagrant', ['package'], {
    cwd,
    env
  });
  packageResult.stdout.pipe(stdout, {
    end: false
  });
  packageResult.stderr.pipe(stderr, {
    end: false
  });

  await packageResult;
};