export interface ANARTICLE {
  content: string;
  goods: number;
  id: string;
  commentData: number;
  title: string;
  topic: string;
  date: Date;
  user: {
    avatar?: string;
    username: string;
    level: number;
    vip: string;
    id: string;
    followers: number;
  };
}

export interface SEARCHARG {
  content?: string;
  topic?: string;
  take: number;
  skip: number;
}
