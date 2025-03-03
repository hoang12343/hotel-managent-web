package com.example.vti_hotel_be.repository;

import com.example.vti_hotel_be.modal.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
}

