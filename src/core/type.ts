import { composeRightCombLayout, parenthesis } from '../misc/utils';
import { ILayout } from '../typings/literal';
import { IType } from '../typings/type';
import { Layout } from './enums/layout';
import { TypeAtom } from './enums/type';

export class SimpleType<T extends TypeAtom> implements IType<T> {
    // Used for type checking
    _type = {} as T;

    constructor(public name: T) {}

    toString() {
        return `"${this.name}"`;
    }
}

export class ContainerType<T extends TypeAtom> implements IType<T> {
    // Used for type checking
    _type = {} as T;

    constructor(public type: T, public innerTypes: (IType | number)[]) {}

    toString() {
        return `(${this.type} ${this.innerTypes.join(' ')})`;
    }
}

export class Type_VariantOrRecord implements IType<TypeAtom> {
    // Used for type checking
    _type = TypeAtom.record;

    private layout: ILayout | Layout;

    constructor(private atom: string, private fields: Record<string, IType>, layout?: ILayout | Layout) {
        this.layout = layout || composeRightCombLayout(Object.keys(fields));
    }

    private translateLayout = (layout: ILayout | Layout): string => {
        const normalizeTuple = (layout: string | ILayout): string => {
            if (typeof layout === 'string') {
                return `("${layout}")`;
            }
            if (layout.length === 1) {
                return `("${layout[0]}")`;
            }
            const [left, right] = layout;
            return parenthesis([normalizeTuple(left), normalizeTuple(right)].join(' '));
        };

        if (Array.isArray(layout)) {
            return layout.length ? `(Some ${normalizeTuple(layout)})` : 'None';
        }
        return '(Some Right)';
    };

    private buildFields = (fields: Record<string, IType>) => {
        return Object.entries(fields).map(([field, ty]) => `(${field} ${ty.toString()})`);
    };

    toString() {
        return `(${this.atom} (${this.buildFields(this.fields).join(' ')}) ${this.translateLayout(
            this.layout,
        )} ("" -1))`;
    }
}
