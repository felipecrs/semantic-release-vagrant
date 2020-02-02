module.exports = (pluginConfig, {
  env
}) => ({
  vagrantCloudToken: env.VAGRANT_CLOUD_TOKEN,
});