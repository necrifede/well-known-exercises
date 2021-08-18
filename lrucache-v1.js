/*
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache module:

- `const lru = createLruCache(int capacity)` - Initialize the LRU cache with positive size capacity.
- `int lru.get(int key)` -  Return the value of the key if the key exists, otherwise return -1.
- `void lru.put(int key, int value)` - Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. 
If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions `get` and `put` must each run in O(1) average time complexity.
*/

const createLruCache = (capacity) => {
  if (capacity < 1) {
    throw new Error("capacity must be greater than 1");
  }
  const cache = new Map();
  let length = 0;
  let head = undefined;
  let tail = undefined;
  // node: { next: undefined, previous: undefined, value }

  const print = () => {
    const res = [];
    let node = head;
    //res.push(head.value);
    while (node?.value) {
      res.push(node.value);
      node = node.next;
    }

    console.log(
      "list %s, l: %s, tail: %s, t-key: %s",
      JSON.stringify(res),
      length,
      tail.value,
      tail.key
    );
    // console.log(JSON.stringify(cache));
  };

  const removeLast = () => {
    if (tail.previous) {
      tail.previous.next = undefined;
      cache.delete(tail.key);
      tail = tail.previous;
    }
    length--;
  };

  const moveFront = (node) => {
    // <- {} -> {head}    <- {} ->    <- {} ->   <- {} ->
    if (!node.previous) {
        return 
    }
    
    node.previous.next = node.next;
     
    if (node.next) {
      node.next.previous = node.previous;
    } else {
      // tail
      tail = node.previous;
    }
    node.next = head;
    // tail = node.previous;
    node.previous = undefined;
    head.previous = node;
    head = node;
  };

  const get = (key) => {
    // return value with this key, or -1
    // return cache.get(key) ?? -1;
    // if item exists moveit to front
    let res = -1;

    if (cache.has(key)) {
      const node = cache.get(key);
      moveFront(node);
      // tail =
      res = node.value;
    }

    // print();
    return res;
  };

  const put = (key, value) => {
    // update key-value if exist, or add it
    // remove the last one if exceed capacity

    // verify if exists
    if (cache.has(key)) {
      const node = cache.get(key);
      moveFront(node);
      node.value = value;
      // print(); // remove
      return;
    }

    // if empty fill first item
    if (!head) {
      const node = { next: undefined, previous: undefined, value, key };
      head = node;
      tail = node;
      length++;
      cache.set(key, node);
    } else {
      if (length >= capacity) {
        removeLast();
      }
      const node = { next: undefined, previous: undefined, value, key };
      head.previous = node;
      node.next = head;
      head = node;
      length++;
      cache.set(key, node);
    }
    // print();
  };

  return {
    get,
    put,
  };
};

console.clear();
console.log("start");
// const lru = createLruCache(5);
// lru.put(1, 1);
// lru.put(2, 3);
// lru.put(3, 4);
// lru.put(4, 7);
// lru.put(6, 10);
// console.log("get 1: ", lru.get(1));
// console.log("get 3: ", lru.get(3));
// lru.put(1, 5);
// // console.log("get 2: ", lru.get(2));
// lru.put(12, 7);
// lru.put(5, 2);
// console.log("get 4: ", lru.get(4));

const lru = createLruCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.log(lru.get(2) === 2, "should be 2");
lru.put(3, 3);
console.log(lru.get(1) === -1, "should be -1");

const lru2 = createLruCache(2);
lru2.put(1, 1); // cache is {1:1}
lru2.put(2, 2); // cache is {1:1, 2:2}
console.log(lru2.get(1) === 1, "1");
lru2.put(3, 3); // LRU key was 2, evicts key 2, cache is {1:1, 3:3}
console.log(lru2.get(2) === -1, "-1");
lru2.put(4, 4); // LRU key was 1, evicts key 1, cache is {4:4, 3:3}
console.log(lru2.get(1) === -1, "-1");
console.log(lru2.get(3) === 3, "3");
console.log(lru2.get(4) === 4, "4");
