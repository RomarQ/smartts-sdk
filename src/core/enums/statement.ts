export enum StatementAtom {
    verify = 'verify',
    ifBlock = 'ifBlock',
    elseBlock = 'elseBlock',
    forGroup = 'forGroup',
    whileBlock = 'whileBlock',
    set = 'set',
    defineLocal = 'defineLocal',
    result = 'result',
    failwith = 'failwith',
    match = 'match',
    match_cases = 'match_cases',
    set_type = 'set_type',
}

export default StatementAtom;
