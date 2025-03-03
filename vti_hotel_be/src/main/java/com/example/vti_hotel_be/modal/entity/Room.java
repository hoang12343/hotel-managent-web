package com.example.vti_hotel_be.modal.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "image_room")
    private String imageRoom;

    @Column(name = "description")
    private String description;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price_day")
    private double priceDay;

    @Column(name = "price_night")
    private double priceNight;

    @Column(name = "price_first_hour")
    private double priceFirstHour;

    @Column(name = "price_next_hour")
    private double priceNextHour;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageRoom() {
        return imageRoom;
    }

    public void setImageRoom(String imageRoom) {
        this.imageRoom = imageRoom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPriceDay() {
        return priceDay;
    }

    public void setPriceDay(double priceDay) {
        this.priceDay = priceDay;
    }

    public double getPriceNight() {
        return priceNight;
    }

    public void setPriceNight(double priceNight) {
        this.priceNight = priceNight;
    }

    public double getPriceFirstHour() {
        return priceFirstHour;
    }

    public void setPriceFirstHour(double priceFirstHour) {
        this.priceFirstHour = priceFirstHour;
    }

    public double getPriceNextHour() {
        return priceNextHour;
    }

    public void setPriceNextHour(double priceNextHour) {
        this.priceNextHour = priceNextHour;
    }
}
