import type Bls12 from '@tezwell/tezos-bls12-381';
import type Timelock from '@tezwell/timelock';
import type Eztz from './eztz';

declare global {
    var eztz: typeof Eztz;
    var smartpyContext: SmartpyContext;
}

interface SmartpyContext {
    Bls12: typeof Bls12;
    Timelock: typeof Timelock;
}
