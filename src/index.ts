interface SelectorOptions {
  tagName?: keyof HTMLElementTagNameMap;
  id?: string;
  classNames: string[];
}

interface Selector {
  toString: () => string;
}

interface TagNameSelector extends Selector {
  and: () => TagNameAndConstraint;
}

interface IdSelector extends Selector {
  and: () => IdAndConstraint;
}

interface ClassNameSelector extends Selector {
  and: () => ClassNameAndConstraint;
}

type WithTagName = (tagName: keyof HTMLElementTagNameMap) => TagNameSelector;
type WithId = (id: string) => IdSelector;
type WithClassName = (className: string) => ClassNameSelector;

interface TagNameAndConstraint {
  withId: WithId;
  withClassName: WithClassName;
}

interface ClassNameAndConstraint {
  withClassName: WithClassName;
}

interface IdAndConstraint {
  withClassName: WithClassName;
}

interface InitialSelector {
  withTagName: WithTagName;
  withId: WithId;
  withClassName: WithClassName;
}

function createIdSelector(id?: string): string {
  if (!id) {
    return '';
  }

  return `#${id}`;
}

function createClassNameSelector(classNames: string[]): string {
  if (classNames.length <= 0) {
    return '';
  }

  return `.${classNames.join('.')}`;
}

function formatSelector(selector: SelectorOptions): () => string {
  return function () {
    const { classNames, id, tagName } = selector;
    return [
      tagName,
      createIdSelector(id),
      createClassNameSelector(classNames),
    ].join('');
  };
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

function makeTagNameSelector(selector: SelectorOptions): WithTagName {
  return function (tagName: keyof HTMLElementTagNameMap) {
    selector.tagName = tagName;
    return {
      toString: formatSelector(selector),
      and: makeTagNameAndConstraint(selector),
    };
  };
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

function makeClassNameSelector(selector: SelectorOptions): WithClassName {
  return function (className: string): ClassNameSelector {
    selector.classNames.push(className);
    return {
      toString: formatSelector(selector),
      and: makeClassNameAndConstraint(selector),
    };
  };
}

function makeIdAndConstraint(selector: SelectorOptions): () => IdAndConstraint {
  return function () {
    return {
      withClassName: makeClassNameSelector(selector),
    };
  };
}

function makeIdSelector(selector: SelectorOptions): WithId {
  return function (id: string): IdSelector {
    selector.id = id;
    return {
      toString: formatSelector(selector),
      and: makeIdAndConstraint(selector),
    };
  };
}

function createSelector(): InitialSelector {
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

export default createSelector;
