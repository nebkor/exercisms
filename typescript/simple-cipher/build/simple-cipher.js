"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SimpleCipher {
    constructor(key) {
        this._a = 'a'.charCodeAt(0);
        this.letspan = 26;
        if (!key) {
            this.key = this.genkey();
        }
        else {
            this.key = key;
        }
        if (!this.key.match(/^[a-z]{1,}$/) || key == "") {
            throw Error("Bad key");
        }
        this.keylen = this.key.length;
    }
    encode(plntxt) {
        let cyphrtxt = "";
        for (let i = 0; i < plntxt.length; i++) {
            let key_idx = i % this.keylen;
            let keyord = this.char2ord(this.key[key_idx]);
            let pord = this.char2ord(plntxt[i]);
            let cord = (pord + keyord) % this.letspan;
            cyphrtxt += this.ord2char(cord);
        }
        return cyphrtxt;
    }
    decode(cyphrtxt) {
        let plntxt = "";
        for (let i = 0; i < cyphrtxt.length; i++) {
            let j = i % this.keylen;
            let keyord = this.char2ord(this.key[j]);
            let cord = this.char2ord(cyphrtxt[i]);
            let pord = (cord - keyord);
            if (pord < 0) {
                pord = this.letspan + pord;
            }
            plntxt += this.ord2char(pord);
        }
        return plntxt;
    }
    char2ord(c) {
        return c.charCodeAt(0) - this._a;
    }
    ord2char(o) {
        let aplus = o + this._a;
        return String.fromCharCode(aplus);
    }
    genkey(len = 100) {
        // from https://stackoverflow.com/a/16106889
        let key = "";
        while (len--) {
            key += String.fromCharCode(this._a + Math.floor((Math.random() * this.letspan)));
        }
        return key;
    }
}
exports.default = SimpleCipher;
//# sourceMappingURL=simple-cipher.js.map