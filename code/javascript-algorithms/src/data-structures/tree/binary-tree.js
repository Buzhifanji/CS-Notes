// 二叉树
// 节点类型
var BinaryTreeNode = /** @class */ (function () {
    function BinaryTreeNode(value) {
        this.left = null;
        this.right = null;
        this.value = value;
    }
    return BinaryTreeNode;
}());
var isNull = function (value) { return value === null; };
var BinaryTree = /** @class */ (function () {
    function BinaryTree() {
        // 跟节点
        this.root = null;
    }
    // 插入root的子节点
    BinaryTree.prototype.insertNode = function (paranNode, childNode) {
        // 左子树构造
        if (childNode.value < paranNode.value) {
            // 为空时赋值，否则继续延伸
            if (isNull(paranNode.left)) {
                paranNode.left = childNode;
            }
            else {
                this.insertNode(paranNode.left, childNode);
            }
        }
        else {
            // 右子树的构造
            if (isNull(paranNode.right)) {
                paranNode.right = childNode;
            }
            else {
                this.insertNode(paranNode.right, childNode);
            }
        }
    };
    // 插入节点
    BinaryTree.prototype.insert = function (value) {
        var node = new BinaryTreeNode(value);
        if (isNull(this.root)) {
            this.root = node;
        }
        else {
            this.insertNode(this.root, node);
        }
    };
    BinaryTree.prototype.getRoot = function () {
        return this.root;
    };
    return BinaryTree;
}());
// ============== test ============
var nodes = [8, 3, 10, 1, 5, 14, 4, 6, 13];
var binaryTree = new BinaryTree();
nodes.forEach(function (key) {
    binaryTree.insert(key);
});
console.log(binaryTree.getRoot());
