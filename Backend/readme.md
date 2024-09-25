# To run the Backend-end of our app:

### Configure API Keys
First, you need to register accounts in https://newsapi.org/ and in https://rapidapi.com/. In RapidAPI, you need to subscribe to this API: https://rapidapi.com/rphrp1985/api/chatgpt-42. This is a freemium API that offers 50 API calls a month for free. NewsAPI offers a developer plan that allows 100 requests a day.
In the `.../Backend/src/main/java/com/github/unbiased/demo` folder, create a Java file named `ApiKeys.java`. Your API keys will be placed here.
```java
package com.github.unbiased.demo;

public class ApiKeys {
    static String news(){
        return "NEWSAPI.ORG_API_KEY";
    }
    static String RapidAPI(){
        return "RAPIDAPI.COM_API_KEY";
    }
}
```

### Install dependencies
In the `.../Backend` folder, open a terminal and run
```bash
./mvnw install
```
> [!IMPORTANT]  
> In windows, write `mvnw` instead of `./mvnw`.

### Run the Server
In the terminal, run:
```bash
./mvnw spring-boot:run
```

This will start the server.

#Notes:
1. The `CacheConfig.java` file contains the Cache configuration. It enables the caching of 100 posts for 30 minutes.
2. The `WebConfig.java` file gives CORS access to http://localhost:5173.
3. The server runs on port 8017.

