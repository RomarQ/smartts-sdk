export enum ExpressionAtom {
    // Math
    add = 'add',
    mul = 'mul',
    sub = 'sub',
    truediv = 'truediv',
    // Comparison
    eq = 'eq',
    neq = 'neq',
    lt = 'lt',
    gt = 'gt',
    le = 'le',
    ge = 'ge',
    //
    items = 'items',
    update_map = 'update_map',
    getItem = 'getItem',
    attr = 'attr',
    params = 'params',
    getLocal = 'getLocal',
    iter = 'iter',
    // Blockchain operation
    amount = 'amount',
    balance = 'balance',
    chain_id = 'chain_id',
    level = 'level',
    now = 'now',
    self = 'self',
    self_address = 'self_address',
    sender = 'sender',
    source = 'source',
    total_voting_power = 'total_voting_power',
    voting_power = 'voting_power',
}

export default ExpressionAtom;
