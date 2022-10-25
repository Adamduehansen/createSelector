import { makeClassNameSelector, WithClassName } from './classNames';
import { formatSelector } from './formatSelector';
import { makeIdSelector, WithId } from './id';
import { Selector, SelectorOptions } from './selector';

export type WithTagName = (
  tagName: keyof HTMLElementTagNameMap
) => TagNameSelector;

interface TagNameSelector extends Selector {
  and: () => TagNameAndConstraint;
}

interface TagNameAndConstraint {
  withId: WithId;
  withClassName: WithClassName;
}

function makeTagNameAndConstraint(
  selector: SelectorOptions
): () => TagNameAndConstraint {
  return function () {
    return {
      withId: makeIdSelector(selector),
      withClassName: makeClassNameSelector(selector),
    };
  };
}

export function makeTagNameSelector(selector: SelectorOptions): WithTagName {
  return function (tagName: keyof HTMLElementTagNameMap) {
    selector.tagName = tagName;
    return {
      toString: formatSelector(selector),
      and: makeTagNameAndConstraint(selector),
    };
  };
}
