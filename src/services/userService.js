

const userService = {
    getAll(){
        return api.post("/login", body)
    },
    create(body){
        return api.post("/user/create", body)
    },
    update(body){
        return api.put("/user/create", body)
    },
    delete(body){
        return api.delete(`/user/delete/${id}`)
    },
    

}

export default userService;