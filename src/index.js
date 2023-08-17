const createApp = require('./app');

// Anonymous function
(async () => {
  const port = process.env.PORT || 4000;
  const app = await createApp();
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running in port ${port}`);
  });
})();
