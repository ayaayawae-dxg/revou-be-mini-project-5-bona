const config = {
  host: process.env.HOST || "0.0.0.0",
  port: process.env.HOST_PORT || 5002,

  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,

  jwt_secret: process.env.JWT_SECRET,

  rabbitmq_host: process.env.RABBITMQ_HOST
};

export default config;
