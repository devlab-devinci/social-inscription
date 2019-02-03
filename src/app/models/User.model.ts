//import {Deserializable} from './deserializable.model';
import {AuthService} from '../auth/auth.service';

export class User /* implements Deserializable */ { 

    private  id: number;
    private  email: string;
    private  phone: string;
    private  name : string;
    private  firstName: string;
    private  lastName: string;
    private  age: number; // time
    private  roles = new Array();
    private  state: number;

    constructor(user) {
        this.name = user.displayName;
    }

    getId(): number {
        return this.id;
    }

    setId(value: number) {
        this.id = value;
    }

    getFirstName(): string {
        return this.firstName;
    }

    setFirstName(value: string) {
        this.firstName = value;
    }

    getLastName(): string {
        return this.lastName;
    }

    setLastName(value: string) {
        this.lastName = value;
    }

    getEmail(): string {
        return this.email;
    }

    setEmail(value: string) {
        this.email = value;
    }




    getPhone(): string {
        return this.phone;
    }

    setPhone(value: string) {
        this.phone = value;
    }

    getAge(): number {
        return this.age;
    }

    setAge(value: number) {
        this.age = value;
    }

    setRoles(value: string) {
        this.roles.push('test');
    }

    getRoles() {
        return this.roles;
    }

    getState(): number {
        return this.state;
    }

    setState(value: number) {
        this.state = value;
    }

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }

}