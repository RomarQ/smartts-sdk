import ExpressionAtom from '../core/enums/expression';
import { MichelsonType } from '../core/enums/type';
import { Expression } from '../core/expression';
import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Pair } from './literal';

/**
 * Creates a ticket with some content and an amount.
 * For a ticket with content of type `t`, the return type will be `TTicket(t)`.
 *
 * ```typescript
 * CreateTicket(String("TEST"), Nat(10));
 * ```
 *
 * @category | Ticket
 *
 * @param content The content to be wrapped in the ticket.
 * @param amount The ticket amount.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} A value of type `ticket`.
 */
export const CreateTicket = (
    content: IExpression<any>,
    amount: IExpression<MichelsonType.nat>,
    line = new LineInfo(),
) => {
    return new Expression(ExpressionAtom.ticket, content, amount, line);
};

/**
 * Retrieve the information stored in a ticket. Also return the ticket.
 *
 * ```typescript
 * ReadTicket(some_ticket);
 * ```
 *
 * @category | Ticket
 *
 * @param ticket The ticket to be read.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} A value of type `TPair(TPair(TAddress(), t, TNat()), TTicket(t))`.
 */
export const ReadTicket = (ticket: IExpression<MichelsonType.ticket>, line = new LineInfo()) => {
    return new Expression(ExpressionAtom.read_ticket, ticket, line);
};

/**
 * Splits a ticket in two.
 *
 * ```typescript
 * SplitTicket(some_ticket, Nat(1), Nat(1));
 * ```
 *
 * @category | Ticket
 *
 * @param ticket The ticket to be split.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} A value of type TOption(TPair(TTicket(t), TTicket(t)))`.
 */
export const SplitTicket = (
    ticket: IExpression<MichelsonType.ticket>,
    amount1: IExpression<MichelsonType.nat>,
    amount2: IExpression<MichelsonType.nat>,
    line = new LineInfo(),
) => {
    return new Expression(ExpressionAtom.split_ticket, ticket, Pair(amount1, amount2), line);
};
