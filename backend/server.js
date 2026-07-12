const app = require('./app');
const connectDB = require('./config/db');
const { PORT } = require('./config/env');
const createAdmin = require('./modules/admin/admin.seed');

const startServer = async () => {
  await connectDB();
  await createAdmin();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

startServer();
