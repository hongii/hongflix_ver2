module.exports = {
  apps: [
    {
      name: "hongflix_ver2_server",
      script: "npm run start:production",
      env: {
        PORT: 4000,
      },
    },
  ],
};
