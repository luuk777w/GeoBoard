import { singleton } from "tsyringe";

// https://github.com/microsoft/tsyringe
@singleton()
export class HttpService {
    constructor() {
        console.log("Hallo");
    }
}
