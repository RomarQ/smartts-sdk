export enum ValueAtom {
    record = 'record',
    variant = 'variant',
    chain_id_cst = 'chain_id_cst',
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
    Some = 'Some',
    None = 'None',
    Left = 'Left',
    Right = 'Right',
    map = 'map',
    big_map = 'big_map',
    signature = 'signature',
    tuple = 'tuple',
    ticket = 'ticket',
    sapling_state = 'sapling_empty_state',
    lambda = 'lambda',
    //
    operation = 'operation',
    option = 'option',
}

export default ValueAtom;
