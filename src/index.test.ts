import createSelector from './index';

describe('createSelector', () => {
  describe('withTagName', () => {
    test('should create selector with tag name', () => {
      // Arrange
      const expectedSelector = 'div';

      // Act
      const result = createSelector().withTagName('div').toString();

      // Assert
      expect(result).toEqual(expectedSelector);
    });

    test('should create selector with tag name and id', () => {
      // Arrange
      const expectedSelector = 'div#any-id';

      // Act
      const result = createSelector()
        .withTagName('div')
        .and()
        .withId('any-id')
        .toString();

      // Assert
      expect(result).toEqual(expectedSelector);
    });

    test('should create selector with tag name and class names', () => {
      // Arrange
      const expectedSelector = 'div.any-class-1.any-class-2';

      // Act
      const result = createSelector()
        .withTagName('div')
        .and()
        .withClassName('any-class-1')
        .and()
        .withClassName('any-class-2')
        .toString();

      // Assert
      expect(result).toEqual(expectedSelector);
    });

    test('should create selector with tag name, id and class names', () => {
      // Arrange
      const expectedSelector = 'div#any-id.any-class-1.any-class-2';

      // Act
      const result = createSelector()
        .withTagName('div')
        .and()
        .withId('any-id')
        .and()
        .withClassName('any-class-1')
        .and()
        .withClassName('any-class-2')
        .toString();

      // Assert
      expect(result).toEqual(expectedSelector);
    });
  });

  describe('withId', () => {
    test('should create selector with id', () => {
      // Arrange
      const expectedSelector = '#any-id';

      // Act
      const result = createSelector().withId('any-id').toString();

      // Assert
      expect(result).toEqual(expectedSelector);
    });

    test('should create selector with id and class name', () => {
      // Arrange
      const expectedSelector = '#any-id.any-class';

      // Act
      const result = createSelector()
        .withId('any-id')
        .and()
        .withClassName('any-class')
        .toString();

      // Assert
      expect(result).toEqual(expectedSelector);
    });
  });

  describe('withClassName', () => {
    test('should create selector with classname', () => {
      // Arrange
      const expectedSelector = '.any-class';

      // Act
      const result = createSelector().withClassName('any-class').toString();

      // Assert
      expect(result).toEqual(expectedSelector);
    });

    test('should create selector with multiple classnames', () => {
      // Arrange
      const expectedSelector = '.any-class-1.any-class-2.any-class-3';

      // Act
      const result = createSelector()
        .withClassName('any-class-1')
        .and()
        .withClassName('any-class-2')
        .and()
        .withClassName('any-class-3')
        .toString();

      // Assert
      expect(result).toEqual(expectedSelector);
    });
  });
});
