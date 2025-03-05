class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = this.tail = node;
      this._size++;
      return;
    }
    this.tail.next = node;
    this.tail = node;
    this._size++;
  }

  prepend(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = this.tail = node;
      this._size++;
      return;
    }
    node.next = this.head;
    this.head = node;
    this._size++;
  }

  delete(value) {
    if (!this.head) {
      return undefined;
    }
    let current = this.head;
    if (current.value === value) {
      this.head = current.next;
      this._size--;
      return;
    }
    while (current.next != null) {
      if (current.next.value === value) {
        current.next = current.next.next;
        this._size--;
        return;
      }
      current = current.next;
    }
  }

  find(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }
    return undefined;
  }

  size() {
    return this._size;
  }

  isEmpty() {
    return this._size === 0;
  }

  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

const list = new LinkedList();

// Test isEmpty() on an empty list
console.assert(list.isEmpty() === true, "Test 1 Failed");

// Test append()
list.append(1);
list.append(2);
list.append(3);
console.assert(
  list.toArray().toString() === [1, 2, 3].toString(),
  "Test 2 Failed"
);

// Test prepend()
list.prepend(0);
console.assert(
  list.toArray().toString() === [0, 1, 2, 3].toString(),
  "Test 3 Failed"
);

// Test find()
console.assert(list.find(2).value === 2, "Test 4 Failed");
console.assert(list.find(4) === undefined, "Test 5 Failed");

// Test delete()
list.delete(2);
console.assert(
  list.toArray().toString() === [0, 1, 3].toString(),
  "Test 6 Failed"
);

// Test delete() on a non-existent value
list.delete(5);
console.assert(
  list.toArray().toString() === [0, 1, 3].toString(),
  "Test 7 Failed"
);

// Test size()
console.assert(list.size() === 3, "Test 8 Failed");

// Test isEmpty() on a non-empty list
console.assert(list.isEmpty() === false, "Test 9 Failed");

// Test delete() on the head node
list.delete(0);
console.assert(
  list.toArray().toString() === [1, 3].toString(),
  "Test 10 Failed"
);

console.log("All tests passed!");
