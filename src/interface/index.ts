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
  };
}
