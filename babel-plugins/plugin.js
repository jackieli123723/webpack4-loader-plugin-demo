// export default function({ types: t }) {
//   return {
//     visitor: {
//       BinaryExpression(path) {
// 		  if (path.node.operator !== "===") {
// 		    return;
// 		  }
// 		  path.node.left = t.identifier("sebmck");
// 		  path.node.right = t.identifier("dork");
// 		}
//     }
//   };
// }

//foo === bar; sebmck === dork;

 module.exports = function({ types: t }) {
  return {
    visitor: {
       BinaryExpression(path) { //看ast "expression": {"type": "BinaryExpression"
        if (path.node.operator !== '===') {
          return;
        }
        //way1
        // path.node.left.name = 'sebmck';
        // path.node.right.name = 'dork';

        //way2
        path.node.left = t.identifier("sebmck");
        path.node.right = t.identifier("dork");
      },
      
      //把下面的plugin整合在一起 
      Identifier(path, state) {
        if (path.node.name === 'bad') {
          path.node.name = 'good';
          console.log("Called!"); 
        }
      }

    }
  };
}

// plugin.js index2.js // let bad = true; ===> let good = true;
// module.exports = function({ types: babelTypes }) {
//   return {
//     name: "deadly-simple-plugin-example",
//     visitor: {
//       Identifier(path, state) {
//         if (path.node.name === 'bad') {
//           path.node.name = 'good';
//           console.log("Called!"); 
//         }
//       }
//     }
//   };
// };