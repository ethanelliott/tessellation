/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

import {
  dedupeArray,
  flattenDependencyTree,
  generateDependencyTree,
  Tree,
} from './dependency-tree.util';

const newTreeNode = (): Map<string, Tree | null> =>
  new Map<string, Tree | null>();

describe('dedupeArray', () => {
  it('should be truthy', () => {
    expect(dedupeArray).toBeTruthy();
  });

  it('should not change an already de-duped array', () => {
    const sampleArray = ['1', '2', '3'];

    expect(dedupeArray(sampleArray)).toEqual(['1', '2', '3']);
  });

  it('should de-dupe an array with duplicates', () => {
    const sampleArray = ['1', '2', '3', '2'];

    expect(dedupeArray(sampleArray)).toEqual(['1', '2', '3']);
  });

  it('should work with an empty array', () => {
    expect(dedupeArray([])).toEqual([]);
  });
});

describe('flattenDependencyTree', () => {
  it('should exist', () => {
    expect(flattenDependencyTree).toBeTruthy();
  });

  it('should flatten a single node', () => {
    const dependencyTree: Tree = newTreeNode();

    dependencyTree.set('A', null);

    expect(flattenDependencyTree(dependencyTree)).toStrictEqual(['A']);
  });

  it('should flatten a simple dependency tree', () => {
    const dependencyTree = newTreeNode().set('A', newTreeNode().set('B', null));

    expect(flattenDependencyTree(dependencyTree)).toStrictEqual(['A', 'B']);
  });

  it('should flatten a complex dependency tree', () => {
    const rootNode = newTreeNode()
      .set(
        'A',
        newTreeNode()
          .set('C', newTreeNode().set('E', null))
          .set('D', newTreeNode().set('F', null)),
      )
      .set('B', newTreeNode().set('G', null));

    expect(flattenDependencyTree(rootNode)).toStrictEqual([
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
    ]);
  });
});

describe('generateDependencyTree', () => {
  it('should exist', () => {
    expect(generateDependencyTree).toBeTruthy();
  });

  it('should generate from a single relationship', () => {
    const dependencyInverseRelationships = {
      B: ['A'],
    };

    const expectedTree = newTreeNode().set('A', newTreeNode().set('B', null));

    expect(generateDependencyTree(dependencyInverseRelationships)).toEqual(
      expectedTree,
    );
  });

  it('should generate from a complex relationship set', () => {
    const dependencyInverseRelationships = {
      B: ['A'],
      C: ['A'],
      D: ['B'],
      E: ['C'],
    };

    const expectedTree = newTreeNode()
      .set('A', newTreeNode().set('B', null).set('C', null))
      .set('B', newTreeNode().set('D', null))
      .set('C', newTreeNode().set('E', null));

    expect(generateDependencyTree(dependencyInverseRelationships)).toEqual(
      expectedTree,
    );
  });
});
