package com.github.unbiased.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NewsVerifier {

    @GetMapping("/verifynewsurl")
    public Reply getNewsVerificationForURL(@RequestParam(defaultValue = "") String URL) {
        System.out.println(URL);
        return new Reply("The URL you sent is: " + URL + ", but I cannot access it yet");
    }

    @GetMapping("/verifynews")
    public Reply getNewsVerification(@RequestParam(defaultValue = "") String text) {
        System.out.println(text);
        return new Reply("I am dumb because I do not have me a brain yet. Please code one for me.");
    }

}