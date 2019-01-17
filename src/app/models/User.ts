import { Observable } from "rxjs";

export class User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    projects? : [];
}