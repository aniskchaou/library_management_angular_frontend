package com.dev.delta.dto.output;

import java.math.BigDecimal;
import java.util.List;

public class MemberStatisticsDTO {

    private int totalBooksBorrowed=0;
    private int currentlyBorrowedBooks=0;
    private int overdueBooks=0;
    private double averageBorrowingRate=0;
    private List<String> favoriteGenres;
    private String mostBorrowedBook="N/A";

    private BigDecimal totalFinesAccrued= BigDecimal.valueOf(0);
    private BigDecimal totalFinesPaid= BigDecimal.valueOf(0);;
    private BigDecimal outstandingFines= BigDecimal.valueOf(0);;

    // Constructors, Getters, and Setters

    public MemberStatisticsDTO() {}

    public MemberStatisticsDTO(int totalBooksBorrowed, int currentlyBorrowedBooks, int overdueBooks, double averageBorrowingRate, List<String> favoriteGenres, String mostBorrowedBook, BigDecimal totalFinesAccrued, BigDecimal totalFinesPaid, BigDecimal outstandingFines) {
        this.totalBooksBorrowed = totalBooksBorrowed;
        this.currentlyBorrowedBooks = currentlyBorrowedBooks;
        this.overdueBooks = overdueBooks;
        this.averageBorrowingRate = averageBorrowingRate;
        this.favoriteGenres = favoriteGenres;
        this.mostBorrowedBook = mostBorrowedBook;
        this.totalFinesAccrued = totalFinesAccrued;
        this.totalFinesPaid = totalFinesPaid;
        this.outstandingFines = outstandingFines;
    }

    @Override
    public String toString() {
        return "MemberStatisticsDTO{" +
                "totalBooksBorrowed=" + totalBooksBorrowed +
                ", currentlyBorrowedBooks=" + currentlyBorrowedBooks +
                ", overdueBooks=" + overdueBooks +
                ", averageBorrowingRate=" + averageBorrowingRate +
                ", favoriteGenres=" + favoriteGenres +
                ", mostBorrowedBook='" + mostBorrowedBook + '\'' +
                ", totalFinesAccrued=" + totalFinesAccrued +
                ", totalFinesPaid=" + totalFinesPaid +
                ", outstandingFines=" + outstandingFines +
                '}';
    }

    public int getTotalBooksBorrowed() {
        return totalBooksBorrowed;
    }

    public void setTotalBooksBorrowed(int totalBooksBorrowed) {
        this.totalBooksBorrowed = totalBooksBorrowed;
    }

    public int getCurrentlyBorrowedBooks() {
        return currentlyBorrowedBooks;
    }

    public void setCurrentlyBorrowedBooks(int currentlyBorrowedBooks) {
        this.currentlyBorrowedBooks = currentlyBorrowedBooks;
    }

    public int getOverdueBooks() {
        return overdueBooks;
    }

    public void setOverdueBooks(int overdueBooks) {
        this.overdueBooks = overdueBooks;
    }

    public double getAverageBorrowingRate() {
        return averageBorrowingRate;
    }

    public void setAverageBorrowingRate(double averageBorrowingRate) {
        this.averageBorrowingRate = averageBorrowingRate;
    }

    public List<String> getFavoriteGenres() {
        return favoriteGenres;
    }

    public void setFavoriteGenres(List<String> favoriteGenres) {
        this.favoriteGenres = favoriteGenres;
    }

    public String getMostBorrowedBook() {
        return mostBorrowedBook;
    }

    public void setMostBorrowedBook(String mostBorrowedBook) {
        this.mostBorrowedBook = mostBorrowedBook;
    }

    public BigDecimal getTotalFinesAccrued() {
        return totalFinesAccrued;
    }

    public void setTotalFinesAccrued(BigDecimal totalFinesAccrued) {
        this.totalFinesAccrued = totalFinesAccrued;
    }

    public BigDecimal getTotalFinesPaid() {
        return totalFinesPaid;
    }

    public void setTotalFinesPaid(BigDecimal totalFinesPaid) {
        this.totalFinesPaid = totalFinesPaid;
    }

    public BigDecimal getOutstandingFines() {
        return outstandingFines;
    }

    public void setOutstandingFines(BigDecimal outstandingFines) {
        this.outstandingFines = outstandingFines;
    }
// Getters and setters for all fields...
}
