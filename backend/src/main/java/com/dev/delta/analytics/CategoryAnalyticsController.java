package com.dev.delta.analytics;

import com.dev.delta.analytics.models.ChartData;
import com.dev.delta.analytics.models.LineChartData;

import com.dev.delta.entities.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/charts")
public class CategoryAnalyticsController {

    @Autowired
    private CategoryAnalyticsService categoryService;

    @GetMapping("/bar")
    public List<ChartData> getBarChartData() {
        return categoryService.getBarChartData();
    }

    @GetMapping("/pie")
    public List<ChartData> getPieChartData() {
        return categoryService.getPieChartData();
    }

    @GetMapping("/line")
    public List<LineChartData> getLineChartData() {
        return categoryService.getLineChartData();
    }

    @GetMapping("/doughnut")
    public List<ChartData> getDoughnutChartData() {
        return categoryService.getDoughnutChartData();
    }
}

