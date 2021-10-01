import Playground from "./Playground";
import User from "./User";

export default class UsePlayground {
    constructor(
        {
            id,
            playgroundId,
            userId,
            dateGame,
            startHour,
            startMin,
            endHour,
            endMin,
            user,
            playground,
        }
    ) {
        this.id = id;
        this.playgroundId = playgroundId;
        this.userId = userId;
        this.dateGame = dateGame;
        this.startHour = startHour;
        this.startMin = startMin;
        this.endHour = endHour;
        this.endMin = endMin;
        this.user = new User(user);
        this.playground = new Playground(playground);
    }
}