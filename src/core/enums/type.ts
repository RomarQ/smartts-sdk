export enum TypeAtom {
    unknown = 'unknown',
    //
    record = 'record',
    variant = 'variant',
    chain_id = 'chain_id',
    unit = 'unit',
    nat = 'nat',
    int = 'int',
    mutez = 'mutez',
    bool = 'bool',
    bytes = 'bytes',
    string = 'string',
    address = 'address',
    timestamp = 'timestamp',
    bls12_381_fr = 'bls12_381_fr',
    bls12_381_g1 = 'bls12_381_g1',
    bls12_381_g2 = 'bls12_381_g2',
    key = 'key',
    key_hash = 'key_hash',
    list = 'list',
    set = 'set',
    option = 'option',
    map = 'map',
    big_map = 'bigmap',
    signature = 'signature',
    operation = 'operation',
    never = 'never',
    tuple = 'tuple',
    lambda = 'lambda',
    ticket = 'ticket',
    sapling_state = 'sapling_state',
    contract = 'contract',
    sapling_transaction = 'sapling_transaction',
}

export default TypeAtom;
