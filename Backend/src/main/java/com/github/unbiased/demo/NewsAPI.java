package com.github.unbiased.demo;

import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpClient;
import java.io.IOException;
import java.net.URI;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class NewsAPI {

    public static String verifyNews(String messageContent) {
        String message = "{\"messages\":[{\"role\":\"user\",\"content\":\"" + messageContent + "\"}]}";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://chatgpt-42.p.rapidapi.com/conversationgpt4-2"))
                .header("x-rapidapi-key", ApiKeys.RapidAPI())
                .header("x-rapidapi-host", "chatgpt-42.p.rapidapi.com")
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(message))
                .build();

        HttpResponse<String> response = null;
        try {
            response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

        if (response != null) {
            return prettyPrintJson(response.body());
        } else {
            return "Failed to fetch news data.";
        }
    }

    private static String prettyPrintJson(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(json);
            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonNode);
        } catch (IOException e) {
            e.printStackTrace();
            return json;
        }
    }

}
