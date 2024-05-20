const config = {
  host: process.env.HOST || "0.0.0.0",
  port: process.env.HOST_PORT || 5000,

  db_host: process.env.DB_HOST || "127.0.0.1",
  db_port: process.env.DB_PORT || 3306,
  db_user: process.env.DB_USER || "root",
  db_password: process.env.DB_PASSWORD || "",
  db_name: process.env.DB_NAME || "",

  jwt_secret: process.env.JWT_SECRET || "",

  rabbitmq_host: process.env.RABBITMQ_HOST || "",
  
  kafka_key: process.env.KAFKA_KEY || "",
  kafka_secret: process.env.KAFKA_SECRET || "",
  kafka_resource: process.env.KAFKA_RESOURCE || "",
  kafka_server: process.env.KAFKA_SERVER || "",

  url_product_services: process.env.URL_PRODUCT_SERVICES || "http://localhost:5001"
};

export default config;
