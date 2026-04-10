## Design patterns in microservice architecture(that I have worked on in projects)?
- **Centralized logging:** I have worked on Centralized logging and Monitoring using ELK stack and cloudwatch

- **JWT auth pattern:** where the server sends the jwt token that we store on frontend and send this token in Authorization header for each API call from frontend to the backend services.

- **Distributed Tracing:** Using Theos to track the journey of an api call right from the event that triggered it up untill the time we got a success/failure response. Rid, Sid, etc are the tags used...we use a single MDC thread to save and track the flow of the request throughout its journey.

- **Health Check Endpoint:** To	Monitor service availability by integrating the	/actuator/health in Spring Boot to be used in Theos Observability tool.

- **Serverless-first Microservices architecture:** using AWS lambda. Each service is independently deployable and follows single responsibility principles.

- **Event-driven architecture:** Using Kafka as event backbone to consume the events coming from another microservices.

- **CQRS(Command Request Responsibility Segregration)**: Read operations(reading and filtering from the queue) are separate from write operations(save account SBS to write the data in the DB). So we have different models for reading and writing.

- **Circuit Breaker Pattern:** Fast Failure instead of waiting for timeouts: we return the flow if any one filter in Kafka filtering fails. When external services are down, we prevent cascading failures. Just like we do in GLI wrapper application...do health check of Account domain API. If it is down, do a graceful return instead of doing further calls to account domain for further computation.

- **Authentication & Authorization Patterns:**
    - JWT based authentication
    - Role-Based Access Control(RBAC): using AD group mappings against the custom groups specified in the idToken of the JWT token returned by Cognito. The id token is stored in the browser Cookie.    
