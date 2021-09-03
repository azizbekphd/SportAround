export default class User {
    constructor(
        {
            id,
            username,
            status,
            phone,
            email,
            birthday,
            address,
            gender,
            verification_token,
            access_token,
            lifetime_access_token,
            createdAt,
            updatedAt
        }
    ) {
        this.id = id;
        this.username = username;
        this.status = status;
        this.phone = phone;
        this.email = email;
        this.birthday = birthday;
        this.address = address;
        this.gender = gender;
        this.verification_token = verification_token;
        this.access_token = access_token;
        this.lifetime_access_token = lifetime_access_token;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}