package com.example.vti_hotel_be.service;


import com.example.vti_hotel_be.modal.request.RoomRequest;
import com.example.vti_hotel_be.modal.responseDTO.dto.RoomDTO;

import java.util.List;

public interface IRoomService {
    // find
    List<RoomDTO> findRooms();
    RoomDTO findId(int id);

    // create
    RoomDTO createRoom(RoomRequest request);

    // update
    RoomDTO updateRoom(int id, RoomRequest request);

    // change quantity room
    RoomDTO changeQuantity(int id, RoomRequest request);

    // change all price in room
    RoomDTO changePrice(int id, RoomRequest request);
}
