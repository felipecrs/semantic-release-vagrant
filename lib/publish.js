const execa = require("execa");

module.exports = async (pluginConfig, { name }, context) => {
  const {
    cwd,
    env,
    stdout,
    stderr,
    nextRelease: { version },
    logger
  } = context;

  const { organization, boxName } = resolveConfig(pluginConfig, context);

  logger.log(`Publishing version ${version} to Vagrant Cloud`);

  // TODO fetch provider name
  const result = execa(
    "vagrant",
    [
      "cloud",
      "publish",
      "--force",
      `${organization}/${boxName}`,
      version,
      "virtualbox",
      "package.box"
    ],
    {
      cwd,
      env
    }
  );
  result.stdout.pipe(stdout, {
    end: false
  });
  result.stderr.pipe(stderr, {
    end: false
  });
  await result;

  logger.log(`Published box ${organization}/${boxName} version ${version}`);
  return {
    name: "Vagrant box",
    url: `https://app.vagrantup.com/${organization}/boxes/${boxName}/versions/${version}`
  };
};
