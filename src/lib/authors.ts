export interface Author {
  name: string;
  role?: string;
  avatar?: string;
  github?: string;
}

export const authors: Record<string, Author> = {
  __filename: {
    name: '__filename',
    role: 'Software Engineer & Network Engineer',
    avatar: '/images/icon-3.png',
    github: 'https://github.com/filename24',
  },
};

export function getAuthor(name: string): Author {
  return authors[name] ?? { name };
}
