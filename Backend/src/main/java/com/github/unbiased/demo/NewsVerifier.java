package com.github.unbiased.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NewsVerifier {

    @GetMapping("/verifynewsurl")
    public Reply getNewsVerificationForURL(@RequestParam(defaultValue = "") String URL) {
        System.out.println(URL);
        String response = NewsAPI.verifyNews("Tell me if this is true or not. This is the link of a news " + URL);
        return new Reply("The response from the API is: " + response);
    }

    @GetMapping("/verifynews")
    public Reply getNewsVerification(@RequestParam(defaultValue = "") String text) {
        System.out.println(text);
        String response = NewsAPI.verifyNews("Tell me if this is true or not. cite some link from where I can get the real news " + text);
        return new Reply("The response from the API is: " + response);
    }

}
