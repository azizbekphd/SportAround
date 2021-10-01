export default class Playground {
    constructor(
        {
            id,
            typeId,
            userId,
            name,
            address,
            coverage,
            costHour,
            countPlays,
            pay,
            status,
            createdAt,
            updatedAt,
            latitude,
            longitude,
        }
    ) {
        this.id = id;
        this.typeId = typeId;
        this.userId = userId;
        this.name = name;
        this.address = address;
        this.coverage = coverage;
        this.costHour = costHour;
        this.countPlays = countPlays;
        this.pay = pay;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}