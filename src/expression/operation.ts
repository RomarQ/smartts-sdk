import { SetValue } from '../statement';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { AppendToList } from './list';
import { Mutez, None, Unit } from './literal';
import { Contract } from '../core';
import { GetProperty } from './variables';

class OperationExpression extends Expression {
    send(line = new LineInfo()) {
        const operations = GetOperations();
        return SetValue(operations, AppendToList(operations, this, line), line);
    }
}

class OriginationExpression extends Expression {
    getAddress() {
        return GetProperty(this, 'address');
    }

    getOperation() {
        return GetProperty(this, 'operation');
    }

    send(line = new LineInfo()) {
        const operations = GetOperations();
        return SetValue(operations, AppendToList(operations, this.getOperation(), line), line);
    }
}

/**
 * Get operations list from the stack or an empty list otherwise.
 *
 * ```typescript
 *  // Get operations list from the stack or an empty list otherwise.
 *  GetOperations();
 * ```
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GetOperations = (line = new LineInfo()) => new Expression(ExpressionAtom.operations, line);

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
 * @param contract Recipient contract
 * @param amount Transaction amount
 * @param argument Entrypoint argument
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const Transfer = (
    contract: IExpression,
    amount: IExpression,
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
 * @param keyHash An optional implicit account to receive the delegation.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const SetDelegate = (keyHash: IExpression, line = new LineInfo()) =>
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
    initial_balance: IExpression = Mutez(0),
    delegate: IExpression = None(),
    line = new LineInfo(),
) => {
    const contract_param = new Expression(ExpressionAtom.contract, contract.toString());
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

const Operation = { GetOperations, Transfer, SetDelegate, CreateContract };

export default Operation;
