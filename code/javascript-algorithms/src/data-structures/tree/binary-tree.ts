// 二叉树

// 节点类型
class BinaryTreeNode<T> {
    value: T
    left: null | BinaryTreeNode<T> = null;
    right: null | BinaryTreeNode<T> = null;
    constructor(value: T) {
        this.value = value
    }
}

const isNull = (value: any) => value === null

class BinaryTree<T> {
    // 跟节点
    root: null | BinaryTreeNode<T> = null;
    // 插入root的子节点
    private insertNode(paranNode: BinaryTreeNode<T>, childNode: BinaryTreeNode<T>) {
        // 左子树构造
        if (childNode.value < paranNode.value) {
            // 为空时赋值，否则继续延伸
            if (isNull(paranNode.left)) {
                paranNode.left = childNode
            } else {
                this.insertNode(paranNode.left, childNode)
            }
        } else {
            // 右子树的构造
            if (isNull(paranNode.right)) {
                paranNode.right = childNode
            } else {
                this.insertNode(paranNode.right, childNode)
            }
        }
    }
    // 插入节点
    insert(value: T) {
        const node = new BinaryTreeNode<T>(value)
        if (isNull(this.root)) {
            this.root = node
        } else {
            this.insertNode(this.root, node)
        }
    }
    getRoot() {
        return this.root
    }
}

// ============== test ============

const nodes = [8, 3, 10, 1, 5, 14, 4, 6, 13];
const binaryTree = new BinaryTree<number>();
nodes.forEach(key => {
    binaryTree.insert(key);
});
console.log(binaryTree.getRoot());