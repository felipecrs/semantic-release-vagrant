const execa = require("execa");
const resolveConfig = require("./resolve-config");
const getError = require("./get-error");
const csv = require("@fast-csv/parse");

module.exports = async (pluginConfig, context) => {
  const {
    cwd,
    env
  } = context;
  const errors = [];
  const {
    vagrantCloudToken
  } = resolveConfig(pluginConfig, context);

  if (!vagrantCloudToken) {
    errors.push(getError("ENOVAGRANTCLOUDTOKEN"));
  }

  if (
    (
      await execa("vagrant", ["-v"], {
        reject: false,
        cwd,
        env
      })
    ).exitCode !== 0
  ) {
    errors.push(getError("ENOVAGRANTCLI"));
  }

  if (
    (
      await execa("vagrant", ["cloud", "auth", "login"], {
        reject: false,
        cwd,
        env
      })
    ).exitCode !== 0
  ) {
    errors.push(getError("EVAGRANTCLOUDLOGIN"));
  }

  // TODO check if machine status is running
  /*
  const execa = require("execa");
  const csv = require("@fast-csv/parse");
  (async () => {
    const {
      stdout
    } = await execa.command("vagrant status c80fd53 --machine-readable");
    //console.log('child output:', stdout);

    var data = await csv
      .parseString(stdout, {
        headers: ["timestamp", "target", "type", "data"],
        strictColumnHandling: true
      });

    console.log(data.data);
  })();
  */

  return errors;
};