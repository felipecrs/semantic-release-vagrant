const pkg = require("../../package.json");

const [homepage] = pkg.homepage.split("#");
const linkify = file => `${homepage}/blob/master/${file}`;

module.exports = {
  ENOORGANIZATION: () => ({
    message: "No organization specified.",
    details: `An [organization option](${linkify(
      "README.md#options"
    )}) must be set in semantic-release configuration.`
  }),
  ENOBOXNAME: () => ({
    message: "No box name specified.",
    details: `A [boxName option](${linkify(
      "README.md#options"
    )}) must be set in semantic-release configuration.`
  }),
  ENOVAGRANTCLI: () => ({
    message: "The Vagrant CLI must be installed.",
    details: `The \`vagrant\` command line has to be installed in your CI environment and available in the \`PATH\` environment variable.

See [Vagrant installation](${linkify(
      "README.md#vagrant-installation"
    )}) for more details.`
  }),
  EVAGRANTCLOUDLOGIN: () => ({
    message: "Vagrant Cloud login failed.",
    details: `The \`VAGRANT_CLOUD_TOKEN\` environment variable must be a valid token in order to login in Vagrant Cloud.

Please visit your account page on [vagrantup.com](https://app.vagrantup.com/settings/security) and to set it in the \`VAGRANT_CLOUD_TOKEN\` environment variable on your CI environment.`
  }),
  ENOPKGNAME: () => ({
    message: "Missing `name` property in `package.json`.",
    details: `The \`package.json\`'s [name](https://docs.npmjs.com/files/package.json#name) property is required in order to publish a Vagrant box.

Please make sure to add a valid \`name\` for your package in your \`package.json\`.`
  }),
  ENOPKG: () => ({
    message: "Missing `package.json` file.",
    details: `A [package.json file](https://docs.npmjs.com/files/package.json) at the root of your project is required to publish a Vagrant box.

Please follow the [npm guideline](https://docs.npmjs.com/getting-started/creating-node-modules) to create a valid \`package.json\` file.`
  })
};
