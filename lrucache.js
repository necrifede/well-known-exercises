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

  const removeLast = () => {
    if (tail.previous) {
      tail.previous.next = undefined;
      cache.delete(tail.key);
      tail = tail.previous;
    }
    length--;
  };

  const moveFront = (node) => {
    if (!node.previous) {
      return;
    }

    node.previous.next = node.next;

    if (node.next) {
      node.next.previous = node.previous;
    } else {
      tail = node.previous;
    }
    node.next = head;
    node.previous = undefined;
    head.previous = node;
    head = node;
  };

  const get = (key) => {
    if (cache.has(key)) {
      const node = cache.get(key);
      moveFront(node);
      return node.value;
    }

    return -1;
  };

  const put = (key, value) => {
    if (cache.has(key)) {
      const node = cache.get(key);
      moveFront(node);
      node.value = value;
      return;
    }

    const node = { next: undefined, previous: undefined, value, key };

    if (!head) {
      head = node;
      tail = node;
    } else {
      if (length >= capacity) {
        removeLast();
      }
      head.previous = node;
      node.next = head;
      head = node;
    }

    length++;
    cache.set(key, node);
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
console.assert(lru.get(2) === 2, "should be 2");
lru.put(3, 3);
console.assert(lru.get(1) === -1, "should be -1");

const lru2 = createLruCache(2);
lru2.put(1, 1); // cache is {1:1}
lru2.put(2, 2); // cache is {1:1, 2:2}
console.assert(lru2.get(1) === 1, "1");
lru2.put(3, 3); // LRU key was 2, evicts key 2, cache is {1:1, 3:3}
console.assert(lru2.get(2) === -1, "-1");
lru2.put(4, 4); // LRU key was 1, evicts key 1, cache is {4:4, 3:3}
console.assert(lru2.get(1) === -1, "-1");
console.assert(lru2.get(3) === 3, "3");
console.assert(lru2.get(4) === 4, "4");
