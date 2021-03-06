import { LineInfo } from '../misc/utils';
import { IExpression } from '../typings/expression';
import { Expression } from '../core/expression';
import ExpressionAtom from '../core/enums/expression';
import { MichelsonType } from '../core/enums/type';

/**
 * Compute a Blake2B cryptographic hash
 *
 * ```typescript
 * BLAKE2B(Bytes("0x01"));
 * ```
 *
 * @category Crypto
 *
 * @param bytes An expression that evaluates to a bytes value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const BLAKE2B = (bytes: IExpression<MichelsonType.bytes>, line = new LineInfo()) =>
    new Expression<MichelsonType.bytes>(ExpressionAtom.blake2b, bytes, line);

/**
 * Compute a SHA-256 cryptographic hash
 *
 * ```typescript
 * SHA256(Bytes("0x01"));
 * ```
 *
 * @category Crypto
 *
 * @param bytes An expression that evaluates to a bytes value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const SHA256 = (bytes: IExpression<MichelsonType.bytes>, line = new LineInfo()) =>
    new Expression<MichelsonType.bytes>(ExpressionAtom.sha256, bytes, line);

/**
 * Compute a SHA-512 cryptographic hash
 *
 * ```typescript
 * SHA512(Bytes("0x01"));
 * ```
 *
 * @category Crypto
 *
 * @param bytes An expression that evaluates to a bytes value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const SHA512 = (bytes: IExpression<MichelsonType.bytes>, line = new LineInfo()) =>
    new Expression<MichelsonType.bytes>(ExpressionAtom.sha512, bytes, line);

/**
 * Compute a SHA3-256 cryptographic hash
 *
 * ```typescript
 * SHA3(Bytes("0x01"));
 * ```
 *
 * @category Crypto
 *
 * @param bytes An expression that evaluates to a bytes value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const SHA3 = (bytes: IExpression<MichelsonType.bytes>, line = new LineInfo()) =>
    new Expression<MichelsonType.bytes>(ExpressionAtom.sha3, bytes, line);

/**
 * Compute a Keccak-256 cryptographic hash
 *
 * ```typescript
 * KECCAK(Bytes("0x01"));
 * ```
 *
 * @category Crypto
 *
 * @param bytes An expression that evaluates to a bytes value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression
 */
export const KECCAK = (bytes: IExpression<MichelsonType.bytes>, line = new LineInfo()) =>
    new Expression<MichelsonType.bytes>(ExpressionAtom.keccak, bytes, line);

/**
 * Verifies that a given sequence of bytes has been signed with a given key.
 *
 * ```typescript
 * CheckSignature(Key("edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT"), Signature("sigsAujsNePapNNGsVotTvcKWMNNJja9B4a2FfAe8vExzFhEgEo1GTQStiif22uSA6iNxPGCGsXsRyeLHzeLbJL2y8CnYuNe"), Bytes("0x01"));
 * ```
 *
 * @category Crypto
 *
 * @param key The public key that signed the bytes.
 * @param signature The bytes signature.
 * @param bytes The raw bytes that were signed.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TBool()`.
 */
export const CheckSignature = (
    key: IExpression<MichelsonType.key>,
    signature: IExpression<MichelsonType.signature>,
    bytes: IExpression<MichelsonType.bytes>,
    line = new LineInfo(),
) => new Expression<MichelsonType.bool>(ExpressionAtom.check_signature, key, signature, bytes, line);

/**
 * Hash public key.
 *
 * ```typescript
 * HashKey(Key("edpku3g7CeTEvSKhxipD4Q2B6EiEP8cR323u8PFmGFgKRVRvCneEmT"));
 * ```
 *
 * @category Contract
 *
 * @param key An expression that evaluates to a public key value.
 * @param {LineInfo} line Source code line information (Used in error messages)
 *
 * @returns {IExpression} An expression of type `TContract(TUnit())`.
 */
export const HashKey = (
    key: IExpression<MichelsonType.key>,
    line = new LineInfo(),
): IExpression<MichelsonType.key_hash> => new Expression(ExpressionAtom.hash_key, key, line);

export const Crypto = {
    BLAKE2B,
    SHA256,
    SHA512,
    SHA3,
    KECCAK,
    CheckSignature,
    HashKey,
};
