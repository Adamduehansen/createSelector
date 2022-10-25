interface SelectorOptions {
  id?: string;
  classNames: string[];
}

interface Selector {
  toString: () => string;
}

interface IdSelector extends Selector {
  and: () => IdAndConstraint;
}

interface ClassNameSelector extends Selector {
  and: () => ClassNameAndConstraint;
}

type WithId = (id: string) => IdSelector;
type WithClassName = (className: string) => ClassNameSelector;

interface ClassNameAndConstraint {
  withClassName: WithClassName;
}

interface IdAndConstraint {
  withClassName: WithClassName;
}

interface InitialSelector {
  withId: WithId;
  withClassName: WithClassName;
}

function formatSelector(selector: SelectorOptions): () => string {
  return function () {
    const { classNames, id } = selector;
    let classes = '';
    let identity = '';

    if (id) {
      identity = `#${id}`;
    }

    if (classNames.length > 0) {
      classes = `.${classNames.join('.')}`;
    }

    return [identity, classes].join('');
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

function createSelector(): InitialSelector {
  const selector: SelectorOptions = {
    classNames: [],
    id: undefined,
  };

  return {
    withId: makeIdSelector(selector),
    withClassName: makeClassNameSelector(selector),
  };
}

export default createSelector;
