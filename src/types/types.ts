export type Testimonial = {
    text: string;
    author: string;
    role: string;
  };
  
  export type Partner = {
    name: string;
    logo: string;
  };




  // types/blog.ts
export interface Author {
  username: string;
  name: string;
  profilePicture?: string;
  photo?: string;
}

export interface CoverImage {
  url: string;
}

export interface Content {
  html: string;
  markdown?: string;
  text?: string;
}

export interface BlogPost {
  author: Author;
  publishedAt: string;
  title: string;
  brief: string;
  url: string;
  slug: string;
  content: Content;
  coverImage: CoverImage;
  readTimeInMinutes: number;
}