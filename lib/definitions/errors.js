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
  ENOVAGRANTCLOUDTOKEN: () => ({
    message: "No Vagrant Cloud token specified.",
    details: `An [Vagrant Cloud token](${linkify(
      "README.md#vagrant-cloud-authentication"
    )}) must be created and set in the \`VAGRANT_CLOUD_TOKEN\` environment variable on your CI environment.

Please visit your account page on [vagrantup.com](https://app.vagrantup.com/settings/security) and to set it in the \`VAGRANT_CLOUD_TOKEN\` environment variable on your CI environment.`
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
  })
};
