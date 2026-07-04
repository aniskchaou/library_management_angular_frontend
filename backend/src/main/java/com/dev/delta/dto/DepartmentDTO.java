package com.dev.delta.dto;

import com.dev.delta.entities.Departement;
import com.dev.delta.repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentDTO implements DTO {

    @Autowired
    DepartmentRepository departmentRepository;

    @Override
    public void populate() {
        Departement department1 = new Departement();
        department1.setDepartmentName("IT");
        department1.setDepartmentCode("IT001");
        department1.setHeadOfDepartment("John Doe");
        department1.setLocation("Building A");
        department1.setPhone("123-456-7890");
        department1.setEmail("john.doe@example.com");
        department1.setNumberOfEmployees(10);
        departmentRepository.save(department1);

        Departement department2 = new Departement();
        department2.setDepartmentName("HR");
        department2.setDepartmentCode("HR001");
        department2.setHeadOfDepartment("Jane Smith");
        department2.setLocation("Building B");
        department2.setPhone("098-765-4321");
        department2.setEmail("jane.smith@example.com");
        department2.setNumberOfEmployees(5);
        departmentRepository.save(department2);

        Departement department3 = new Departement();
        department3.setDepartmentName("Finance");
        department3.setDepartmentCode("FI001");
        department3.setHeadOfDepartment("Alice Johnson");
        department3.setLocation("Building C");
        department3.setPhone("456-789-0123");
        department3.setEmail("alice.johnson@example.com");
        department3.setNumberOfEmployees(8);
        departmentRepository.save(department3);

        Departement department4 = new Departement();
        department4.setDepartmentName("Marketing");
        department4.setDepartmentCode("MK001");
        department4.setHeadOfDepartment("Bob Brown");
        department4.setLocation("Building D");
        department4.setPhone("567-890-1234");
        department4.setEmail("bob.brown@example.com");
        department4.setNumberOfEmployees(12);
        departmentRepository.save(department4);

        Departement department5 = new Departement();
        department5.setDepartmentName("Sales");
        department5.setDepartmentCode("SA001");
        department5.setHeadOfDepartment("Charlie Davis");
        department5.setLocation("Building E");
        department5.setPhone("678-901-2345");
        department5.setEmail("charlie.davis@example.com");
        department5.setNumberOfEmployees(15);
        departmentRepository.save(department5);

        Departement department6 = new Departement();
        department6.setDepartmentName("Customer Support");
        department6.setDepartmentCode("CS001");
        department6.setHeadOfDepartment("Diana Evans");
        department6.setLocation("Building F");
        department6.setPhone("789-012-3456");
        department6.setEmail("diana.evans@example.com");
        department6.setNumberOfEmployees(7);
        departmentRepository.save(department6);

        Departement department7 = new Departement();
        department7.setDepartmentName("R&D");
        department7.setDepartmentCode("RD001");
        department7.setHeadOfDepartment("Evan Wilson");
        department7.setLocation("Building G");
        department7.setPhone("890-123-4567");
        department7.setEmail("evan.wilson@example.com");
        department7.setNumberOfEmployees(9);
        departmentRepository.save(department7);

        Departement department8 = new Departement();
        department8.setDepartmentName("Legal");
        department8.setDepartmentCode("LE001");
        department8.setHeadOfDepartment("Fiona Clark");
        department8.setLocation("Building H");
        department8.setPhone("901-234-5678");
        department8.setEmail("fiona.clark@example.com");
        department8.setNumberOfEmployees(6);
        departmentRepository.save(department8);

        Departement department9 = new Departement();
        department9.setDepartmentName("Administration");
        department9.setDepartmentCode("AD001");
        department9.setHeadOfDepartment("George Lewis");
        department9.setLocation("Building I");
        department9.setPhone("012-345-6789");
        department9.setEmail("george.lewis@example.com");
        department9.setNumberOfEmployees(11);
        departmentRepository.save(department9);

        Departement department10 = new Departement();
        department10.setDepartmentName("IT Support");
        department10.setDepartmentCode("IT002");
        department10.setHeadOfDepartment("Hannah Turner");
        department10.setLocation("Building J");
        department10.setPhone("123-456-7891");
        department10.setEmail("hannah.turner@example.com");
        department10.setNumberOfEmployees(14);
        departmentRepository.save(department10);

        Departement department11 = new Departement();
        department11.setDepartmentName("IT Support2");
        department11.setDepartmentCode("IT012");
        department11.setHeadOfDepartment("Hannah Turnerr");
        department11.setLocation("Building JJ");
        department11.setPhone("123-456-78911");
        department11.setEmail("hannah.turner1@example.com");
        department11.setNumberOfEmployees(14);
        departmentRepository.save(department11);
    }
}
