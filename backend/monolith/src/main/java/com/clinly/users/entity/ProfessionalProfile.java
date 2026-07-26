package com.clinly.users.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "professional_profiles")
public class ProfessionalProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "registration_number", length = 50)
    private String registrationNumber;

    @Column(length = 150)
    private String specialty;

    @Column(columnDefinition = "TEXT")
    private String biography;

    @Column(name = "appointment_duration")
    private Integer appointmentDuration = 50;

    public ProfessionalProfile() {
    }

    public ProfessionalProfile(UUID id, User user, String registrationNumber,
                               String specialty, String biography, Integer appointmentDuration) {
        this.id = id;
        this.user = user;
        this.registrationNumber = registrationNumber;
        this.specialty = specialty;
        this.biography = biography;
        this.appointmentDuration = appointmentDuration;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public Integer getAppointmentDuration() {
        return appointmentDuration;
    }

    public void setAppointmentDuration(Integer appointmentDuration) {
        this.appointmentDuration = appointmentDuration;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProfessionalProfile that = (ProfessionalProfile) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "ProfessionalProfile{" +
                "id=" + id +
                ", registrationNumber='" + registrationNumber + '\'' +
                ", specialty='" + specialty + '\'' +
                ", appointmentDuration=" + appointmentDuration +
                '}';
    }
}
