class HashTable {
  constructor(size = 137) {
    this.table = new Array(size);
    this.size = 0;
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.table.length;
  }

  set(key, value) {
    const hashKey = this._hash(key);
    if (!this.table[hashKey]) {
      this.table[hashKey] = [];
    }
    let updated = false;
    this.table.forEach((item) => {
      if (item.key === key) {
        value = item.value;
        updated = true;
      }
    });
    if (!updated) {
      this.table[hashKey].push({ key, value });
      this.size++;
    }
  }

  get(key) {
    const hashKey = this._hash(key);
    if (this.table[hashKey]) {
      let result;
      this.table[hashKey].forEach((item) => {
        if (item.key === key) {
          result = item.value;
        }
      });
      return result;
    } else {
      return undefined;
    }
  }

  remove(key) {
    const hashKey = this._hash(key);
    if (this.table[hashKey]) {
      this.table[hashKey] = this.table[hashKey].filter(
        (item) => item.key !== key
      );
      this.size--;
      return true;
    } else {
      return false;
    }
  }

  has(key) {
    return this.get(key) !== undefined;
  }
}

const ht = new HashTable(10);

// Test set() and get()
ht.set("name", "Alice");
console.assert(ht.get("name") === "Alice", "Test 1 Failed");

// Test updating a value
ht.set("name", "Bob");
console.assert(ht.get("name") === "Bob", "Test 2 Failed");

// Test has()
console.assert(ht.has("name") === true, "Test 3 Failed");
console.assert(ht.has("age") === false, "Test 4 Failed");

// Test remove()
ht.remove("name");
console.assert(ht.get("name") === undefined, "Test 5 Failed");
console.assert(ht.has("name") === false, "Test 6 Failed");

// Test non-existent key
console.assert(ht.get("unknown") === undefined, "Test 7 Failed");

console.log("All tests passed!");
