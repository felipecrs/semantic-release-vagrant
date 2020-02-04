const execa = require("execa");

module.exports = async ({ cwd, env, stdout, stderr, logger }) => {
  logger.log(`Packaging box to package.box`);

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
