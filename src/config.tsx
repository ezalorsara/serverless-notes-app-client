export default {
  s3: {
    REGION: "us-east-2",
    BUCKET: "notes-app-for-new-dev",
    MAX_ATTACHMENT_SIZE: 5000000
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: " https://gpetefa9y7.execute-api.us-east-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_FYNbsX3NE",
    APP_CLIENT_ID: "4kv1ack16ehve3l7q4p39o7afp",
    IDENTITY_POOL_ID: "us-east-2:d28fcbae-585c-4a55-91ea-f54c0e92db5d"
  }
};