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

  logger.log(`Publishing version ${version} to Vagrant Cloud`);

  // TODO fetch provider name
  const result = execa(
    "vagrant",
    ["cloud", "publish", "--force", name, version, "virtualbox", "package.box"],
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

  logger.log(`Published ${name}@${version}`);
  return {
    name: "Vagrant box",
    url: `https://vagrantcloud.com/${name}`
  };
};
