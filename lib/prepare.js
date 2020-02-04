const execa = require("execa");

module.exports = async (
  pluginConfig,
  { cwd, env, stdout, stderr, nextRelease: { version }, logger }
) => {
  await versionResult;

  logger.log(`Package box to package.box`);

  const packageResult = execa("vagrant", ["package"], {
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
