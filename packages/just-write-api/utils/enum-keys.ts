export default function (enumObj = {}) {
  return Object.keys(enumObj).filter((prop) => isNaN(Number(prop)));
}
