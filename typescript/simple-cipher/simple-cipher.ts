class SimpleCipher {

    key: string;
    private _a: number = 'a'.charCodeAt(0);
    keylen: number;
    letspan: number = 26;

    encode(plntxt: string): string {
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

    decode(cyphrtxt: string): string {
        let plntxt = "";
        for (let i = 0; i < cyphrtxt.length; i++) {
            let j = i % this.keylen;
            let keyord = this.char2ord(this.key[j]);
            let cord = this.char2ord(cyphrtxt[i]);
            let pord = (cord - keyord);
            if (pord < 0) { // mod operator doesn't work like it does in Python
                pord = this.letspan + pord;
            }
            plntxt += this.ord2char(pord);
        }
        return plntxt;
    }

    constructor(key?: string) {
        if (!key) {
            this.key = this.genkey();
        } else {
            this.key = key;
        }

        if (!this.key.match(/^[a-z]{1,}$/) || key == "") {
            throw Error("Bad key");
        }

        this.keylen = this.key.length;
    }

    private char2ord(c: string): number {
        return c.charCodeAt(0) - this._a;

    }

    private ord2char(o: number): string {
        let aplus = o + this._a;
        return String.fromCharCode(aplus);
    }

    private genkey(len: number = 100) {
        // from https://stackoverflow.com/a/16106889
        let key = "";
        while (len--) {
            key += String.fromCharCode(this._a + Math.floor((Math.random() * this.letspan)));
        }
        return key;
    }
}

export default SimpleCipher
