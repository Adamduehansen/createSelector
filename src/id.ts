import { makeClassNameSelector, WithClassName } from './classNames';
import { formatSelector } from './formatSelector';
import { Selector, SelectorOptions } from './selector';

export type WithId = (id: string) => IdSelector;

interface IdAndConstraint {
  withClassName: WithClassName;
}

interface IdSelector extends Selector {
  and: () => IdAndConstraint;
}

function makeIdAndConstraint(selector: SelectorOptions): () => IdAndConstraint {
  return function () {
    return {
      withClassName: makeClassNameSelector(selector),
    };
  };
}

export function makeIdSelector(selector: SelectorOptions): WithId {
  return function (id: string): IdSelector {
    selector.id = id;
    return {
      toString: formatSelector(selector),
      and: makeIdAndConstraint(selector),
    };
  };
}
