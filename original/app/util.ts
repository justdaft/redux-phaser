// Credits to Christian Johansen for util logic:
// https://github.com/cjohansen/react-sweeper

let {fromJS, List, Map} = Immutable;

function partition(size: number, coll: any) {
  let res: Array<any> = [];
  for (let i = 0, l = coll.size || coll.length; i < l; i += size) {
    res.push(coll.slice(i, i + size));
  }
  return fromJS(res);
}

function identity(v: any) {
  return v;
}

function prop(n: any) {
  return function (object: any) {
    return object instanceof Map ? object.get(n) : object[n];
  };
}

function keep(list: any, pred: any) {
  return list.map(pred).filter(identity);
}

function repeat(n: any, val: any) {
  const res: Array<any> = [];
  while (n--) {
    res.push(val);
  }
  return List(res);
}

function shuffle(list: any) {
  return list.sort(function () { return Math.random() - 0.5; });
}

export {partition, identity, prop, keep, repeat, shuffle};

class Guid {
    // Guid.newGuid();
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
