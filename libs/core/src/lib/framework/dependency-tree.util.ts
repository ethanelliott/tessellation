/*************************
 * Copyright 2022
 * Ethan Elliott
 *************************/

export type Tree = Map<string, Tree | null> | null;

export const generateDependencyTree = (
  dependencyInverseRelationships: Record<string, Array<string>>,
): Tree => {
  const dependencyTree = new Map<string, Tree | null>();

  Object.entries(dependencyInverseRelationships).forEach(
    ([dependent, dependentOn]) => {
      if (dependentOn.length === 0) {
        dependencyTree.set(dependent, null);
      } else {
        dependentOn.forEach(dep => {
          if (!dependencyTree.has(dep)) {
            dependencyTree.set(dep, null);
          }
          let node = dependencyTree.get(dep);

          if (node === null) {
            node = new Map<string, Tree | null>();
          }

          node!.set(dependent, null);

          dependencyTree.set(dep, node!);
        });
      }
    },
  );

  // now we have a tree with lots of duplicates. we need to do some shifting
  // we can look at optimizing the tree later

  return dependencyTree;
};

export const flattenDependencyTree = (dependencyTree: Tree): Array<string> => {
  if (dependencyTree === null) {
    return [];
  }

  return [
    ...dependencyTree.keys(),
    ...[...dependencyTree.values()].flatMap(e => flattenDependencyTree(e)),
  ];
};

export const dedupeArray = <T>(array: Array<T>): Array<T> => [
  ...new Set(array),
];
