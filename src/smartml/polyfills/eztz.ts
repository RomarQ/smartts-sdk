import * as bs58check from 'bs58check';

export const prefix = {
    tz1: new Uint8Array([6, 161, 159]),
    tz2: new Uint8Array([6, 161, 161]),
    tz3: new Uint8Array([6, 161, 164]),
    KT: new Uint8Array([2, 90, 121]),

    edpk: new Uint8Array([13, 15, 37, 217]),
    edsk2: new Uint8Array([13, 15, 58, 7]),
    spsk: new Uint8Array([17, 162, 224, 201]),
    p2sk: new Uint8Array([16, 81, 238, 189]),

    sppk: new Uint8Array([3, 254, 226, 86]),
    p2pk: new Uint8Array([3, 178, 139, 127]),

    edesk: new Uint8Array([7, 90, 60, 179, 41]),

    edsk: new Uint8Array([43, 246, 78, 7]),
    edsig: new Uint8Array([9, 245, 205, 134, 18]),
    spsig1: new Uint8Array([13, 115, 101, 19, 63]),
    p2sig: new Uint8Array([54, 240, 44, 52]),
    sig: new Uint8Array([4, 130, 43]),

    Net: new Uint8Array([87, 82, 0]),
    nce: new Uint8Array([69, 220, 169]),
    b: new Uint8Array([1, 52]),
    o: new Uint8Array([5, 116]),
    Lo: new Uint8Array([133, 233]),
    LLo: new Uint8Array([29, 159, 109]),
    P: new Uint8Array([2, 170]),
    Co: new Uint8Array([79, 179]),
    id: new Uint8Array([153, 103]),
};

const eztz = {
    prefix,
    utility: {
        b58cencode: (payload: Uint8Array, prefix: Uint8Array) => {
            const n = new Uint8Array(prefix.length + payload.length);
            n.set(prefix);
            n.set(payload, prefix.length);
            return bs58check.encode(Buffer.from(n));
        },
        b58cdecode: function (enc: string, prefix: Uint8Array) {
            let n = bs58check.decode(enc);
            n = n.slice(prefix.length);
            return n;
        },
    },
};

export default eztz;
