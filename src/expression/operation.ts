import { SetValue } from '../statement';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { PrependToList } from './list';
import { Mutez, None, Unit } from './literal';
import { Contract } from '../core';
import { GetOperations, GetProperty } from './variables';
import ValueAtom from '../core/enums/literal';

class OperationExpression extends Expression<ValueAtom.operation> {
    send(line = new LineInfo()) {
        const operations = GetOperations();
        return SetValue(operations, PrependToList(operations, this, line), line);
    }
}

class OriginationExpression extends Expression<ValueAtom.operation> {
    getAddress() {
        return GetProperty(this, 'address');
    }

    getOperation() {
        return GetProperty(this, 'operation');
    }

    send(line = new LineInfo()) {
        const operations = GetOperations();
        return SetValue(operations, PrependToList(operations, this.getOperation(), line), line);
    }
}

/**
 * Build a transaction operation.
 *
 * ```typescript
 *  // Transfer 100 mutez to an implicit account
 *  Transfer(GetContract(Address('tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN')), Mutez(100)).send();
 *  // Call an originated contract
 *  Transfer(GetContract(Address('KT1R9M3MDffw7qSVSnbJs46aMC9YzzZz3aGT'), '<entrypoint>', TNat()), Mutez(100), Nat(1)).send();
 * ```
 *
 * @category | Operations
 * @see https://tezos.gitlab.io/michelson-reference/#instr-TRANSFER_TOKENS
 *
 * @param contract Recipient contract
 * @param amount Transaction amount
 * @param argument Entrypoint argument
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Transfer = (
    contract: IExpression<ValueAtom.contract>,
    amount: IExpression<ValueAtom.mutez>,
    argument: IExpression = Unit(),
    line = new LineInfo(),
) => new OperationExpression(ExpressionAtom.transfer, argument, amount, contract, line);

/**
 * Build a delegation operation.
 *
 * ```typescript
 *  // Build and send a delegation operation
 *  SetDelegate(Some(Key_hash("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN"))).send();
 *  // Clear Delegate
 *  SetDelegate(None()).send();
 * ```
 *
 * @category | Operations
 * @see https://tezos.gitlab.io/michelson-reference/#instr-SET_DELEGATE
 *
 * @param keyHash An optional implicit account to receive the delegation.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const SetDelegate = (keyHash: IExpression<ValueAtom.option>, line = new LineInfo()) =>
    new OperationExpression(ExpressionAtom.set_delegate, keyHash, line);

/**
 * Build a origination operation.
 *
 * ```typescript
 *  // Create a new contract (Simple)
 *  CreateContract(new Contract(), Unit()).send();
 *  // Create a new contract (Full)
 *  CreateContract(new Contract(), Nat(1), Mutez(100), Some(Key_hash("tz1gTnKMA65qaKVpp6x4cgMLU2UyKF2zjHYN"))).send();
 * ```
 *
 * @category | Operations
 * @see https://tezos.gitlab.io/michelson-reference/#instr-CREATE_CONTRACT
 *
 * @param contract Contract class
 * @param storage Initial storage for the contract
 * @param initial_balance Initial balance for the new contract
 * @param delegate The address of the delegate implicit account
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const CreateContract = (
    contract: Contract,
    storage: IExpression,
    initial_balance: IExpression<ValueAtom.mutez> = Mutez(0),
    delegate: IExpression<ValueAtom.option> = None(),
    line = new LineInfo(),
) => {
    const contract_param = new Expression(ExpressionAtom.contract, contract[Symbol.toPrimitive]());
    const storage_param = new Expression('storage', storage);
    const baker_param = new Expression('baker', delegate);
    const initial_balance_param = new Expression('amount', initial_balance);
    const expr = new OriginationExpression(
        ExpressionAtom.create_contract,
        contract_param,
        storage_param,
        baker_param,
        initial_balance_param,
        line,
    );

    return expr;
};

export const Operation = { Transfer, SetDelegate, CreateContract };
