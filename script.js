
function Node( a = null, b = null, c = null) {
    return {
        data: a,
        left: b,
        right: c,
    }
}

function buildTree(a, start = 0, end = a.length -1) { 
    
    if (start > end) return null;
    
    let mid = parseInt((start + end) / 2);
    let node = Node(a[mid])
    
    node.left = buildTree(a, start, mid - 1);
    
    node.right = buildTree(a, mid + 1, end);
    
    return node
}


function Tree(a) {
    // Sort array and remove duplicates
    let array = removeDuplicates(sort(a));

    return {
        root: Array.isArray(a) ? buildTree(array) : null,

        // Insert node with value
        insert(v, root = this.root) {
            if (root === null) {
                root = Node(v);  
                return root
            } 
            
            if (v > root.data) {
               root.right = this.insert(v, root.right);
            } else if (v < root.data) {
                root.left = this.insert(v, root.left)
            }

            return root;
            // let current = this.root;
            // while (current.right !== null || current.left !== null) {
            //     if (v > current.data && current.right !== null) {
            //         current = current.right;
            //     }
            //     if (v > current.data && current.right === null) {
            //         current.right = Node(v);
            //         current = current.right;
            //         break
            //     }
            //     if (v < current.data && current.left !== null) {
            //         current = current.left;
            //     } 
            //     if (v < current.data && current.left === null) {
            //         current.left = Node(v);
            //         current = current.left;
            //         break
            //     }
            //     if (v === current.data && current.right !== null) {
            //         current = current.right
            //     }
            //     if (v === current.data && current.right === null) {
            //         current.right = Node(v);
            //         current = current.right;
            //     }
            // }
            // prettyPrint(this.root);
        },

        // Delete node with value
        delete(v, root = this.root) {

            // If tree is empty
            if (root === null) return root;

            if (v < root.data) {
                root.left = this.delete(v, root.left);
            } else if (v > root.data) {
                root.right = this.delete(v, root.right);
            } 
            
            else {
                // If node has one child
                if (root.left === null) return root.right;

                else if (root.right === null) return root.left;

                // If node has 2 children return smallest in right 
                else {
                    root.data = minValue(root.right);
    
                    root.right = this.delete(root.data, root.right);
                }

            }

            return root;

            // let turn = null;
            // let previous = null;
            // let current = this.root;
            // while (current.data !== v) {
            //     if (v > current.data) {
            //         previous = current;
            //         current = current.right;
            //         turn = 'right';
            //     } else if (v < current.data) {
            //         previous = current;
            //         current = current.left;
            //         turn = 'left';
            //     } 
            // }
            // // No children nodes
            // if (current.left === null && current.right === null) {
            //     turn === 'right' ? previous.right = null : previous.left = null;
            // }
            // // One child node
            // if (current.left !== null || current.right !== null) {
            //     if (current.left !== null) {
            //         turn === 'left' ? previous.left = current.left :
            //          previous.right = current.left;
            //     } else if (current.right !== null) {
            //         turn === 'left' ? previous.left = current.right :
            //          previous.right = current.right;
            //     }
            // }
            // // Two children nodes
            // if (current.left !== null && current.right !== null) {
            // }
        },

        // Return node with given value
        find(v, node = this.root) {
            if (v === node.data) return node
            return v < node.data ? this.find(v, node.left) : this.find(v, node.right);
        },

        // Provide each node to a provided function as an argument
        levelOrder(fun, root = this.root, queue = [root], empty = []) {
            // Recursion version
            // if (queue.length < 1 && !fun) console.log(empty);
            // if (queue.length < 1) return
            // else {
            //     if(root.left !== null) queue.push(root.left);
            //     if(root.right !== null) queue.push(root.right);
            //     empty = empty.concat([queue[0].data])
            //     if(fun) {
            //         fun(queue[0].data);
            //         queue.shift()  
            //         this.levelOrder(fun, queue[0], queue, empty)
            //     } 
            //     if(!fun) {
            //         queue.shift()  
            //         this.levelOrder(null, queue[0], queue, empty)
            //     }
            // }

            // Iteration version
            while (queue.length > 0) {
                if(queue[0].left !== null) queue.push(queue[0].left);
                if(queue[0].right !== null) queue.push(queue[0].right);
                if(fun) fun(queue[0].data);
                else  empty.push(queue[0].data);
                queue.shift();
            }
            if (!fun) return empty;
        },

        // Traverse the tree in respective order and yield each node to provided function or return array
        inOrder(f, node = this.root, empty = []) {
            if (node === null) return

            if(f) {
                this.inOrder(f, node.left);
                f(node.data);
                this.inOrder(f, node.right);
            } else {
                this.inOrder(null, node.left, empty);
                empty.push(node.data);
                this.inOrder(null, node.right, empty);
                return empty
            }
        },

        preOrder(f, node = this.root, empty = [] ) {
            if (node === null) return

            if(f) {
                f(node.data);
                this.preOrder(f, node.left);
                this.preOrder(f, node.right);
            } else {
                empty.push(node.data);
                this.preOrder(null, node.left, empty);
                this.preOrder(null, node.right, empty);
                return empty
            }
        },

        postOrder(f, node = this.root, empty = []) {
            if (node === null) return

            if(f) {
                this.postOrder(f, node.left);
                this.postOrder(f, node.right);
                f(node.data);
            } else {
                this.postOrder(null, node.left, empty);
                this.postOrder(null, node.right, empty);
                empty.push(node.data);
                return empty
            }
        },

        // Return a node's height
        height(root = this.root) {
            if(root === null) return - 1;

            let left = this.height(root.left);
            let right = this.height(root.right);
            
            return Math.max(left, right) + 1;
        },

        // Return a node's depth
        depth(a) {
            let rootHeight = this.height(this.root);
            let nodeHeight = this.height(a);
            return rootHeight - nodeHeight;
        },

        // Check if tree is balanced
        isBalanced() {
            let left = this.height(this.root.left)
            let right = this.height(this.root.right)
            if ((left - right === 1) || (left - right === 0)) return true
            else if ((right - left === 1) || (right - left === 0)) return true
            else return false;
        },

        // Re-balance tree
        reBalance() {
            let unbalanced = this.inOrder();
            let sorted = sort(unbalanced);
            let noDuplicates = removeDuplicates(sorted);
            this.root = buildTree(noDuplicates);
        },
    }
}


function sort(a) {
    if (a.length < 2) return a
    else {
       let array = []
       let right = a;
       let left = right.splice(0, a.length / 2) 

       let one = sort(left)
       let two = sort(right)

       while (one.length > 0 || two.length > 0) {
           one[0] > two[0] ? array = array.concat(two.splice(0, 1)) : 
           array = array.concat(one.splice(0, 1))
           if (!one[0]) array = array.concat(two.splice(0, two.length));
           if (!two[0]) array = array.concat(one.splice(0, one.length));
       }
       
       return array;
    }
}

function removeDuplicates(a) {
    let good = [];
    while (a.length > 0){
        good = good.concat(a.splice(0, 1))
        for (let i = 0; i <= a.length; i++){
            if (good[good.length - 1] == a[i]) {
                a.splice(i, 1)
            }
        }
    }
    return good;
}

function minValue(root) {
    let minv = root.data;
    while (root.left != null) {
        minv = root.left.data;
        root = root.left;
    }
    return minv;
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

// let t1 = Tree(array)


const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

// prettyPrint(t1.root);

function randomNumberArray(a = 1) {
    let array = []
    for (let i = 0 ; i < a ; i++) {
        array.push(Math.floor(Math.random() * 1000) + 1)
    }
    return array;
}

groot = (n) => {
    let array = randomNumberArray(n); 
    console.log(array);

    let tree = Tree(array)

    tree.isBalanced() ? console.log('Tree is balanced') : console.log('Tree is not balanced');
    prettyPrint(tree.root);

    console.log(`Level order is: ${tree.levelOrder()}`)
    console.log(`Pre-order is: ${tree.preOrder()}`)
    console.log(`In-order is: ${tree.inOrder()}`)
    console.log(`Post-order is: ${tree.postOrder()}`)

    tree.insert(3);
    tree.insert(9);
    tree.insert(2);
    tree.insert(0);

    tree.isBalanced() ? console.log('Tree is balanced') : console.log('Tree is not balanced');
    prettyPrint(tree.root);

    tree.reBalance();
    
    tree.isBalanced() ? console.log('Tree is balanced') : console.log('Tree is not balanced');
    prettyPrint(tree.root);

    console.log(`Level order is: ${tree.levelOrder()}`)
    console.log(`Pre-order is: ${tree.preOrder()}`)
    console.log(`In-order is: ${tree.inOrder()}`)
    console.log(`Post-order is: ${tree.postOrder()}`)
}
