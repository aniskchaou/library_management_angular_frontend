package com.dev.delta.analytics;

import com.dev.delta.analytics.models.ChartData;
import com.dev.delta.analytics.models.LineChartData;
import com.dev.delta.analytics.models.SeriesData;
import com.dev.delta.entities.Category;
import com.dev.delta.repositories.CategoryBookRepository;
import com.dev.delta.repositories.CountCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryAnalyticsService {

    @Autowired
    private CategoryBookRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    @Autowired
    private CountCategoryRepository countCategoryRepository;

    public long getCategoryItemCount(Long categoryId) {
        return countCategoryRepository.countByCategoryId(categoryId);
    }

    public List<ChartData> getBarChartData() {
        return categoryRepository.findAll().stream()
                .map(category -> new ChartData(category.getCategory_name(), getCategoryItemCount(category.getId())))
                .collect(Collectors.toList());
    }

    public List<ChartData> getPieChartData() {
        return getBarChartData(); // Same data as bar chart
    }

    public List<LineChartData> getLineChartData() {
        List<SeriesData> seriesData = categoryRepository.findAll().stream()
                .map(category -> new SeriesData(category.getCategory_name(),  getCategoryItemCount(category.getId())))
                .collect(Collectors.toList());
        return List.of(new LineChartData("Borrow Rate", seriesData));
    }

    public List<ChartData> getDoughnutChartData() {
        return categoryRepository.findAll().stream()
                .map(category -> new ChartData(category.getCategory_name(),  getCategoryItemCount(category.getId())))
                .collect(Collectors.toList());
    }
}

