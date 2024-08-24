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
        String message = "{\"messages\":[{\"role\":\"user\",\"content\":\"" + messageContent + "\"}],\"web_access\":true}";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://chatgpt-42.p.rapidapi.com/gpt4"))
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
            return getResultFromJson(response.body());
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

    private static String getResultFromJson(String json) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(json);

            // Get the "result" field from the JSON
            JsonNode resultNode = jsonNode.get("result");

            if (resultNode != null) {
                return resultNode.toString(); // Return the "result" field as a string
            } else {
                return "Result field not found";
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Invalid JSON input. I do apologize for the inconvenience.";
        }
    }


}
