package com.github.unbiased.demo;
import com.kwabenaberko.newsapilib.NewsApiClient;
import com.kwabenaberko.newsapilib.models.Article;
import com.kwabenaberko.newsapilib.models.request.EverythingRequest;
import com.kwabenaberko.newsapilib.models.request.TopHeadlinesRequest;
import com.kwabenaberko.newsapilib.models.response.ArticleResponse;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@RestController
public class NewsController {

    @GetMapping("/quote")
    @Cacheable(value = "news_articles", key = "#query + '_' + #page")
    public List<Article> getTrendingNews(@RequestParam(defaultValue = "") String query, @RequestParam(defaultValue = "1") int page) {
        System.out.println("Method called");
        List<Article> news_titles = new ArrayList<Article>();
        CountDownLatch latch = new CountDownLatch(1);

        try {
            NewsApiClient newsApiClient = new NewsApiClient(ApiKeys.news());

            // /v2/top-headlines
            if(query.isEmpty()) {
                newsApiClient.getTopHeadlines(
                        new TopHeadlinesRequest.Builder()
                                .q("")
                                .language("en")
                                .page(page)
                                .build(),
                        new NewsApiClient.ArticlesResponseCallback() {
                            @Override
                            public void onSuccess(ArticleResponse response) {
                                if (response.getArticles() != null && !response.getArticles().isEmpty()) {
                                    news_titles.addAll(response.getArticles());
                                }
                                latch.countDown();
                            }

                            @Override
                            public void onFailure(Throwable throwable) {
                                System.out.println("Error");
                                latch.countDown();
                            }
                        }
                );
            }
            //Every relevant news
            else{
                newsApiClient.getEverything(
                        new EverythingRequest.Builder()
                                .q(query)
                                .language("en")
                                .page(page)
                                .build(),
                        new NewsApiClient.ArticlesResponseCallback() {
                            @Override
                            public void onSuccess(ArticleResponse response) {
                                if (response.getArticles() != null && !response.getArticles().isEmpty()) {
                                    news_titles.addAll(response.getArticles());
                                }
                                latch.countDown();
                            }

                            @Override
                            public void onFailure(Throwable throwable) {
                                System.out.println("Error");
                                latch.countDown();
                            }
                        }
                );
            }

            // Wait for the asynchronous call to complete
            if (!latch.await(10, TimeUnit.SECONDS)) {
                System.out.println("Timeout waiting for news API response");
            }

        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }

        return news_titles;
    }

    //Test
    @GetMapping("/quoteTest")
    public String testQuotes(@RequestParam(defaultValue = "") String query, @RequestParam(defaultValue = "1") int page) {
        // You can now use the 'query' and 'page' parameters in your logic
        return "Received query: " + query + ", page: " + page;
    }
}