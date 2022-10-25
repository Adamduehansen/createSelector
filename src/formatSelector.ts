import { SelectorOptions } from './selector';

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

export function formatSelector(selector: SelectorOptions): () => string {
  return function () {
    const { classNames, id, tagName } = selector;
    return [
      tagName,
      createIdSelector(id),
      createClassNameSelector(classNames),
    ].join('');
  };
}
