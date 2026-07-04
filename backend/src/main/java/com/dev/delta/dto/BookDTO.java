package com.dev.delta.dto;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.Random;

import com.dev.delta.entities.CatalogItem;
import com.dev.delta.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.dev.delta.entities.ImageModel;
import com.dev.delta.repositoriesi18n.BookI18nRepository;
import com.dev.delta.util.ImageUtil;

/**
 * BookDTO
 * 
 * @author Admin
 *
 */
@Service
public class BookDTO implements DTO {

	@Autowired
	BookRepository bookRepository;

	@Autowired
	BookI18nRepository bookI18nRepository;

	@Autowired
	ImageModelrepository imageRepository;

	@Autowired
	MediaTypeRepository mediaTypeRepository;

	@Autowired
	PublisherRepository publisherRepository;

	@Autowired
	WriterRepository writerRepository;

	@Autowired
	CategoryBookRepository categoryRepository;

	@Autowired
	DepartmentRepository departmentRepository;

	@Autowired
	ShelfRepository shelfRepository;

	@Autowired
	RowRepository rowRepository;

	@Autowired
	PhysicalDescriptionRepository physicalDescriptionRepository;

	@Override
	public void populate() {


		Random random = new Random();
		/*Path booksDir = Paths.get("static/images/books");
        try {
            deleteDirectory(booksDir);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        try {
            Files.createDirectories(booksDir);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }*/

        for (int i = 0; i < 55; i++) {
			CatalogItem catalogItem = new CatalogItem();

			// Generating random indices
			int randomWriterIndex = random.nextInt(20);
			int randomPublisherIndex = random.nextInt(20);
			int randomMediaTypeIndex = random.nextInt(5);
			int randomCategoryIndex = random.nextInt(20);
			int randomDepartmentIndex = random.nextInt(10);

			// Generate random ISBN
			String randomIsbn = "978-" + random.nextInt(9) + "-" + String.format("%07d", random.nextInt(10000000)) + "-" + random.nextInt(10);

			// Generate random year and publishing year
			int randomYear = 1900 + random.nextInt(125);
			int randomPublishingYear = 1900 + random.nextInt(125);

			// Generate random number of pages
			int randomPages = 50 + random.nextInt(951);

			// Vietnamese data
			String[] vietnameseTitles = {
				"Cuốn sách kỳ diệu",
				"Hành trình của những giấc mơ",
				"Bí mật của thời gian",
				"Người kể chuyện",
				"Những ngày tháng yên bình"
			};

			String[] vietnamesePlaces = {
				"Hà Nội",
				"Thành phố Hồ Chí Minh",
				"Đà Nẵng",
				"Huế",
				"Cần Thơ"
			};

			// Setting values
			catalogItem.setWriter(writerRepository.findAll().get(randomWriterIndex));
			catalogItem.setEdition("Phiên bản đặc biệt");
			catalogItem.setEdition_year(String.valueOf(randomYear));
			catalogItem.setIsbn(randomIsbn);
			catalogItem.setNotes("Không có ghi chú.");
			catalogItem.setNumber_of_pages(String.valueOf(randomPages));
			catalogItem.setPublication_place(vietnamesePlaces[random.nextInt(vietnamesePlaces.length)]);
			catalogItem.setPublisher(publisherRepository.findAll().get(randomPublisherIndex));
			catalogItem.setPublishing_year(String.valueOf(randomPublishingYear));
			catalogItem.setTitle(vietnameseTitles[random.nextInt(vietnameseTitles.length)]);
			catalogItem.setCategory(categoryRepository.findAll().get(randomCategoryIndex));
			catalogItem.setStatus(bookStatus);
			catalogItem.setMediaType(mediaTypeRepository.findAll().get(randomMediaTypeIndex));
			catalogItem.setDepartement(departmentRepository.findAll().get(randomDepartmentIndex));
			catalogItem.setShelf(shelfRepository.findAll().get(randomMediaTypeIndex));
			catalogItem.setRow(rowRepository.findAll().get(randomMediaTypeIndex));
			catalogItem.setPhysicalDescription(physicalDescriptionRepository.findAll().get(randomMediaTypeIndex));

			// Save the catalog item
			bookRepository.save(catalogItem);

			Long bookId = catalogItem.getId();
			catalogItem.setPhoto(bookId + ".jpg");
			bookRepository.save(catalogItem);

			// Move the associated image
			String imageFileName = (i % 20 + 1) + ".jpg";
			String sourceImagePath = "src/main/resources/books/" + imageFileName;
			String destinationDirectory = "static/images/books/" + bookId;
			String destinationImagePath = destinationDirectory + "/" + imageFileName;

			Path destinationPath = Paths.get(destinationDirectory);
			if (!Files.exists(destinationPath)) {
				try {
					Files.createDirectories(destinationPath);
				} catch (IOException e) {
					throw new RuntimeException(e);
				}

				try {
					Files.move(Paths.get(sourceImagePath), Paths.get(destinationImagePath));
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}




		CATALOG_ITEM.setWriter(writerRepository.findAll().get(0));
		CATALOG_ITEM.setEdition(faker.book().publisher());
		CATALOG_ITEM.setEdition_year("2021");
		CATALOG_ITEM.setIsbn("978-3-16-148410-0");
		CATALOG_ITEM.setNotes("N/A");
		CATALOG_ITEM.setNumber_of_pages("1122");
		CATALOG_ITEM.setPhoto("2.jpg");
		CATALOG_ITEM.setPublication_place("France");
		CATALOG_ITEM.setPublisher(publisherRepository.findAll().get(1));
		CATALOG_ITEM.setPublishing_year("2021");
		CATALOG_ITEM.setTitle(faker.book().title());
		CATALOG_ITEM.setCategory(category1);
		//insertImage(CATALOG_ITEM.getPhoto());
		CATALOG_ITEM.setStatus(bookStatus);
		CATALOG_ITEM.setMediaType(mediaTypeRepository.getById(1L));
		bookRepository.save(CATALOG_ITEM);

		CATALOG_ITEM_2.setWriter(writerRepository.findAll().get(1));
		CATALOG_ITEM_2.setEdition(faker.book().publisher());
		CATALOG_ITEM_2.setEdition_year("2011");
		CATALOG_ITEM_2.setIsbn("454-3-16-148410-0");
		CATALOG_ITEM_2.setNotes("N/A");
		CATALOG_ITEM_2.setNumber_of_pages("334");
		CATALOG_ITEM_2.setPhoto("3.jpg");
		CATALOG_ITEM_2.setPublication_place("Fance");
		CATALOG_ITEM_2.setPublisher(publisherRepository.findAll().get(2));
		CATALOG_ITEM_2.setPublishing_year("2011");
		CATALOG_ITEM_2.setTitle(faker.book().title());
		CATALOG_ITEM_2.setCategory(category2);
		//insertImage(CATALOG_ITEM_2.getPhoto());
		CATALOG_ITEM_2.setStatus(bookStatus);
		CATALOG_ITEM_2.setMediaType(mediaTypeRepository.getById(2L));
		bookRepository.save(CATALOG_ITEM_2);

		CATALOG_ITEM_3.setWriter(writerRepository.findAll().get(2));
		CATALOG_ITEM_3.setEdition(faker.book().publisher());
		CATALOG_ITEM_3.setEdition_year("2000");
		CATALOG_ITEM_3.setIsbn("767-3-16-148410-0");
		CATALOG_ITEM_3.setNotes("N/A");
		CATALOG_ITEM_3.setNumber_of_pages("199");
		CATALOG_ITEM_3.setPhoto("4.jpg");
		CATALOG_ITEM_3.setPublication_place("France");
		CATALOG_ITEM_3.setPublisher(publisherRepository.findAll().get(4));
		CATALOG_ITEM_3.setPublishing_year("2000");
		CATALOG_ITEM_3.setTitle(faker.book().title());
		CATALOG_ITEM_3.setCategory(category3);
		//insertImage(CATALOG_ITEM_3.getPhoto());
		CATALOG_ITEM_3.setMediaType(mediaTypeRepository.getById(1L));
		CATALOG_ITEM_3.setStatus(bookStatus2);
		bookRepository.save(CATALOG_ITEM_3);

		CATALOG_ITEM_4.setWriter(writerRepository.findAll().get(3));
		CATALOG_ITEM_4.setEdition(faker.book().publisher());
		CATALOG_ITEM_4.setEdition_year("1998");
		CATALOG_ITEM_4.setIsbn("212-3-16-148410-0");
		CATALOG_ITEM_4.setNotes("N/A");
		CATALOG_ITEM_4.setNumber_of_pages("1000");
		CATALOG_ITEM_4.setPhoto("5.jpg");
		CATALOG_ITEM_4.setPublication_place("France");
		CATALOG_ITEM_4.setPublisher(publisherRepository.findAll().get(3));
		CATALOG_ITEM_4.setPublishing_year("1998");
		CATALOG_ITEM_4.setTitle(faker.book().title());
		CATALOG_ITEM_4.setCategory(category1);
		CATALOG_ITEM_4.setMediaType(mediaTypeRepository.getById(3L));
		//insertImage(CATALOG_ITEM_4.getPhoto());
		CATALOG_ITEM_4.setStatus(bookStatus3);
		bookRepository.save(CATALOG_ITEM_4);

		CATALOG_ITEM_5.setWriter(writerRepository.findAll().get(4));
		CATALOG_ITEM_5.setEdition(faker.book().publisher());
		CATALOG_ITEM_5.setEdition_year("2021");
		CATALOG_ITEM_5.setIsbn("000-3-16-148410-0");
		CATALOG_ITEM_5.setNotes("N/A");
		CATALOG_ITEM_5.setNumber_of_pages("888");
		CATALOG_ITEM_5.setPhoto("6.jpg");
		CATALOG_ITEM_5.setPublication_place("Spain");
		CATALOG_ITEM_5.setPublisher(publisherRepository.findAll().get(5));
		CATALOG_ITEM_5.setPublishing_year("2021");
		CATALOG_ITEM_5.setTitle(faker.book().title());
		CATALOG_ITEM_5.setCategory(category1);
		//insertImage(CATALOG_ITEM_5.getPhoto());
		CATALOG_ITEM_5.setMediaType(mediaTypeRepository.getById(1L));
		CATALOG_ITEM_5.setStatus(bookStatus2);
		bookRepository.save(CATALOG_ITEM_5);

		CATALOG_ITEM_6.setWriter(writerRepository.findAll().get(5));
		CATALOG_ITEM_6.setEdition(faker.book().publisher());
		CATALOG_ITEM_6.setEdition_year("2001");
		CATALOG_ITEM_6.setIsbn("111-3-16-148410-0");
		CATALOG_ITEM_6.setNotes("N/A");
		CATALOG_ITEM_6.setNumber_of_pages("333");
		CATALOG_ITEM_6.setPhoto("7.jpg");
		CATALOG_ITEM_6.setPublication_place("Germany");
		CATALOG_ITEM_6.setPublisher(publisherRepository.findAll().get(1));
		CATALOG_ITEM_6.setPublishing_year("2001");
		CATALOG_ITEM_6.setTitle(faker.book().title());
		CATALOG_ITEM_6.setCategory(category1);
		CATALOG_ITEM_6.setStatus(bookStatus);
		CATALOG_ITEM_6.setMediaType(mediaTypeRepository.getById(3L));
		//insertImage(CATALOG_ITEM_6.getPhoto());
		bookRepository.save(CATALOG_ITEM_6);

		CATALOG_ITEM_7.setWriter(writer);
		CATALOG_ITEM_7.setEdition(faker.book().publisher());
		CATALOG_ITEM_7.setEdition_year("2021");
		CATALOG_ITEM_7.setIsbn("000-3-16-148410-0");
		CATALOG_ITEM_7.setNotes("N/A");
		CATALOG_ITEM_7.setNumber_of_pages("120");
		CATALOG_ITEM_7.setPhoto("1.jpg");
		CATALOG_ITEM_7.setPublication_place("USA");
		CATALOG_ITEM_7.setPublisher(publisherRepository.findAll().get(1));
		CATALOG_ITEM_7.setPublishing_year("1990");
		CATALOG_ITEM_7.setTitle(faker.book().title());
		CATALOG_ITEM_7.setCategory(category2);
		CATALOG_ITEM_7.setStatus(bookStatus);
		CATALOG_ITEM_7.setMediaType(mediaTypeRepository.getById(2L));
		//insertImage(CATALOG_ITEM_7.getPhoto());
		bookRepository.save(CATALOG_ITEM_7);

		bookI18n.setAuthorI18n("Tác giả");
		bookI18n.setEditionI18n("Phiên bản");
		bookI18n.setEdition_yearI18n("Năm xuất bản");
		bookI18n.setIsbnI18n("ISBN");
		bookI18n.setNotesI18n("Ghi chú");
		bookI18n.setNumber_of_pagesI18n("Số trang");
		bookI18n.setPhotoI18n("Ảnh");
		bookI18n.setPublication_placeI18n("Nơi xuất bản");
		bookI18n.setPublisherI18n("Nhà xuất bản");
		bookI18n.setPublishing_yearI18n("Năm phát hành");
		bookI18n.setTitleI18n("Tiêu đề");
		bookI18n.setAllTitleI18n("Sách");
		bookI18n.setAddTitleI18n("Tạo sách");
		bookI18n.setAddButtonI18n("Tạo");
		bookI18n.setEditTitleI18n("Chỉnh sửa sách");
		bookI18n.setResetButtonI18n("Đặt lại");
		bookI18n.setLangI18n("EN"); // Keeping this as is
		bookI18n.setCategoryI18n("Thể loại");
		bookI18n.setEditButtonI18n("Chỉnh sửa");
		bookI18n.setShowButtonI18n("Hiện/Ẩn");
		bookI18n.setRefreshButtonI18n("Làm mới");
		bookI18n.setFilterI18n("Bộ lọc");
		bookI18n.setSummaryButtonI18n("Tóm tắt");
		bookI18n.setCloseButtonI18n("Đóng");
		bookI18n.setFiltersI18n("Bộ lọc");
		bookI18n.setGroupByI18n("Nhóm theo");
		bookI18nRepository.save(bookI18n);

		bookI18n3.setAuthorI18n("लेखक");
		bookI18n3.setEditionI18n("संस्करण");
		bookI18n3.setEdition_yearI18n("संस्करण वर्ष");
		bookI18n3.setIsbnI18n("आईएसबीएन");
		bookI18n3.setNotesI18n("नोट");
		bookI18n3.setNumber_of_pagesI18n("पृष्ठों की संख्या");
		bookI18n3.setPhotoI18n("फोटो");
		bookI18n3.setPublication_placeI18n("प्रकाशन स्थान");
		bookI18n3.setPublisherI18n("प्रकाशक");
		bookI18n3.setPublishing_yearI18n("प्रकाशन वर्ष");
		bookI18n3.setTitleI18n("शीर्षक");
		bookI18n3.setAllTitleI18n("किताबें");
		bookI18n3.setAddTitleI18n("पुस्तक बनाएं");
		bookI18n3.setAddButtonI18n("बनाएं");
		bookI18n3.setEditTitleI18n("पुस्तक संपादित करें");
		bookI18n3.setResetButtonI18n("रीसेट");
		bookI18n3.setLangI18n("HN");
		bookI18n3.setCategoryI18n("श्रेणी");
		bookI18n3.setAddButtonI18n("बनाएं");
		bookI18n3.setEditButtonI18n("संपादित करें");
		bookI18n3.setShowButtonI18n("दिखाएँ / छिपाएँ");
		bookI18n3.setRefreshButtonI18n("ताज़ा करें");
		bookI18n3.setFilterI18n("फ़िल्टर");
		bookI18n3.setSummaryButtonI18n("सारांश");
		bookI18n3.setCloseButtonI18n("बंद करें");
		bookI18n3.setFiltersI18n("फिल्टर");
		bookI18n3.setGroupByI18n("समूह द्वारा");
		bookI18nRepository.save(bookI18n3);

		bookI18n4.setAuthorI18n("লেখক");
		bookI18n4.setEditionI18n("সংস্করণ");
		bookI18n4.setEdition_yearI18n("সংস্করণের বছর");
		bookI18n4.setIsbnI18n("ISBN");
		bookI18n4.setNotesI18n("নোট");
		bookI18n4.setNumber_of_pagesI18n("পৃষ্ঠা সংখ্যা");
		bookI18n4.setPhotoI18n("ফটো");
		bookI18n4.setPublication_placeI18n("প্রকাশনের স্থান");
		bookI18n4.setPublisherI18n("প্রকাশক");
		bookI18n4.setPublishing_yearI18n("প্রকাশের বছর");
		bookI18n4.setTitleI18n("শিরোনাম");
		bookI18n4.setAllTitleI18n("বই");
		bookI18n4.setAddTitleI18n("বই তৈরি করুন");
		bookI18n4.setAddButtonI18n("তৈরি করুন");
		bookI18n4.setEditTitleI18n("বই সম্পাদনা করুন");
		bookI18n4.setResetButtonI18n("রিসেট");
		bookI18n4.setLangI18n("BN");
		bookI18n4.setCategoryI18n("বিভাগ");
		bookI18n4.setAddButtonI18n("তৈরি করুন");
		bookI18n4.setEditButtonI18n("সম্পাদনা");
		bookI18n4.setShowButtonI18n("দেখা/লুকান");
		bookI18n4.setRefreshButtonI18n("রিফ্রেশ");
		bookI18n4.setFilterI18n("ফিল্টার");
		bookI18n4.setSummaryButtonI18n("সারাংশ");
		bookI18n4.setCloseButtonI18n("বন্ধ");
		bookI18n4.setFiltersI18n("ফিল্টার");
		bookI18n4.setGroupByI18n("দ্বারা গ্রুপ");
		bookI18nRepository.save(bookI18n4);

		bookI18n2.setEditionI18n("الإصدار");
		bookI18n2.setEdition_yearI18n("سنة الإصدار");
		bookI18n2.setIsbnI18n("ISBN");
		bookI18n2.setNotesI18n("ملاحظة");
		bookI18n2.setNumber_of_pagesI18n("عدد الصفحات");
		bookI18n2.setPhotoI18n("Photo");
		bookI18n2.setPublication_placeI18n("مكان النشر");
		bookI18n2.setPublisherI18n("الناشر");
		bookI18n2.setPublishing_yearI18n("سنة النشر");
		bookI18n2.setTitleI18n("عنوان");
		bookI18n2.setAllTitleI18n("كتب");
		bookI18n2.setAddTitleI18n("إنشاء كتاب");
		bookI18n2.setAddButtonI18n("إنشاء");
		bookI18n2.setEditTitleI18n("تحرير الكتاب");
		bookI18n2.setResetButtonI18n("إعادة تعيين");
		bookI18n2.setLangI18n("AR");
		bookI18n2.setCategoryI18n("الفئة");
		bookI18n2.setAddButtonI18n("إنشاء");
		bookI18n2.setEditButtonI18n("تحرير");
		bookI18n2.setShowButtonI18n("إظهار / إخفاء");
		bookI18n2.setRefreshButtonI18n("تحديث");
		bookI18n2.setFilterI18n("عامل التصفية");
		bookI18n2.setSummaryButtonI18n("الملخص");
		bookI18n2.setCloseButtonI18n("إغلاق");
		bookI18n2.setFiltersI18n("عوامل التصفية");
		bookI18n2.setGroupByI18n("تجميع حسب");
		bookI18nRepository.save(bookI18n2);

	}

	private void insertImage(String photo) {
		File resource;
		try {
			resource = new ClassPathResource("books/" + photo).getFile();
			Files.readAllBytes(resource.toPath());
			ImageModel img = new ImageModel(photo, "image/jpeg",

					ImageUtil.compressBytes(Files.readAllBytes(resource.toPath())));
			imageRepository.save(img);

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public static void deleteDirectory(Path path) throws IOException {
		if (Files.exists(path)) {
			Files.walk(path)
					.sorted(Comparator.reverseOrder())
					.forEach(p -> {
						try {
							Files.delete(p);
						} catch (IOException e) {
							e.printStackTrace();
						}
					});
		}
	}

}
