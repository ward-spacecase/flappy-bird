
function TreeNode (data) {

    if(!data) {
        throw new Error('you must initialize this node to something');
    }

    this.data = data;
    this.leftChild = undefined;
    this.rightChild = undefined;

    this.setLeftChild = function (node) {
         this.leftChild = node;
    };

    this.getLeftChild = function () {
        return this.leftChild;
    };

    this.setRightChild = function (node) {
        this.rightChild = node;
    };

    this.getRightChild = function () {
        return this.rightChild;
    };

    this.compare = function (item) {
            if(this.data > item)
            {
                return 1;
            }
            else if (this.data < item)
            {
                return -1;
            }
            else
            {
                return 0;
            }
    };

    this.print = function () {

    };
}


function find (item, node) {

    //check for undefined node
    if(!node)
    {
        return undefined;
    }

    var compare = node.compare(item);

    if(compare == 1)
    {
        return find(item, node.getRightChild());
    }
    else if(compare == -1)
    {
        return find(item, node.getLeftChild());
    }
    else
    {
        return node;
    }
}

function insert(item, node) {

    if(!node) {
        console.log('no node...');
    }
    else if(node.compare(item) == 1) {
        if(!node.getRightChild()) {

            node.setRightChild(new TreeNode(item));

        } else {

           return insert(item, node.getRightChild());
        }

    } else if(node.compare(item) == -1) {

        if(!node.getLeftChild()) {

            node.setLeftChild(new TreeNode(item));

        } else {

            return insert(item, node.getLeftChild());
        }
    } else if (node.compare(item) == 0) {
       console.log(item + ' ALREADY EXISTS, YOU FOOL!');

    } else {

        throw new Error('could not insert' +  item + 'into node');
    }

}

var yearbook = new TreeNode('Bryce');

insert('Mario', yearbook);
insert('Joseph', yearbook);
insert('Chris', yearbook);
insert('Mike', yearbook);
insert('Indiana', yearbook);
insert('Miles', yearbook);
insert('Gage', yearbook);
insert('Ray', yearbook);
insert('Tanner', yearbook);
insert('Arianne', yearbook);
insert('Matt', yearbook);
insert('Austin', yearbook);
insert('Andrew', yearbook);
insert('Kendra', yearbook);
insert('Sam', yearbook);
insert('Brayden', yearbook);
insert('Jonny', yearbook);
insert('Kevin', yearbook);
console.log(yearbook);
console.log(find('Matt', yearbook));