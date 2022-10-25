import { makeClassNameSelector, WithClassName } from './classNames';
import { makeIdSelector, WithId } from './id';
import { makeTagNameSelector, WithTagName } from './tagName';

export interface SelectorOptions {
  tagName?: keyof HTMLElementTagNameMap;
  id?: string;
  classNames: string[];
}

export interface Selector {
  toString: () => string;
}

interface InitialSelector {
  withTagName: WithTagName;
  withId: WithId;
  withClassName: WithClassName;
}

export function createSelector(): InitialSelector {
  const selector: SelectorOptions = {
    classNames: [],
    id: undefined,
  };

  return {
    withTagName: makeTagNameSelector(selector),
    withId: makeIdSelector(selector),
    withClassName: makeClassNameSelector(selector),
  };
}
