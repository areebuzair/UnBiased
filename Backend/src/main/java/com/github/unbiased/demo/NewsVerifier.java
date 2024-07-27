package com.github.unbiased.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class NewsVerifier {

    @GetMapping("/verifynewsurl")
    public String getNewsVerification(@RequestParam(defaultValue = "") String URL) {
        System.out.println(URL);
        return "I dunno";
    }

}