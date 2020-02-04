const execa = require("execa");
const getError = require("./get-error");

module.exports = async ({ organization, boxName }, { cwd, env }) => {
  const errors = [];

  if (!organization) {
    errors.push(getError("ENOORGANIZATION"));
  }

  if (!boxName) {
    errors.push(getError("ENOBOXNAME"));
  }

  if (!env.VAGRANT_CLOUD_TOKEN) {
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
  } else if (env.VAGRANT_CLOUD_TOKEN) {
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
