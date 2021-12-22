import { Expression } from './expression';

export const GetSender = () => new Expression('sender');

export const GetSource = () => new Expression('source');

export const GetCurrentTime = () => new Expression('now');

export const GetLevel = () => new Expression('level');

export const GetChainID = () => new Expression('chain_id');
