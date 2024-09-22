import { compare, hash } from 'bcrypt';

export function hashPassword(pwd: string) {
    return hash(pwd, 10) as Promise<string>;
}

export async function validatePassword(pwd: string, hashed: string) {
    return compare(pwd, hashed);
}