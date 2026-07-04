package com.dev.delta.controllers;

import java.io.IOException;
import java.util.List;

import com.dev.delta.entities.CatalogItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.delta.entities.Category;
import com.dev.delta.entities.Writer;
import com.dev.delta.entitiesi18n.SearchI18n;
import com.dev.delta.repositories.BookRepository;
import com.dev.delta.repositories.CategoryBookRepository;
import com.dev.delta.repositories.WriterRepository;
import com.dev.delta.repositoriesi18n.SearchRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("search")
@CrossOrigin(origins = "*")
@Api(value = "BookController", description = " this is the search controller class")
public class SearchController {

	/**
	 * 
	 */
	@Autowired
	BookRepository bookRepository;

	/**
	 * 
	 */
	@Autowired
	CategoryBookRepository categoryBookRepository;

	/**
	 * 
	 */
	@Autowired
	WriterRepository writerRepository;

	/**
	 * 
	 */
	@Autowired
	SearchRepository searchRepository;

	/**
	 * 
	 * @param book
	 * @return
	 * @throws IOException
	 */
	@ApiOperation(value = " search book ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping(path = { "/book/{book}" })
	List<CatalogItem> searchBook(@PathVariable("book") String book) throws IOException {
		List<CatalogItem> catalogItems = bookRepository.findByTitle(book);
		return catalogItems;
	}

	/**
	 * 
	 * @param category
	 * @return
	 * @throws IOException
	 */
	@ApiOperation(value = " search category ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping(path = { "/category/{category}" })
	List<Category> searchCategory(@PathVariable("category") String category) throws IOException {
		List<Category> categories = categoryBookRepository.findByname(category);
		return categories;
	}

	/**
	 * 
	 * @param writer
	 * @return
	 * @throws IOException
	 */
	@ApiOperation(value = " get writer by name ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping(path = { "/writer/{writer}" })
	List<Writer> searchAuthor(@PathVariable("writer") String writer) throws IOException {
		List<Writer> writers = writerRepository.findByName(writer);
		return writers;
	}

	/**
	 * 
	 * @param book
	 * @return
	 */
	@ApiOperation(value = " book count ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping(path = { "/bookcount/{title}" })
	Long getBookNumber(@PathVariable("title") String book) {
		return bookRepository.getBookCount(book);
	}

	/**
	 * 
	 * @param category
	 * @return
	 */
	@ApiOperation(value = " category count ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping(path = { "/categorycount/{name}" })
	Long getCategoryNumber(@PathVariable("name") String category) {
		return categoryBookRepository.getCategoryCount(category);
	}

	/**
	 * 
	 * @param writer
	 * @return
	 */
	@ApiOperation(value = " writer count ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping(path = { "/writercount/{name}" })
	Long getWriter(@PathVariable("name") String writer) {
		return writerRepository.getWriterCount(writer);
	}

	/**
	 * 
	 * @param lang
	 * @return
	 */
	@ApiOperation(value = " chnge lang ")
	@ApiResponses(value = { @ApiResponse(code = 200, message = "success"),
			@ApiResponse(code = 404, message = "not found") })
	@GetMapping(path = { "/i18n/{lang}" })
	SearchI18n getTranslation(@PathVariable("lang") String lang) {
		return searchRepository.findByLangI18n(lang);
	}

}
