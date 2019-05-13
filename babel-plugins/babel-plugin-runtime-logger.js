module.exports = function logger({
  types: t
}) {
  return {
    name: 'logger',
    visitor: {
      FunctionDeclaration: {
        enter(path) {
          path
            .get('body')
            .unshiftContainer(
              'body',
              t.callExpression(
                t.memberExpression(t.identifier('console'), t.identifier('time')),
                [t.stringLiteral(path.node.id.name)]
              )
            );
        },
        exit(path) {
          // check last expression from BlockStatement
          const blockStatement = path.get('body')
          const lastExpression = blockStatement.get('body').pop();

          if (lastExpression.type !== 'ReturnStatement') {
            lastExpression.insertAfter(
              t.callExpression(
                t.memberExpression(t.identifier('console'), t.identifier('timeEnd')),
                [t.stringLiteral(path.node.id.name)]
              )
            );
          } else {
            lastExpression.insertBefore(
              t.callExpression(
                t.memberExpression(t.identifier('console'), t.identifier('timeEnd')),
                [t.stringLiteral(path.node.id.name)]
              )
            );
          }
        }
      },
    }
  };
}