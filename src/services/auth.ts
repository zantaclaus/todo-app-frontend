import md5 from 'md5';

export const hashPassword = async (password: string) => {
  const hashed = await md5(password);
  return hashed;
};
