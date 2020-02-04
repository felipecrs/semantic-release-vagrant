const execa = require("execa");
var fs = require("fs");

module.exports = async ({ cwd, env, stdout, stderr, logger }) => {
  fs.stat("./package.box", err => {
    if (!err) {
      logger.log("There is already a package.box, removing it");
      fs.unlink("./package.box", err => {
        if (err) {
          throw err;
        }
      });
    }
  });

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
