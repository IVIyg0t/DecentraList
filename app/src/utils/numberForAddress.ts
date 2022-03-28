export default function numberForAddress(address: string) {
  const addr = address.slice(2, 10);
  return parseInt(addr, 16);
}
