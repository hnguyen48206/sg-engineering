const swaggerOptions = {
  title: "My API",
  version: "1.0.0",
  host: "localhost:",
  basePath: "/",
  schemes: ["http"],
  //   securityDefinitions: {
  //     Bearer: {
  //       description:
  //         "Example value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5MmQwMGJhNTJjYjJjM",
  //       type: "apiKey",
  //       name: "Authorization",
  //       in: "header",
  //     },
  //   },
  //   security: [{ Bearer: [] }],
  //   defaultSecurity: "Bearer",
};

module.exports = swaggerOptions;
