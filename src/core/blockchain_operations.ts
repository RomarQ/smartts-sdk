import { LineInfo } from '../misc/utils';
import { Expression } from './expression';

export const Sender = (line = new LineInfo()) => new Expression('sender');

export const Level = (line = new LineInfo()) => new Expression('level');
