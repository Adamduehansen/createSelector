import { formatSelector } from './formatSelector';
import type { Selector, SelectorOptions } from './selector';

export type WithClassName = (className: string) => ClassNameSelector;

interface ClassNameAndConstraint {
  withClassName: WithClassName;
}

interface ClassNameSelector extends Selector {
  and: () => ClassNameAndConstraint;
}

function makeClassNameAndConstraint(
  selector: SelectorOptions
): () => ClassNameAndConstraint {
  return function () {
    return {
      withClassName: makeClassNameSelector(selector),
    };
  };
}

export function makeClassNameSelector(
  selector: SelectorOptions
): WithClassName {
  return function (className: string): ClassNameSelector {
    selector.classNames.push(className);
    return {
      toString: formatSelector(selector),
      and: makeClassNameAndConstraint(selector),
    };
  };
}
