import { SetValue } from '../statement';
import ExpressionAtom from '../core/enums/expression';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { AppendToList } from './list';
import { Unit } from './literal';

class OperationExpression extends Expression {
    send(line = new LineInfo()) {
        const operations = GetOperations();
        return SetValue(operations, AppendToList(operations, this, line), line);
    }
}

/**
 * @description Get operations list from the stack or an empty list otherwise.
 *
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const GetOperations = (line = new LineInfo()) => new Expression(ExpressionAtom.operations, line);

/**
 * @description Build a transaction operation.
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
 * @description Build a delegation operation.
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

export const CreateContract = () => {
    throw new Error('NOT IMPLEMENTED');
};

const Operation = { GetOperations, Transfer, SetDelegate, CreateContract };

export default Operation;
