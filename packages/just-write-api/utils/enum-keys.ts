export default function (enumObj: {}) {
  console.log('Typeof', typeof enumObj);
  return Object.keys(enumObj).filter((prop) => isNaN(Number(prop)));
}
