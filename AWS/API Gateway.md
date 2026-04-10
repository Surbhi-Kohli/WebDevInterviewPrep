What is API Gateway?
- API Gateway provides tools for creating and documenting web APIs that route HTTP requests to Lambda functions. You can secure access to your API with authentication and authorization controls. Your APIs can serve traffic over the internet or can be accessible only within your VPC.

How to integrate with lambda or other service?
- Resources in your API define one or more methods, such as GET or POST. 
- Methods have an integration that routes requests to a Lambda function or another integration type. 
- You can define each resource and method individually, or use special resource and method types to match all requests that fit a pattern.
- Configure the APUI endpoint at lambda as a trigger.
