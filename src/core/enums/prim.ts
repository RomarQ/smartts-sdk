export enum SmartPyAtom {
    bigmap = 'bigmap', // Is used to define the bigmap type
    tuple = 'tuple', // Is used to define tuple types
}

export enum Prim {
    // Type
    unit = 'unit',
    never = 'never',
    nat = 'nat',
    int = 'int',
    mutez = 'mutez',
    timestamp = 'timestamp',
    string = 'string',
    address = 'address',
    key = 'key',
    key_hash = 'key_hash',
    signature = 'signature',
    option = 'option',
    bytes = 'bytes',
    chain_id = 'chain_id',
    bool = 'bool',
    list = 'list',
    pair = 'pair',
    or = 'or',
    set = 'set',
    operation = 'operation',
    contract = 'contract',
    ticket = 'ticket',
    lambda = 'lambda',
    map = 'map',
    big_map = 'big_map',
    bls12_381_g1 = 'bls12_381_g1',
    bls12_381_g2 = 'bls12_381_g2',
    bls12_381_fr = 'bls12_381_fr',
    sapling_transaction = 'sapling_transaction',
    sapling_state = 'sapling_state',
    chest = 'chest',
    chest_key = 'chest_key',
    // Value
    Unit = 'Unit',
    True = 'True',
    False = 'False',
    Some = 'Some',
    None = 'None',
}
