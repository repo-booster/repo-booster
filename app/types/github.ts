export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  private_repos?: number;
  followers: number;
  following: number;
  stars?: number;
  contributors?: number;
  organisations: string[];
  contributions: number;
  location?: string | null;
  blog?: string | null;
  email?: string | null;
  hireable?: boolean;
  created_at: string;
  updated_at: string;
}
