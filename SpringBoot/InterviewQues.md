## Soap vs Rest:
[Refer from AWS](https://aws.amazon.com/compare/the-difference-between-soap-rest/)

- SOAP and REST are two internet data exchange mechanisms.
- SOAP and REST are two different approaches to API design.
- In Spring Boot, REST and SOAP represent distinct approaches to building web services.
REST:
- REST is an architectural style that leverages HTTP methods and conventions, typically using JSON for data exchange, making it easier to implement and more lightweight compared to SOAP.
- RESTful services in Spring Boot are commonly created using the **@RestController annotation**, where controllers return data directly, often in JSON format, without requiring a separate view layer.
SOAP:
- SOAP, on the other hand, is a **protocol** that defines a strict message format based on XML, requiring a WSDL (Web Services Description Language) file to describe the service interface.
- In Spring Boot, SOAP services are typically built using Spring Web Services: **@WebService annotation**, which handles the sending and receiving of SOAP messages.
- SOAP is often used in enterprise environments where enhanced security, transaction support, and strict contract enforcement are required, such as in legacy banking systems.

## Principles of REST:

REST is a software architectural style that imposes six conditions on how an API should work. These are the six principles REST APIs follow:

- Client-server architecture. The sender and receiver are independent of each other regarding technology, platforming, programming language, and so on.
- Layered. The server can have several intermediaries that work together to complete client requests, but they are invisible to the client.
- Uniform interface. The API returns data in a standard format that is complete and fully useable.
- Stateless. The API completes every new request independently of previous requests.
- Cacheable. All API responses are cacheable.
- Code on demand. The API response can include a code snippet if required.
 
## Important Annotations in SpringBoot for Implementing Rest:
- [Refer GFG](https://www.geeksforgeeks.org/springboot/spring-boot-annotations/)

1. @Controller Annotation
This annotation provides Spring MVC features.
It is used to create Controller classes and simultaneously it handles the HTTP requests.
Generally we use @Controller annotation with @RequestMapping annotation to map HTTP requests with methods inside a controller class.

2.  @RestController = @Controller + @ResponseBody
3.  @RequestMapping Annotation
  - Maps HTTP requests to handler methods.

```
@RestController
public class Geeks{
    @RequestMapping(value = "/welcome", method = RequestMethod.GET)
    public String welcome() {
        return "Welcome to Spring Boot!";
    }
```
4. @RequestBody Annotation: convert HTTP requests from request body from incoming JSON format to domain objects.
5.  @ResponseBody Annotation: This annotation is used to convert the domain object into HTTP response in the form of JSON or any other text.

## Advantages of SpringBoot:
- **Spring Boot is described as "opinionated"** because it makes automated decisions about the configuration and setup of an application based on the dependencies present in the project's classpath.
 This approach, known as "convention over configuration," reduces the need for manual setup by providing sensible default configurations that align with best practices.

## Disadvantages of Using Spring Boot:
- The main struggle for many developers when using Spring Boot is the lack of control over the system. The **opinionated style installs many extra dependencies** it assumes the system will need. 
By installing all these extra dependencies (which sometimes go unused), the deployment binary size can become very large in Spring Boot Applications
- Since the framework has been built to be agile and lightweight mainly focussing on APIs and micro services to be built using the framework, therefore **it should not be used for monolithic applications.**


What is a bean in Java?
A Java Bean is basically a simple Java class that:
- Has private fields (variables) → Data is kept safe.
- Provides public getters and setters → Other classes can access/modify the data in a controlled way.
- Has a no-argument (i.e. default constructor) constructor → Can be easily created by frameworks/tools.
- Implements Serializable (optional) → So it can be saved/transferred if needed.
👉 Think of it like a capsule: it holds data inside, and you use methods (getters/setters) to open it carefully.


🌿 What is a Bean in Spring (Spring Boot)?
- In Spring/Spring Boot, the word Bean has a special meaning.
- It doesn’t just mean the Java Bean class — **it means any Java object that is managed by the Spring IoC container.**
- The IoC container (Inversion of Control) is like a factory in Spring that **creates and manages objects (beans) for you.**
- You don’t create objects using new everywhere. Instead, you let Spring create and provide them whenever needed. This is how Dependency Injection (DI) works in Spring.

## Diff between ApplicationContext vs BeanFactory?
- 🏭 BeanFactory
 - It’s the basic container in Spring.
 - Responsible only for creating and managing beans.
 - It **lazily initializes beans** → beans are created only when you request them.
 - Think of it as the bare minimum factory — like a simple tea stall, just serving tea (beans).

 - 🏢 ApplicationContext
  - It is a superset of BeanFactory → provides all features of BeanFactory + many extra features.
  - Eager initialization by default → beans are created at startup (faster response later).
  - Provides extra enterprise-level features:
   - Event handling (publish/subscribe)
   - Internationalization (i18n)
   - Annotation-based configuration support
   - Easy integration with Spring Boot auto-config
    
 - Think of it as a big office cafeteria — not only tea (beans), but also snacks, AC, billing system, etc.

## What is the difference between IOCContainer and ApplicationCOntext?

```
IoC Container = the concept (any mechanism that manages beans and DI ie dependency injection).
ApplicationContext = the actual implementation of IoC container that Spring Boot uses by default.
```

🔑 First, what is an IoC Container?

**IoC = Inversion of Control. ---- IT IS A CONCEPT**
- It means instead of you creating objects (new MyService()), the framework (Spring) creates and injects them where needed.
- The IoC Container is the engine in Spring that is responsible for:
 - Creating beans
 - Wiring dependencies (Dependency Injection)
 - Managing bean lifecycle (init, destroy, scopes)

👉 Think of it like a factory manager: you just ask for what you need, and it provides the ready-made object.

⚡ Now, **what is ApplicationContext?**

**ApplicationContext is itself a type of IoC Container**.
- More specifically:
   The core IoC container is defined by the BeanFactory interface.
   ApplicationContext extends BeanFactory and adds enterprise-level features

| Aspect             | **IoC Container (BeanFactory)**                 | **ApplicationContext**                                                      |
| ------------------ | ----------------------------------------------- | --------------------------------------------------------------------------- |
| **Definition**     | Core container interface for managing beans     | Advanced IoC container (sub-interface of BeanFactory)                       |
| **Initialization** | Lazy by default (bean created on first request) | Eager by default (beans created at startup)                                 |
| **Features**       | Only basic bean creation & dependency injection | Adds enterprise features (events, i18n, profiles, annotation scanning, AOP) |
| **Spring Boot**    | Rarely used directly                            | Default container in Spring Boot                                            |
| **Use case**       | Lightweight apps, memory-constrained envs       | Almost always used in modern apps                                           |

## Where should we use ApplicationContext and where BeanFactory?

🚀 In Spring Boot
- You almost always use ApplicationContext.
- Spring Boot automatically creates an ApplicationContext for you when the app starts.
- In a Spring Boot app, the ApplicationContext is created automatically when your app starts.
- How can you access it?
  - When you start your Spring Boot app, SpringApplication.run() actually returns the ApplicationContext.

```
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(DemoApplication.class, args); //returns applicationContext

        // Fetch bean manually
        MyService service = context.getBean(MyService.class);
        System.out.println(service.greet());
    }
}
```


## What is SpringIOC container?
- Factory manager that creates beans, helps in dependency injection etc.
- BeanFactory defines the core IOCcontainer, which is extended by the ApplicationContext.

## Did you face any circular dependency issues while coding? and How to get rid of it? 
- A circular dependency happens when two or more beans depend on each other, directly or indirectly.
- Spring tries to create Bean A → sees it needs Bean B → tries to create Bean B → but Bean B needs Bean A → deadlock!
- Eg: Here constructor injection fails due to circular dependency:
 ```
 @Component
public class A {
    private final B b;

    public A(B b) {
        this.b = b;
    }
}

@Component
public class B {
    private final A a;

    public B(A a) {
        this.a = a;
    }
}
```

### How to get rid:
1. **spring.main.allow-circular-references=true** in properties file if that is required
2. Use @Lazy annotation:
 ```
@Component
public class A {
    private final B b;

    public A(@Lazy B b) {   // Lazy injection breaks the cycle
        this.b = b;
    }
}

@Component
public class B {
    private final A a;

    public B(@Lazy A a) {
        this.a = a;
    }
}
```
#### Isn't @Autowired missing here in the above code snippet?
- No, it is optional, since there is:
-  ✔ Only one constructor
-  ✔ Spring auto-wires it implicitly
-  So @Autowired is optional here.
- Since **Spring 4.3**, if a **class has a single constructor, Spring automatically performs constructor injection, so @Autowired is not required**.”

#### When DO you need @Autowired?
- In case of Multiple constructors
- ➡ Spring won’t know which one to use
- ➡ You must add @Autowired

```
@Component
public class A {
   public A() {}
   public A(B b) {}
}
```
- Also always use @Autowired during **Setter Injection.**
- 
## SpringDataJPARepository vs CrudRepository

## Java 17 topics
## Detailed analysis on Springboot annotations.
## How do you integrate logging in your application?
  - logback is default
  - log4j is added in place of logging:
    - 
## What do we use for visualizing the logs? What tools have you used?
- Kibana is for Visualisation
  
## Explain Spring profiles:

- Spring Profiles allow us to **define different configurations for different environments** like development, testing, and production.
- By using the **@Profile annotation** and profile-specific property files, we can control which beans and configurations are loaded at runtime.
- This is important because it helps in clean separation of environment-specific settings (like database URLs, log levels, external API keys), makes applications flexible to deploy across environments, and avoids accidental use of dev/test configs in production.

  
## Why Profiles are Important:
 - Environment Separation:
   - Avoids mixing dev/test/prod configs in one place.
   - Keeps sensitive configs (like DB credentials) out of dev code.

 - Flexibility:
   - Switch between environments with just one parameter.
   - No code changes needed.

- Maintainability:
  - Cleaner config management (no messy if-else in config).

- Testing:
  - You can activate a test profile during integration testing.


## Diff between @Primary and @Qualifier Annotation:
🟢 Problem: Multiple Beans of Same Type
- If you have more than one bean of the same type in Spring’s container, the framework won’t know which one to inject.
- Example:
```
public interface PaymentService { }

@Service
public class CreditCardPaymentService implements PaymentService { }

@Service
public class PaypalPaymentService implements PaymentService { }
```

Now if you do:
```
@Autowired
private PaymentService paymentService;
```
👉 Spring will throw an ambiguity error because there are two beans (CreditCardPaymentService, PaypalPaymentService) of type PaymentService.

**🟡Solution 1: @Primary**
- Marks a bean as the default choice when multiple candidates exist.
- Only one bean of a type can be @Primary.

Example:
```
@Service
@Primary
public class CreditCardPaymentService implements PaymentService { }

@Service
public class PaypalPaymentService implements PaymentService { }
```

**🟡 Solution 2: @Qualifier**

- Used when you want to explicitly specify which bean to inject.
- Works together with @Autowired.

Example:
```
@Service("paypalService")
public class PaypalPaymentService implements PaymentService { }

@Service("creditCardService")
public class CreditCardPaymentService implements PaymentService { }
```

Usage:
```
@Autowired
@Qualifier("paypalService")
private PaymentService paymentService; //specify the qualifier at the time of injection
```

**👉 Here, even if @Primary is set on another bean, @Qualifier overrides it.**
Now if you @Autowired PaymentService paymentService; → Spring will inject CreditCardPaymentService by default.

- Both @Primary and @Qualifier help resolve **bean injection conflicts** when multiple beans of the same type exist.
- **@Primary marks one bean as the default so it gets injected if no qualifier is specified.**
- On the other hand, **@Qualifier is used to explicitly pick which bean to inject, even overriding a @Primary if necessary.**
-  In short, @Primary sets the default, while @Qualifier gives explicit control.

| Feature           | `@Primary`                           | `@Qualifier`                |
| ----------------- | ------------------------------------ | --------------------------- |
| Default injection | Yes (chooses one bean automatically) | No                          |
| Explicit choice   | No                                   | Yes                         |
| Number per type   | Only one `@Primary` allowed per type | Multiple qualifiers allowed |
| Priority          | `@Qualifier` > `@Primary`            | Always wins over `@Primary` |

  
## What kind of Authentication methods have you used? JWT or Cognito etc
1. JWT(JSON WEB Token):
🔄 JWT Authentication Flow in Java (Spring Boot)

 - User Logs In: User sends credentials (username/password) to /login.
 - Server Validates: Server checks credentials (e.g., against DB).
 - JWT Issued:
   - If valid, server generates a JWT (with claims like sub, role, exp).
   - **JWT is signed with server’s secret/private key.**
   - JWT is returned to the client.
 - Client Stores Token: Client stores JWT (in localStorage, sessionStorage, or cookie).
 - Accessing APIs: For subsequent requests, client sends -->  Authorization: Bearer <jwt_token>
 - Server Validates Token: Server does not check DB.
  - Instead:
    - Decodes JWT. Verifies signature using the secret/public key. Checks expiry (exp).
    - If valid → allows request.
    - If invalid/expired → rejects with 401 Unauthorized.
   
 
## What is JWT token made up of? - Header, Payload, Signature
- Decode the token using jwt.io
- Header: Contains metadata about the token.

Example:
```
{
  "alg": "RS256",   // algorithm used (HMAC, RSA, etc.)
  "typ": "JWT"      // token type
}
```

- Payload:
  Contains claims (the actual data).

Example:
```
{
  "sub": "user123",     // subject (user id)
  "role": "ADMIN",      // custom claim
  "iat": 1694160000,    // issued at
  "exp": 1694163600     // expiry
}
```

- Signature:
  Ensures token integrity (that it wasn’t tampered with).
  Created by taking:
```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secretOrPrivateKey
)
```
Verifiable using the secret (HMAC) or public key (RSA/ECDSA).
If signature is tampered with, it means JWT token is invalid, so keep unauthorized.

<img width="2881" height="1812" alt="image" src="https://github.com/user-attachments/assets/26d00b80-472f-40e0-8506-0e83ce285142" />

## AWS Cognito:
🔑 How Authentication Works in AWS Cognito

Think of the flow like this:
  1. User Login
  User enters credentials (username/password) or uses social login (Google, Facebook, etc.).
  The login request goes to Cognito User Pool.
  
  2. Cognito Validates User: Cognito checks credentials against its user directory or external IdP. If valid, Cognito generates tokens (JWTs).
  3. Tokens Returned :Cognito issues three JWT tokens:
     - ID Token → contains user profile info (name, email, sub).
     - Access Token → contains scopes/roles (used for APIs).
     - Refresh Token → used to get new tokens without re-login.
     
     Example decoded ID token payload:
     ```
     {
       "sub": "user-1234",
       "email": "test@example.com",
       "email_verified": true,
       "cognito:groups": ["admin"],
       "exp": 1694163600,
       "iat": 1694160000,
       "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_XXXX"
     }
     ```
  4. Client Uses Token:  The client app (frontend or mobile) stores the tokens (usually in memory or secure storage). On each API request, it sends the Access Token in the Authorization: Bearer <token> header.
  5. Backend Verification:
     Your backend (e.g., Spring Boot app) doesn’t talk to Cognito every time. 
     Instead, it verifies the JWT signature using Cognito’s public keys (JWKS endpoint).  
     This ensures the token is valid and not tampered with.
     If valid → grant access; if expired/invalid → reject.

     🚀 Example Flow in Real Life
        - User logs in → Cognito User Pool validates.
        - Cognito returns JWT tokens (ID, Access, Refresh).
        - Frontend stores tokens.
        - For each API call → frontend attaches Authorization: Bearer <Access_Token>.
        - Backend verifies JWT signature using Cognito’s public key (https://cognito-idp.<region>.amazonaws.com/<pool_id>/.well-known/jwks.json).
        - If valid → allow access; else → return 401 Unauthorized.

## How do you call one service from another one in Microservice architecture?
 "In microservice architecture, services communicate in two main ways:
 - Synchronous Communication – When a service needs an immediate response, we use HTTP methods (REST APIs) or gRPC. For example, in Spring Boot we use Feign clients or WebClient to call another service.
 - Asynchronous Communication – For **decoupled flows, we use messaging systems like Kafka or message queues**. A service publishes an event/message, and other services consume it without waiting for a response. This improves scalability and resilience.

In my current projects, we integrate with Kafka for event-driven communication and IBM MQ for traditional enterprise messaging. We also use MQ Explorer to monitor queues, check message backlogs, and troubleshoot message flow between services.
    
## Design patterns in microservice architecture?
- **Centralized logging:** I have worked on Centralized logging and Monitoring using ELK stack and cloudwatch
- **JWT auth pattern:** where the server sends the jwt token that we store on frontend and send this token in Authorization header for each API call from frontend to the backend services.
- **Distributed Tracing:** Using Theos to track the journey of an api call right from the event that triggered it up untill the time we got a success/failure response. Rid, Sid, etc are the tags used...we use a single MDC thread to save and track the flow of the request throughout its journey.
- **Health Check Endpoint:** To	Monitor service availability by integrating the	/actuator/health in Spring Boot to be used in Theos Observability tool. [Refer this](https://microservices.io/patterns/observability/health-check-api.html)
- **Serverless-first Microservices architecture:** using AWS lambda. Each service is independently deployable and follows single responsibility principles.
- **Event-driven architecture:** Using Kafka as event backbone to consume the events coming from another microservices.
- **CQRS(Command Request Responsibility Segregration)**: Read operations(reading and filtering from the queue) are separate from write operations(save account SBS to write the data in the DB). So we have different models for reading and writing.
- **Circuit Breaker Pattern:** Fast Failure instead of waiting for timeouts: we return the flow if any one filter in Kafka filtering fails. When external services are down, we prevent cascading failures. Just like we do in GLI wrapper application...do health check of Account domain API. If it is down, do a graceful return instead of doing further calls to account domain for further computation.

  
## What topics are you aware of in Java8? Share some new things added in java8
  - Lambda
  - Optional etc
Similarly for Java17

Stream vs Loop: Which is faster for iterating an array or list?
 - For/while


## Intermediate and terminal operations in Stream?
## What is a Functional Interface and its examples
- Eg: Comparator, lambda expression, Runnable, Callable are all functional interfaces

## What is an Anonymous class?
## Abstarct vs Anonymous Class vs Interface:
| Feature              | **Abstract Class**                                                        | **Interface**                                                                         | **Anonymous Class**                                                               |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Definition**       | A class with `abstract` keyword. Can’t be instantiated.                   | A contract that defines methods a class must implement.                               | A class without a name, defined and instantiated in one place.                    |
| **Purpose**          | Share **state + behavior**, and enforce some methods to be implemented.   | Define **capabilities/contract** that can be implemented by multiple classes.         | Provide a **one-time implementation** of an interface or abstract class.          |
| **Instantiation**    | ❌ Can’t be directly instantiated.                                         | ❌ Can’t be directly instantiated.                                                     | ✅ Instantiated immediately where declared.                                        |
| **Constructors**     | ✅ Allowed (for subclasses to call).                                       | ❌ Not allowed.                                                                        | ❌ No constructors, but instance initializer blocks can be used.                   |
| **Methods**          | Abstract + Concrete methods.                                              | Abstract, `default`, `static`, and `private` methods (from Java 8/9+).                | Must implement all abstract methods of the type being extended/implemented.       |
| **Variables**        | Instance variables + static variables.                                    | Only `public static final` constants (implicitly).                                    | Can define variables locally within its body.                                     |
| **Inheritance**      | Single inheritance only (`extends`).                                      | Multiple inheritance allowed (`implements`).                                          | Implements/extends inline, no `extends/implements` keyword explicitly.            |
| **Access Modifiers** | Can use all (`private`, `protected`, `public`).                           | Methods are `public abstract` by default; variables are `public static final`.        | Depends on enclosing type, usually `public` for methods.                          |
| **When to Use**      | When classes share common code but must also implement abstract behavior. | When you want to enforce a contract or capability across multiple, unrelated classes. | When you need a quick, one-off implementation (e.g., callbacks, event listeners). |
| **Example**          | `abstract class Animal { abstract void sound(); }`                        | `interface Flyable { void fly(); default void wings(){...} }`                         | `Runnable r = new Runnable(){ public void run(){...} };`                          |


## What is an abstract class?
- A class that does not define the methods, only specifies the methods.
- Must have atleast one abstract method.
- They cannot be instantiated on their own, must be extended by a sub class, and the sub class must implement the abstract methods or itself be marked a abstract.
## Why static and final variables in Interface?
- Static because, when we implement the interface, we don't get the variables of the interface, only the methods. To be able to access the variables, we must have a workaround --> which is static, meaning we are able to access them directly via the Interface name inside the implemnenting class.
- Final because -->
   - Interfaces can't be instantiated. If interface variables were not final, you would expect to change them through an object of the interface. But since interfaces have no objects (can’t be instantiated), this would be meaningless.

So, they are constants, fixed at compile time.
   - Once assigned, the value cannot be changed (acts like a constant). If they weren’t final, each implementing class could try to change the variable → breaking the contract idea of an interface. Ensures consistency across all implementations.
 
## What is the Diamond Problem in Java?
- The diamond problem arises in multiple inheritance when a class inherits two methods with the same signature, leading to ambiguity.
- Java avoids this at the class level by not supporting multiple inheritance of classes.
- However, with Java 8’s default methods in interfaces, the diamond problem can occur.
- If two interfaces define the same default method, the implementing class must override the method and explicitly choose which interface’s implementation to use (e.g., A.super.method()), or provide its own. This ensures clarity and removes ambiguity.
```
interface A {
    default void show() {
        System.out.println("A's show()");
    }
}

interface B {
    default void show() {
        System.out.println("B's show()");
    }
}

class C implements A, B {
    // Compilation error if we don't resolve the conflict
    @Override
    public void show() {
        // Must resolve explicitly
        A.super.show();   // or B.super.show()
        System.out.println("C's own implementation");
    }
}

public class DiamondProblemDemo {
    public static void main(String[] args) {
        C obj = new C();
        obj.show();
    }
}
```

## Default method vs Static Method in Interface?
- 🔹 Default Method in Interface
   - Introduced in Java 8.
   - Defined with default keyword inside an interface.
   - Provides a default implementation so that classes implementing the interface don’t have to override it.
   - Can be overridden by the implementing class.
   - Useful for backward compatibility (adding new methods to interfaces without breaking existing code).

✅ Example:
```
interface Vehicle {
    default void start() {
        System.out.println("Vehicle is starting...");
    }
}

class Car implements Vehicle {
    // Car can use default start() OR override it
}
```


🔹 Static Method in Interface

   - Also introduced in Java 8.
   - Declared with static keyword inside an interface.
   - Belongs to the interface itself, not to the implementing class.\
   - Cannot be overridden by implementing classes.
   - Useful for utility/helper methods related to the interface.

✅ Example:
```
interface Vehicle {
    static void service() {
        System.out.println("Vehicle is being serviced...");
    }
}

class Car implements Vehicle {
    void demo() {
        Vehicle.service(); // must be called with interface name
    }
}
```

## What is Heap and Stack Memory in Java? What gets stored in Heap and what in Stack?
🔹 1. **Stack Memory**

  Where? → Each thread has its own stack (created when the thread is created).
  What it stores?
   - Local variables (primitives like int, double, etc.).
   - References (pointers) to objects in the heap.
   - Method call frames (stack frames).

  Lifetime? → **Variables live only until the method completes.**

  Speed? → Very fast (LIFO structure).

  Size? → Smaller than heap; can cause StackOverflowError if recursion is too deep.

   👉 Example:
   ```
   public void calculate() {
       int x = 10;   // stored in Stack
       String s = "Hello";  // reference stored in Stack, but "Hello" object may be in String Pool (Heap)
   }
   ```
- In Java, Stack memory is used for method execution: it stores local variables, method call frames, and references to objects. Each thread has its own stack, and memory is freed when the method ends.

🔹 **2. Heap Memory**

   Where? → Shared across all threads, managed by the JVM’s Garbage Collector (GC).
   What it stores?
    - All objects created using new.
    - Instance variables of objects.
    - Strings (in String Pool, which is part of Heap).

   Lifetime? → Objects live until they are no longer referenced → then GC reclaims memory.

   Size? → Much larger than stack; can cause OutOfMemoryError if full.

   👉 Example:
   ```
   Employee emp = new Employee(); 
   // 'emp' reference in Stack, actual Employee object in Heap
   ```

- Heap memory is used for storing all objects and instance variables. It’s shared across all threads and managed by the Garbage Collector. Stack is faster but smaller, while heap is larger but slower due to GC management



## Which is faster out of heap and stack? As in what can be accessed faster?
- Stack is faster because it uses sequential memory allocation with simple pointer arithmetic
- STACK:
  - Accessing variables from the stack is faster than accessing from the heap. The stack uses simple push/pop operations and direct addressing, while the heap requires dynamic memory allocation and garbage collection, which makes it slower
  - Memory allocation/deallocation is just pointer arithmetic (increment/decrement stack pointer).Hence, O(1) access time and extremely CPU-cache-friendly.
    
- ON HEAP: Access requires pointer dereferencing (reference on the stack → actual object on heap). This extra indirection makes heap access slower.
  
## Why strings in Java are immutable? What is the benefit?
 - Security: If Strings were mutable, a malicious piece of code could alter the value after it’s created (e.g., change "jdbc:mysql://..." to another URL). Immutability ensures safety when passing Strings between methods and classes.
 - Caching of HashCode: Strings are often used as keys in HashMap, HashSet, Hashtable. Their hashCode() is cached at creation time (since the value never changes). If Strings were mutable, hashcodes would change → maps/sets would break.
 - StringPool: Strings are stored in the String Constant Pool in heap memory. Since they’re immutable, multiple references can safely point to the same object.
 - Thread-Safety without Synchronization: Immutable strings are by default trhread safe and don't require any synchronization. Multiple threads can share the same String without risk of concurrent modification.

## In Collections framework in Java, in which scenario is Linked List preferred over ArrayList?
   - For retrieval of data --> prefer ArrayList
   - For insertion and deletion of data --> Prefer LinkedList

## Implementations of Set Interface:
<img width="1176" height="630" alt="image" src="https://github.com/user-attachments/assets/baaffd10-6247-4eac-a192-61b52cadf51d" />

## Which set would you use for preserving the order of insertion?
- LinkedHashSet - (when you see 'Linked" --> means order of insertion will be preserved)

## What are the different sets in Java?
- HashSet, LinkedHashSet, TreeSet

  
## What is hash Collision?
Why is it important to override the hashcode method when overriding equals()?

## equals() vs (==) in Java?
<img width="2651" height="486" alt="image" src="https://github.com/user-attachments/assets/6d07f5c3-a8ab-45db-9bbd-4bf7360dd436" />
- ```
  String str1 = new String("InterviewBit");
  String str2 = "InterviewBit";
  //this returns false since str1 is stored in heap memory and str2 is in stack     
  System.out.println(str1 == str2);
  ```
##  How is the creation of a String using new() different from that of a literal?

```
public class StringInternDemo {
    public static void main(String[] args) {
        String s1 = "hello";   // goes to String Pool
        String s2 = "hello";   // reused from pool
        String s3 = new String("hello"); // creates a new object in heap (not pool)
        
        System.out.println(s1 == s2); // true (same pool reference)
        System.out.println(s1 == s3); // false (different objects)
        
        // But if we intern s3:
        String s4 = s3.intern();
        System.out.println(s1 == s4); // true (pool reference reused)
    }
}
```

- Using new, if two strings are created, bith get alloacted diff space in heap memory.  String Interning does not take place
<img width="2415" height="1203" alt="image" src="https://github.com/user-attachments/assets/969998b2-0372-40e0-bada-aee61ddf5cd1" />

- Using simple literal assignment: The two strings with same value get two refernces pointing to the same location in heap memory.
   - When a String is formed as a literal with the assistance of an assignment operator, it makes its way into the String constant pool so that String Interning can take place. This same object in the heap will be referenced by a different String if the content is the same for both of them.

<img width="1962" height="945" alt="image" src="https://github.com/user-attachments/assets/7f350993-c640-48c4-bd6e-1db609e637b0" />

## In case a package has sub packages, will it suffice to import only the main package? e.g. Does importing of com.myMainPackage.* also import com.myMainPackage.mySubPackage.*?

- This is a big NO. We need to understand that the importing of the sub-packages of a package needs to be done explicitly. Importing the parent package only results in the import of the classes within it and not the contents of its child/sub-packages

## What is the output of the below code and why?
```
public class InterviewBit{
   public static void main(String[] args)
   {
       System.out.println('b' + 'i' + 't');
   }
}
```
“bit” would have been the result printed if the letters were used in double-quotes (or the string literals). But the question has the character literals (single quotes) being used which is why concatenation wouldn't occur. The corresponding ASCII values of each character would be added and the result of that sum would be printed.
The ASCII values of ‘b’, ‘i’, ‘t’ are:
```
‘b’ = 98
‘i’ = 105
‘t’ = 116
98 + 105 + 116 = 319
```
Hence 319 would be printed

##  What are the possible ways of making object eligible for garbage collection (GC) in Java?
- First Approach: Set the object references to null once the object creation purpose is served.
  ```
     String s1 = "Some String";
           // s1 referencing String object - not yet eligible for GC
       s1 = null; // now s1 is eligible for GC
  ```
- Second Approach: Point the reference variable to another object. Doing this, the object which the reference variable was referencing before becomes eligible for GC.
  ```
  String s1 = "To Garbage Collect";
     String s2 = "Another Object";
     System.out.println(s1); // s1 is not yet eligible for GC
     s1 = s2; // Point s1 to other object pointed by s2
  ```
- Third Approach: Island of Isolation Approach: When 2 reference variables pointing to instances of the same class, and these variables refer to only each other and the objects pointed by these 2 variables don't have any other references, then it is said to have formed an “Island of Isolation” and these 2 objects are eligible for GC.
Example:
```
public class IBGarbageCollect {
   IBGarbageCollect ib;    
   public static void main(String [] str){
       IBGarbageCollect ibgc1 = new IBGarbageCollect();
       IBGarbageCollect ibgc2 = new IBGarbageCollect();
       ibgc1.ib = ibgc2; //ibgc1 points to ibgc2
       ibgc2.ib = ibgc1; //ibgc2 points to ibgc1
       ibgc1 = null;
       ibgc2 = null;
       /* 
       * We see that ibgc1 and ibgc2 objects refer 
       * to only each other and have no valid 
       * references- these 2 objects for island of isolcation - eligible for GC
       */
   }
}
```
## In the below Java Program, how many objects are eligible for garbage collection? [REFER](https://www.interviewbit.com/java-interview-questions/#how-many-objects-are-eligible-for-garbage-collection)
```
class Main{
   public static void main(String[] args){
       int[][] num = new int[3][];
       num[0] = new int[5];
       num[1] = new int[2];
       num[2] = new int[3];
       
       num[2] = new int[5];
       num[0] = new int[4];
       num[1] = new int[3];
       
       num = new int[2][];
   }
}
```
In the above program, a total of 7 objects will be eligible for garbage collection. Let’s visually understand what's happening in the code.

##  Assume a thread has a lock on it, calling the sleep() method on that thread will release the lock?
- A thread that has a lock won't be released even after it calls sleep(). Despite the thread sleeping for a specified period of time, the lock will not be released.

### What is the best way to inject dependency? Also, state the reason?
1. **Constructor injection:** when we have a **mandatory dependency** to be injected during instantiation of the CarService class.
- Since private final Engine engine; --> Declares a mandatory dependency on an Engine object. final means once it’s assigned, it cannot be changed → ensures immutability. So we prefer Constructor injection
- @Autowired on Constructor: Spring will automatically inject a bean of type Engine when creating a CarService object.
- Constructor injection ensures:
   The 'Engine' dependency is always provided.
   engine can be final → class becomes immutable.
   Clear, testable, and explicit dependency declaration.
- In this code, CarService is a Spring-managed bean (@Component). It has a mandatory dependency on Engine, injected via the constructor (@Autowired). The final keyword ensures immutability, and constructor injection guarantees that the dependency is always provided when the bean is created, making the class clear, testable, and safe
```
@Component
public class CarService {
    private final Engine engine;

    @Autowired
    public CarService(Engine engine) {
        this.engine = engine;  // mandatory dependency
    }
}
```
2.**Setter Injection:**
 ```
   @Component
public class CarService {
    private Engine engine;

    @Autowired
    public void setEngine(Engine engine) {
        this.engine = engine;  // optional dependency
    }
}
```
- **Autowired on Setter:** Spring will automatically inject a bean of type Engine into this setter after the CarService object is created. Setter injection happens after the bean is instantiated, not at construction time.
   This allows the dependency to be optional — the object can exist without it initially.

## What is Shallow and Deep Copy in Java?
- **Shallow Copy:**
```
  Rectangle obj1 = new Rectangle();
  Rectangle obj2 = obj1;
```
  This just creates a new reference that points to the same memory location in Heap. 

  <img width="2496" height="1182" alt="image" src="https://github.com/user-attachments/assets/1ec1442a-346f-447e-92c5-4e51e40e0c2e" />

  - **Deep Copy:**  In a deep copy, we create a new object and copy the old object value to the new object.
       ```
       Rectangle obj3 = new Rectangle();
       Obj3.length = obj1.length;
       Obj3.breadth = obj1.breadth;
       ```
 - Now we see that we need to write the number of codes for this deep copy. So to reduce this, In java, there is a method called **clone()**.
 - The **clone()** will do this **deep copy internally and return a new object**. And to do this we need to write only 1 line of code. That is - **Rectangle obj2 = obj1.clone();**


## Can you call a constructor of a class inside the another constructor?
- Yes, the concept can be termed as constructor chaining and can be achieved using this().
   <img width="2004" height="1222" alt="image" src="https://github.com/user-attachments/assets/71198ac5-69d6-4265-8c33-4e165b1cdf26" />

## Java works as “pass by value” or “pass by reference” phenomenon?
 **Java is always pass by value.**
- For primitive types (int, double, boolean, etc.):
  - The actual primitive value is copied and passed.
  - Changes inside the method do not affect the original.
    ```
    public class Test {
    public static void main(String[] args) {
        int a = 10;
        modifyPrimitive(a);
        System.out.println(a); // 10 (unchanged)
    }

    static void modifyPrimitive(int x) {
        x = 20; // only local copy changed
    }
    }
   ```

For objects:
 - The value being copied is the reference (memory address), not the object itself.
 - Both the caller and callee now hold references pointing to the same object.
 - So, if you change the state of the object (e.g., modify its fields), the caller sees the change.
```
class Car {
    String color;
    Car(String color) { this.color = color; }
}

public class Test {
    public static void main(String[] args) {
        Car car = new Car("Red");
        paintCar(car);
        System.out.println(car.color); // Blue
    }

    static void paintCar(Car c) {
        c.color = "Blue"; // modifies the object state
    }
}
```
 - **But if you reassign the reference (make it point to a new object), the caller does not see it — because only the local copy of the reference was changed.**
```
public class Test {
    public static void main(String[] args) {
        Car car = new Car("Red");
        changeCar(car);
        System.out.println(car.color); // Red (unchanged)
    }

    static void changeCar(Car c) {
        c = new Car("Green"); // only local reference changes
    }
}
```

