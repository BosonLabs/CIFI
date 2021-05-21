/// <reference types="node" />
import * as txnBuilder from './transaction';
import { EncodedLogicSig, EncodedMultisig } from './types/transactions/encoded';
import { MultisigMetadata } from './types/multisig';
interface LogicSigStorageStructure {
    logic: Uint8Array;
    args: Uint8Array[];
    sig?: Uint8Array;
    msig?: EncodedMultisig;
}
/**
 LogicSig implementation
 */
export declare class LogicSig implements LogicSigStorageStructure {
    tag: Buffer;
    logic: Uint8Array;
    args: Uint8Array[];
    sig?: Uint8Array;
    msig?: EncodedMultisig;
    constructor(program: Uint8Array, bufferOrUint8ArrArgs: Array<Uint8Array | Buffer> | undefined);
    get_obj_for_encoding(): EncodedLogicSig;
    static from_obj_for_encoding(encoded: EncodedLogicSig): LogicSig;
    /**
     * Performs signature verification
     * @param publicKey - Verification key (derived from sender address or escrow address)
     */
    verify(publicKey: Uint8Array): boolean;
    /**
     * Compute hash of the logic sig program (that is the same as escrow account address) as string address
     * @returns String representation of the address
     */
    address(): string;
    /**
     * Creates signature (if no msig provided) or multi signature otherwise
     * @param secretKey - Secret key to sign with
     * @param msig - Multisig account as \{version, threshold, addrs\}
     */
    sign(secretKey: Uint8Array, msig: MultisigMetadata): void;
    /**
     * Appends a signature to multi signature
     * @param secretKey - Secret key to sign with
     */
    appendToMultisig(secretKey: Uint8Array): void;
    signProgram(secretKey: Uint8Array): Uint8Array;
    singleSignMultisig(secretKey: Uint8Array, msig: EncodedMultisig): [sig: Uint8Array, index: number];
    toByte(): Uint8Array;
    static fromByte(encoded: ArrayLike<any>): LogicSig;
}
/**
 * makeLogicSig creates LogicSig object from program and arguments
 *
 * @param program - Program to make LogicSig from
 * @param args - Arguments as array of Uint8Array
 * @returns LogicSig object
 */
export declare function makeLogicSig(program: Uint8Array, args?: Uint8Array[]): LogicSig;
/**
 * signLogicSigTransactionObject takes transaction.Transaction and a LogicSig object and returns a logicsig
 * transaction which is a blob representing a transaction and logicsig object.
 * @param txn - transaction.Transaction
 * @param lsig - logicsig object
 * @returns Object containing txID and blob representing signed transaction.
 */
export declare function signLogicSigTransactionObject(txn: txnBuilder.Transaction, lsig: LogicSig): {
    txID: string;
    blob: Uint8Array;
};
/**
 * signLogicSigTransaction takes a raw transaction and a LogicSig object and returns a logicsig
 * transaction which is a blob representing a transaction and logicsig object.
 * @param txn - containing constructor arguments for a transaction
 * @param lsig -  logicsig object
 * @returns Object containing txID and blob representing signed transaction.
 * @throws error on failure
 */
export declare function signLogicSigTransaction(txn: txnBuilder.TransactionLike, lsig: LogicSig): {
    txID: string;
    blob: Uint8Array;
};
/**
 * logicSigFromByte accepts encoded logic sig bytes and attempts to call logicsig.fromByte on it,
 * returning the result
 */
export declare function logicSigFromByte(encoded: Uint8Array): LogicSig;
/**
 * tealSign creates a signature compatible with ed25519verify opcode from contract address
 * @param sk - uint8array with secret key
 * @param data - buffer with data to sign
 * @param contractAddress - string representation of teal contract address (program hash)
 */
export declare function tealSign(sk: Uint8Array, data: Uint8Array | Buffer, contractAddress: string): Uint8Array;
/**
 * tealSignFromProgram creates a signature compatible with ed25519verify opcode from raw program bytes
 * @param sk - uint8array with secret key
 * @param data - buffer with data to sign
 * @param program - buffer with teal program
 */
export declare function tealSignFromProgram(sk: Uint8Array, data: Uint8Array | Buffer, program: Uint8Array): Uint8Array;
export default LogicSig;
