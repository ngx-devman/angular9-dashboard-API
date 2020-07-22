import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    token = '';
    storage: any = {};

    setValue(key, value) {
        this.storage[key] = value;
    }

    getValue(key) {
        return this.storage[key];
    }

    setToken(token) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    setCallback(callback) {
        this.storage['callback'] = callback
    }
}
