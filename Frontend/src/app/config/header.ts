import { HttpHeaders } from "@angular/common/http";


export class HeadersService {

    public createHeaders() {
        var token = localStorage.getItem("token");
        //TOKEN
        var headers = new HttpHeaders().set("Authorization", "Bearer " + token);
        headers.append("Content-Type", "application/json; charset=UTF-8");

        return headers;
    }

}


