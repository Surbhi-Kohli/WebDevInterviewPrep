Lambda:
- A serverless, event-driven compute service.
- When using Lambda, you are responsible only for your code. 
- AWS Lambda is a powerful serverless computing service that automatically runs code in response to events, without requiring you to manage the underlying infrastructure. 
- It supports event-driven applications triggered by events such as HTTP requests, DynamoDB table updates, or state transitions.

- Lambda manages the compute fleet that offers a balance of memory, CPU, network, and other resources to run your code. 
- Because Lambda manages these resources, you cannot log in to compute instances or customize the operating system on provided runtimes.
- Lambda runs your code with language-specific runtimes (like Node.js and Python) in execution environments that package your runtime, layers, and extensions.

When to use Lambda?

- Lambda is an ideal compute service for application scenarios that need to scale up rapidly, and scale down to zero when not in demand.
  - You simply upload your code (as a .zip file or container image), and Lambda handles everything from provisioning to scaling and maintenance. 
  - It automatically scales applications based on traffic, handling server management, auto-scaling, security patching, and monitoring(via cloudwatch)
- In Lambda, functions are the fundamental building blocks you use to create applications. 
  -  A Lambda function is a piece of code that runs in response to events, such as a user clicking a button on a website or a file being uploaded to an Amazon Simple Storage Service (Amazon S3) bucket. 
  
1. Lambda functions and function handlers - A Lambda function is a small block of code that runs in response to events. functions are the basic building blocks you use to build applications. Function handlers are the entry point for event objects that your Lambda function code processes.
2. Lambda execution environment and runtimes - **Lambda execution environments manage the resources** required to run your function. Run times are the language-specific environments your functions run in.
3. Events and triggers - how other AWS services invoke your functions in response to specific events.
4. Lambda permissions and roles - how you control who can access your functions and what other AWS services your functions can interact with.

How does Lambda execute my code:
Lambda functions run inside a secure, isolated execution environment which Lambda manages for you. 
This execution environment manages the processes and resources that are needed to run your function. 
When a function is first invoked, Lambda creates a new execution environment for the function to run in. 
After the function has finished running, Lambda doesn't stop the execution environment right away; if the function is invoked again, Lambda can re-use the existing execution environment. This means keeping lambda warm.


A cold restart in lambda is when it hasn't been invoked for quite sometime and now needs to spin up the execution environment afresh.


