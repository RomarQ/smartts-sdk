import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Expression } from '../core/expression';
import ExpressionAtom from '../core/enums/expression';

/**
 * Compute a Blake2B cryptographic hash
 *
 * ```typescript
 * BLAKE2B(Bytes("0x01"));
 * ```
 *
 * @category | Crypto
 *
 * @param bytes An expression that evaluates to a bytes value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const BLAKE2B = (bytes: IExpression, line = new LineInfo()) =>
    new Expression(ExpressionAtom.blake2b, bytes, line);

/**
 * Compute a SHA-256 cryptographic hash
 *
 * ```typescript
 * SHA256(Bytes("0x01"));
 * ```
 *
 * @category | Crypto
 *
 * @param bytes An expression that evaluates to a bytes value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const SHA256 = (bytes: IExpression, line = new LineInfo()) => new Expression(ExpressionAtom.sha256, bytes, line);

/**
 * Compute a SHA-512 cryptographic hash
 *
 * ```typescript
 * SHA512(Bytes("0x01"));
 * ```
 *
 * @category | Crypto
 *
 * @param bytes An expression that evaluates to a bytes value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const SHA512 = (bytes: IExpression, line = new LineInfo()) => new Expression(ExpressionAtom.sha512, bytes, line);

/**
 * Compute a SHA3-256 cryptographic hash
 *
 * ```typescript
 * SHA3(Bytes("0x01"));
 * ```
 *
 * @category | Crypto
 *
 * @param bytes An expression that evaluates to a bytes value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const SHA3 = (bytes: IExpression, line = new LineInfo()) => new Expression(ExpressionAtom.sha3, bytes, line);

/**
 * Compute a Keccak-256 cryptographic hash
 *
 * ```typescript
 * KECCAK(Bytes("0x01"));
 * ```
 *
 * @category | Crypto
 *
 * @param bytes An expression that evaluates to a bytes value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const KECCAK = (bytes: IExpression, line = new LineInfo()) => new Expression(ExpressionAtom.keccak, bytes, line);

export const Crypto = {
    BLAKE2B,
    SHA256,
    SHA512,
    SHA3,
    KECCAK,
};
