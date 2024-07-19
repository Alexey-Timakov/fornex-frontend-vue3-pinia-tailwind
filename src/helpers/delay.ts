export const delay = async (timeout: number) => {
  return new Promise(res => setTimeout(res, timeout))
}