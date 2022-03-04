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
    getItemDefault = 'getItemDefault',
    getItemMessage = 'getItemMessage',
    attr = 'attr',
    params = 'params',
    getLocal = 'getLocal',
    iter = 'iter',
    // Blockchain property
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
    // Operation
    operations = 'operations',
    transfer = 'transfer',
    set_delegate = 'set_delegate',
    create_contract = 'create_contract',
    // List instructions
    cons = 'cons',
    //
    contract = 'contract',
    // Variant
    openVariant = 'openVariant',
    isVariant = 'isVariant',
    cases_arg = 'cases_arg',
    variant_arg = 'variant_arg',
}

export default ExpressionAtom;
